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
      } catch (error: any) {
        if (isMounted) {
          if (error?.response?.status === 404) {
            setVoucher([]);
          } else {
            setError(error?.response?.data?.message || error?.message || "Gagal memuat Booking");
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
