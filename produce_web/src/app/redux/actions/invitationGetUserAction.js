import {
    USER_INVITATION_TOKEN_REQUEST,
    USER_INVITATION_TOKEN_REQUEST_SUCCESS,
    USER_INVITATION_TOKEN_REQUEST_ERROR
  } from "../actionTypes/type";
  
  export const invitationTokenGetUserRequest = (paramsData, onSuccess, onError) => {
    return {
      type: USER_INVITATION_TOKEN_REQUEST,
      params: paramsData,
      onSuccess,
      onError
    };
  };
  
  export const actionSuccess = (result) => {
    return {
      type: USER_INVITATION_TOKEN_REQUEST_SUCCESS,
      payload: result,
      error: null
    };
  };
  
  export const actionError = (error) => {
    return {
      type: USER_INVITATION_TOKEN_REQUEST_ERROR,
      error: error,
      payload: null
    };
  };
  