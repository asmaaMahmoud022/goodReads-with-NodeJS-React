import dotProp from "dot-prop-immutable";

import {
  UPDATE_CATEGORIES_PROPS,
  DELETE_CATEGORIES_PROPS,
  MERGE_CATEGORIES_PROPS,
} from "../actions/types";

const INITIAL_STATE = {
  isCategoryModal: false,
  categories: [],
  categoriesList: {},
  currentCategory: {
    name: "",
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_CATEGORIES_PROPS: {
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
    case MERGE_CATEGORIES_PROPS: {
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
    case DELETE_CATEGORIES_PROPS: {
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
