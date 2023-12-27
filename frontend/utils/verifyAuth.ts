import { getCookie } from "cookies-next";
export default async function verifyAuth(endpoint: string) {
  const token = getCookie("token");
  const response = await fetch(`http://localhost:5000/auth/${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  if (!response.ok) {
    return { isAuthenticated: false, userData: null };
  }

  const userData = await response.json();
  // The token is valid, and userData contains information about the authenticated user
  return { isAuthenticated: true, userData };
}
