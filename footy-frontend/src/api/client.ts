import axios from "axios";
import { API_BASE } from "../lib/utils";
import { toast } from "sonner";

export const http = axios.create({
  baseURL: API_BASE,
  withCredentials: false,
});

http.interceptors.response.use(
  (r) => r,
  (e) => {
    const msg = e?.response?.data?.error || e.message || "Request failed";
    toast.error(msg);
    return Promise.reject(new Error(msg));
  }
);