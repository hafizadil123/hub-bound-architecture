import {
  PASSWORD_RESET_USER_REQUEST,
  PASSWORD_RESET_USER_REQUEST_SUCCESS,
  PASSWORD_RESET_USER_REQUEST_ERROR,
} from "../actionTypes/type";

export const passwordResetGetUserRequest = (paramsData, onSuccess, onError) => {
  return {
    type: PASSWORD_RESET_USER_REQUEST,
    params: paramsData,
    onSuccess,
    onError
  };
};

export const actionSuccess = (result) => {
  return {
    type: PASSWORD_RESET_USER_REQUEST_SUCCESS,
    payload: result,
    error: null
  };
};

export const actionError = (error) => {
  return {
    type: PASSWORD_RESET_USER_REQUEST_ERROR,
    error: error,
    payload: null
  };
};
