import {
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_REQUEST_ERROR,
  PASSWORD_RESET_REQUEST_SUCCESS,
} from "../actionTypes/type";
const initialState = {
  data: null,
};

const passwordResetReducer = (state = initialState, action) => {
  let object;

  switch (action.type) {
    case PASSWORD_RESET_REQUEST:
      object = {
        ...state
      };
      break;

    case PASSWORD_RESET_REQUEST_ERROR:
      object = {
        ...state
      };
      break;

    case PASSWORD_RESET_REQUEST_SUCCESS:
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

export default passwordResetReducer;
