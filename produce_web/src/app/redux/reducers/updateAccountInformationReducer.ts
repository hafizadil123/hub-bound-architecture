import {
    UPDATE_BUSINESS_REQUEST,
    UPDATE_BUSINESS_SUCCESS,
    UPDATE_BUSINESS_ERROR
  } from "../actionTypes/type";
  const initialState = {
    data: null
  };
  
  const updateAccountInformationReducer = (state = initialState, action) => {
    let object;
  
    switch (action.type) {
      case UPDATE_BUSINESS_REQUEST:
        object = {
          ...state
        };
        break;
  
      case UPDATE_BUSINESS_ERROR:
        object = {
          ...state
        };
        break;
  
      case UPDATE_BUSINESS_SUCCESS:
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
  
  export default updateAccountInformationReducer;
  