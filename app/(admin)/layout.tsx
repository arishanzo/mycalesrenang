
'use client';
import { useEffect, useState } from "react";
import { fetchAPI } from "../libs/api";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { AuthProvider } from "../context/authProvider";


type SessionResponse = {
  loggedIn: boolean;
  user?: { id: number; email: string };
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {

    const pathname = usePathname();

  
   const [loading, setLoading] = useState(true);

    const router = useRouter();
   useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetchAPI<SessionResponse>("/auth/session", {
          credentials: "include",
        });

        if (res.loggedIn) {
          router.replace(pathname);
          setLoading(false);
          return;
        }

        router.replace("/login");
      } catch (err) {
        // Token expired / invalid -> redirect tanpa bikin Uncaught
        const e = err as { message?: unknown; code?: string };
        if (e?.code === "AUTH_EXPIRED" || /token expired|invalid token|login again/i.test(String(e?.message))) {
          router.replace("/login");
          return;
        }
      }finally{
         setLoading(false);
      }
    };

  const timeoutId = setTimeout(checkSession, 5000);

  return () => clearTimeout(timeoutId);
}, [router, pathname]);


if (loading) {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
    </div>
  );
} 

  return (
     
    <div className="min-h-screen bg-marine-50" suppressHydrationWarning>
      {children}
    </div>
  );
}
