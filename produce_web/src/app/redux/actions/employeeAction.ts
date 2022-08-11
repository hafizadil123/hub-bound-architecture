import {
  EMPLOYESS_LIST_REQUEST,
  EMPLOYESS_LIST_REQUEST_SUCCESS,
  EMPLOYESS_LIST_REQUEST_ERROR,
  EMPLOYES_DELETE_REQUEST,
  EMPLOYES_DELETE_REQUEST_SUCCESS,
  EMPLOYES_DELETE_REQUEST_ERROR,
} from "../actionTypes/type";

export const employeeListRequest = (paramsData, onSuccess) => {
  return {
    type: EMPLOYESS_LIST_REQUEST,
    params: paramsData,
    onSuccess,
  };
};

export const actionSuccess = (result, onSuccess) => {
  return {
    type: EMPLOYESS_LIST_REQUEST_SUCCESS,
    payload: result,
    onSuccess,
    error: null,
  };
};

export const actionError = (error) => {
  return {
    type: EMPLOYESS_LIST_REQUEST_ERROR,
    error: error,
    payload: null,
  };
};

export const employeeDeleteRequest = (paramsData, onEmpDeleteSuccess) => {
  return {
    type: EMPLOYES_DELETE_REQUEST,
    params: paramsData,
    onEmpDeleteSuccess,
  };
};

export const actionDeleteSuccess = (result) => {
  return {
    type: EMPLOYES_DELETE_REQUEST_SUCCESS,
    payload: result,
    error: null,
  };
};

export const actionDeleteError = (error) => {
  return {
    type: EMPLOYES_DELETE_REQUEST_ERROR,
    error: error,
    payload: null,
  };
};
