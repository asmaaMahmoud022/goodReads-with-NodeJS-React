import React, { Component } from "react";
import { connect } from "react-redux";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Button } from "reactstrap";

import { updateCategoriesProps, deleteCategory } from "../../../actions/categoriesActions";

class CategoriesTable extends Component {
  editCategoryModal = (category, index) => {
    category.index = index;
    this.props.updateCategoriesProps([
      { prop: "currentCategory", value: category },
      {
        prop: "isCategoryModal",
        value: !this.props.isModal,
      },
    ]);
  };

  renderActions = ({ original, index }) => {
    return (
      <div>
        <Button
          onClick={this.editCategoryModal.bind(this, original, index)}
          color="primary"
          style={{ marginRight: 10, marginLeft: 10 }}
        >
          <i className="fa fa-edit" />
        </Button>
        <Button
          color="danger"
          onClick={() => {
            if (window.confirm("Are you sure?")) {
              this.props.deleteCategory(original._id, index);
            }
          }}
        >
          <i className="fa fa-trash" />
        </Button>
      </div>
    );
  };
  columns = [
    { Header: "Id", accessor: "_id" },
    { Header: "Name", accessor: "name" },
    {
      Header: "Actions",
      Cell: this.renderActions.bind(this),
      sortable: false,
    },
  ];

  render() {
    const { categories } = this.props;

    return (
      <ReactTable
        defaultPageSize={5}
        columns={this.columns}
        data={categories}
        getTdProps={() => {
          return {
            style: {
              display: "flex",
              justifyContent: "center",
            },
          };
        }}
      />
    );
  }
}
const mapStateToProps = (state) => {
  const { categories, isCategoryModal } = state.categories;
  return { categories, isModal: isCategoryModal };
};

export default connect(mapStateToProps, {
  updateCategoriesProps,
  deleteCategory,
})(CategoriesTable);
