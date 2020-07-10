import * as actionTypes from "../constants";

const initialState = {
  books: [],
  query: "",
  loading: false,
  error: null,
  deleteId: null,
  updating: false,
  loadingBookState: null,
  loadingUpdate: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_BOOKS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionTypes.FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        books: action.payload.books,
        loading: false,
        query: action.payload.query,
        error: null,
      };

    case actionTypes.FETCH_BOOKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case actionTypes.ADD_BOOK_START:
      return {
        ...state,
        loadingBookState: action.payload,
      };

    case actionTypes.ADD_BOOK_SUCCESS:
      return {
        ...state,
        error: action.payload,
        loadingBookState: null,
      };

    case actionTypes.ADD_BOOK_FAILURE:
      return {
        ...state,
        error: action.payload,
        loadingBookState: null,
      };

    case actionTypes.CONFIRM_DELETE_BOOK:
      return {
        ...state,
        deleteId: action.payload.deleteId,
        error: action.payload.error,
      };

    case actionTypes.DELETE_BOOK_START:
      return {
        ...state,
        loading: true,
        updating: true,
      };

    case actionTypes.DELETE_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        deleteId: null,
        updating: false,
      };

    case actionTypes.DELETE_BOOK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        deleteId: null,
        updating: false,
      };

    case actionTypes.UPDATE_BOOK_START:
      return {
        ...state,
        updating: true,
        loadingUpdate: action.payload,
      };

    case actionTypes.UPDATE_BOOK_SUCCESS:
      return {
        ...state,
        updating: false,
        loadingUpdate: null,
      };

    case actionTypes.UPDATE_BOOK_FAILURE:
      return {
        ...state,
        updating: false,
        loadingUpdate: null,
      };

    case actionTypes.RESET_ERROR:
      return {
        ...state,
        deleteId: null,
        error: null,
      };

    default:
      return state;
  }
};

export default reducer;
