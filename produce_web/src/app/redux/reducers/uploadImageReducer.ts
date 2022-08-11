
import {
      UPLOAD_IMAGE_ERROR,UPLOAD_IMAGE_REQUEST,UPLOAD_IMAGE_SUCCESS,
      IMAGE_LISTING_ERROR,IMAGE_LISTING_REQUEST,IMAGE_LISTING_SUCCESS
     } from "../actionTypes/type";
     const initialState = {
       data: [],
       imageData: null
     };
     
     const uploadImageReducer = (state =initialState, action) => {
       let object;
       switch (action.type) {
         case UPLOAD_IMAGE_REQUEST:
           object = {
             ...state,
           };
           break;
     
         case UPLOAD_IMAGE_SUCCESS:
           object = {
             ...state,
             imageData: action.payload,
           };
           break;
     
         case UPLOAD_IMAGE_ERROR:
           object = {
             ...state,
            // data: action.payload,
           };
           break;
          // image listing 

          case IMAGE_LISTING_REQUEST:
            object = {
              ...state,
            };
            break;
      
          case IMAGE_LISTING_SUCCESS:
            object = {
              ...state,
              data: action.payload,
            };
            break;
      
          case IMAGE_LISTING_ERROR:
            object = {
              ...state,
             // data: action.payload,
            };
            break;
           
     
         default:
           object = state;
           break;
       }
       return object;
     };
     
     export default uploadImageReducer;
     