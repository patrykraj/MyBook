import React from "react";
import { connect } from "react-redux";

import Books from "../../components/Books/Books";
import Modal from "../../components/Modal/Modal";
import MainHeader from "../../components/MainHeader/MainHeader";
import Loader from "../../components/Loader/Loader";
import axios from "../../axios-books";
import * as actions from "../../store/actions";

import classes from "./Search.module.css";

const Search = (props) => {
  const {
    books,
    loading,
    searchedQuery,
    onAddBook,
    onAddBookFailure,
    onResetError,
    token,
  } = props;

  const handleAddBook = async (data) => {
    props.onAddBookStart(data.id);
    let booksOnList = [];
    let bookIsValid = true;
    data = {
      ...data,
      dateAdded: new Date().toLocaleDateString(),
    };

    try {
      let res = await axios
        .get("/books.json?auth=" + token)
        .catch((err) => onAddBookFailure());
      booksOnList = await res.data;

      for (const [key, val] of Object.entries(booksOnList)) {
        if (val.id === data.id) bookIsValid = false;
        console.log(key);
      }
    } catch (err) {
      console.log(err);
    }

    if (bookIsValid) {
      return onAddBook(data, token);
    } else {
      return onAddBookFailure("Book's already in the list.");
    }
  };

  const handleNotifications = () => {
    onResetError();
  };

  const transformedQuery = searchedQuery.split("+").join(" ");

  if (loading)
    return (
      <div className={books.length && !loading ? null : classes.Container}>
        <Loader />
      </div>
    );

  return (
    <div
      className={books.length && !loading ? "container--filled" : "container"}
    >
      <Modal show={props.error} cancelModal={handleNotifications} />
      {books && books.length > 0 && (
        <MainHeader>"{transformedQuery}" books:</MainHeader>
      )}
      {typeof books === "undefined" ? (
        <MainHeader center>Cannot find phrase {transformedQuery}</MainHeader>
      ) : (
        <Books
          loadedBooks={books}
          loadingBookState={props.loadingBookState}
          click={handleAddBook}
          search
          isAuthenticated={token !== null}
        />
      )}
      {!searchedQuery && <MainHeader center>Start searching</MainHeader>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.books.loading,
    error: state.books.error,
    books: state.books.books,
    searchedQuery: state.books.query,
    loadingBookState: state.books.loadingBookState,
    token: state.user.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddBookStart: (payload) => dispatch(actions.addBookStart(payload)),
    onAddBook: (payload, token) => dispatch(actions.addBook(payload, token)),
    onAddBookFailure: (payload) => dispatch(actions.addBookFailure(payload)),
    onResetError: () => dispatch(actions.resetError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
