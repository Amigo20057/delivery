type Methods = "POST" | "PATCH" | "PUT" | "GET" | "DELETE";
const API_URL = import.meta.env.VITE_API_URL;

export default function api(
  path: string,
  method: Methods,
  body?: any,
  headers?: Record<string, string>,
) {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  return fetch(API_URL + path, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("API error");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("API called failed:", error);
      throw error;
    });
}
