import { getFetchCache } from "@/app/libs/fetchCahceh";
import { useEffect, useState } from "react";
import { EmailStatus} from "../../types/types";
import { getEmailLogs } from "@/app/services/promosi.service";


export const UseGetEmailLogs = (id : string) => {
  const [emailLogs, setemailLogs] = useState<EmailStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPromosi = async () => {
      try {
        setLoading(true);
        const result = await getFetchCache(() => getEmailLogs(id), 5, 3000);

        if (isMounted) {
          // pastikan ambil array
          setemailLogs( result || []);
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
            setemailLogs([]);
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
  }, [id]);

  return { emailLogs, loading, error };
};
