import axios from "axios";

axios.defaults.withCredentials = true;

export const openRequest = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL || ""}/api/v1`,
  signal: new AbortController().signal,
});

// Create an Axios instance with baseURL and other configurations
export const makePrivateRequest = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL || ""}/api/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
