import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_ERROR,
  LOGOUT_USER_REQUEST,
} from "../actionTypes/type";

export const loginRequest = (paramsData, onSuccess, onError) => {
  return {
    type: LOGIN_REQUEST,
    params: paramsData,
    onSuccess,
    onError,
  };
};

export const actionSuccess = (result) => {
  return {
    type: LOGIN_REQUEST_SUCCESS,
    payload: result,
    error: null,
  };
};

export const actionError = (error) => {
  return {
    type: LOGIN_REQUEST_ERROR,
    error: error,
    payload: null,
  };
};

export function logout() {
  return {
    type: LOGOUT_USER_REQUEST,
    payload: {},
  };
}
