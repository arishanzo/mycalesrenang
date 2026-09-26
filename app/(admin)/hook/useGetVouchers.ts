import { getFetchCache } from "@/app/libs/fetchCahceh";
import { useEffect, useState } from "react";
import { VouchersData } from "../../types/types";
import { getAllVourchers } from "@/app/services/vourchers.services";


export const UseGetVoucher = () => {
  const [voucher, setVoucher] = useState<VouchersData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchBooking = async () => {
      try {
        setLoading(true);
        const result = await getFetchCache(() => getAllVourchers(), 5, 3000);

        if (isMounted) {
          // pastikan ambil array
          setVoucher( result || []);
        }
      } catch (error: unknown) {
        if (isMounted) {
          const response =
            typeof error === "object" && error !== null && "response" in error
              ? error.response
              : undefined;
          const status =
            typeof response === "object" && response !== null && "status" in response
              ? response.status
              : undefined;
          const data =
            typeof response === "object" && response !== null && "data" in response
              ? response.data
              : undefined;
          const message =
            typeof data === "object" && data !== null && "message" in data
              ? data.message
              : undefined;

          if (status === 404) {
            setVoucher([]);
          } else {
            setError(
              (typeof message === "string" && message) ||
                (error instanceof Error ? error.message : undefined) ||
                "Gagal memuat Booking",
            );
          }
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    const timer = setTimeout(fetchBooking, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  return { voucher, loading, error };
};
