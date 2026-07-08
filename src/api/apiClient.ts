import axios from "axios";
import { ENV } from "../config/env";
import { getAccessToken } from "../services/authStorage";

const apiClient = axios.create({
  baseURL: ENV.BASE_URL,
  timeout: ENV.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await getAccessToken();

      if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
      }

      console.log("================================");
      console.log("API Request");
      console.log("URL:", `${config.baseURL}${config.url}`);
      console.log("Method:", config.method?.toUpperCase());
      console.log("Headers:", config.headers);
      console.log("Payload:", config.data);
      console.log("================================");

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    console.log("================================");
    console.log("API Response");
    console.log("Status:", response.status);
    console.log("Data:", response.data);
    console.log("================================");

    return response;
  },
  (error) => {
    console.log("================================");
    console.log("API Error");
    console.log("Status:", error?.response?.status);
    console.log("Data:", error?.response?.data);
    console.log("Message:", error?.message);
    console.log("================================");

    return Promise.reject(error);
  }
);

export default apiClient;