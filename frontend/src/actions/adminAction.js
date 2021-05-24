import {
  UPDATE_ADMIN_PROPS,
  DELETE_ADMIN_PROPS,
  MERGE_ADMIN_PROPS,
} from "./types";
import axios from "axios";

import { API_HOST, handleError, showMessage } from "../utils";

export const updateAdminProps = (payload) => (dispatch) => {
  dispatch({
    type: UPDATE_ADMIN_PROPS,
    payload,
  });
};

export const deleteAdminProps = (payload) => (dispatch) => {
  dispatch({
    type: DELETE_ADMIN_PROPS,
    payload,
  });
};

export const mergeAdminProps = (payload) => (dispatch) => {
  dispatch({
    type: MERGE_ADMIN_PROPS,
    payload,
  });
};

export const loginAdmin = (email, password) => (dispatch) => {
  console.log(email, password);
  axios
    .post(`${API_HOST}/admin/login`, { username: email, password })
    .then((data) => {
      const { token } = data.data;
      dispatch(updateAdminProps([{ prop: "token", value: token }]));
      showMessage(
        "Login Success!",
        "Welecome, redirecting to admin panel...",
        "success"
      );
    })
    .catch((err) => {
      handleError(err);
    });
};

