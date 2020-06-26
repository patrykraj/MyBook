import React from "react";
import { connect } from "react-redux";

import Books from "../../components/Books/Books";
import * as actions from "../../store/actions/actions";
import MainHeader from "../../components/MainHeader/MainHeader";
import axios from "../../axios-books";

const Search = (props) => {
  const { books, searchedQuery } = props;

  const handleAddBook = async (data) => {
    let booksOnList = [];
    let bookIsValid = true;

    try {
      let res = await axios.get("/books.json").catch((err) => console.log(err));
      booksOnList = await res.data;

      for (const [key, val] of Object.entries(booksOnList)) {
        if (val.id === data.id) bookIsValid = false;
      }
    } catch (err) {
      console.log(err);
    }

    if (bookIsValid) {
      axios
        .post("/books.json", data)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      console.log("Book's already in the list");
    }
  };

  if (props.loading) return <p>Loading...</p>;

  // const URI = decodeURIComponent(props.history.location.search);

  return (
    <>
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
    onFetchBooks: (payload) => dispatch(actions.fetchBooks(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
