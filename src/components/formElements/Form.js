import React, { useState } from "react";
import classes from "./Form.module.css";

import { connect } from "react-redux";
import * as actions from "../../store/actions/actions";

const Form = (props) => {
  const [error, setError] = useState(false);
  const [searchedBook, setSearchedBook] = useState("");

  const handleSendRequest = (e) => {
    setError(false);
    e.preventDefault();
    const query = searchedBook.trim().split(" ").join("+");

    if (query.length < 2) {
      setError(true);
      return;
    }

    console.log("FETCH", props);

    props.onFetchBooks(query);

    // props.history.push({
    //   pathname: "/",
    //   search: "books&search=" + query,
    // });

    // props.sendRequest(searchedBook);
    setSearchedBook("");
  };

  return (
    <form onSubmit={handleSendRequest}>
      <button type="submit" className={classes.FormElement}>
        KLIK
      </button>
      <input
        type="text"
        placeholder="search"
        className={classes.FormElement}
        onChange={(e) => setSearchedBook(e.target.value)}
        value={searchedBook}
      />
      {error && !props.isLoading && (
        <span
          style={{
            color: "red",
          }}
        >
          Invalid data (min. 2 characters)
        </span>
      )}
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchBooks: (payload) => dispatch(actions.fetchBooks(payload)),
  };
};

export default connect(null, mapDispatchToProps)(Form);
