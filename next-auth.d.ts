// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession } from "next-auth";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  export interface User {
    id: string;
    email: string | null;
    username: string;
    profilePic: string;
    firstname: string;
    lastname: string;
    iat: number;
    exp: number;
    jti: string;
  }
  interface Profile extends User {}
  interface Session {
    user?: Partial<User>;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends Record<string, unkown> {}
}
