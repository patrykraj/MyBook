import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../store/actions/actions";
import classes from "./Form.module.css";

import Modal from "../Modal/Modal";

const Form = (props) => {
  const [error, setError] = useState(false);
  const [searchedBook, setSearchedBook] = useState("");
  const history = useHistory();

  console.log(props);

  const handleSendRequest = (e) => {
    setError(false);
    e.preventDefault();
    const query = searchedBook.trim().split(" ").join("+");

    if (query.length < 2) {
      setError(true);
      return;
    }

    props.onFetchBooks(query);
    setSearchedBook("");
    history.push("/");
  };

  return (
    <>
      <Modal
        show={props.error && props.error.message}
        cancelModal={() => props.onResetError()}
      />
      <form onSubmit={handleSendRequest}>
        <button type="submit" className={classes.FormElement}>
          KLIK
        </button>
        <input
          type="text"
          placeholder="search"
          className={classes.FormElement}
          style={{
            borderBottom: error && !props.isLoading && "2px solid red",
          }}
          onChange={(e) => setSearchedBook(e.target.value)}
          value={searchedBook}
        />
        {/* {error && !props.isLoading && (
        <span
          style={{
            color: "red",
          }}
        >
          Invalid data (min. 2 characters)
        </span>
      )} */}
      </form>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.reducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchBooks: (payload) => dispatch(actions.fetchBooks(payload)),
    onResetError: () => dispatch(actions.resetError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
