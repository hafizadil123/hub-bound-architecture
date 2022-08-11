import {
  DELETE_BUSINESS_ERROR,
  DELETE_BUSINESS_REQUEST,
  DELETE_BUSINESS_SUCCESS,
} from "../actionTypes/type";

export const deleteBusinessRequest = (paramsData, onSuccess) => {
  return {
    type: DELETE_BUSINESS_REQUEST,
    params: paramsData,
    onSuccess,
  };
};

export const deleteBusinessSuccess = (result, onSuccess) => {
  return {
    type: DELETE_BUSINESS_SUCCESS,
    payload: result,
    error: null,
    onSuccess,
  };
};

export const deleteBusinessError = (error) => {
  return {
    type: DELETE_BUSINESS_ERROR,
    error: error,
    payload: null,
  };
};
