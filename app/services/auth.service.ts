import { fetchAPI } from "../libs/api";
import { LoginCredentials, LoginResponse } from "../types/types";

export const login = async ( credentials: LoginCredentials): Promise<LoginResponse> => {
  const res = await fetchAPI<LoginResponse>("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
    credentials: "include",
  });

  return res;
};

export const logout = async () => {
  await fetchAPI("/auth/logout", {
    method: "POST",
    credentials: 'include',
  })
};