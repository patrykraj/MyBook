import React, { useState } from "react";
import { connect } from "react-redux";

import Books from "../../components/Books/Books";
import Modal from "../../components/Modal/Modal";
import MainHeader from "../../components/MainHeader/MainHeader";
import axios from "../../axios-books";

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
      setNotification("Something went wrong...", err.message);
    }

    if (bookIsValid) {
      axios
        .post("/books.json", data)
        .then((res) => setNotification("Book has been successfully added."))
        .catch((err) => setNotification("Something went wrong..."));
    } else {
      setNotification("Book's already in the list.");
    }
  };

  if (props.loading) return <p>Loading...</p>;

  return (
    <>
      <Modal show={notification} cancelModal={() => setNotification(null)} />
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

export default connect(mapStateToProps)(Search);
