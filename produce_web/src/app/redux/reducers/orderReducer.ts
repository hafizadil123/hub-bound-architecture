import {
  ORDER_LISTING_ERROR,
  ORDER_LISTING_REQUEST,
  ORDER_LISTING_SUCCESS,
  ORDER_VIEW_REQUEST,
  ORDER_VIEW_SUCCESS,
  ORDER_VIEW_ERROR,
} from "../actionTypes/type";

const initialState = {
  data: {},
  isLoading: false
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_LISTING_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case ORDER_LISTING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case ORDER_LISTING_ERROR:
      return {
        ...state,
        isLoading: false,
        data: {}
      };
    //orderview
    case ORDER_VIEW_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case ORDER_VIEW_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case ORDER_VIEW_ERROR:
      return {
        ...state,
        isLoading: false,
        data: {}
      };
    default:
      return state;
  }
};
export default orderReducer;
