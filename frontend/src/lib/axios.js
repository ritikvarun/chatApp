import axios from "axios";

const getBaseURL = () => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  if (import.meta.env.VITE_BACKEND_URL) return `${import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "")}/api`;
  return import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api";
};

export const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});
