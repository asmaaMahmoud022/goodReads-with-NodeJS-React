import React, { Component } from "react";
import { connect } from "react-redux";
import { Jumbotron } from "reactstrap";

import { getCategory } from "../../../actions/categoriesActions";
import Books from "../books/Books";
import { APP_NAME } from "../../../utils";

class Category extends Component {
  render() {
    const { category } = this.props;

    if (!category) return <div></div>;

    const { name, books } = category;
    document.title = `${name} - ${APP_NAME}`;

    return (
      <div>
        <Jumbotron
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#ffffe6",
          }}
        >
          <h2
            style={{
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {name}
          </h2>
        </Jumbotron>
        <Books books={books} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const category = state.categories.categoriesList[ownProps.match.params.id];
  return { category };
};

export default connect(mapStateToProps, { getCategory })(Category);
