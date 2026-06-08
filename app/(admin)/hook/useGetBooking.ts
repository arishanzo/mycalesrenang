import { getFetchCache } from "@/app/libs/fetchCahceh";
import { getAllBooking } from "@/app/services/transaksi.services";
import { useEffect, useState } from "react";
import { BookingSubmission } from "../../types/types";

export const UseGetBooking = () => {
  const [booking, setBooking] = useState<BookingSubmission[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchBooking = async () => {
      try {
        setLoading(true);
        const result = await getFetchCache( () => getAllBooking(), 5, 3000);
        if (isMounted) setBooking(result || null);

      } catch (error: any) {

        if (isMounted) {
          if (error?.response?.status === 404) {
            setBooking(null);
          } else {
            setError(
              error?.response?.data?.message ||
                error?.message ||
                "Gagal memuat Booking"
            );
          }
        }

      } finally {
        if (isMounted) setLoading(false);
      }

    };

    const timer = setTimeout(() => {
      fetchBooking();
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  return { booking, loading, error };
};
