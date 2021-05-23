import dotProp from "dot-prop-immutable";

import {
  UPDATE_AUTHORS_PROPS,
  DELETE_AUTHORS_PROPS,
  MERGE_AUTHORS_PROPS,
} from "../actions/types";

const INITIAL_STATE = {
  isAuthorModal: false,
  authors: [],
  currentAuthor: {},
  authorsList: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_AUTHORS_PROPS: {
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
    case MERGE_AUTHORS_PROPS: {
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
    case DELETE_AUTHORS_PROPS: {
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
