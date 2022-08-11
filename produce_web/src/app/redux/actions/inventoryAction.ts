import {
  INVENTORY_LIST_REQUEST,
  INVENTORY_LIST_SUCCESS,
  INVENTORY_LIST_ERROR,
  INVENTORY_DELETE_REQUEST,
  INVENTORY_DELETE_SUCCESS,
  INVENTORY_DELETE_ERROR,
  INVENTORY_UPDATE_ERROR,
  INVENTORY_UPDATE_REQUEST,
  INVENTORY_UPDATE_SUCCESS,
  IMAGE_DELETE_ERROR,
  IMAGE_DELETE_REQUEST,
  IMAGE_DELETE_SUCCESS,
} from "../actionTypes/type";

export const inventoryListRequest = (paramsData, onSuccess) => {
  return {
    type: INVENTORY_LIST_REQUEST,
    params: paramsData,
    onSuccess,
  };
};

export const actionInventoryListSuccess = (result, onSuccess) => {
  return {
    type: INVENTORY_LIST_SUCCESS,
    payload: result,
    error: null,
    onSuccess,
  };
};

export const actionInventoryListError = (error) => {
  return {
    type: INVENTORY_LIST_ERROR,
    error: error,
    payload: null,
  };
};

export const inventoryDeleteRequest = (
  paramsData,
  onInventoryDeleteSuccess
) => {
  return {
    type: INVENTORY_DELETE_REQUEST,
    params: paramsData,
    onInventoryDeleteSuccess,
  };
};

export const actionInventoryDeleteSuccess = (result) => {
  return {
    type: INVENTORY_DELETE_SUCCESS,
    payload: result,
    error: null,
  };
};

export const actionInventoryDeleteError = (error) => {
  return {
    type: INVENTORY_DELETE_ERROR,
    error: error,
    payload: null,
  };
};
/// inventory update
export const inventoryUpdateRequest = (paramsData, onSuccess) => {
  return {
    type: INVENTORY_UPDATE_REQUEST,
    params: paramsData,
    onSuccess,
  };
};

export const inventoryUpdateSuccess = (result, onSuccess) => {
  return {
    type: INVENTORY_UPDATE_SUCCESS,
    payload: result,
    error: null,
    onSuccess,
  };
};

export const inventoryUpdateError = (error) => {
  return {
    type: INVENTORY_UPDATE_ERROR,
    error: error,
    payload: null,
  };
};
// delete images
export const deleteImageRequest = (paramsData, onSuccess) => {
  return {
    type: IMAGE_DELETE_REQUEST,
    params: paramsData,
    onSuccess,
  };
};

export const deleteImageSuccess = (result, onSuccess) => {
  return {
    type: IMAGE_DELETE_SUCCESS,
    payload: result,
    error: null,
    onSuccess,
  };
};

export const deleteImageError = (error) => {
  return {
    type: IMAGE_DELETE_ERROR,
    error: error,
    payload: null,
  };
};
