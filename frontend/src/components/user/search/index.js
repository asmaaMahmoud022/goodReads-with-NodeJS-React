import React, { Component } from "react";
import { connect } from "react-redux";
import queryString from "query-string";

import Books from "../books/Books";
import { APP_NAME } from "../../../utils";

class Search extends Component {
  componentDidMount() {
    document.title = `Search results - ${APP_NAME}`;
  }
  render() {
    const { search } = this.props;
    let params = queryString.parse(this.props.location.search);
    return (
      <div>
        <h4>{`${search.length} items found for '${params.q}'`}</h4>
        <hr />
        <Books books={search} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { search } = state.books;
  return { search };
};

export default connect(mapStateToProps)(Search);
