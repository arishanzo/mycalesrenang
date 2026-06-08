import { fetchAPI } from "../libs/api";
import { LoginCredentials, LoginResponse, UbahPasswordCredentials } from "../types/types";


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


export const ubahPassword = async (id: string, data: UbahPasswordCredentials): Promise<UbahPasswordCredentials> => {
  // Gunakan id dari parameter (lebih stabil, tidak perlu hit /auth/session di awal).
  return await fetchAPI<UbahPasswordCredentials>(`/auth/ubahpassword/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
    credentials: "include",
  });
};


export const logout = async () => {
  await fetchAPI("/auth/logout", {
    method: "POST",
    credentials: 'include',
  })
  
};