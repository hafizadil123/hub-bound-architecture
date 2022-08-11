import {
    USER_INVITATION_TOKEN_REQUEST,
    USER_INVITATION_TOKEN_REQUEST_ERROR,
    USER_INVITATION_TOKEN_REQUEST_SUCCESS
  } from "../actionTypes/type";
  const initialState = {
    data: null
  };
  
  const invitationGetUserReducer = (state = initialState, action) => {
    let object;
  
    switch (action.type) {
      case USER_INVITATION_TOKEN_REQUEST:
        object = {
          ...state
        };
        break;
  
      case USER_INVITATION_TOKEN_REQUEST_ERROR:
        object = {
          ...state
        };
        break;
  
      case USER_INVITATION_TOKEN_REQUEST_SUCCESS:
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
  
  export default invitationGetUserReducer;
  