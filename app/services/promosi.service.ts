import { fetchAPI, getAuthHeaders } from "../libs/api";
import { EmailStatus, PromosiData } from "../types/types";

 const authHeaders = await getAuthHeaders();


export const getAllPromosi= async (): Promise<PromosiData[]> => {
      return await fetchAPI<PromosiData[]>("/promosi/");
};


export const create= async (
  data: Partial<PromosiData> | FormData
): Promise<PromosiData[]> => {
  const isFormData = data instanceof FormData;

  return await fetchAPI<PromosiData[]>("/promosi/create", {
    method: "POST",
    headers: isFormData
      ? authHeaders
      : { ...authHeaders, "Content-Type": "application/json" },
    body: isFormData ? data : JSON.stringify(data),
  });
};


export const getEmailLogs = async (
  id: string
): Promise<EmailStatus[]> => {
  return await fetchAPI<EmailStatus[]>(`/promosi/emaillogs/${id}`, {
    method: "GET",
    headers: {
      ...authHeaders,
      "Content-Type": "application/json",
    },
  });
};


export const update = async (
  id: string,
  data: Partial<PromosiData>
): Promise<PromosiData> => {
  return await fetchAPI<PromosiData>(`/promosi/${id}/update`, {
    method: "PUT",
    headers: {
      ...authHeaders,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};




export const deletePromosi = async (id: string): Promise<void> => {
  return await fetchAPI<void>(`/promosi/${id}`, {
    method: "DELETE",
    headers: {
      ...authHeaders,
    },
  });
};
