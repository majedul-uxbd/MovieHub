import axios from "axios";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface User {
    user_id: number;
    email: string;
    role: string;
  }
  interface Session {
    user: User & { id: string };
  }
}

const credentialsConfig = CredentialsProvider({
  name: "Credentials",
  credentials: {
    email: { label: "Email" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          email: credentials.email,
          password: credentials.password,
        },
        {
          headers: { "Content-Type": "application/json" },
          httpsAgent: new (require("https").Agent)({
            rejectUnauthorized: false,
          }),
        }
      );
      const { status, data } = response;
      console.log("data 1", data);
      console.log("status", status)
      if (status === 200) {
        return {
          id: data.token,
          user_id: data.id,
          email: data.email,
          role: data.role
        };
      }
      return null;
    } catch (error) {
      // console.error("Login error:", error)
      return null;
    }
  },
});

const config = {
  providers: [credentialsConfig],
  callbacks: {
    async session({ session, token }) {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/get-my-user-data`, { lg: "en" },
        {
          headers: { Authorization: `Bearer ${token.sub}` },
          httpsAgent: new (require("https").Agent)({
            rejectUnauthorized: false,
          }),
        }
      );

      //console.log("response", response)

      const { status, data } = response;


      // if (session.user) {
      //   session.user.user_id = data.user.id;
      //   session.user.firstName = data.user.f_name;
      //   session.user.lastName = data.user.l_name;
      //   session.user.position = data.user.position;
      //   session.user.role = data.user.role;
      //   session.user.profile_img = data.user.profile_img;
      //   session.user.id = token.sub!;
      // }

      // //console.log("Session:", session)
      return session;
    },
    async jwt({ token }) {
      // //console.log("Token:", token)
      return token;
    },
  },
  session: { strategy: "jwt" },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
























