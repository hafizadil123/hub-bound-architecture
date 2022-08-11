import {
  SETTINGS_INFO_REQUEST,
  SETTINGS_INFO_REQUEST_SUCCESS,
  SETTINGS_INFO_REQUEST_ERROR,
} from "../actionTypes/type";

export const settingsInfoRequest = (paramsData, onSettingInfo) => {
  return {
    type: SETTINGS_INFO_REQUEST,
    params: paramsData,
    onSettingInfo,
  };
};

export const settingsInfoSuccess = (result) => {
  return {
    type: SETTINGS_INFO_REQUEST_SUCCESS,
    payload: result,
    error: null,
  };
};

export const settingsInfoError = (error) => {
  return {
    type: SETTINGS_INFO_REQUEST_ERROR,
    error: error,
    payload: null,
  };
};
