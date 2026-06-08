
const apiCache = new Map();

type FetchFunction<T = unknown> = () => Promise<T>;

export const getFetchCache = async <T = unknown>( fetchFuncOrUrl: string | FetchFunction<T>, retries = 3, delay = 2000)
  : Promise<T> => {
  const cacheKey = typeof fetchFuncOrUrl === "string" ? fetchFuncOrUrl : fetchFuncOrUrl.toString();

  if (apiCache.has(cacheKey)) {
    return apiCache.get(cacheKey);
  }

  for (let i = 0; i < retries; i++) {
    try {
      let responseData;

      if (typeof fetchFuncOrUrl === "string") {
        const response = await fetch(fetchFuncOrUrl);
        if (response.status === 429) throw new Error("Too Many Requests");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        responseData = await response.json();
      } else {
        responseData = await fetchFuncOrUrl();
      }

      apiCache.set(cacheKey, responseData);
      return responseData;
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise((res) => setTimeout(res, delay));
    }
  }

  throw new Error("Failed to fetch after retries");
};
