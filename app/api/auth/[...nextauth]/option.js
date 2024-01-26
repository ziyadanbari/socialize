import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const option = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "login",
      name: "Hi",
      async authorize(creds, req) {
        console.log(req);
        return creds;
      },
      credentials: {
        username: {
          type: "text",
          required: true,
        },
        password: {
          type: "text",
          required: true,
        },
      },
    }),
    CredentialsProvider({
      id: "register",
      async authorize(creds, req) {
        return creds;
      },
      credentials: {
        username: {
          type: "text",
          required: true,
        },
        password: {
          type: "text",
          required: true,
        },
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
};
