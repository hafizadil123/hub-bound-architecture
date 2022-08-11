import {
    EMPLOYEE_UPDATE_REQUEST,
    EMPLOYEE_UPDATE_REQUEST_SUCCESS,
    EMPLOYEE_UPDATE_REQUEST_ERROR,
  } from "../actionTypes/type";
  
  export const employeeUpdateRequest = (paramsData, onSuccess, onError) => {
    return {
      type: EMPLOYEE_UPDATE_REQUEST,
      params: paramsData,
      onSuccess,
      onError
    };
  };
  
  export const actionSuccess = (result) => {
    return {
      type: EMPLOYEE_UPDATE_REQUEST_SUCCESS,
      payload: result,
      error: null
    };
  };
  
  export const actionError = (error) => {
    return {
      type: EMPLOYEE_UPDATE_REQUEST_ERROR,
      error: error,
      payload: null
    };
  };
  