import {
  PASSWORD_RESET_USER_REQUEST,
  PASSWORD_RESET_USER_REQUEST_ERROR,
  PASSWORD_RESET_USER_REQUEST_SUCCESS,
} from "../actionTypes/type";
const initialState = {
  data: null,
};

const passwordResetUserReducer = (state = initialState, action) => {
  let object;

  switch (action.type) {
    case PASSWORD_RESET_USER_REQUEST:
      object = {
        ...state
      };
      break;

    case PASSWORD_RESET_USER_REQUEST_ERROR:
      object = {
        ...state
      };
      break;

    case PASSWORD_RESET_USER_REQUEST_SUCCESS:
      object = {
        ...state
        // data: action.payload,
      };
      break;

    default:
      object = state;
      break;
  }
  return object;
};

export default passwordResetUserReducer;
