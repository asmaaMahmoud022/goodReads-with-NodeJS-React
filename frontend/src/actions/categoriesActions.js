import {
  UPDATE_CATEGORIES_PROPS,
  DELETE_CATEGORIES_PROPS,
  MERGE_CATEGORIES_PROPS,
} from "./types";
import axios from "axios";

import { API_HOST, handleError, showMessage } from "../utils";

export const updateCategoriesProps = (payload) => (dispatch) => {
  dispatch({
    type: UPDATE_CATEGORIES_PROPS,
    payload,
  });
};

export const deleteCategoriesProps = (payload) => (dispatch) => {
  dispatch({
    type: DELETE_CATEGORIES_PROPS,
    payload,
  });
};

export const mergeCategoriesProps = (payload) => (dispatch) => {
  dispatch({
    type: MERGE_CATEGORIES_PROPS,
    payload,
  });
};

export const getAllCategories = () => (dispatch) => {
  axios
    .get(`${API_HOST}/categories`)
    .then((data) => {
      const categories = data.data.data;
      dispatch(
        updateCategoriesProps([{ prop: "categories", value: categories }])
      );
    })
    .catch((err) => {
      handleError(err);
    });
};

export const getCategory = (_id) => (dispatch) => {
  axios
    .get(`${API_HOST}/categories/${_id}`)
    .then((data) => {
      const category = data.data.data;
      dispatch(
        updateCategoriesProps([{ prop: "currentCategory", value: category }])
      );
    })
    .catch((err) => {
      handleError(err);
    });
};

export const addNewCategory = (category) => (dispatch) => {
  console.log("category", category);
  axios
    .post(`${API_HOST}/categories`, category)
    .then((data) => {
      const category = data.data.data;
      dispatch(mergeCategoriesProps([{ prop: "categories", value: category }]));
      dispatch(
        updateCategoriesProps([{ prop: "isCategoryModal", value: false }])
      );
      showMessage("Success!", data.data.message, "success");
    })
    .catch((err) => {
      handleError(err);
    });
};

export const updateCategory = (category, index) => (dispatch) => {
  axios
    .patch(`${API_HOST}/categories/${category._id}`, category)
    .then((data) => {
      const category = data.data.data;
      dispatch(
        updateCategoriesProps([
          { prop: "categories." + index, value: category },
        ])
      );
      dispatch(
        updateCategoriesProps([{ prop: "isCategoryModal", value: false }])
      );
      showMessage("Success!", data.data.message, "success");
    })
    .catch((err) => {
      handleError(err);
    });
};

export const deleteCategory = (_id, index) => (dispatch) => {
  axios
    .delete(`${API_HOST}/categories/${_id}`)
    .then((data) => {
      dispatch(deleteCategoriesProps([{ prop: "categories." + index }]));
      showMessage("Success!", data.data.message, "success");
    })
    .catch((err) => {
      handleError(err);
    });
};
