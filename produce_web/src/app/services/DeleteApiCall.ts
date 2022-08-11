import { apiWithHeader, apiWithoutHeader } from "./Api";
import { BASE_URL } from "./environment";

export const deleteApiCall = (url) => {

  console.log("DELETE API URL=====", url);
  return apiWithoutHeader(BASE_URL)
    .delete(url)
    .catch(async function (error) {

      console.log("DELETE API RESPONSE=====", error);

      return error.response;
    });
};


export const deleteApiCallWithHeader = (url) => {

  console.log("DELETE API URL=====", url);
  const CONTENT_TYPE = "application/json";
  return apiWithHeader(BASE_URL, CONTENT_TYPE)
    .delete(url)
    .catch(async function (error) {

      console.log("DELETE API RESPONSE WITH HEADER=====", error);

      return error.response;
    });
};