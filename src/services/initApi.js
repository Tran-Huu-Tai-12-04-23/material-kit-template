import axios from 'axios';
import { getAccessToken } from '../helper/index';

const initApi = (url, headers = {}) => {
  if (url === '') throw new Error('url not found');
  const api = axios.create({
    baseURL: url,
    timeout: 100000,
    headers: {
      'Content-Type': 'application/json',
      accept: '*/*',
      ...headers,
    },
  });

  api.interceptors.request.use(async (config) => {
    try {
      const token = await getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      // console.log("AsyncStorage error:", error);
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response.data,
    (error) =>
      // console.log(
      //   "\x1b[31m",
      //   "ERROR REQUEST URL:",
      //   error.config?.baseURL + error.config.url
      // );
      // console.log("\x1b[31m", "ERROR REQUEST Body:", error.config.data);
      // console.log(
      //   "\x1b[31m",
      //   "ERROR REQUEST Headers:",
      //   error?.response?.data?.message
      // );
      Promise.reject(new Error(error?.response?.data?.message))
  );

  return api;
};

export default initApi;
