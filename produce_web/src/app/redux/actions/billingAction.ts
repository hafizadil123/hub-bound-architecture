import {
  BILLING_INFO_ERROR,
  BILLING_INFO_REQUEST,
  BILLING_INFO_SUCCESS,
  SAVE_BILLING_INFO_REQUEST,
  SAVE_BILLING_INFO_SUCCESS,
  SAVE_BILLING_INFO_ERROR,
} from "./../actionTypes/type";

export const billingRequest = (paramsData, onSuccess) => {
  return {
    type: BILLING_INFO_REQUEST,
    params: paramsData,
    onSuccess,
  };
};

export const billingSuccess = (result, onSuccess) => {
  return {
    type: BILLING_INFO_SUCCESS,
    payload: result,
    error: null,
    onSuccess,
  };
};

export const billingError = (error) => {
  return {
    type: BILLING_INFO_ERROR,
    error: error,
    payload: null,
  };
};

export const billingSaveRequest = (paramsData, onSuccess) => {
  return {
    type: SAVE_BILLING_INFO_REQUEST,
    params: paramsData,
    onSuccess,
  };
};

export const billingSaveSuccess = (result, onSuccess) => {
  return {
    type: SAVE_BILLING_INFO_SUCCESS,
    payload: result,
    error: null,
    onSuccess,
  };
};

export const billingSaveError = (error) => {
  return {
    type: SAVE_BILLING_INFO_ERROR,
    error: error,
    payload: null,
  };
};
