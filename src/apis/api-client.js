import axios from "axios";
import { apiBaseUrl } from "./apis";
import axiosRetry from "axios-retry";

const apiInstance = () => {
  const api = axios.create({
    baseURL: apiBaseUrl,
  });
  axiosRetry(api, { retries: 3 });

  api.interceptors.request.use(async (config) => {
    // let accessToken = localStorage.getItem(localStorageConstants.accessToken);
    // if (accessToken) {
    //   if (config.method !== "OPTIONS") {
    //     config.headers.authorization = `Bearer ${accessToken}`;
    //   }
    // }

    console.log("REQUEST", config);
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      console.log("RESPONSE", response);

      // if (response.data?.status === "logout") {
      //   console.log(response.data, "response.data");
      //   alert(response.data?.message);
      //   store.dispatch(logout());
      // }
      return response;
    },
    (error) => {
      console.log("ERROR", error, error.response);
      //throw error.response;
      throw error;
    }
  );

  return api;
};

const apiClient = apiInstance();

export default apiClient;
