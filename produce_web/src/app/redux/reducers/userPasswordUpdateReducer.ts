import {
  USER_PASSWORD_UPDATE_REQUEST,
  USER_PASSWORD_UPDATE_REQUEST_ERROR,
  USER_PASSWORD_UPDATE_REQUEST_SUCCESS,
} from "../actionTypes/type";
const initialState = {
  data: null,
};

const userPasswordUpdateReducer = (state = initialState, action) => {
  let object;

  switch (action.type) {
    case USER_PASSWORD_UPDATE_REQUEST:
      object = {
        ...state
      };
      break;

    case USER_PASSWORD_UPDATE_REQUEST_ERROR:
      object = {
        ...state
      };
      break;

    case USER_PASSWORD_UPDATE_REQUEST_SUCCESS:
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

export default userPasswordUpdateReducer;
