import React, { Component } from "react";
import { connect } from "react-redux";

import { Container, T } from "reactstrap";

import ReactTable from "react-table-v6";
import Select from "react-select";

import { HOST, APP_NAME } from "../../../utils";
import {
  getAllTodos,
  updateBooksProps,
  updateTodoListItem,
} from "../../../actions/booksActions";

class Dashboard extends Component {
  componentDidMount() {
    document.title = `Dashboard - ${APP_NAME}`;
    this.props.getAllTodos();
  }

  renderSelect = ({ original, index }) => {
    return (
      <Select
        options={[
          { shelve: "want to read" },
          { shelve: "reading" },
          { shelve: "read" },
        ]}
        menuPortalTarget={document.body}
        value={original}
        getOptionLabel={(todo) => todo.shelve}
        getOptionValue={(todo) => todo}
        onChange={(newTodo) => {
          this.props.updateTodoListItem(
            original.book._id,
            newTodo.shelve,
            index
          );
        }}
      />
    );
  };
  columns = [
    {
      Header: "Cover",
      Cell: ({
        original: {
          book: { image },
        },
      }) => (
        <img
          src={`${HOST}/images/${image}`}
          style={{ width: "50px", height: "40px" }}
        />
      ),
    },
    { Header: "Name", accessor: "book.name", filterable: true },
    {
      Header: "Author",
      Cell: ({
        original: {
          book: { author },
        },
      }) => {
        const { authors } = this.props;
        if (authors && authors.hasOwnProperty(author)) {
          const { firstName, lastName } = authors[author];
          return firstName + " " + lastName;
        }
      },
    },
    {
      Header: "Shelve",
      Cell: this.renderSelect.bind(this),
      sortable: false,
    },
  ];

  render() {
    const { activeTodosTab, todos } = this.props;
    return (
      <Container>
        <ReactTable
          defaultPageSize={5}
          columns={this.columns}
          data={todos}
          getTdProps={(state, rowInfo, column) => {
            return {
              style: { overflow: "visible" },
            };
          }}
        />
      </Container>
    );
  }
}

const mapSateToProps = (state) => {
  const { activeTodosTab, todos } = state.books;
  const { authorsList } = state.authors;
  return { activeTodosTab, todos, authors: authorsList };
};
export default connect(mapSateToProps, {
  getAllTodos,
  updateBooksProps,
  updateTodoListItem,
})(Dashboard);
