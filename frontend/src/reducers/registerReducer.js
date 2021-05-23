import { UPDATE_REGISTER_FIELD, RESET_REGISTER_FIELDS } from "../actions/types";

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirm: "",
  isConfirmPasswordInvalid: false,
  image: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_REGISTER_FIELD:
      const newState = { ...state };
      const { key, value } = action.payload;
      newState[key] = value;
      return newState;
    case RESET_REGISTER_FIELDS:
      return INITIAL_STATE
    default:
      return state;
  }
};
