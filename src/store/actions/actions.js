import * as actionTypes from "../constants";
import axios from "axios";

import { fetchBooksUrl } from "../../assets/constants";

export const fetchBooksStart = () => {
  return {
    type: actionTypes.FETCH_BOOKS_START,
  };
};

export const fetchBooksFailure = (err) => {
  return {
    type: actionTypes.FETCH_BOOKS_FAILURE,
    payload: err,
  };
};

export const fetchBooksSuccess = (books, query) => {
  return {
    type: actionTypes.FETCH_BOOKS_SUCCESS,
    payload: {
      books,
      query,
    },
  };
};

export const fetchBooks = (payload) => {
  return async (dispatch) => {
    dispatch(fetchBooksStart());
    axios
      .get(fetchBooksUrl + payload)
      .then((res) => {
        dispatch(fetchBooksSuccess(res.data.items, payload));
      })
      .catch((err) => {
        dispatch(fetchBooksFailure(err.message));
      });
  };
};

export const addBookSuccess = () => {
  return {
    type: actionTypes.ADD_BOOK_SUCCESS,
    payload: "Book has been successfully added.",
  };
};

export const addBookFailure = (payload) => {
  return {
    type: actionTypes.ADD_BOOK_FAILURE,
    payload: payload || "Something went wrong. Please try again.",
  };
};

export const addBook = (payload) => {
  return async (dispatch) => {
    axios
      .post("https://mybook-3531d.firebaseio.com/books.json", payload)
      .then((res) => dispatch(addBookSuccess()))
      .catch((err) => dispatch(addBookFailure()));
  };
};

export const resetError = () => {
  return {
    type: actionTypes.RESET_ERROR,
  };
};
