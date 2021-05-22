import { UPDATE_LOGIN_FIELD } from "./types";
import axios from "axios";
import {
  API_HOST,
  handleError,
  showMessage,
  setUserToken,
  deleteUserToken,
} from "../utils";

export const updateLoginField = (key, value) => (dispatch) => {
  dispatch({ type: UPDATE_LOGIN_FIELD, payload: { key, value } });
};

export const loginUser = (email, password) => (dispatch) => {
  axios
    .post(`${API_HOST}/login`, { email, password })
    .then((res) => {
      const { token, message } = res.data;
      setUserToken(token);
      dispatch(updateLoginField("email", ""));
      dispatch(updateLoginField("password", ""));
      dispatch(updateLoginField("token", token));
      showMessage("Success!", message, "success");
    })
    .catch((err) => handleError(err));
};

export const logoutUser = () => (dispatch) => {
  deleteUserToken();
  dispatch(updateLoginField("token", null));
  showMessage("Success!", "Logged out successsuly!", "success");
};
