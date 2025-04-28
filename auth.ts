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
    console.warn('🚀 ~ authorize ~ credentials:', credentials);
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
      if (data.status === 'success') {
        console.log("data 1", data);
        console.log("status", status)
        return {
          id: data?.data?.token,
          user_id: data?.data?.id,
          email: data?.data?.email,
          role: data?.data?.role,
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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/user-data`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token.sub}`,
            'Content-Type': 'application/json', // Ensures the server knows you're sending JSON
          },
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.warn('🚀 ~ session ~ responseData:', responseData);

        if (session.user) {
          session.user.user_id = responseData?.data?.data.id;
          session.user.email = responseData?.data?.data.email;
          session.user.role = responseData?.data.data.role;
          session.user.id = token.sub!;
        }
      }


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
























