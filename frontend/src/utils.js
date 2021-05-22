import { store } from "react-notifications-component";

export const APP_NAME = "Good Reads";

export const getUserToken = () => localStorage.getItem("token");

export const setUserToken = (token) => localStorage.setItem("token", token);
export const deleteUserToken = () => localStorage.removeItem("token");

export const HOST = "";
export const API_HOST = `${HOST}/api`;

export const showMessage = (title, message, type) => {
  store.addNotification({
    title,
    message,
    type,
    insert: "top",
    container: "top-center",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: 2000,
      onScreen: true,
    },
  });
};

export const handleError = (err) => {
  console.log(err);
  showMessage(
    "Error!",
    (err.response && err.response.data.message) || "Something went wrong.",
    "danger"
  );
};
