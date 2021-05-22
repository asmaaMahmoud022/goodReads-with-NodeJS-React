import React, { Component } from "react";
import Books from "./Books";
import { APP_NAME } from "../../../utils";

export default class index extends Component {
  componentDidMount() {
    document.title = `Books- ${APP_NAME}`;
  }
  render() {
    return <Books books={this.props.books} />;
  }
}
