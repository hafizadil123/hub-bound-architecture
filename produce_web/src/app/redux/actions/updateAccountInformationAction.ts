import {
    UPDATE_BUSINESS_ERROR,
    UPDATE_BUSINESS_REQUEST,
    UPDATE_BUSINESS_SUCCESS
  } from "../actionTypes/type";
  
  export const updateBusinessRequest = (paramsData, onSuccess, onError) => {
    return {
      type: UPDATE_BUSINESS_REQUEST,
      params: paramsData,
      onSuccess,
      onError
    };
  };
  
  export const updateBusinessSuccess = (result, onSuccess) => {
    return {
      type: UPDATE_BUSINESS_SUCCESS,
      payload: result,
      error: null,
      onSuccess
    };
  };
  
  export const updateBusinessError = (error, onSuccess) => {
    return {
      type: UPDATE_BUSINESS_ERROR,
      error: error,
      payload: null,
      onSuccess
    };
  };
  