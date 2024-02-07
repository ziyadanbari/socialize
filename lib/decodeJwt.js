import jwt from "jsonwebtoken";

export function decodeJwt(token) {
  if (!token) return {};
  return jwt.verify(token, process.env.NEXTAUTH_SECRET);
}
