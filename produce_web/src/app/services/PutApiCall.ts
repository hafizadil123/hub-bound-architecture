import { apiWithHeader, apiWithCustomHeader } from "./Api";
import { BASE_URL } from "./environment";

export const putApiCall = async(url) => {
  const CONTENT_TYPE = "application/json";
  return apiWithHeader(BASE_URL, CONTENT_TYPE)
    .put(url)
    .catch(function (error) {
     // console.log("POST API CALL======= ", "URL=====" + url, JSON.stringify(error));
      return error.response;
    });
};