import axios from "axios";
import { cookies } from "next/headers";
// import { cookies } from "next/headers";


const axiosInstance = axios.create({
  baseURL:  "http://localhost:5000/api/v1",
});

axiosInstance.interceptors.request.use(
  function (config) {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (accessToken) {
      config.headers.Authorization = accessToken;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axiosInstance;