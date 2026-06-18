import { fetchAPI, getAuthHeaders } from "../libs/api";
import { VouchersData } from "../types/types";

 const authHeaders = await getAuthHeaders();


export const getAllVourchers= async (): Promise<VouchersData[]> => {
      return await fetchAPI<VouchersData[]>("/vouchers/");
};


export const createVouchers= async (
  data: Partial<VouchersData> | FormData
): Promise<VouchersData[]> => {
  const isFormData = data instanceof FormData;

  return await fetchAPI<VouchersData[]>("/vouchers/create", {
    method: "POST",
    headers: isFormData
      ? authHeaders
      : { ...authHeaders, "Content-Type": "application/json" },
    body: isFormData ? data : JSON.stringify(data),
  });
};



export const update = async (
  id: string,
  data: Partial<VouchersData>
): Promise<VouchersData> => {
  return await fetchAPI<VouchersData>(`/vouchers/${id}/update`, {
    method: "PUT",
    headers: {
      ...authHeaders,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};




export const deleteVoucher = async (id: string): Promise<void> => {
  return await fetchAPI<void>(`/vouchers/${id}`, {
    method: "DELETE",
    headers: {
      ...authHeaders,
    },
  });
};
