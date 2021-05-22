import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Form,
  FormGroup,
  CustomInput,
} from "reactstrap";
import Select from "react-select";

import Table from "./BooksTable";

import {
  addNewBook,
  updateBook,
  updateBooksProps,
} from "../../../actions/booksActions";

class Books extends Component {
  toggle = () => {
    const { isModal, categories, authors } = this.props;
    this.props.updateBooksProps([
      {
        prop: "currentBook",
        value: { name: "", category: categories[0], author: authors[0] },
      },
      {
        prop: "isBookModal",
        value: !isModal,
      },
    ]);
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.props.updateBooksProps([{ prop: "currentBook." + name, value }]);
  };
  onChangeImage = (e) => {
    const image = e.target.files[0];
    this.props.updateBooksProps([{ prop: "currentBook.image", value: image }]);
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { addNewBook, updateBook, currentBook } = this.props;
    currentBook._id
      ? updateBook(currentBook, currentBook.index)
      : addNewBook(currentBook);
  };
  render() {
    const { isModal, currentBook, categories, authors } = this.props;
    const { _id, name, author, category } = currentBook;
    return (
      <div>
        <Row>
          <Col
            sm="12"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "20px",
            }}
          >
            <Button color="success" onClick={this.toggle}>
              <i className="fa fa-plus" />
            </Button>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <Table />
          </Col>
        </Row>

        <Modal isOpen={isModal} toggle={this.toggle}>
          <Form onSubmit={this.onSubmit} method="POST">
            <ModalHeader toggle={this.toggle}>Book</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Input
                  type="text"
                  name="name"
                  placeholder="book name"
                  value={name}
                  onChange={this.onChange}
                  required
                />
              </FormGroup>
              {!_id && (
                <FormGroup>
                  <CustomInput
                    required
                    id="image"
                    type="file"
                    name="image"
                    placeholder="choose image"
                    onChange={this.onChangeImage}
                  />
                </FormGroup>
              )}
              <FormGroup>
                <Select
                  value={category}
                  placeholder="Select Category"
                  options={categories}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option._id}
                  required
                  onChange={(value) =>
                    this.props.updateBooksProps([
                      { prop: "currentBook.category", value },
                    ])
                  }
                />
              </FormGroup>
              <FormGroup>
                <Select
                  value={author}
                  placeholder="Select author"
                  options={authors}
                  getOptionLabel={({ firstName, lastName }) =>
                    `${firstName} ${lastName}`
                  }
                  getOptionValue={(option) => option._id}
                  onChange={(value) =>
                    this.props.updateBooksProps([
                      { prop: "currentBook.author", value },
                    ])
                  }
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="primary">
                Submit
              </Button>
              <Button color="secondary" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { isBookModal, currentBook } = state.books;
  const { authors } = state.authors;
  const { categories } = state.categories;
  return { isModal: isBookModal, currentBook, categories, authors };
};

export default connect(mapStateToProps, {
  updateBooksProps,
  addNewBook,
  updateBook,
})(Books);
