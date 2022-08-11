import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_ERROR,
  LOGIN_REQUEST_SUCCESS
} from "../actionTypes/type";
const initialState = {
  data: null,
  isLoading: false
};

const loginReducer = (state = initialState, action) => {
  let object;

  switch (action.type) {
    case LOGIN_REQUEST:
      object = {
        ...state,
        isLoading: true
      };
      break;

    case LOGIN_REQUEST_ERROR:
      object = {
        ...state,
        isLoading: false
      };
      break;

    case LOGIN_REQUEST_SUCCESS:
      object = {
        ...state,
        data: action.payload,
        isLoading: false
      };
      break;

    default:
      object = state;
      break;
  }
  return object;
};

export default loginReducer;
