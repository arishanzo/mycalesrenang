

type SessionResponse = {
  loggedIn: boolean;
  user?: {email: string };
};


export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const apiUrl = 'http://localhost:5000/api';
  const res = await fetch(`${apiUrl}${endpoint}`, {
    ...options,
    cache: options?.cache || "no-store",
  });

  if (!res.ok) {
    let errorMessage = `Failed to fetch data from ${endpoint}`;
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch (e) {
      console.log(e);
    }

    // Normalisasi error auth agar bisa ditangani di layer UI
    if (
      /token expired/i.test(errorMessage) ||
      /please login again/i.test(errorMessage) ||
      /invalid token/i.test(errorMessage)
    ) {
      const err = new Error(errorMessage);
      (err as Error & { code?: string }).code = "AUTH_EXPIRED";
      throw err;
    }

    throw new Error(errorMessage);
  }

  return res.json();
}


export function getAuthHeaders(): Record<string, string> {
  return {};
}

