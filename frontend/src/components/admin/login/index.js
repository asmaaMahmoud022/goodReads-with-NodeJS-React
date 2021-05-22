import React, { Component } from "react";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormText,
  FormFeedback,
} from "reactstrap";
import "./Login.css";
import { connect } from "react-redux";

import { updateAdminProps } from "../../../actions/adminAction";

import { APP_NAME } from "../../../utils";

import { loginAdmin } from "../../../actions/adminAction";

class Login extends Component {
  validateEmail = (e) => {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailState = emailRex.test(e.target.value)
      ? "has-success"
      : "has-danger";

    this.props.updateAdminProps([{ prop: "emailState", value: emailState }]);
  };

  componentDidMount() {
    document.title = `Admin Login - ${APP_NAME}`;
  }

  handleChange = (event) => {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    this.props.updateAdminProps([{ prop: name, value }]);
  };

  submitForm(e) {
    e.preventDefault();
    const { email, password } = this.props;
    if (email && password) this.props.loginAdmin(email, password);
  }

  render() {
    const { email, password, emailState } = this.props;
    return (
      <Container className="Login">
        <h2>Sign In</h2>
        <Form className="form" onSubmit={(e) => this.submitForm(e)}>
          <Col>
            <FormGroup>
              <Label>Username</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="myemail@email.com"
                value={email}
                valid={emailState === "has-success"}
                invalid={emailState === "has-danger"}
                onChange={(e) => {
                  this.validateEmail(e);
                  this.handleChange(e);
                }}
                required
              />
              <FormFeedback valid>
                That's a tasty looking email you've got there.
              </FormFeedback>
              <FormFeedback>
                Uh oh! Looks like there is an issue with your email. Please
                input a correct email.
              </FormFeedback>
              <FormText>Your username is most likely your email.</FormText>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="********"
                value={password}
                onChange={(e) => this.handleChange(e)}
                required
              />
            </FormGroup>
          </Col>
          <Button>Submit</Button>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { email, password, emailState, token } = state.admin;
  return { email, password, emailState, token };
};

export default connect(mapStateToProps, {
  updateAdminProps,
  loginAdmin,
})(Login);
