import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class AdminRoute extends Component {
  render() {
    const { component: Component, token, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={(props) =>
          token ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    );
  }
}
const mapStateTopProps = (state) => ({ token: state.admin.token });

export default connect(mapStateTopProps)(AdminRoute);
