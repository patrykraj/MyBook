import React, { useState } from "react";
import { connect } from "react-redux";

import Books from "../../components/Books/Books";
import Modal from "../../components/Modal/Modal";
import MainHeader from "../../components/MainHeader/MainHeader";
import axios from "../../axios-books";
import * as actions from "../../store/actions/actions";

const Search = (props) => {
  const { books, searchedQuery } = props;
  const [notification, setNotification] = useState(null);

  const handleAddBook = async (data) => {
    let booksOnList = [];
    let bookIsValid = true;

    try {
      let res = await axios
        .get("/books.json")
        .catch((err) =>
          setNotification("Something went wrong...", err.message)
        );
      booksOnList = await res.data;

      for (const [key, val] of Object.entries(booksOnList)) {
        if (val.id === data.id) bookIsValid = false;
      }
    } catch (err) {
      setNotification("Something went wrong. Please try again.", err.message);
    }

    if (bookIsValid) {
      props.onAddBook(data);
    } else {
      setNotification("Book's already in the list.");
    }
  };

  const handleNotifications = () => {
    if (notification) return setNotification(null);
    props.resetError();
  };

  if (props.loading) return <p>Loading...</p>;

  return (
    <>
      <Modal
        show={notification || props.error}
        cancelModal={handleNotifications}
      />
      {books && books.length > 0 && (
        <MainHeader style={{ textTransform: "uppercase" }}>
          "{searchedQuery.split("+").join(" ")}" books:
        </MainHeader>
      )}
      {typeof books === "undefined" ? (
        <MainHeader center>
          Cannot find phrase {searchedQuery.split("+").join(" ")}
        </MainHeader>
      ) : (
        <Books loadedBooks={books} click={handleAddBook} search />
      )}
      <MainHeader center>Start searching</MainHeader>
    </>
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
    onResetError: () => dispatch(actions.resetError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
