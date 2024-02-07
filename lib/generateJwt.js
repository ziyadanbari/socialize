import jwt from "jsonwebtoken";

export function generateJwt(data, config) {
  return jwt.sign(data, process.env.NEXTAUTH_SECRET, {
    expiresIn: "365d",
  });
}
