// src/context/AuthProvider.jsx
import { useState, useEffect } from "react";
import { AuthContext } from "./authContext";
import { fetchAPI } from "../libs/api";

type SessionResponse = {
  loggedIn: boolean;
  user?: { iduser: string; email: string };
};

// Provider component
export const AuthProvider = ({ children } : { children : React.ReactNode}) => {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user saat pertama kali aplikasi dibuka
  useEffect(() => {
    const controller = new AbortController();
    
    const fetchUser = async () => {
      if (user) return; // Skip jika user sudah ada
      
      try {
        // Test session dengan endpoint yang tidak butuh auth
        const sessionCheck =  await fetchAPI<SessionResponse>("/auth/session", {
                        credentials: "include",
                      });
                      ;
        
        if (sessionCheck.user?.iduser) {
          const res = sessionCheck.user?.iduser
          setUser(res);
        } else {
          setUser(null);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Error fetching user:", error);
          setUser(null);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchUser();
    
    return () => controller.abort();
  }, [user]);


 
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};