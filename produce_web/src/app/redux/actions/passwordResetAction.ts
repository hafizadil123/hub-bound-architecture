import {
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_REQUEST_SUCCESS,
  PASSWORD_RESET_REQUEST_ERROR,
} from "../actionTypes/type";

export const passwordResetRequest = (paramsData, onSuccess, onError) => {
  return {
    type: PASSWORD_RESET_REQUEST,
    params: paramsData,
    onSuccess,
    onError
  };
};

export const actionSuccess = (result) => {
  return {
    type: PASSWORD_RESET_REQUEST_SUCCESS,
    payload: result,
    error: null
  };
};

export const actionError = (error) => {
  return {
    type: PASSWORD_RESET_REQUEST_ERROR,
    error: error,
    payload: null
  };
};
