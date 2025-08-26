import axios from "axios";
import { useUserStore } from "../stores/user";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

http.interceptors.request.use((config) => {
  // attach JWT if present
  const store = useUserStore();
  if (store?.token) {
    config.headers.Authorization = `Bearer ${store.token}`;
  }
  return config;
});

export default http;
