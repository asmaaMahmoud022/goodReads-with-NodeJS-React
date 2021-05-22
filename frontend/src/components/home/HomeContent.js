import React, { Component } from "react";
import { Jumbotron } from "reactstrap";
export default class HomeContent extends Component {
  render() {
    return (
      <Jumbotron>
        <h2 className="display-3">Welcome to Good Reads Website!</h2>
        <p className="lead">Here you can increase your knowledge and your mind</p>
        <hr className="my-2" />

        <p className="lead">NOW .. Join us</p>
      </Jumbotron>
    );
  }
}
