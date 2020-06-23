import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";

import { fetchBooksUrl } from "../../assets/constants";

import Form from "../../components/formElements/Form";
import Books from "../../components/Books/Books";
import * as actions from "../../store/actions/actions";

const Search = (props) => {
  const [loadedBooks, setLoadedBooks] = useState([]);
  const { onFetchBooks } = props;

  const sendRequest = useCallback(
    async (query) => {
      query = query.trim().split(" ").join("+");

      onFetchBooks(query);

      try {
        const promise = await fetch(fetchBooksUrl + query);
        const res = await promise.json();

        props.history.push({
          pathname: "/",
          search: "books&search=" + query,
        });

        setLoadedBooks(res.items);
      } catch (error) {}
    },
    [props.history, onFetchBooks]
  );

  useEffect(() => {
    if (loadedBooks.length > 0) return;
    let query = new URLSearchParams(props.location.search.split("=")[1]);

    query = decodeURIComponent(query);
    query = query.slice(0, query.length - 1);
    if (query.length <= 1) return setLoadedBooks([]);
    sendRequest(query);
  }, [props.location.search, sendRequest, loadedBooks.length]);

  return (
    <>
      <Form sendRequest={sendRequest} />
      {typeof loadedBooks === "undefined" ? (
        <h1>
          Cannot find phrase{" "}
          {decodeURIComponent(props.history.location.search.split("=")[1])}
        </h1>
      ) : (
        <Books loadedBooks={loadedBooks} />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.reducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchBooks: (payload) => dispatch(actions.fetchBooks(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
