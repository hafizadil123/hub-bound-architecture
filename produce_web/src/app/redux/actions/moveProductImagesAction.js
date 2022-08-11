import {
    MOVE_PRODUCT_IMAGES_REQUEST,
    MOVE_PRODUCT_IMAGES_REQUEST_SUCCESS,
    MOVE_PRODUCT_IMAGES_REQUEST_ERROR,
  } from "../actionTypes/type";
  
  export const moveProductImagesRequest = (paramsData, onSuccess, onError) => {
    return {
      type: MOVE_PRODUCT_IMAGES_REQUEST,
      params: paramsData,
      onSuccess,
      onError
    };
  };
  
  export const actionSuccess = (result) => {
    return {
      type: MOVE_PRODUCT_IMAGES_REQUEST_SUCCESS,
      payload: result,
      error: null
    };
  };
  
  export const actionError = (error) => {
    return {
      type: MOVE_PRODUCT_IMAGES_REQUEST_ERROR,
      error: error,
      payload: null
    };
  };
  