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
} from "reactstrap";

import Table from "./CategoriesTable";

import {
  updateCategoriesProps,
  addNewCategory,
  updateCategory,
} from "../../../actions/categoriesActions";

class Categories extends Component {
  toggle = () => {
    this.props.updateCategoriesProps([
      {
        prop: "currentCategory",
        value: { name: "" },
      },
      {
        prop: "isCategoryModal",
        value: !this.props.isModal,
      },
    ]);
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.props.updateCategoriesProps([
      { prop: "currentCategory." + name, value },
    ]);
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { addNewCategory, updateCategory, currentCategory } = this.props;
    currentCategory._id
      ? updateCategory(currentCategory, currentCategory.index)
      : addNewCategory(currentCategory);
  };
  render() {
    const { isModal, currentCategory } = this.props;
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
            <ModalHeader toggle={this.toggle}>Category</ModalHeader>
            <ModalBody>
              <Input
                type="text"
                name="name"
                placeholder="category name"
                value={currentCategory.name}
                onChange={this.onChange}
                required
              />
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
  const { isCategoryModal, currentCategory } = state.categories;
  return { isModal: isCategoryModal, currentCategory };
};

export default connect(mapStateToProps, {
  updateCategoriesProps,
  addNewCategory,
  updateCategory,
})(Categories);
