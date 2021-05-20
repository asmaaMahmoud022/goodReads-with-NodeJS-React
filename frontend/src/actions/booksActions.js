import {
  UPDATE_BOOKS_PROPS,
  DELETE_BOOKS_PROPS,
  MERGE_BOOKS_PROPS,
  UPDATE_CATEGORIES_PROPS,
  UPDATE_AUTHORS_PROPS,
} from "./types";
import axios from "axios";

import { API_HOST, handleError, showMessage } from "../utils";

export const updateBooksProps = (payload) => (dispatch) => {
  dispatch({
    type: UPDATE_BOOKS_PROPS,
    payload,
  });
};

export const deleteBooksProps = (payload) => (dispatch) => {
  dispatch({
    type: DELETE_BOOKS_PROPS,
    payload,
  });
};

export const mergeBooksProps = (payload) => (dispatch) => {
  dispatch({
    type: MERGE_BOOKS_PROPS,
    payload,
  });
};

export const getAllData = () => (dispatch) => {
  axios
    .get(`${API_HOST}/books`)
    .then((data) => {
      const books = data.data.data;

      const categories = books.reduce((acc, book) => {
        const category = book.category;
        if (!acc.hasOwnProperty(category._id))
          acc[category._id] = { name: category.name, books: [book] };
        else acc[category._id]["books"].push(book);
        return acc;
      }, {});

      const authors = books.reduce((acc, book) => {
        const author = book.author;
        if (!acc.hasOwnProperty(author._id))
          acc[author._id] = { ...author, books: [book] };
        else acc[author._id]["books"].push(book);
        return acc;
      }, {});

      dispatch(updateBooksProps([{ prop: "books", value: books }]));
      dispatch({
        type: UPDATE_CATEGORIES_PROPS,
        payload: [{ prop: "categoriesList", value: categories }],
      });

      dispatch({
        type: UPDATE_AUTHORS_PROPS,
        payload: [{ prop: "authorsList", value: authors }],
      });
    })
    .catch((err) => {
      handleError(err);
    });
};

export const getAllBooks = () => (dispatch) => {
  axios
    .get(`${API_HOST}/books`)
    .then((data) => {
      const books = data.data.data;
      dispatch(updateBooksProps([{ prop: "books", value: books }]));
    })
    .catch((err) => {
      handleError(err);
    });
};

export const searchBooks = (slug) => (dispatch) => {
  axios
    .get(`${API_HOST}/search/${slug}`)
    .then((data) => {
      const books = data.data.data;
      console.log("search", books);
      dispatch(updateBooksProps([{ prop: "search", value: books }]));
    })
    .catch((err) => {
      handleError(err);
    });
};

export const getBook = (_id) => (dispatch) => {
  axios
    .get(`${API_HOST}/books/${_id}`)
    .then((data) => {
      const book = data.data.data;
      dispatch(updateBooksProps([{ prop: "currentBook", value: book }]));
    })
    .catch((err) => {
      handleError(err);
    });
};

const constructFormDataFromBookObject = (user) => {
  const formData = new FormData();

  const { name, author, category, image } = user;
  formData.append("name", name);
  formData.append("author", author._id);
  formData.append("category", category._id);
  formData.append("image", image);
  return formData;
};

export const addNewBook = (book) => (dispatch) => {
  const formData = constructFormDataFromBookObject(book);
  axios
    .post(`${API_HOST}/books`, formData)
    .then((data) => {
      const book = data.data.data;
      dispatch(mergeBooksProps([{ prop: "books", value: book }]));
      dispatch(updateBooksProps([{ prop: "isBookModal", value: false }]));
      showMessage("Success!", data.data.message, "success");
    })
    .catch((err) => {
      handleError(err);
    });
};

export const updateBook = (book, index) => (dispatch) => {
  axios
    .patch(`${API_HOST}/books/${book._id}`, book)
    .then((data) => {
      const book = data.data.data;
      dispatch(updateBooksProps([{ prop: "books." + index, value: book }]));
      dispatch(updateBooksProps([{ prop: "isBookModal", value: false }]));
      showMessage("Success!", data.data.message, "success");
    })
    .catch((err) => {
      handleError(err);
    });
};

export const deleteBook = (_id, index) => (dispatch) => {
  axios
    .delete(`${API_HOST}/books/${_id}`)
    .then((data) => {
      dispatch(deleteBooksProps([{ prop: "books." + index }]));
      showMessage("Success!", data.data.message, "success");
    })
    .catch((err) => {
      handleError(err);
    });
};

export const submitRate = (bookId, value) => (dispatch) => {
  axios
    .post(`${API_HOST}/rates/${bookId}`, { value })
    .then((data) => {
      const rate = data.data.data;

      dispatch(updateBooksProps([{ prop: "currentBook.myRate", value: rate }]));
      dispatch(mergeBooksProps([{ prop: "currentBook.rates", value: rate }]));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateRate = (_id, value, index) => (dispatch) => {
  axios
    .patch(`${API_HOST}/rates/${_id}`, { value })
    .then((data) => {
      dispatch(
        updateBooksProps([
          { prop: "currentBook.myRate.value", value },
          { prop: `currentBook.rates.${index}.value`, value },
        ])
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

export const submitTodo = (bookId, shelve) => (dispatch) => {
  axios
    .post(`${API_HOST}/todos/${bookId}`, { shelve })
    .then((data) => {
      const todo = data.data.data;
      dispatch(updateBooksProps([{ prop: "currentBook.todo", value: todo }]));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateTodo = (bookId, shelve) => (dispatch) => {
  axios
    .patch(`${API_HOST}/todos/${bookId}`, { shelve })
    .then((data) => {
      const todo = data.data.data;
      dispatch(updateBooksProps([{ prop: "currentBook.todo", value: todo }]));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateTodoListItem = (bookId, shelve, index) => (dispatch) => {
  axios
    .patch(`${API_HOST}/todos/${bookId}`, { shelve })
    .then((data) => {
      const todo = data.data.data;
      dispatch(
        updateBooksProps([{ prop: `todos.${index}.shelve`, value: shelve }])
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addReview = (bookId, content) => (dispatch) => {
  axios
    .post(`${API_HOST}/reviews/${bookId}`, { content })
    .then((data) => {
      const reviews = data.data.data;
      dispatch(
        updateBooksProps([{ prop: "currentBook.reviews", value: reviews }])
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteReview = (_id, index) => (dispatch) => {
  axios
    .post(`${API_HOST}/reviews/${_id}`)
    .then((data) => {
      dispatch(deleteBooksProps([{ prop: `currentBook.reviews.${index}` }]));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllTodos = () => (dispatch) => {
  axios
    .get(`${API_HOST}/todos`)
    .then((data) => {
      const todos = data.data.data;
      dispatch(updateBooksProps([{ prop: "todos", value: todos }]));
    })
    .catch((err) => {
      handleError(err);
    });
};
