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
  CustomInput,
  FormGroup,
} from "reactstrap";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./customDatePickerWidth.css";

import Table from "./AuthorsTable";

import {
  updateAuthorsProps,
  addNewAuthor,
  updateAuthor,
} from "../../../actions/authorsActions";

class Authors extends Component {
  toggle = () => {
    this.props.updateAuthorsProps([
      {
        prop: "currentAuthor",
        value: { dob: new Date() },
      },
      {
        prop: "isAuthorModal",
        value: !this.props.isModal,
      },
    ]);
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.props.updateAuthorsProps([{ prop: "currentAuthor." + name, value }]);
  };
  onChangeImage = (e) => {
    const image = e.target.files[0];
    this.props.updateAuthorsProps([
      { prop: "currentAuthor.image", value: image },
    ]);
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { addNewAuthor, updateAuthor, currentAuthor } = this.props;
    currentAuthor._id
      ? updateAuthor(currentAuthor, currentAuthor.index)
      : addNewAuthor(currentAuthor);
  };
  render() {
    const { isModal, currentAuthor } = this.props;
    const { _id, firstName, lastName, dob } = currentAuthor;
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
            <ModalHeader toggle={this.toggle}>Author</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={firstName}
                  onChange={this.onChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={lastName}
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
                <div className="customDatePickerWidth">
                  <DatePicker
                    selected={dob}
                    name="dob"
                    dateFormat="dd/MM/yyyy"
                    onChange={(value) =>
                      this.props.updateAuthorsProps([
                        { prop: "currentAuthor.dob", value },
                      ])
                    }
                  />
                </div>
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
  const { isAuthorModal, currentAuthor } = state.authors;
  return { isModal: isAuthorModal, currentAuthor };
};

export default connect(mapStateToProps, {
  updateAuthorsProps,
  addNewAuthor,
  updateAuthor,
})(Authors);
