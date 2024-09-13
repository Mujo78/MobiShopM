import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

export const apiClientBase = axios.create({ baseURL });
export const apiClientAuth = axios.create({ baseURL });

apiClientAuth.interceptors.request.use((config) => {
  const authStorage = localStorage.getItem("user");
  const inStorage = JSON.parse(authStorage) ?? null;

  if (inStorage) {
    config.headers.Authorization = `Bearer ${inStorage.token}`;
  }

  return config;
});
