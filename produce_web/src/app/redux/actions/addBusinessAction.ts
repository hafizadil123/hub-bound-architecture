import {
  ADD_BUSINESS_ERROR,
  ADD_BUSINESS_REQUEST,
  ADD_BUSINESS_SUCCESS,
} from "../actionTypes/type";
//  add vs edit business
export const addVsEditBusinessRequest = (paramsData, onSuccess) => {
  //alert('addVsEditBusinessRequest')
  return {
    type: ADD_BUSINESS_REQUEST,
    params: paramsData,
    onSuccess,
  };
};

export const addVsEditBusinessSuccess = (result, onSuccess) => {
  return {
    type: ADD_BUSINESS_SUCCESS,
    payload: result,
    error: null,
    onSuccess,
  };
};

export const addVsEditBusinessError = (error, onSuccess) => {
  return {
    type: ADD_BUSINESS_ERROR,
    error: error,
    payload: null,
    onSuccess,
  };
};
