import {
    EMPLOYEE_UPDATE_REQUEST,
    EMPLOYEE_UPDATE_REQUEST_ERROR,
    EMPLOYEE_UPDATE_REQUEST_SUCCESS
  } from "../actionTypes/type";
  const initialState = {
    data: null
  };
  
  const employeeUpdateReducer = (state = initialState, action) => {
    let object;
  
    switch (action.type) {
      case EMPLOYEE_UPDATE_REQUEST:
        object = {
          ...state
        };
        break;
  
      case EMPLOYEE_UPDATE_REQUEST_ERROR:
        object = {
          ...state
        };
        break;
  
      case EMPLOYEE_UPDATE_REQUEST_SUCCESS:
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
  
  export default employeeUpdateReducer;
  