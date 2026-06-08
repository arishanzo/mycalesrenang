
'use client';
import { useEffect, useState } from "react";
import { fetchAPI } from "../libs/api";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";


type SessionResponse = {
  loggedIn: boolean;
  user?: { id: number; email: string };
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {

    const pathname = usePathname();

  
   const [loading, setLoading] = useState(false);

    const router = useRouter();
   useEffect(() => {
    const checkSession = async () => {
    
      try{
        const res = await fetchAPI<SessionResponse>("/auth/session", {
          credentials: "include",
        });
  
        if (res.loggedIn) {
          router.replace(pathname);
          setLoading(false);
         } else {
          setTimeout(() => setLoading(false), 5000);
        }
      
      }  catch {
        setTimeout(() => setLoading(false), 5000);
      }
     
    };

  const timeoutId = setTimeout(checkSession, 1000);

  return () => clearTimeout(timeoutId);
}, [router]);

if (loading) {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
    </div>
  );
} 

  return (
    <div className="min-h-screen bg-marine-50">
      {children}
    </div>
  );
}
