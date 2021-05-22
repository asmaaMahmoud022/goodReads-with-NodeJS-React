import React, { Component } from "react";
import { connect } from "react-redux";
import { Jumbotron, CardImg, Row, Col } from "reactstrap";

import { HOST, APP_NAME } from "../../../utils";
import Books from "../books/Books";

class Author extends Component {
  render() {
    const { author } = this.props;
    if (!author) return <div></div>;

    const { firstName, lastName, dob, image, books } = author;

    const name = author.firstName + " " + author.lastName;

    document.title = `${name} - ${APP_NAME}`;

    return (
      <div>
        <Jumbotron
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Row>
            <Col sm="3">
              <CardImg
                top
                height="300p"
                src={`${HOST}/images/${image}`}
                alt="Autho name"
              />
            </Col>
            <Col sm="8">
              Name:
              <h2
                style={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                {`${firstName} ${lastName}`}
              </h2>
              Date of birth:{" "}
              <h2
                style={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                {new Date(dob).toDateString()}
              </h2>
            </Col>
          </Row>
        </Jumbotron>
        <Books books={books} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const author = state.authors.authorsList[ownProps.match.params.id];
  return { author };
};

export default connect(mapStateToProps, {})(Author);
