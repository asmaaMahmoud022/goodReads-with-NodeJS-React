import { UPDATE_LOGIN_FIELD } from "../actions/types";

const INITIAL_STATE = {
  email: "",
  password: "",
  token: null,
  user: { image: "" },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_LOGIN_FIELD:
      const newState = { ...state };
      const { key, value } = action.payload;
      newState[key] = value;
      return newState;
    default:
      return state;
  }
};
