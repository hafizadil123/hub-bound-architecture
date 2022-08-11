import {
  REGISTER_REQUEST,
  REGISTER_REQUEST_ERROR,
  REGISTER_REQUEST_SUCCESS,
} from "../actionTypes/type";
const initialState = {
  data: null,
};

const registerReducer = (state = initialState, action) => {
  let object;

  switch (action.type) {
    case REGISTER_REQUEST:
      object = {
        ...state,
      };
      break;

    case REGISTER_REQUEST_ERROR:
      object = {
        ...state,
      };
      break;

    case REGISTER_REQUEST_SUCCESS:
      object = {
        ...state,
        // data: action.payload,
      };
      break;

    default:
      object = state;
      break;
  }
  return object;
};

export default registerReducer;
