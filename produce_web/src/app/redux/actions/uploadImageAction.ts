import {
      UPLOAD_IMAGE_ERROR,UPLOAD_IMAGE_REQUEST,UPLOAD_IMAGE_SUCCESS,
      IMAGE_LISTING_ERROR,IMAGE_LISTING_REQUEST,IMAGE_LISTING_SUCCESS
     } from "../actionTypes/type";
     
     export const uploadImageRequest = (paramsData, onSuccess) => {
       return {
         type: UPLOAD_IMAGE_REQUEST,
         params: paramsData,
         onSuccess,
       };
     };
     
     export const uploadImageSuccess = (result,onSuccess) => {
       return {
         type: UPLOAD_IMAGE_SUCCESS,
         payload: result,
         error: null,
         onSuccess
       };
     };
     
     export const uploadImageError = (error,onSuccess) => {
       return {
         type: UPLOAD_IMAGE_ERROR,
         error: error,
         payload: null,
         onSuccess
       };
     };


    //  image listing actions
    export const imageListingRequest = (paramsData, onAccountInfo) => {
      return {
        type: IMAGE_LISTING_REQUEST,
        params: paramsData,
        onAccountInfo,
      };
    };
    
    export const imageListingSuccess = (result) => {
      return {
        type: IMAGE_LISTING_SUCCESS,
        payload: result,
        error: null,
      };
    };
    
    export const imageListingError = (error) => {
      return {
        type: IMAGE_LISTING_ERROR,
        error: error,
        payload: null,
      };
    };
     