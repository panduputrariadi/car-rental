import { Backend_URL } from "@/lib/Constants";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

// Function to refresh token when expired
// async function refreshToken(token: JWT): Promise<JWT> {
//   try {
//     const res = await fetch(`${Backend_URL}/refresh`, {
//       method: "POST",
//       headers: {
//         authorization: `Bearer ${token.access_token}`,
//       },
//     });

//     if (!res.ok) throw new Error("Failed to refresh token");

//     const refreshedData = await res.json();

//     return {
//       ...token,
//       access_token: refreshedData.access_token,
//       token_type: refreshedData.token_type,
//       expires_in: Date.now() + refreshedData.expires_in * 1000,
//       user: refreshedData.user,
//     };
//   } catch (error) {
//     console.error("Error refreshing token:", error);
//     return { ...token }; // Return old token if refresh fails
//   }
// }

import { toast } from "sonner";

async function refreshToken(token: JWT): Promise<JWT> {
  try {
    const res = await fetch(`${Backend_URL}/refresh`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    });

    if (!res.ok) throw new Error("Gagal refresh token");

    const refreshedData = await res.json();
    const { success, message } = refreshedData;

    if (success) {
      toast.success(message || "Token diperbarui");
      return {
        ...token,
        access_token: refreshedData.access_token,
        token_type: refreshedData.token_type,
        expires_in: Date.now() + refreshedData.expires_in * 1000,
        user: refreshedData.user,
      };
    } else {
      toast.error(message || "Gagal refresh token");
      return { ...token };
    }
  } catch (err) {
    toast.error("Kesalahan saat refresh token");
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

        const res = await fetch(`${Backend_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        if (!res.ok) {
          console.log("Login failed:", res.statusText);
          return null;
        }

        const response = await res.json();
        console.log("Login Response:", response);

        if (!response.access_token) return null;

        // Return a structured object for jwt callback
        return {
          access_token: response.access_token,
          token_type: response.token_type,
          expires_in: response.expires_in,
          user: response.user,
        };
      },
    }),
  ],

  // callbacks: {
  //   async jwt({ token, user }) {
  //     // Initial Sign In
  //     if (user) {
  //       return {
  //         ...token,
  //         access_token: user.access_token,
  //         token_type: user.token_type,
  //         expires_in: Date.now() + user.expires_in * 1000, // ms
  //         user: user.user,
  //       };
  //     }

  //     // Token still valid
  //     if (Date.now() < (token.expires_in ?? 0)) {
  //       return token;
  //     }

  //     // Token expired, refresh
  //     return await refreshToken(token);
  //   },

  //   async session({ session, token }) {
  //     session.user = token.user;
  //     session.access_token = token.access_token;
  //     session.token_type = token.token_type;
  //     session.expires_in = token.expires_in;
  //     return session;
  //   },
  // },

  callbacks: {
    async jwt({ token, user }) {
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

      if (isExpired) {
        const refreshedToken = await refreshToken(token);
        return refreshedToken;
      }

      return token;
    },

    async session({ session, token }) {
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
