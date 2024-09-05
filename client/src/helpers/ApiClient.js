import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

console.log(baseURL);

export const apiClientBase = axios.create({ baseURL });
export const apiClientAuth = axios.create({ baseURL });

apiClientAuth.interceptors.request.use((config) => {
  const authStorage = localStorage.getItem("user");

  if (authStorage) {
    config.headers.Authorization = `Bearer ${authStorage}`;
  }

  return config;
});
