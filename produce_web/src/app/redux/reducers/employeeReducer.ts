import {
  EMPLOYESS_LIST_REQUEST,
  EMPLOYESS_LIST_REQUEST_SUCCESS,
  EMPLOYESS_LIST_REQUEST_ERROR,
  EMPLOYES_DELETE_REQUEST,
  EMPLOYES_DELETE_REQUEST_SUCCESS,
  EMPLOYES_DELETE_REQUEST_ERROR,
} from "../actionTypes/type";
const initialState = {
  data: null,
  isLoading: false,
};

const employeeReducer = (state, action) => {
  let object;
  if (state === undefined) {
    return initialState;
  }

  switch (action.type) {
    case EMPLOYESS_LIST_REQUEST:
      object = {
        ...state,
        isLoading: true,
      };
      break;

    case EMPLOYESS_LIST_REQUEST_ERROR:
      object = {
        ...state,
        isLoading: false,
      };
      break;

    case EMPLOYESS_LIST_REQUEST_SUCCESS:
      object = {
        ...state,
        data: action.payload,
        isLoading: false,
      };
      break;

    case EMPLOYES_DELETE_REQUEST:
      object = {
        ...state,
        isLoading: true,
      };

      break;

    case EMPLOYES_DELETE_REQUEST_SUCCESS:
      object = {
        ...state,
        isLoading: false,
      };
      break;

    case EMPLOYES_DELETE_REQUEST_ERROR:
      object = {
        ...state,
        isLoading: false,
      };
      break;

    default:
      object = state;
      break;
  }
  return object;
};

export default employeeReducer;
