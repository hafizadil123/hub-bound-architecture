import { apiWithGetHeader } from "./Api";
import {BASE_URL} from './../services/environment';
import { API_STATUS } from "./ApiUrls";

export const getApiCall = async( url,payload) => {

  const response = await apiWithGetHeader(BASE_URL,payload).get(url)
    .catch(function (error) {
      
      console.log("GET API CALL======= ", "error=====" + url, JSON.stringify(error));
      return Promise.reject(error.response);
    });
   
    console.log("GET API CALL PARAMS RESPONSE======= ", JSON.stringify(response));
    if(response.data.status === API_STATUS.SUCCESS){
      return response
    }else{
      return Promise.reject(response);
    }
  
};
