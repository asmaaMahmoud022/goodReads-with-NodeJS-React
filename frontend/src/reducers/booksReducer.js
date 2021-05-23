import dotProp from "dot-prop-immutable";

import {
  UPDATE_BOOKS_PROPS,
  DELETE_BOOKS_PROPS,
  MERGE_BOOKS_PROPS,
} from "../actions/types";

const INITIAL_STATE = {
  isBookModal: false,
  books: [],
  currentBook: {
    name: "",
  },

  activeTodosTab: "1",
  todos: [],

  search: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_BOOKS_PROPS: {
      let newState = state;
      for (let i = 0; i < action.payload.length; i++) {
        newState = dotProp.set(
          newState,
          action.payload[i].prop,
          action.payload[i].value
        );
      }
      return newState;
    }
    case MERGE_BOOKS_PROPS: {
      let newState = state;
      for (let i = 0; i < action.payload.length; i++) {
        newState = dotProp.merge(
          newState,
          action.payload[i].prop,
          action.payload[i].value
        );
      }
      return newState;
    }
    case DELETE_BOOKS_PROPS: {
      let newState = state;
      for (let i = 0; i < action.payload.length; i++) {
        newState = dotProp.delete(newState, action.payload[i].prop);
      }
      return newState;
    }
    default:
      return state;
  }
};
