import React, { useEffect, useState } from "react";

import axios from "../../axios-books";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

import Books from "../../components/Books/Books";
import Modal from "../../components/Modal/Modal";
import MainHeader from "../../components/MainHeader/MainHeader";
import Loader from "../../components/Loader/Loader";

const Saved = (props) => {
  const {
    onConfirmDeleteBook,
    onUpdateBook,
    updating,
    token,
    userId,
    loadingUpdate,
  } = props;

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

  const updateBook = (query, val, date) => {
    const payload = {
      query,
      selectedOption: val,
      dateRead: val === "2" ? date.toLocaleDateString() : "n/d",
    };

    onUpdateBook(payload, token);
  };

  useEffect(() => {
    if (updating === true) return;
    const queryParams =
      "?auth=" + token + `&orderBy="userId"&equalTo="${userId}"`;

    setLoading(true);
    axios
      .get("/books.json" + queryParams)
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
  }, [updating, token, userId]);

  let content;
  if (loading) {
    content = <Loader />;
  }

  if (myBooks.length > 0)
    content = (
      <>
        <Modal
          show={error || props.notification}
          cancelModal={handleNotifications}
          delete={props.deleteId}
        />
        <MainHeader>Bookshelf:</MainHeader>
        <Books
          loadedBooks={myBooks}
          click={deleteBook}
          updateBook={updateBook}
          loadingUpdate={loadingUpdate}
          rate
        />
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
      {!loading && !myBooks.length && (
        <MainHeader center>Bookshelf's empty</MainHeader>
      )}
      {content}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    updating: state.books.updating,
    deleteId: state.books.deleteId,
    notification: state.books.error,
    token: state.user.token,
    userId: state.user.userId,
    loadingUpdate: state.books.loadingUpdate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onResetError: () => dispatch(actions.resetError()),
    onConfirmDeleteBook: (payload) =>
      dispatch(actions.confirmDeleteBook(payload)),
    onUpdateBook: (payload, token) =>
      dispatch(actions.updateBook(payload, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Saved);
