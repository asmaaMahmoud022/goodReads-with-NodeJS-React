import React, { Component } from "react";
import { connect } from "react-redux";
import {
  CustomInput,
  Button,
  Form,
  FormGroup,
  Input,
  FormFeedback,
} from "reactstrap";
import { updateRegisterField, signupUser } from "../../actions/registerActions";
class RegisterForm extends Component {
  onChange = (e) => {
    const { name, value } = e.target;

    this.props.updateRegisterField(name, value);
  };

  onConfirmPasswordChange = (e) => {
    const { name, value } = e.target;

    this.props.updateRegisterField(
      "isConfirmPasswordInvalid",
      this.props.password !== value
    );

    this.props.updateRegisterField(name, value);
  };

  onPasswordChange = (e) => {
    const { name, value } = e.target;

    this.props.updateRegisterField(
      "isConfirmPasswordInvalid",
      this.props.passwordConfirm !== value
    );

    this.props.updateRegisterField(name, value);
  };
  onChangeImage = (e) => {
    const image = e.target.files[0];
    this.props.updateRegisterField("image", image);
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, image } = this.props;

    this.props.signupUser({
      firstName,
      lastName,
      email,
      password,
      image,
    });
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
      isConfirmPasswordInvalid,
    } = this.props;
    return (
      <Form method="POST" onSubmit={this.onSubmit}>
        <FormGroup>
          <Input
            type="text"
            name="firstName"
            placeholder="first name"
            onChange={this.onChange}
            value={firstName}
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="lastName"
            placeholder="last name"
            onChange={this.onChange}
            value={lastName}
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="email"
            name="email"
            placeholder="somthing@example.com"
            onChange={this.onChange}
            value={email}
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            name="password"
            placeholder="password"
            onChange={this.onPasswordChange}
            value={password}
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            name="passwordConfirm"
            placeholder="confirm password"
            onChange={this.onConfirmPasswordChange}
            value={passwordConfirm}
            invalid={isConfirmPasswordInvalid}
            required
          />
          <FormFeedback>Confirm password does not match.</FormFeedback>
        </FormGroup>
        <FormGroup>
          <CustomInput
            id="image"
            type="file"
            name="image"
            placeholder="choose image"
            onChange={this.onChangeImage}
            required
          />
        </FormGroup>
        <Button type="submit">Sign up</Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
    image,
    isConfirmPasswordInvalid,
  } = state.register;
  return {
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
    image,
    isConfirmPasswordInvalid,
  };
};

export default connect(mapStateToProps, { updateRegisterField, signupUser })(
  RegisterForm
);
