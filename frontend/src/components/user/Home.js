import React, { Component } from "react";
import { BrowserRouter as Switch, Route, Router } from "react-router-dom";
import { connect } from "react-redux";
import JWT from "jwt-decode";
import axios from "axios";
import { Container } from "reactstrap";

import Navbar from "./navbar";
import Dashboard from "./dashboard";

import Categories from "./categories";
import Category from "./categories/category";

import Authors from "./authors";
import Author from "./authors/Author";

import Books from "./books";
import Book from "./books/Book";

import Search from "./search";

import { getUserToken } from "../../utils";
import { updateLoginField } from "../../actions/loginActions";

import { getAllData } from "../../actions/booksActions";

class UserHome extends Component {
  constructor() {
    super();
    this.token = getUserToken();
    axios.defaults.headers.common["Authorization"] = "Bearer " + this.token;
  }
  componentDidMount() {
    this.props.updateLoginField("token", this.token);
    this.props.updateLoginField("user", JWT(this.token));
    this.props.getAllData();
  }

  componentDidUpdate() {
    if (!this.props.token) this.props.history.push("/");
  }
  render() {
    const { books } = this.props;
    return (
      <Container>
          <Switch>
          <Route component={Navbar} />

            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/categories" exact component={Categories} />
            <Route path="/categories/:id" exact component={Category} />

            <Route path="/authors" exact component={Authors} />
            <Route path="/authors/:id" exact component={Author} />

            <Route path="/search" exact component={Search} />

            <Route path="/books" exact>
              <Books books={books} />
            </Route>
            <Route path="/books/:id" exact component={Book} />
          </Switch>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { token } = state.login;
  const { books } = state.books;
  return { token, books };
};
export default connect(mapStateToProps, {
  updateLoginField,
  getAllData,
})(UserHome);
