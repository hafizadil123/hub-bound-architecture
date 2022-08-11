import {
  INVENTORY_LIST_REQUEST,
  INVENTORY_LIST_SUCCESS,
  INVENTORY_LIST_ERROR,
  INVENTORY_DELETE_REQUEST,
  INVENTORY_DELETE_SUCCESS,
  INVENTORY_DELETE_ERROR,
} from "../actionTypes/type";

const initialState = {
  data: null,
  isLoading: false,
};

const inventoryReducer = (state, action) => {
  let object;
  if (state === undefined) {
    return initialState;
  }

  switch (action.type) {
    case INVENTORY_LIST_REQUEST:
      object = {
        ...state,
        isLoading: true,
      };
      break;

    case INVENTORY_LIST_SUCCESS:
      object = {
        ...state,
        data: action.payload,
        isLoading: false,
      };
      break;

    case INVENTORY_LIST_ERROR:
      object = {
        ...state,
        isLoading: false,
      };
      break;

    case INVENTORY_DELETE_REQUEST:
      object = {
        ...state,
        isLoading: true,
      };
      break;

    case INVENTORY_DELETE_SUCCESS:
      object = {
        ...state,
        isLoading: false,
      };
      break;

    case INVENTORY_DELETE_ERROR:
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

export default inventoryReducer;
