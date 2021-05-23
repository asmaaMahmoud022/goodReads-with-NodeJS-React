import dotProp from "dot-prop-immutable";

import { UPDATE_GENERAL_PROPS } from "../actions/types";
const INITIAL_STATE = {
  author: [],
  categories: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_GENERAL_PROPS: {
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
    default:
      return state;
  }
};
