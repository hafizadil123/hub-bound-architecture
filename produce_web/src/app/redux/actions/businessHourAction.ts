
import {
       GET_BUSINESS_HOUR_REQUEST,
       GET_BUSINESS_HOUR_REQUEST_SUCCESS,
       GET_BUSINESS_HOUR_REQUEST_ERROR,
       ADD_VS_EDIT_BUSINESS_HOUR_REQUEST
       ,ADD_VS_EDIT_BUSINESS_HOUR_REQUEST_SUCCESS
       ,ADD_VS_EDIT_BUSINESS_HOUR_REQUEST_ERROR
     } from "../actionTypes/type";
     
     export const businessHourRequest = (paramsData, onSuccess , onFailure) => {
       return {
         type: GET_BUSINESS_HOUR_REQUEST,
         params: paramsData,
         onSuccess , onFailure
        
       };
     };
     
     export const businessHourSuccess = (result,onSuccess , onFailure) => {
       return {
         type: GET_BUSINESS_HOUR_REQUEST_SUCCESS,
         payload: result,
         error: null,
         onSuccess , onFailure
       };
     };
     
     export const businessHourError = (error,onSuccess , onFailure) => {
       return {
         type: GET_BUSINESS_HOUR_REQUEST_ERROR,
         error: error,
         payload: null,
         onSuccess , onFailure
       };
     };






     
    //  add vs edit business hours
    export const addVsEditBusinessHourRequest = (paramsData, onSuccess, onFailure) => {
     //alert('addVsEditBusinessHourRequest')
      return {
        type: ADD_VS_EDIT_BUSINESS_HOUR_REQUEST,
        params: paramsData,
        onSuccess,
        onFailure
       
      };
    };
    
    export const addVsEditBusinessHourSuccess = (result, onSuccess, onFailure) => {
      return {
        type: ADD_VS_EDIT_BUSINESS_HOUR_REQUEST_SUCCESS,
        payload: result,
        error: null,
        onSuccess, 
        onFailure
      };
    };
    
    export const addVsEditBusinessHourError = (error, onSuccess, onFailure) => {
      return {
        type: ADD_VS_EDIT_BUSINESS_HOUR_REQUEST_ERROR,
        error: error,
        payload: null,
        onSuccess, 
        onFailure
      };
    };
     