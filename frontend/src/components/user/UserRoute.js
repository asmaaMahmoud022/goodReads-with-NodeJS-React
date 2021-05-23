import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getUserToken } from "../../utils";

export default ({ component: Component, ...rest }) => {
  const token = getUserToken();
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};
