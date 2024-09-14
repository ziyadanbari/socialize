import { AuthOptions, User } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInSchema } from "@/schemas/auth.schema";
import { getUser } from "@/utils/server/getUser";
import bcrypt from "bcrypt";
import { createUser } from "@/utils/server/createUser";

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
      return session;
    },
  },
};
