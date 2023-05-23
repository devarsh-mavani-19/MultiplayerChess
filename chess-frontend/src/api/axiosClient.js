import axios from "axios";
import queryString from "query-string";
import authUtils from "../authUtils/getUsername";
const baseUrl = "http://127.0.0.1:5000/api/v1/";

const axiosClient = axios.create({
  baseURL: baseUrl,
  paramsSerializer: (params) => queryString.stringify({ params }),
});

axiosClient.interceptors.request.use(async (config) => {
  let token = authUtils.getUsername();
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      authorization: `${token}`,
    },
  };
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    if (!err.response) {
      return alert(err);
    }
    throw err.response;
  }
);

export default axiosClient;
