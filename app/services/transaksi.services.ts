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



export const updateStatusBooking = async ( id: string, status: string) : Promise<BookingSubmission> => {
    
    return await fetchAPI<BookingSubmission>(`/transaksi/${id}/status`, {
        method: "PUT",
        headers: {
       ...authHeaders,
        "Content-Type": "application/json",
        },
        body: JSON.stringify({status}),
    });

}