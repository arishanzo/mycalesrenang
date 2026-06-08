

type SessionResponse = {
  loggedIn: boolean;
  user?: { id: number; email: string };
};


export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const res = await fetch(`${apiUrl}${endpoint}`, { ...options, cache: options?.cache || "no-store", });


  if (!res.ok) {
    let errorMessage = `Failed to fetch data from ${endpoint}`;
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch (e) {
      console.log(e);
    }

    throw new Error(errorMessage);
  }

  return res.json();
}

export async function getAuthHeaders() {

    const res = await fetchAPI<SessionResponse>("/auth/session", {
              credentials: "include",
            });
  
  return {
    Authorization: `Bearer ${res}`,
  };
}