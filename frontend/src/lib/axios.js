import axios from "axios";

export const getBackendURL = () => {
  let url = import.meta.env.VITE_BACKEND_URL;
  if (url) {
    url = url.trim().replace(/\/$/, "");
    if (!/^https?:\/\//i.test(url)) {
      url = `https://${url}`;
    }
    return url;
  }
  if (import.meta.env.MODE === "development") {
    return "http://localhost:3000";
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

// Attach Authorization header if token exists in localStorage (fixes mobile & cross-domain 3rd-party cookie blocking)
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
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

