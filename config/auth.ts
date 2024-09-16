import { AuthOptions, Session, User } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInSchema } from "@/schemas/auth.schema";
import { getUser } from "@/utils/server/getUser";
import bcrypt from "bcrypt";
import { createUser } from "@/utils/server/createUser";
import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { prisma } from "@/db";

const ONE_YEAR_MS = new Date().setFullYear(new Date().getFullYear() + 1);

export const authConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials || {};
        const validation = signInSchema.safeParse({ email, password });
        if (!validation.success) {
          throw new Error(validation.error.message);
        }
        const user = await getUser({ email });
        if (!user || user.provider !== "email")
          throw new Error("Email/Password are incorrect");
        const isPasswordCorrect = await bcrypt.compare(
          password!,
          user.password!
        );
        if (!isPasswordCorrect) throw new Error("Email/Password are incorrect");
        const {
          id,
          email: userEmail,
          username,
          profilePic,
          firstname,
          lastname,
        } = user;
        return {
          id,
          email: userEmail,
          username,
          profilePic,
          firstname,
          lastname,
        } as User;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: ONE_YEAR_MS,
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true, // Ensure security
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: new Date(ONE_YEAR_MS),
      },
    },
  },
  jwt: {
    async encode({ token, secret, maxAge }) {
      try {
        delete token?.iat;
        delete token?.exp;
        const encodedToken = jwt.sign(token as object, secret, {
          expiresIn: maxAge,
          algorithm: "HS256",
        });
        try {
          await prisma.session.create({
            data: {
              sessionToken: encodedToken,
              user: {
                connect: {
                  id: token?.id as string,
                },
              },
              expires: new Date(maxAge as number),
            },
          });
        } catch (error: unknown) {}
        return encodedToken;
      } catch (error) {
        console.error("JWT Encode Error:", error);
        return "";
      }
    },
    async decode({ token, secret }) {
      try {
        const decodedToken = jwt.verify(token || "", secret, {
          algorithms: ["HS256"],
        }) as JWT;
        const isTokenValid = await prisma.session.findFirst({
          where: {
            sessionToken: token,
            user: {
              id: decodedToken?.id as string,
            },
            expires: {
              lt: decodedToken?.exp
                ? new Date(decodedToken?.exp as number)
                : new Date(),
            },
          },
        });
        if (!isTokenValid) throw new Error("session token invalid");
        return decodedToken;
      } catch (error) {
        console.error("JWT Decode Error:", error);
        return {} as JWT;
      }
    },
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "credentials") return true;
      if (account?.provider !== "google") return false;
      if (!profile) return false;

      const {
        email,
        given_name: firstname,
        family_name: lastname,
        name: username,
        picture: profilePic,
      } = profile as unknown as GoogleProfile;

      if (!email) return false;

      // Check if the user already exists in your database
      const fetchedUser = await getUser({ email: email as string });
      if (fetchedUser) {
        if (fetchedUser.provider !== "google") return false;
        // Reassign profile only if necessary
        Object.assign(user, {
          id: fetchedUser.id,
          email: fetchedUser.email,
          username: fetchedUser.username,
          profilePic: fetchedUser.profilePic,
          firstname: fetchedUser.firstname,
          lastname: fetchedUser.lastname,
        });

        return true; // User exists, sign them in
      }

      // If the user doesn't exist, create a new one
      const createdUser = await createUser({
        email: email as string,
        username: username as string,
        profilePic: profilePic as string,
        firstname: firstname as string,
        lastname: lastname as string,
        provider: "google",
      });

      Object.assign(user, {
        id: createdUser.id,
        email: createdUser.email,
        username: createdUser.username,
        profilePic: createdUser.profilePic,
        firstname: createdUser.firstname,
        lastname: createdUser.lastname,
      });

      return true; // New user created, sign them in
    },

    async jwt({ token, user }) {
      if (user) {
        const {
          id,
          email: userEmail,
          username,
          profilePic,
          firstname,
          lastname,
        } = user;
        token = {
          id,
          email: userEmail,
          username,
          profilePic,
          firstname,
          lastname,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) session.user = { ...session.user, ...token };
      if (session.user) {
        const user = await getUser({
          id: session.user.id!,
        });
        if (!user) return {} as Session;
      }
      return session;
    },
  },
};
