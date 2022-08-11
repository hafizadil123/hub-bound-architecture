import {
  REGISTER_REQUEST,
  REGISTER_REQUEST_SUCCESS,
  REGISTER_REQUEST_ERROR,
} from "../actionTypes/type";

export const registerRequest = (paramsData, onSuccess, onError) => {
  return {
    type: REGISTER_REQUEST,
    params: paramsData,
    onSuccess,
    onError,
  };
};

export const actionSuccess = (result) => {
  return {
    type: REGISTER_REQUEST_SUCCESS,
    payload: result,
    error: null,
  };
};

export const actionError = (error) => {
  return {
    type: REGISTER_REQUEST_ERROR,
    error: error,
    payload: null,
  };
};
