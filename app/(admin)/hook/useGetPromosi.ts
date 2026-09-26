import { getFetchCache } from "@/app/libs/fetchCahceh";
import { useEffect, useState } from "react";
import { PromosiData } from "../../types/types";
import { getAllPromosi } from "@/app/services/promosi.service";


export const UseGetPromosi = () => {
  const [promosi, setPromosi] = useState<PromosiData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPromosi = async () => {
      try {
        setLoading(true);
        const result = await getFetchCache(() => getAllPromosi(), 5, 3000);

        if (isMounted) {
          // pastikan ambil array
          setPromosi( result || []);
        }
      } catch (error: unknown) {
        if (isMounted) {
          const err = error as {
            response?: {
              status?: number;
              data?: { message?: string };
            };
            message?: string;
          };

          if (err.response?.status === 404) {
            setPromosi([]);
          } else {
            setError(err.response?.data?.message || err.message || "Gagal memuat Booking");
          }
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    const timer = setTimeout(fetchPromosi, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  return { promosi, loading, error };
};
