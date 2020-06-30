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
        dispatch(fetchBooksFailure(err));
      });
  };
};

export const resetError = () => {
  return {
    type: actionTypes.RESET_ERROR,
  };
};
