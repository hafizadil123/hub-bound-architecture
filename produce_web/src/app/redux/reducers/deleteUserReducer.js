import {
    USER_DELETE_REQUEST_ERROR,
    USER_DELETE_REQUEST,
    USER_DELETE_REQUEST_SUCCESS,
  } from "../actionTypes/type";
  
  const initialState = {
    data: {},
    isLoading: false,
  };
  
  const deleteUserReducer = (state = initialState, action) => {
    switch (action.type) {
      case USER_DELETE_REQUEST:
        return {
          ...state,
          isLoading: true
        };
      case USER_DELETE_REQUEST_SUCCESS:
        return {
          ...state,
          isLoading: false,
          data: action.payload
        };
      case USER_DELETE_REQUEST_ERROR:
        return {
          ...state,
          isLoading: false,
          data: {}
        };
      default:
        return state;
    }
  };
  export default deleteUserReducer;
  