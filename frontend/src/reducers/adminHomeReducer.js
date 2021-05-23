import dotProp from "dot-prop-immutable";

import {
  UPDATE_ADMIN_PROPS,
  DELETE_ADMIN_PROPS,
  MERGE_ADMIN_PROPS,
} from "../actions/types";

const INITIAL_STATE = {
  token: "",
  email: "",
  password: "",
  emailState: "",

  activeTab: "1",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_ADMIN_PROPS: {
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
    case MERGE_ADMIN_PROPS: {
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
    case DELETE_ADMIN_PROPS: {
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
