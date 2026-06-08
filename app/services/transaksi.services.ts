import { fetchAPI, getAuthHeaders } from "../libs/api";
import { BookingSubmission } from "../types/types";

 const authHeaders = await getAuthHeaders();


export const getAllBooking = async (): Promise<BookingSubmission[]> => {
      return await fetchAPI<BookingSubmission[]>("/transaksi");
};


export const createBooking = async (data: Partial<BookingSubmission>): Promise<BookingSubmission[]> => {
    return await fetchAPI<BookingSubmission[]>('/transaksi/create', {
        method: 'POST',
        headers: {
            ...authHeaders,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};


export const updateStatusBooking = async ( id: string, data: Partial<BookingSubmission>) : Promise<BookingSubmission> => {
    
    return await fetchAPI<BookingSubmission>(`/transaksi/${id}/status`, {
        method: "PUT",
        headers: {
       ...authHeaders,
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

}