import {
    MOVE_PRODUCT_IMAGES_REQUEST,
    MOVE_PRODUCT_IMAGES_REQUEST_ERROR,
    MOVE_PRODUCT_IMAGES_REQUEST_SUCCESS
  } from "../actionTypes/type";
  const initialState = {
    data: null
  };
  
  const moveProductImagesReducer = (state = initialState, action) => {
    let object;
  
    switch (action.type) {
      case MOVE_PRODUCT_IMAGES_REQUEST:
        object = {
          ...state
        };
        break;
  
      case MOVE_PRODUCT_IMAGES_REQUEST_ERROR:
        object = {
          ...state
        };
        break;
  
      case MOVE_PRODUCT_IMAGES_REQUEST_SUCCESS:
        object = {
          ...state
          // data: action.payload,
        };
        break;
  
      default:
        object = state;
        break;
    }
    return object;
  };
  
  export default moveProductImagesReducer;
  