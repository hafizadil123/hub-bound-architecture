import {
  INTEGRATION_INFO_ERROR,
  INTEGRATION_INFO_REQUEST,
  INTEGRATION_INFO_SUCCESS,
  SAVE_INTEGRATION_INFO_ERROR,
  SAVE_INTEGRATION_INFO_REQUEST,
  SAVE_INTEGRATION_INFO_SUCCESS,
} from "./../actionTypes/type";

export const integrationRequest = (paramsData, onSuccess) => {
  return {
    type: INTEGRATION_INFO_REQUEST,
    params: paramsData,
    onSuccess,
  };
};

export const integrationSuccess = (result, onSuccess) => {
  return {
    type: INTEGRATION_INFO_SUCCESS,
    payload: result,
    error: null,
    onSuccess,
  };
};

export const integrationError = (error) => {
  return {
    type: INTEGRATION_INFO_SUCCESS,
    error: error,
    payload: null,
  };
};

export const integrationSaveRequest = (paramsData, onSuccess) => {
  return {
    type: SAVE_INTEGRATION_INFO_REQUEST,
    params: paramsData,
    onSuccess,
  };
};

export const integrationSaveSuccess = (result, onSuccess) => {
  return {
    type: SAVE_INTEGRATION_INFO_SUCCESS,
    payload: result,
    error: null,
    onSuccess,
  };
};

export const integrationSaveError = (error) => {
  return {
    type: SAVE_INTEGRATION_INFO_ERROR,
    error: error,
    payload: null,
  };
};
