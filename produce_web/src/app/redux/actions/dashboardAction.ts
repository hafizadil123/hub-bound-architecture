import {
  DASHBOARD_REQUEST,
  DASHBOARD_REQUEST_SUCCESS,
  DASHBOARD_REQUEST_ERROR,
  CLEAR_DASHBOARD_DATA,
} from "../actionTypes/type";

export const dashboardRequest = (paramsData, onSuccess) => {
  return {
    type: DASHBOARD_REQUEST,
    params: paramsData,
    onSuccess,
  };
};

export const actionSuccess = (result) => {
  return {
    type: DASHBOARD_REQUEST_SUCCESS,
    payload: result,
    error: null,
  };
};

export const actionError = (error) => {
  return {
    type: DASHBOARD_REQUEST_ERROR,
    error: error,
    payload: null,
  };
};
export function clearDashboard() {
  return {
    type: CLEAR_DASHBOARD_DATA,
    payload: {},
  };
}
