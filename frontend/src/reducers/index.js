import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import registerReducer from "./registerReducer";
import adminReducer from "./adminHomeReducer";
import booksReducer from "./booksReducer";
import authorsReducer from "./authorsReducer";
import categoriesReducer from "./categoriesReducer";
import generalReducer from "./generalReducer";

export default combineReducers({
  login: loginReducer,
  register: registerReducer,
  admin: adminReducer,
  general: generalReducer,
  books: booksReducer,
  authors: authorsReducer,
  categories: categoriesReducer,
});
