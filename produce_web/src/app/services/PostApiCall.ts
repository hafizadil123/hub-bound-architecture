import { apiWithHeader } from "./Api";
import { BASE_URL } from "./environment";
import { API_STATUS } from "./ApiUrls";
import Utility from "../utility/utility";

export const postApiCall = async (params, url) => {
  const CONTENT_TYPE = "application/json";
  const response = await apiWithHeader(BASE_URL, CONTENT_TYPE)
    .post(url, params)
    .catch(function (error) {
      Utility.showToast("error", error.response.data.message);
      return Promise.reject(error.response);
    });

  if (response.data.status_code === API_STATUS.SUCCESS) {
    if (params.showSuccessToast !== false) {
      Utility.showToast("success", response.data.message);
    }
    return response;
  } else {
    return Promise.reject(response);
  }
};

export const postApiCallImage = async (formData, url) => {
  const CONTENT_TYPE = "multipart/form-data";
  return apiWithHeader(BASE_URL, CONTENT_TYPE)
    .post(url, formData)
    .catch(function (error) {
      return error.response;
    });
};
