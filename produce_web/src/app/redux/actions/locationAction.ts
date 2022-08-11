import {
  GET_LOCATION_REQUEST,
  GET_LOCATION_REQUEST_SUCCESS,
  GET_LOCATION_REQUEST_ERROR,
  SAVE_LOCATION_REQUEST,
  SAVE_LOCATION_REQUEST_SUCCESS,
  SAVE_LOCATION_REQUEST_ERROR,
  DELETE_LOCATION_REQUEST,
  DELETE_LOCATION_REQUEST_SUCCESS,
  DELETE_LOCATION_REQUEST_ERROR,
} from "../actionTypes/type";

export const getLocationRequest = (paramsData, onGetLocationSuccess) => {
  return {
    type: GET_LOCATION_REQUEST,
    params: paramsData,
    onGetLocationSuccess,
  };
};

export const getLocationSuccess = (result, onGetLocationSuccess) => {
  return {
    type: GET_LOCATION_REQUEST_SUCCESS,
    payload: result,
    error: null,
    onGetLocationSuccess,
  };
};

export const getLocationError = (error) => {
  return {
    type: GET_LOCATION_REQUEST_ERROR,
    error: error,
    payload: null,
  };
};

export const saveLocationRequest = (paramsData, onSuccess, onFailure) => {
  return {
    type: SAVE_LOCATION_REQUEST,
    params: paramsData,
    onSuccess,
    onFailure,
  };
};

export const saveLocationSuccess = (result, onSuccess, onFailure) => {
  return {
    type: SAVE_LOCATION_REQUEST_SUCCESS,
    payload: result,
    error: null,
    onSuccess,
    onFailure,
  };
};

export const saveLocationError = (error, onSuccess, onFailure) => {
  return {
    type: SAVE_LOCATION_REQUEST_ERROR,
    error: error,
    payload: null,
    onSuccess,
    onFailure,
  };
};

export const deleteLocationRequest = (paramsData) => {
  return {
    type: DELETE_LOCATION_REQUEST,
    params: paramsData,
  };
};

export const deleteLocationSuccess = (result, onSuccess, onFailure) => {
  return {
    type: DELETE_LOCATION_REQUEST_SUCCESS,
    payload: result,
    error: null,
    onSuccess,
    onFailure,
  };
};

export const deleteLocationError = (error, onSuccess, onFailure) => {
  return {
    type: DELETE_LOCATION_REQUEST_ERROR,
    error: error,
    payload: null,
    onSuccess,
    onFailure,
  };
};
