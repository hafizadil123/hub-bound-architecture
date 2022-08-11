import {
  INTEGRATION_INFO_ERROR,
  INTEGRATION_INFO_REQUEST,
  INTEGRATION_INFO_SUCCESS,
} from "../actionTypes/type";

const initialState = {
  data: {},
  isLoading: false,
};

const integrationReducerCall = (state = initialState, action) => {
  switch (action.type) {
    case INTEGRATION_INFO_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case INTEGRATION_INFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case INTEGRATION_INFO_ERROR:
      return {
        ...state,
        isLoading: false,
        data: {},
      };
    default:
      return state;
  }
};
export default integrationReducerCall;
