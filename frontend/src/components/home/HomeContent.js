import React, { Component } from "react";
import { Jumbotron } from "reactstrap";
export default class HomeContent extends Component {
  render() {
    return (
      <Jumbotron>
        <h2 className="display-3">Welcome to Good Reads!</h2>
        <p className="lead">Where you can increase your knowledge</p>
        <hr className="my-2" />

        <p className="lead">Join us NOW!</p>
      </Jumbotron>
    );
  }
}
