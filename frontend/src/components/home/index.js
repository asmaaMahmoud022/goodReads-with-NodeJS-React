import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import NavbarForm from "./NavbarForm";
import RegisterForm from "./RegisterForm";
import HomeContent from "./HomeContent";
import { APP_NAME } from "../../utils";

class Home extends Component {
  componentDidMount() {
    document.title = `Home - ${APP_NAME}`;
  }
  componentDidUpdate() {
    if (this.props.token) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    return (
      <Container>
        <NavbarForm />
        <Row>
          <Col xs="6">
            <HomeContent />
          </Col>
          <Col xs="6">
            <RegisterForm />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.login.token,
});

export default connect(mapStateToProps)(Home);
