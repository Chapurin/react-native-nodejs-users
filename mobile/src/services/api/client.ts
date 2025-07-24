import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.apiUrl;

import { getToken, removeToken } from "../storage/auth";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface ApiError {
  message: string;
  statusCode?: number;
}

api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await removeToken();
    }
    return Promise.reject(error);
  },
);

export default api;
