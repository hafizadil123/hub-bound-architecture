import {
  ORDER_LISTING_ERROR,
  ORDER_LISTING_SUCCESS,
  ORDER_LISTING_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_ERROR,
  CREATE_ORDER_ERROR,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  LOAD_MORE_ORDER_LISTING_ERROR,
  LOAD_MORE_ORDER_LISTING_REQUEST,
  LOAD_MORE_ORDER_LISTING_SUCCESS,
  ORDER_VIEW_ERROR,
  ORDER_VIEW_REQUEST,
  ORDER_VIEW_SUCCESS,
  ORDER_SETTING_ERROR,
  ORDER_SETTING_REQUEST,
  ORDER_SETTING_SUCCESS,
  ORDER_UPDATE_ERROR,
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_SUCCESS,
} from "./../actionTypes/type";

export const orderListingRequest = (paramsData, onSuccess) => {
  return {
    type: ORDER_LISTING_REQUEST,
    params: paramsData,
    onSuccess,
  };
};

export const orderListingSuccess = (result, onSuccess) => {
  return {
    type: ORDER_LISTING_SUCCESS,
    payload: result,
    error: null,
    onSuccess,
  };
};

export const orderListingError = (error) => {
  return {
    type: ORDER_LISTING_ERROR,
    error: error,
    payload: null,
  };
};
// order details
export const orderDetailRequest = (paramsData, onSuccess) => {
  return {
    type: ORDER_DETAIL_REQUEST,
    params: paramsData,
    onSuccess,
  };
};

export const orderDetailSuccess = (result, onSuccess) => {
  return {
    type: ORDER_DETAIL_SUCCESS,
    payload: result,
    error: null,
    onSuccess,
  };
};

export const orderDetailError = (error) => {
  return {
    type: ORDER_DETAIL_ERROR,
    error: error,
    payload: null,
  };
};
//order create
export const orderCreateRequest = (paramsData, onSuccess) => {
  return {
    type: CREATE_ORDER_REQUEST,
    params: paramsData,
    onSuccess,
  };
};

export const orderCreateSuccess = (result, onSuccess) => {
  return {
    type: CREATE_ORDER_SUCCESS,
    payload: result,
    error: null,
    onSuccess,
  };
};

export const orderCreateError = (error) => {
  return {
    type: CREATE_ORDER_ERROR,
    error: error,
    payload: null,
  };
};

//load more order listing

//order create
export const loadMoreOrderRequest = (paramsData, onSuccess) => {
  return {
    type: LOAD_MORE_ORDER_LISTING_REQUEST,
    params: paramsData,
    onSuccess,
  };
};

export const loadMoreOrderSuccess = (result, onSuccess) => {
  return {
    type: LOAD_MORE_ORDER_LISTING_SUCCESS,
    payload: result,
    error: null,
    onSuccess,
  };
};

export const loadMoreOrderError = (error) => {
  return {
    type: LOAD_MORE_ORDER_LISTING_ERROR,
    error: error,
    payload: null,
  };
};
//orderview
export const orderViewRequest = (paramsData, onSuccess) => {
  return {
    type: ORDER_VIEW_REQUEST,
    params: paramsData,
    onSuccess,
  };
};

export const orderViewSuccess = (result, onSuccess) => {
  return {
    type: ORDER_VIEW_SUCCESS,
    payload: result,
    error: null,
    onSuccess,
  };
};

export const orderViewError = (error) => {
  return {
    type: ORDER_VIEW_ERROR,
    error: error,
    payload: null,
  };
};

//order setting
export const orderSettingRequest = (paramsData, onSuccess) => {
  return {
    type: ORDER_SETTING_REQUEST,
    params: paramsData,
    onSuccess,
  };
};

export const orderSettingSuccess = (result, onSuccess) => {
  return {
    type: ORDER_SETTING_SUCCESS,
    payload: result,
    error: null,
    onSuccess,
  };
};

export const orderSettingError = (error) => {
  return {
    type: ORDER_SETTING_ERROR,
    error: error,
    payload: null,
  };
};

//order update
export const orderUpdateRequest = (paramsData, onSuccess) => {
  return {
    type: ORDER_UPDATE_REQUEST,
    params: paramsData,
    onSuccess,
  };
};

export const orderUpdateSuccess = (result, onSuccess) => {
  return {
    type: ORDER_UPDATE_SUCCESS,
    payload: result,
    error: null,
    onSuccess,
  };
};

export const orderUpdateError = (error) => {
  return {
    type: ORDER_UPDATE_ERROR,
    error: error,
    payload: null,
  };
};
