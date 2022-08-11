import {
  ADD_BUSINESS_REQUEST,
  ADD_BUSINESS_ERROR,
  ADD_BUSINESS_SUCCESS,
} from "../actionTypes/type";
const initialState = {
  data: [],
  isLoading: false,
};

const addBusinessReducer = (state = initialState, action) => {
  let object;
  switch (action.type) {
    //  add vs edit business
    case ADD_BUSINESS_REQUEST:
      object = {
        ...state,
        data: {},
        isLoading: true,
      };
      break;

    case ADD_BUSINESS_SUCCESS:
      object = {
        ...state,
        data: action.payload,
        isLoading: false,
      };
      break;

    case ADD_BUSINESS_ERROR:
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

export default addBusinessReducer;
