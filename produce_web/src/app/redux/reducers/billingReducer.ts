import {
  BILLING_INFO_ERROR,
  BILLING_INFO_REQUEST,
  BILLING_INFO_SUCCESS,
} from "../actionTypes/type";

const initialState = {
  data: {},
  isLoading: false,
};

const billingReducer = (state = initialState, action) => {
  switch (action.type) {
    case BILLING_INFO_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case BILLING_INFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case BILLING_INFO_ERROR:
      return {
        ...state,
        isLoading: false,
        data: {},
      };
    default:
      return state;
  }
};
export default billingReducer;
