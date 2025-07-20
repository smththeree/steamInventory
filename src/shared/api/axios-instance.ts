import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// api.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${import.meta.env.VITE_API_KEY}`;
//   return config;
// });

export default api;
