import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import Thunk from "redux-thunk";

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import RootReducer from "./reducers";
import "./App.css";

import Home from "./components/home";
import AdminHome from "./components/admin/Home";
import AdminLogin from "./components/admin/login";
import Footer from "./components/user/footer";
import UserHome from "./components/user/Home";

import AdminRoute from "./components/admin/AdminRoute";
import AdminLoggedInRoute from "./components/admin/AdminLoggedInRoute";

import UserRoute from "./components/user/UserRoute";
import UserLoggedInRoute from "./components/user/UserLoggedInRoute";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  RootReducer,
  composeEnhancers(applyMiddleware(Thunk))
);
function App() {
  return (
    <Provider store={store}>
      <ReactNotification />
      <Router>
        <Switch>
          <AdminLoggedInRoute component={AdminLogin} path="/login" exact />
          <AdminRoute component={AdminHome} path="/admin" exact />

          <UserLoggedInRoute path="/" exact component={Home} />
          <UserRoute path="/" component={UserHome} />
        </Switch>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
