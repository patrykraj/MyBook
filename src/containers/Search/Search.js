import React from "react";
import { connect } from "react-redux";

import Books from "../../components/Books/Books";
import Modal from "../../components/Modal/Modal";
import MainHeader from "../../components/MainHeader/MainHeader";
import axios from "../../axios-books";
import * as actions from "../../store/actions/actions";
import classes from "./Search.module.css";

const Search = (props) => {
  const {
    books,
    loading,
    searchedQuery,
    onAddBook,
    onAddBookFailure,
    onResetError,
  } = props;

  const handleAddBook = async (data) => {
    let booksOnList = [];
    let bookIsValid = true;
    data = {
      ...data,
      dateAdded: new Date().toLocaleDateString(),
    };

    try {
      let res = await axios
        .get("/books.json")
        .catch((err) => onAddBookFailure());
      booksOnList = await res.data;

      for (const [key, val] of Object.entries(booksOnList)) {
        if (val.id === data.id) bookIsValid = false;
        console.log(key);
      }
    } catch (err) {
      onAddBookFailure();
    }

    if (bookIsValid) {
      onAddBook(data);
    } else {
      onAddBookFailure("Book's already in the list.");
    }
  };

  const handleNotifications = () => {
    onResetError();
  };

  if (loading)
    return (
      <div className={books.length && !loading ? null : classes.Container}>
        <p>Loading...</p>
      </div>
    );

  return (
    <div className={books.length && !loading ? null : classes.Container}>
      <Modal show={props.error} cancelModal={handleNotifications} />
      {books && books.length > 0 && (
        <MainHeader>"{searchedQuery.split("+").join(" ")}" books:</MainHeader>
      )}
      {typeof books === "undefined" ? (
        <MainHeader center>
          Cannot find phrase {searchedQuery.split("+").join(" ")}
        </MainHeader>
      ) : (
        <Books loadedBooks={books} click={handleAddBook} search />
      )}
      {!searchedQuery && <MainHeader center>Start searching</MainHeader>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.reducer.loading,
    error: state.reducer.error,
    books: state.reducer.books,
    searchedQuery: state.reducer.query,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddBook: (payload) => dispatch(actions.addBook(payload)),
    onAddBookFailure: (payload) => dispatch(actions.addBookFailure(payload)),
    onResetError: () => dispatch(actions.resetError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
