import {
  DASHBOARD_REQUEST,
  DASHBOARD_REQUEST_ERROR,
  DASHBOARD_REQUEST_SUCCESS,
} from "../actionTypes/type";
const initialState = {
  data: null,
  isLoading: false,
};

const dashboardReducer = (state = initialState, action) => {
  let object;

  switch (action.type) {
    case DASHBOARD_REQUEST:
      object = {
        ...state,
        isLoading: true,
      };
      break;

    case DASHBOARD_REQUEST_ERROR:
      object = {
        ...state,
        isLoading: false,
      };
      break;

    case DASHBOARD_REQUEST_SUCCESS:
      object = {
        ...state,
        data: action.payload,
        isLoading: false,
      };
      break;

    default:
      object = state;
      break;
  }
  return object;
};

export default dashboardReducer;
