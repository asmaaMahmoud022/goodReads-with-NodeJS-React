import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import {
  Row,
  Col,
  Media,
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Form,
  Input,
  FormGroup,
  Label,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import Rating from "react-star-ratings";

import { HOST, APP_NAME } from "../../../utils";
import {
  updateBooksProps,
  getBook,
  submitRate,
  updateRate,
  submitTodo,
  updateTodo,
  addReview,
  deleteReview,
} from "../../../actions/booksActions";
export class Book extends Component {
  componentDidMount() {
    const _id = this.props.match.params.id;
    this.props.getBook(_id);
  }

  render() {
    const { userId, book } = this.props;
    const {
      _id,
      name,
      author,
      category,
      image,
      myRate,
      rates,
      todo,
      review,
      reviews,
    } = book;

    let userRateIndex = -1;
    let rate = rates
      ? rates.reduce((sum, rate, index) => {
          if (myRate && myRate._id === rate._id) userRateIndex = index;
          return sum + rate.value;
        }, 0)
      : 0;
    rate = rates ? rate / rates.length : 0;

    document.title = `${name}- ${APP_NAME}`;

    return (
      <div>
        <Row>
          <Col
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            xs="3"
          >
            <Media
              object
              width="100%"
              height="300px"
              src={`${HOST}/images/${image}`}
              alt={name}
            />
            <div style={{ width: "80%" }}>
              <Select
                options={[
                  { shelve: "want to read" },
                  { shelve: "reading" },
                  { shelve: "read" },
                ]}
                value={todo}
                getOptionLabel={(todo) => todo.shelve}
                getOptionValue={(todo) => todo}
                onChange={(newTodo) => {
                  todo
                    ? this.props.updateTodo(_id, newTodo.shelve)
                    : this.props.submitTodo(_id, newTodo.shelve);
                }}
              />
            </div>
            <Rating
              rating={myRate ? myRate.value : 0}
              starHoverColor="#ffe680"
              starRatedColor="#ffe680"
              changeRating={(value) => {
                myRate
                  ? this.props.updateRate(myRate._id, value, userRateIndex)
                  : this.props.submitRate(_id, value);
              }}
              numberOfStars={5}
              name="rating"
              starDimension="30px"
              starSpacing="5px"
            />
          </Col>
          <Col xm="8">
            <h2>
              Title:{" "}
              <i
                style={{
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                {name}
              </i>
            </h2>
            <h5>
              By:{" "}
              {author && (
                <Link
                  style={{
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    color: "#999999",
                  }}
                  to={`/authors/${author._id}`}
                >
                  {author.firstName + " " + author.lastName}
                </Link>
              )}
            </h5>
            <h5 style={{ fontWeight: "bold", textTransform: "uppercase" }}>
              {category && (
                <Link
                  style={{
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    color: "#999999",
                  }}
                  to={`/categories/${category._id}`}
                >
                  {category.name}
                </Link>
              )}
            </h5>
            <Rating
              rating={rate ? rate : 0}
              starRatedColor="#ffe680"
              numberOfStars={5}
              name="rating"
              starDimension="30px"
              starSpacing="5px"
            />

            <p>
              {rate} - {rates ? rates.length : 0} ratings
            </p>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="12">
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                this.props.addReview(_id, review);
              }}
            >
              <FormGroup>
                <Label>Write your review:</Label>
                <Input
                  placeholder="Write something"
                  value={review}
                  type="textarea"
                  onChange={(e) => {
                    this.props.updateBooksProps([
                      { prop: "currentBook.review", value: e.target.value },
                    ]);
                  }}
                  required
                />
                <FormGroup
                  style={{
                    paddingTop: "10px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button type="submit" color="primary">
                    Add review
                  </Button>
                </FormGroup>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            {reviews &&
              reviews.map(
                (
                  {
                    _id,
                    content,
                    date,
                    user: { _id: reviewrId, firstName, lastName },
                  },
                  index
                ) => {
                  return (
                    <Card>
                      <CardBody>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>
                            <CardTitle style={{ fontWeight: "bold" }}>
                              <h5>By: {`${firstName} ${lastName}`}</h5>
                            </CardTitle>
                            <CardSubtitle
                              style={{ textDecoration: "underline" }}
                            >
                              {new Date(date).toDateString()}
                            </CardSubtitle>
                          </div>
                          {userId === reviewrId && (
                            <Button
                              className="btn btn-danger"
                              onClick={() => {
                                if (window.confirm("Are you sure?")) {
                                  this.props.deleteReview(_id, index);
                                }
                              }}
                            >
                              <i className="fa fa-trash"></i>
                            </Button>
                          )}
                        </div>

                        <CardText style={{ textTransform: "capitalize" }}>
                          {content}
                        </CardText>
                      </CardBody>
                    </Card>
                  );
                }
              )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const book = state.books.currentBook;
  const userId = state.login.user.id;
  return { book, userId };
};

export default connect(mapStateToProps, {
  updateBooksProps,
  getBook,
  submitRate,
  updateRate,
  submitTodo,
  updateTodo,
  addReview,
  deleteReview,
})(Book);
