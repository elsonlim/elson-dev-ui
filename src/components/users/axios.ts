import axios from "axios";

export const httpClient = axios.create({
  baseURL: process.env.REACT_APP_AUTH_SERVER_URL,
  withCredentials: true,
  timeout: 1000,
});
