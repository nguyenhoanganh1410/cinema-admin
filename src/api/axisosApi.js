// api/axiosClient.js
import axios from "axios";
import queryString from "query-string";
import { parse, stringify } from "qs";
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-
//config` for the full list of configs

const axiosApi = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: "https://18.142.51.247",
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: {
    encode: parse,
    serialize: stringify,
  },
  // paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);

export default axiosApi;
