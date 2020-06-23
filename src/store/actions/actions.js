import * as actionTypes from "../constants";
import axios from "axios";

export const fetchBooksFailure = (err) => {
  return {
    type: actionTypes.FETCH_BOOKS_FAILURE,
    payload: err,
  };
};

export const fetchBooksSuccess = (books) => {
  return {
    type: actionTypes.FETCH_BOOKS_SUCCESS,
    payload: books,
  };
};

export const fetchBooks = (payload) => {
  return async (dispatch) => {
    axios
      .get("https://www.googleapis.com/books/v1/volumes?q=" + payload)
      .then((res) => {
        dispatch(fetchBooksSuccess(res.items));
      })
      .catch((err) => {
        dispatch(fetchBooksFailure(err));
      });
  };
};
