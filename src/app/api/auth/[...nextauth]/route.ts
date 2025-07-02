import { Backend_URL } from "@/lib/Constants";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(Backend_URL + "/refresh", {
    method: "POST",
    headers: {
      authorization: `Bearer ${token.access_token}`,
    },
  });
  console.log("refreshed");

  const response = await res.json();

  return {
    ...token,
    ...response,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "jsmith",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;
        const res = await fetch(Backend_URL + "/login", {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log({ res });
        if (res.status == 401) {
          console.log(res.statusText);
          return null;
        }
        const user = await res.json();
        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        return {
          ...token,
          // access_token: user.access_token,
          token_type: user.token_type,
          expires_in: Date.now() + user.expires_in * 1000, // Convert to milliseconds
          user: user.user,
        };
      }

      // Return previous token if it's still valid
      if (Date.now() < token.expires_in) {
        return token;
      }

      // Token is expired, try to refresh
      return await refreshToken(token);
    },

    async session({ token, session }) {
      session.user = token.user;
      session.access_token = token.access_token;
      session.token_type = token.token_type;
      session.expires_in = token.expires_in;

      return session;
    },
  },
  pages: {
    signIn: '/login',
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };