import {
  UPDATE_AUTHORS_PROPS,
  DELETE_AUTHORS_PROPS,
  MERGE_AUTHORS_PROPS,
} from "./types";
import axios from "axios";

import { API_HOST, handleError, showMessage } from "../utils";

export const updateAuthorsProps = (payload) => (dispatch) => {
  dispatch({
    type: UPDATE_AUTHORS_PROPS,
    payload,
  });
};

export const deleteAuthorsProps = (payload) => (dispatch) => {
  dispatch({
    type: DELETE_AUTHORS_PROPS,
    payload,
  });
};

export const mergeAuthorsProps = (payload) => (dispatch) => {
  dispatch({
    type: MERGE_AUTHORS_PROPS,
    payload,
  });
};


export const getAllAuthors = () => (dispatch) => {
  axios
    .get(`${API_HOST}/authors`)
    .then((data) => {
      const authors = data.data.data;
      dispatch(updateAuthorsProps([{ prop: "authors", value: authors }]));
    })
    .catch((err) => {
      handleError(err);
    });
};

const constructFormDataFromAuthorObject = (user) => {
  const formData = new FormData();

  const { firstName, lastName, image, dob } = user;
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("dob", dob);
  formData.append("image", image);
  return formData;
};

export const addNewAuthor = (author) => (dispatch) => {
  const formData = constructFormDataFromAuthorObject(author);
  axios
    .post(`${API_HOST}/authors`, formData)
    .then((data) => {
      const author = data.data.data;
      dispatch(mergeAuthorsProps([{ prop: "authors", value: author }]));
      dispatch(updateAuthorsProps([{ prop: "isAuthorModal", value: false }]));
      showMessage("Success!", data.data.message, "success");
    })
    .catch((err) => {
      handleError(err);
    });
};

export const updateAuthor = (author, index) => (dispatch) => {
  axios
    .patch(`${API_HOST}/authors/${author._id}`, author)
    .then((data) => {
      const author = data.data.data;
      dispatch(updateAuthorsProps([{ prop: "authors." + index, value: author }]));
      dispatch(updateAuthorsProps([{ prop: "isAuthorModal", value: false }]));
      showMessage("Success!", data.data.message, "success");
    })
    .catch((err) => {
      handleError(err);
    });
};

export const deleteAuthor = (_id, index) => (dispatch) => {
  axios
    .delete(`${API_HOST}/authors/${_id}`)
    .then((data) => {
      dispatch(deleteAuthorsProps([{ prop: "authors." + index }]));
      showMessage("Success!", data.data.message, "success");
    })
    .catch((err) => {
      handleError(err);
    });
};