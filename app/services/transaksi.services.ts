import { fetchAPI, getAuthHeaders } from "../libs/api";
import { BookingSubmission } from "../types/types";

 const authHeaders = await getAuthHeaders();


export const getAllBooking = async (): Promise<BookingSubmission[]> => {
      return await fetchAPI<BookingSubmission[]>("/transaksi/");
};


export const createBooking = async (
  data: Partial<BookingSubmission> | FormData
): Promise<BookingSubmission[]> => {
  const isFormData = data instanceof FormData;

  return await fetchAPI<BookingSubmission[]>("/transaksi/create", {
    method: "POST",
    headers: isFormData
      ? authHeaders
      : { ...authHeaders, "Content-Type": "application/json" },
    body: isFormData ? data : JSON.stringify(data),
  });
};



export const updatePerpanjangan = async (
  id: string,
  data: Partial<BookingSubmission> | FormData
): Promise<BookingSubmission> => {
  return await fetchAPI<BookingSubmission>(`/transaksi/${id}/perpanjangan`, {
    method: "PUT",
    headers: {
      ...authHeaders,
      // ❌ jangan set Content-Type, biarkan browser otomatis set multipart/form-data
    },
    body: data instanceof FormData ? data : JSON.stringify(data),
  });
  
};



export const deleteTransaksi = async (id: string): Promise<void> => {
  return await fetchAPI<void>(`/transaksi/${id}`, {
    method: "DELETE",
    headers: {
      ...authHeaders,
    },
  });
};



export const updateStatusBooking = async ( id: string, status: string) : Promise<BookingSubmission> => {
    
    return await fetchAPI<BookingSubmission>(`/transaksi/${id}/status`, {
        method: "PUT",
        headers: {
       ...authHeaders,
        "Content-Type": "application/json",
        },
        body: JSON.stringify({status}),
    });
  };