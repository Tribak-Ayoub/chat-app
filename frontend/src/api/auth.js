import http from "./http";

export const registerApi = (payload) =>
  http.post("/api/auth/register", payload);
export const loginApi = (payload) => http.post("/api/auth/login", payload);
