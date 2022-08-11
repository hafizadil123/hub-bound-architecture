import {
  ACCOUNT_INFO_REQUEST,
  ACCOUNT_INFO_REQUEST_SUCCESS,
  ACCOUNT_INFO_REQUEST_ERROR
} from "../actionTypes/type";

export const accountInfoRequest = (paramsData, onSuccess) => {
  return {
    type: ACCOUNT_INFO_REQUEST,
    params: paramsData,
    onSuccess
  };
};

export const accountInfoSuccess = (result, onSuccess) => {
  return {
    type: ACCOUNT_INFO_REQUEST_SUCCESS,
    payload: result,
    error: null,
    onSuccess
  };
};

export const accountInfoError = (error) => {
  return {
    type: ACCOUNT_INFO_REQUEST_ERROR,
    error: error,
    payload: null
  };
};