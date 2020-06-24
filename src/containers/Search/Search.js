import React from "react";
import { connect } from "react-redux";

import Books from "../../components/Books/Books";
import * as actions from "../../store/actions/actions";

import MainHeader from "../../components/MainHeader/MainHeader";

const Search = (props) => {
  const { books, searchedQuery } = props;

  // const sendRequest = useCallback(
  //   (query) => {
  //     query = query.trim().split(" ").join("+");
  //     console.log("FETCH");

  //     onFetchBooks(query);

  //     props.history.push({
  //       pathname: "/",
  //       search: "books&search=" + query,
  //     });
  //   },
  //   [props.history, onFetchBooks]
  // );

  // useEffect(() => {
  //   if (searchedQuery || (books && books.length > 0)) return;
  //   let query = new URLSearchParams(props.location.search.split("=")[1]);

  //   query = decodeURIComponent(query);
  //   query = query.slice(0, query.length - 1);
  //   if (query.length <= 1) return;
  //   sendRequest(query);
  // }, [props.location.search, sendRequest, books, searchedQuery]);

  if (props.loading) return <p>Loading...</p>;

  // const URI = decodeURIComponent(props.history.location.search);

  return (
    <>
      {books && books.length > 0 && (
        <h1 style={{ textTransform: "uppercase" }}>
          "{searchedQuery.split("+").join(" ")}" books:
        </h1>
      )}
      {typeof books === "undefined" ? (
        <h1 name="center">
          Cannot find phrase {searchedQuery.split("+").join(" ")}
        </h1>
      ) : (
        <Books loadedBooks={books} />
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
