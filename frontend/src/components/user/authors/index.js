import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { Card, CardImg, CardBody, CardTitle } from "reactstrap";

import { HOST, APP_NAME } from "../../../utils";

class Authors extends Component {
  componentWillMount() {
    document.title = `Authors - ${APP_NAME}`;
  }
  render() {
    const { authors } = this.props;
    console.log(authors);
    return (
      <div>
        <h2
          style={{
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          Authors
        </h2>
        <hr />
        <Row>
          {Object.keys(authors).map((_id) => {
            const { firstName, lastName, image } = this.props.authors[_id];
            return (
              <Col key={_id} xs="3">
                <Card>
                  <Link to={`/authors/${_id}`}>
                    <CardImg
                      top
                      height="300p"
                      src={`${HOST}/images/${image}`}
                      alt="Autho name"
                    />
                  </Link>
                  <CardBody>
                    <CardTitle>
                      Name:{" "}
                      <Link
                        style={{
                          textTransform: "capitalize",
                          fontWeight: "bold",
                          color: "#999999",
                        }}
                        to={`/authors/${_id}`}
                      >
                        {`${firstName} ${lastName}`}
                      </Link>
                    </CardTitle>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { authorsList } = state.authors;
  return { authors: authorsList };
};

export default connect(mapStateToProps)(Authors);
