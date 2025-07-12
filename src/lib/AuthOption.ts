// import { Backend_URL } from "@/lib/Constants";
import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { NextAuthOptions } from "next-auth";
import { Backend_URL } from "./Constants";

async function refreshToken(token: JWT): Promise<JWT> {
  try {
    const res = await fetch(
      // `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/refresh`,
      `${Backend_URL}/refresh`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          "Content-Type": "application/json",
        },
      }
    );    

    if(!res.ok){
      // throw new Error( "Failed to refresh token" );
      console.log("❌ Gagal refresh token:", res.status);
    } 

    const refreshedData = await res.json();

    return {
      ...token,
      access_token: refreshedData.access_token,
      token_type: refreshedData.token_type,
      expires_in: Date.now() + refreshedData.expires_in * 1000,
      user: refreshedData.user,
    };
  } catch (error) {
    console.error("❌ Gagal refresh token:", error);
    return { ...token };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );

        if (!res.ok) return null;

        const response = await res.json();

        if (!response.access_token) return null;

        return {
          id: response.user.id,
          access_token: response.access_token,
          token_type: response.token_type,
          expires_in: response.expires_in,
          user: response.user,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: JWT | undefined }) {
      if (user) {
        return {
          ...token,
          access_token: user.access_token,
          token_type: user.token_type,
          expires_in: Date.now() + user.expires_in * 1000,
          user: user.user,
        };
      }

      const isExpired = Date.now() > (token.expires_in ?? 0);
      // console.log("⏳ Token Expired?", isExpired);

      if (isExpired) {
        const refreshedToken = await refreshToken(token);
        // console.log("🔐 Token expired, refresh token", refreshedToken);
        return refreshedToken;
      }
      return token;
    },

    async session({ session, token }: { session: JWT; token: JWT }) {
      session.user = token.user;
      session.access_token = token.access_token;
      session.token_type = token.token_type;
      session.expires_in = token.expires_in;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
};
