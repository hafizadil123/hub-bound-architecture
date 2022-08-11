import { UPDATE_BUSINESS_ID } from "../actionTypes/type";

const initialState = {
  data: "1",
};

const updateBusinessIdReducer = (state = initialState, action) => {
  //console.log("updateBusinessIdReducer.action122112.", JSON.stringify(action));
  switch (action.type) {
    case UPDATE_BUSINESS_ID:
      return {
        data: action.params,
      };

    default:
      return state;
  }
};
export default updateBusinessIdReducer;
