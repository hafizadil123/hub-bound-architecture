import {
  GET_LOCATION_REQUEST,
  GET_LOCATION_REQUEST_SUCCESS,
  GET_LOCATION_REQUEST_ERROR,
  SAVE_LOCATION_REQUEST,
  SAVE_LOCATION_REQUEST_SUCCESS,
  SAVE_LOCATION_REQUEST_ERROR,
  DELETE_LOCATION_REQUEST,
  DELETE_LOCATION_REQUEST_SUCCESS,
  DELETE_LOCATION_REQUEST_ERROR,
} from "../actionTypes/type";
const initialState = {
  data: null,
  isLoading: false,
};

const locationReducer = (state = initialState, action) => {
  let object;
  switch (action.type) {
    case GET_LOCATION_REQUEST:
      object = {
        ...state,
        isLoading: true,
      };
      break;

    case GET_LOCATION_REQUEST_SUCCESS:
      object = {
        ...state,
        data: action.payload,
        isLoading: false,
      };
      break;

    case GET_LOCATION_REQUEST_ERROR:
      object = {
        ...state,
        isLoading: false,
        // data: action.payload,
      };
      break;
    //  add vs edit business hour
    case SAVE_LOCATION_REQUEST:
      object = {
        ...state,
        isLoading: true,
        data: {},
      };
      break;

    case SAVE_LOCATION_REQUEST_SUCCESS:
      object = {
        ...state,
        data: action.payload,
        isLoading: false,
      };
      break;

    case SAVE_LOCATION_REQUEST_ERROR:
      object = {
        ...state,
        data: {},
        isLoading: false,
        // data: action.payload,
      };
      break;

    case DELETE_LOCATION_REQUEST:
      object = {
        ...state,
        isLoading: true,
        data: {},
      };
      break;

    case DELETE_LOCATION_REQUEST_SUCCESS:
      object = {
        ...state,
        data: action.payload,
        isLoading: false,
      };
      break;

    case DELETE_LOCATION_REQUEST_ERROR:
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

export default locationReducer;
