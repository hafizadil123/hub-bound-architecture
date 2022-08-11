import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BASE_URL } from "../environment";
import { API_STANDRAD_ERRORS } from "../ApiUrls";
import { getApiCall } from "../GetApiCall";
import { postApiCall } from "../PostApiCall";
import { deleteApiCallWithHeader } from "../DeleteApiCall";
import { useSelector, useDispatch } from "react-redux";
import { putApiCall } from "../PutApiCall";

interface UseRestProps {
  URL: string;
  PAYLOAD?: any;
  paginationEnabled?: boolean;
  useUrlOnly?: boolean;
  lazy?: boolean;
  persist?: boolean;
  optimisticResponse?: any;
  CALL_TYPE: number;
}
interface UseRestReturnProps<T> {
  data: T | null;
  loading: number;
  error: string | null;
  responseCode: number;
  fetchData: (
    currentDataLength: number
  ) => Promise<[T, Dispatch<SetStateAction<T | any>>]>;
  search: CallableFunction;
}

export const LOADING_TYPES = {
  STOPPED_LOADING: 0,
  LOADING: 1,
  FETCHING_MORE: 2,
  STOPPED_FETCHING_MORE: 3,
  REFRESHING: 4,
  STOP_REFRESHING: 5,
  SEARCHING: 6,
  STOP_SEARCHING: 7,
};
export const CALL_TYPES = {
  GET: 1,
  POST: 2,
  DELETE: 3,
  PUT: 4,
};

export const useRest = <T>({
  URL,
  PAYLOAD,
  CALL_TYPE,
  paginationEnabled = true,
  useUrlOnly = false,
  lazy = false,
  persist = false,
  optimisticResponse,
}: UseRestProps): UseRestReturnProps<T> => {
  /**
   * Base code for getting data from rest
   */
  //const { data: persistantData, setDataToStore } = usePersistantResponseStore();
  //const persistantResponse: T = !persist ? null : persistantData[URL];
  const dispatch = useDispatch();

  const { baseUrl } = BASE_URL;
  const [loading, setLoading] = useState(LOADING_TYPES.REFRESHING);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [responseCode, setResponseCode] = useState(200);
  const [isOptimisticInitialized, setOptimisticInitialized] = useState(false);
  const [searchText, setSearchText] = useState("");
  var isreset = false;

  // const setPersistantData = async (data: T) => {
  //   await setDataToStore({ ...persistantData, [URL]: data });
  // };

  const fetchData: (
    currentDataLength: number
  ) => Promise<[T, Dispatch<SetStateAction<T | any>>]> = async (
    currentDataLength: number
  ) => {
    setLoading(
      data
        ? currentDataLength === -1
          ? LOADING_TYPES.REFRESHING
          : currentDataLength === -2
          ? LOADING_TYPES.SEARCHING
          : LOADING_TYPES.FETCHING_MORE
        : LOADING_TYPES.LOADING
    );
    let responseJson;

    try {
      console.log("PAYLOAD RECEIVED ======= ", JSON.stringify(PAYLOAD));
      let url = BASE_URL + URL;
      if (CALL_TYPE === CALL_TYPES.GET) {
        responseJson = await getApiCall(url, PAYLOAD);
      } else if (CALL_TYPE === CALL_TYPES.DELETE) {
        responseJson = await deleteApiCallWithHeader(url);
      } else if (CALL_TYPE === CALL_TYPES.PUT) {
        responseJson = await putApiCall(url);
      } else {
        responseJson = await postApiCall(PAYLOAD, url);
      }

      console.log("Response JSON: ", responseJson);

      if (responseJson.status === 401) {
        setResponseCode(401);
      } else {
        responseJson = responseJson.data;
        await setError("");
        await setData(responseJson);
        await setResponseCode(responseJson.status);
      }
    } catch (exception) {
      setError(API_STANDRAD_ERRORS.NETWORK_ERROR);
    }
    setLoading(LOADING_TYPES.STOPPED_LOADING);
    return [responseJson, setData];
  };

  const search = (keyword: any) => {
    setSearchText(keyword);
    //fetchData(-2, keyword, searchText);
  };

  useEffect(() => {
    if (!lazy) fetchData(0);
  }, [URL]);

  return {
    data,
    loading,
    error,
    fetchData,
    search,
    responseCode,
  };
};

export default useRest;
