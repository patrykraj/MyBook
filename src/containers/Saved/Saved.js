import React, { useEffect, useState } from "react";

import axios from "../../axios-books";
import { connect } from "react-redux";
import * as actions from "../../store/actions/actions";

import Books from "../../components/Books/Books";
import Modal from "../../components/Modal/Modal";

const Saved = (props) => {
  const { onConfirmDeleteBook, deleting } = props;

  const [loading, setLoading] = useState(true);
  const [myBooks, setMyBooks] = useState([]);
  const [error, setError] = useState(null);

  const deleteBook = (id) => {
    onConfirmDeleteBook(id);
  };

  const handleNotifications = () => {
    if (error) return setError(null);
    props.onResetError();
  };

  useEffect(() => {
    if (deleting === true) return;
    setLoading(true);
    axios
      .get("/books.json")
      .then((books) => {
        const fetchedBooks = [];

        for (const key in books.data) {
          books.data[key].query = key;
          fetchedBooks.push(books.data[key]);
        }

        setMyBooks(fetchedBooks);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(`Something went wrong: ${err.message}`);
      });
  }, [deleting]);

  let content;
  if (loading) {
    content = <h3>Loading...</h3>;
  }

  if (myBooks.length > 0)
    content = (
      <>
        <Modal
          show={error || props.notification}
          cancelModal={handleNotifications}
          delete={props.deleteId}
        />
        <Books loadedBooks={myBooks} click={deleteBook} rate />
      </>
    );

  return (
    <div
      className={
        (myBooks.length && !loading) || (myBooks.length && loading)
          ? "container--filled"
          : "container"
      }
    >
      {!loading && (
        <h1 className="header">
          {myBooks.length ? "Bookshelf:" : "Bookshelf's empty"}
        </h1>
      )}
      {content}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    deleting: state.reducer.deleting,
    deleteId: state.reducer.deleteId,
    notification: state.reducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onResetError: () => dispatch(actions.resetError()),
    onConfirmDeleteBook: (payload) =>
      dispatch(actions.confirmDeleteBook(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Saved);
