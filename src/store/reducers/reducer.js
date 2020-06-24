import * as actionTypes from "../constants";

const initialState = {
  books: [],
  query: "",
  loading: false,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_BOOKS_START:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case actionTypes.FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        books: action.payload.books,
        loading: false,
        query: action.payload.query,
        error: false,
      };

    case actionTypes.FETCH_BOOKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
