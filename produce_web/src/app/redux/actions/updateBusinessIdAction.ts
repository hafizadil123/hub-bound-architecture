import { UPDATE_BUSINESS_ID } from "../actionTypes/type";

export const updateBusinessIdRequest = (paramsData) => {
  // alert(paramsData);
  return {
    type: UPDATE_BUSINESS_ID,
    params: paramsData,
  };
};
