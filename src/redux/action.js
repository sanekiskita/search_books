import {
  SET_SEARCH,
  ADD_BOOKS,
  SELECT_BOOK,
  SET_BOOKS_IMG,
  ADD_COUNT_BOOK,
  DEL_BOOK,
  DEL_BOOKS_IMG,
} from "./types";

export function setSearch(str) {
  return {
    type: SET_SEARCH,
    payload: str,
  };
}

export function setBooks(arr) {
  return {
    type: ADD_BOOKS,
    payload: arr,
  };
}
export function delBooks(arr) {
  return {
    type: DEL_BOOK,
  };
}

export function setBooksImg(arr) {
  return {
    type: SET_BOOKS_IMG,
    payload: arr,
  };
}

export function delBooksImg(arr) {
  return {
    type: DEL_BOOKS_IMG,
  };
}

export function setSelectBook(str) {
  return {
    type: SELECT_BOOK,
    payload: str,
  };
}

export function addCountBook(str) {
  return {
    type: ADD_COUNT_BOOK,
    payload: str,
  };
}
