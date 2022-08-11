import {
  GET_BUSINESS_HOUR_REQUEST,
  GET_BUSINESS_HOUR_REQUEST_SUCCESS,
  GET_BUSINESS_HOUR_REQUEST_ERROR,
  ADD_VS_EDIT_BUSINESS_HOUR_REQUEST,
  ADD_VS_EDIT_BUSINESS_HOUR_REQUEST_SUCCESS,
  ADD_VS_EDIT_BUSINESS_HOUR_REQUEST_ERROR,
} from "../actionTypes/type";
const initialState = {
  data: [],
  isLoading: false,
};

const businessHourReducer = (state = initialState, action) => {
  let object;
  switch (action.type) {
    case GET_BUSINESS_HOUR_REQUEST:
      object = {
        ...state,
        isLoading: true,
      };
      break;

    case GET_BUSINESS_HOUR_REQUEST_SUCCESS:
      object = {
        ...state,
        data: action.payload,
        isLoading: false,
      };
      break;

    case GET_BUSINESS_HOUR_REQUEST_ERROR:
      object = {
        ...state,
        isLoading: false,
        // data: action.payload,
      };
      break;
    //  add vs edit business hour
    case ADD_VS_EDIT_BUSINESS_HOUR_REQUEST:
      object = {
        ...state,
        data: {},
        isLoading: true,
      };
      break;

    case ADD_VS_EDIT_BUSINESS_HOUR_REQUEST_SUCCESS:
      object = {
        ...state,
        data: action.payload,
        isLoading: false,
      };
      break;

    case ADD_VS_EDIT_BUSINESS_HOUR_REQUEST_ERROR:
      object = {
        ...state,
        data: {},
        isLoading: false,
        // data: action.payload,
      };
      break;

    default:
      object = state;
      break;
  }
  return object;
};

export default businessHourReducer;
