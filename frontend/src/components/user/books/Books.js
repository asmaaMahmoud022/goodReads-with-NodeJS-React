import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import BookItem from "./BookItem";

export default class Books extends Component {

  render() {
    const { books } = this.props;
    return (
      <Row>
        {books &&
          books.map(({ _id, name, author, image }) => (
            <Col style={{ marginBottom: "20px" }} key={_id} xs="3">
              <BookItem _id={_id} name={name} image={image} author={author} />
            </Col>
          ))}
      </Row>
    );
  }
}
