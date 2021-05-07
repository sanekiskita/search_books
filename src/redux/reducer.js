import { combineReducers } from "redux";
import {
  ADD_BOOKS,
  SET_SEARCH,
  SELECT_BOOK,
  SET_BOOKS_IMG,
  ADD_COUNT_BOOK,
  DEL_BOOK,
  DEL_BOOKS_IMG,
  DEL_COUNT_BOOK,
} from "./types";

function books(state = [], action) {
  switch (action.type) {
    case ADD_BOOKS:
      return state.concat(action.payload);
    case DEL_BOOK:
      return [];
    default:
      return state;
  }
}

function selectBook(state = null, action) {
  switch (action.type) {
    case SELECT_BOOK:
      return (state = action.payload);

    default:
      return state;
  }
}

function booksImg(state = [], action) {
  switch (action.type) {
    case SET_BOOKS_IMG:
      return state.concat(action.payload);
    case DEL_BOOKS_IMG:
      return [];
    default:
      return state;
  }
}

function search(state = "", action) {
  switch (action.type) {
    case SET_SEARCH:
      return action.payload;
    default:
      return state;
  }
}

function CountBook(state = 20, action) {
  switch (action.type) {
    case ADD_COUNT_BOOK:
      return state + action.payload;
    case DEL_COUNT_BOOK:
      return 20;
    default:
      return state;
  }
}

export default combineReducers({
  books: books,
  search: search,
  selectBook: selectBook,
  booksImg: booksImg,
  CountBook: CountBook,
});
