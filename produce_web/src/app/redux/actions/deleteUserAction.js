import {
    USER_DELETE_REQUEST_ERROR,
    USER_DELETE_REQUEST,
    USER_DELETE_REQUEST_SUCCESS,
  } from "../actionTypes/type";
  
  export const deleteUserRequest = (paramsData, onSuccess) => {
    return {
      type: USER_DELETE_REQUEST,
      params: paramsData,
      onSuccess
    };
  };
  
  export const deleteUserSuccess = (result, onSuccess) => {
    return {
      type: USER_DELETE_REQUEST_SUCCESS,
      payload: result,
      error: null,
      onSuccess
    };
  };
  
  export const deleteUserError = (error) => {
    return {
      type: USER_DELETE_REQUEST_ERROR,
      error: error,
      payload: null
    };
  }
  