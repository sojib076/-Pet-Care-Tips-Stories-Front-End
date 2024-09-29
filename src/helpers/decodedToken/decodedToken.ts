import { jwtDecode } from "jwt-decode";

export const decodeTokenAndGetRole = (token: string) => {
  // Decode the token and get the user role
  const decoded = jwtDecode(token);
  return decoded;
};