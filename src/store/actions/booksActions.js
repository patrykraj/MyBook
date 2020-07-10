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

export const fetchBooks = (query) => {
  return async (dispatch) => {
    dispatch(fetchBooksStart());
    axios
      .get(fetchBooksUrl + query)
      .then((res) => {
        dispatch(fetchBooksSuccess(res.data.items, query));
      })
      .catch((err) => {
        dispatch(fetchBooksFailure(err.message));
      });
  };
};

export const addBookStart = (payload) => {
  return {
    type: actionTypes.ADD_BOOK_START,
    payload,
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

export const addBook = (payload, token) => {
  return async (dispatch) => {
    axios
      .post(
        "https://mybook-3531d.firebaseio.com/books.json?auth=" + token,
        payload
      )
      .then((res) => dispatch(addBookSuccess()))
      .catch((err) => dispatch(addBookFailure()));
  };
};

export const confirmDeleteBook = (id) => {
  return {
    type: actionTypes.CONFIRM_DELETE_BOOK,
    payload: {
      deleteId: id,
      error: "Are you sure?",
    },
  };
};

export const deleteBookStart = () => {
  return {
    type: actionTypes.DELETE_BOOK_START,
  };
};

export const deleteBookSuccess = () => {
  return {
    type: actionTypes.DELETE_BOOK_SUCCESS,
  };
};

export const deleteBookFailure = () => {
  return {
    type: actionTypes.DELETE_BOOK_FAILURE,
    payload: "Something went wrong. Try again.",
  };
};

export const deleteBook = (payload, token) => {
  return async (dispatch) => {
    dispatch(deleteBookStart());
    axios
      .delete(
        `https://mybook-3531d.firebaseio.com/books/${payload}.json?auth=` +
          token
      )
      .then((res) => dispatch(deleteBookSuccess()))
      .catch((err) => dispatch(deleteBookFailure()));
  };
};

export const updateBookStart = (query) => {
  return {
    type: actionTypes.UPDATE_BOOK_START,
    payload: query,
  };
};

export const updateBookSuccess = () => {
  return {
    type: actionTypes.UPDATE_BOOK_SUCCESS,
  };
};

export const updateBookFailure = () => {
  return {
    type: actionTypes.UPDATE_BOOK_FAILURE,
    payload: "Something went wrong. Try again.",
  };
};

export const updateBook = (payload, token) => {
  return async (dispatch) => {
    dispatch(updateBookStart(payload.query));
    axios
      .patch(
        `https://mybook-3531d.firebaseio.com/books/${payload.query}.json?auth=` +
          token,
        {
          selectedOption: payload.selectedOption,
          dateRead: payload.selectedOption === "2" ? payload.dateRead : "n/d",
        }
      )
      .then((res) => dispatch(updateBookSuccess()))
      .catch((err) => dispatch(updateBookFailure()));
  };
};

export const resetError = () => {
  return {
    type: actionTypes.RESET_ERROR,
  };
};
