import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Navbar,
  NavbarBrand,
  Nav,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import { updateLoginField, loginUser } from "../../actions/loginActions";

class NavbarForm extends Component {
  onChange = (e) => {
    const { name, value } = e.target;
    this.props.updateLoginField(name, value);
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { email, password, loginUser } = this.props;
    loginUser(email, password);
  };
  render() {
    const { email, password } = this.props;
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Good Reads</NavbarBrand>

        <Nav className="ml-auto" navbar>
          <Form method="POST" inline onSubmit={this.onSubmit}>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="exampleEmail" className="mr-sm-2">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                onChange={this.onChange}
                placeholder="something@example.com"
                value={email}
                required
              />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="examplePassword" className="mr-sm-2">
                Password
              </Label>
              <Input
                type="password"
                name="password"
                onChange={this.onChange}
                placeholder="123456"
                value={password}
                required
              />
            </FormGroup>
            <Button type="submit">Sign in</Button>
          </Form>
        </Nav>
      </Navbar>
    );
  }
}
const mapStateToProps = (state) => {
  const { email, password } = state.login;
  return { email, password };
};

export default connect(mapStateToProps, { updateLoginField, loginUser })(
  NavbarForm
);
