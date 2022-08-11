import axios from "axios";
const CONTENT_TYPE = "application/json";
const TIMEOUT = 10000;

export const apiWithoutHeader = (baseUrl) =>
  axios.create({
    baseURL: baseUrl,
    timeout: TIMEOUT,
    headers: {
      "Content-Type": CONTENT_TYPE,
    },
  });

export const apiWithGetHeader = (baseUrl, payload) =>
  axios.create({
    baseURL: baseUrl,
    timeout: TIMEOUT,
    headers: {
      "Content-Type": CONTENT_TYPE,
      Company: payload,
    },
  });

export const apiWithHeader = (baseUrl, CONTENT_TYPE) =>
  axios.create({
    baseURL: baseUrl,
    method: "post",
    timeout: TIMEOUT,
    headers: {
      "Content-Type": CONTENT_TYPE,
      "Access-Control-Request-Origin": "*",
      "X-Requested-With": "XMLHttpRequest",
      "Access-Control-Allow-Origin": "*",
    },
    data: {},
  });

export const apiWithCustomHeader = (headerparams, baseUrl) =>
  axios.create({
    baseURL: baseUrl,
    timeout: TIMEOUT,
    headers: headerparams,
  });
