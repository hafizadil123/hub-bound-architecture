import {
  USER_PASSWORD_UPDATE_REQUEST,
  USER_PASSWORD_UPDATE_REQUEST_SUCCESS,
  USER_PASSWORD_UPDATE_REQUEST_ERROR,
} from "../actionTypes/type";

export const userPasswordUpdateRequest = (paramsData, onSuccess, onError) => {
  return {
    type: USER_PASSWORD_UPDATE_REQUEST,
    params: paramsData,
    onSuccess,
    onError
  };
};

export const actionSuccess = (result) => {
  return {
    type: USER_PASSWORD_UPDATE_REQUEST_SUCCESS,
    payload: result,
    error: null
  };
};

export const actionError = (error) => {
  return {
    type: USER_PASSWORD_UPDATE_REQUEST_ERROR,
    error: error,
    payload: null
  };
};
