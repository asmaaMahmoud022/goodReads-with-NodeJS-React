import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { Container, TabContent, TabPane, Nav } from "reactstrap";

import Authers from "./authors";
import Books from "./books";
import Categories from "./categories";
import CustomNavItem from "./CustomNavItem";

import { APP_NAME } from "../../utils";

import {
  updateAdminProps,

} from "../../actions/adminAction";

import { getAllBooks } from "../../actions/booksActions";
import { getAllAuthors } from "../../actions/authorsActions";
import { getAllCategories } from "../../actions/categoriesActions";

class Home extends Component {
  componentDidMount() {
    document.title = `Admin panel - ${APP_NAME}`;
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + this.props.token;
    this.props.getAllBooks();
    this.props.getAllAuthors();
    this.props.getAllCategories();
  }

  toggle = (tab) => {
    if (this.props.activeTab !== tab)
      this.props.updateAdminProps([{ prop: "activeTab", value: tab }]);
  };

  render() {
    const { activeTab } = this.props;

    return (
      <Container>
        <Nav tabs>
          <CustomNavItem
            name="Categories"
            tab="1"
            activeTab={activeTab}
            toggle={this.toggle}
          />
          <CustomNavItem
            name="Books"
            tab="2"
            activeTab={activeTab}
            toggle={this.toggle}
          />
          <CustomNavItem
            name="Authors"
            tab="3"
            activeTab={activeTab}
            toggle={this.toggle}
          />
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Categories />
          </TabPane>
          <TabPane tabId="2">
            <Books />
          </TabPane>
          <TabPane tabId="3">
            <Authers />
          </TabPane>
        </TabContent>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  const { activeTab, token } = state.admin;
  return { activeTab, token };
};

export default connect(mapStateToProps, {
  updateAdminProps,
  getAllBooks,
  getAllAuthors,
  getAllCategories,
})(Home);
