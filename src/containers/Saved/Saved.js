import React, { useEffect, useState } from "react";

import axios from "../../axios-books";
import { connect } from "react-redux";
import * as actions from "../../store/actions/actions";

import Books from "../../components/Books/Books";
import Modal from "../../components/Modal/Modal";

const Saved = (props) => {
  const { onConfirmDeleteBook } = props;

  const [loading, setLoading] = useState(false);
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
  }, [setError, props.deleting]);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      <Modal
        show={error || props.notification}
        cancelModal={handleNotifications}
        delete={props.deleteId}
      />
      <Books loadedBooks={myBooks} click={deleteBook} rate />
    </>
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
    // onFetchBooksFailure: (payload) =>
    //   dispatch(actions.fetchBooksFailure(payload)),
    onResetError: () => dispatch(actions.resetError()),
    onConfirmDeleteBook: (payload) =>
      dispatch(actions.confirmDeleteBook(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Saved);
