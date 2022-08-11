import {
  DELETE_BUSINESS_ERROR,
  DELETE_BUSINESS_REQUEST,
  DELETE_BUSINESS_SUCCESS,
} from "../actionTypes/type";

const initialState = {
  data: {},
  isLoading: false,
};

const deleteBusinessReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_BUSINESS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case DELETE_BUSINESS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case DELETE_BUSINESS_ERROR:
      return {
        ...state,
        isLoading: false,
        data: {},
      };
    default:
      return state;
  }
};
export default deleteBusinessReducer;
