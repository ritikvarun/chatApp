import axios from "axios";

const AZURE_BACKEND_URL = "https://ritikvarun-chatapp-gbesgpa2fzfkb2ej.centralindia-01.azurewebsites.net";

export const getBackendURL = () => {
  if (import.meta.env.VITE_BACKEND_URL) {
    return import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "");
  }
  if (import.meta.env.MODE === "development") {
    return "http://localhost:3000";
  }
  // When running on a separate host (e.g. Vercel / Netlify)
  if (typeof window !== "undefined" && !window.location.host.includes("azurewebsites.net")) {
    return AZURE_BACKEND_URL;
  }
  return "";
};

const getBaseURL = () => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  const backend = getBackendURL();
  return backend ? `${backend}/api` : "/api";
};

export const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

// Guard against HTML responses (e.g. when an SPA rewrite catches a missing API route)
axiosInstance.interceptors.response.use(
  (response) => {
    if (typeof response.data === "string" && response.data.trim().startsWith("<!doctype")) {
      return Promise.reject(new Error("Received HTML instead of JSON from API"));
    }
    return response;
  },
  (error) => Promise.reject(error)
);

