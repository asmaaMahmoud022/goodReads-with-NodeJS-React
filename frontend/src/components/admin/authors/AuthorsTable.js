import React, { Component } from "react";
import { connect } from "react-redux";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Button } from "reactstrap";

import { HOST } from "../../../utils";
import {
  updateAuthorsProps,
  deleteAuthor,
} from "../../../actions/authorsActions";

class AuthorsTable extends Component {
  editAuthorModal = (author, index) => {
    author.index = index;
    this.props.updateAuthorsProps([
      {
        prop: "currentAuthor",
        value: { ...author, dob: new Date(author.dob) },
      },
      {
        prop: "isAuthorModal",
        value: !this.props.isModal,
      },
    ]);
  };

  renderActions = ({ original, index }) => {
    return (
      <div>
        <Button
          onClick={this.editAuthorModal.bind(this, original, index)}
          color="primary"
          style={{ marginRight: 10, marginLeft: 10 }}
        >
          <i className="fa fa-edit" />
        </Button>
        <Button
          color="danger"
          onClick={() => {
            if (window.confirm("Are you sure?")) {
              this.props.deleteAuthor(original._id, index);
            }
          }}
        >
          <i className="fa fa-trash" />
        </Button>
      </div>
    );
  };
  columns = [
    { Header: "Id", accessor: "_id", minWidth: 200 },
    { Header: "Firstname", accessor: "firstName" },
    { Header: "Lastname", accessor: "lastName" },
    {
      Header: "Image",
      Cell: ({ original: { image } }) => (
        <img
          src={`${HOST}/images/${image}`}
          style={{ width: "50px", height: "40px" }}
        />
      ),
    },
    {
      Header: "Date of birth",
      Cell: (info) => new Date(info.original.dob).toDateString(),
    },

    {
      Header: "Actions",
      Cell: this.renderActions.bind(this),
      sortable: false,
    },
  ];

  render() {
    const { authors } = this.props;

    return (
      <ReactTable
        defaultPageSize={5}
        columns={this.columns}
        data={authors}
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
  const { authors, isAuthorModal } = state.authors;
  return { authors, isModal: isAuthorModal };
};

export default connect(mapStateToProps, {
  updateAuthorsProps,
  deleteAuthor,
})(AuthorsTable);
