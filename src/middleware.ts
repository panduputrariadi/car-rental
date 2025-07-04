// export { default } from "next-auth/middleware";

// export const config = { matcher: ["/dashboard/:path*"]};
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ token, req }) {
      // Jika tidak ada token sama sekali, redirect ke login
      if (!token) {
        console.log("No token found, redirecting to login");
        return false;
      }

      // Periksa apakah token sudah expired
      const now = Math.floor(Date.now() / 1000); // Waktu sekarang dalam detik
      if (token.exp && token.exp < now) {
        console.log("Token expired, redirecting to login");
        return false;
      }

      // Jika token valid
      return true;
    },
  },
});

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|login|api/auth).*)',
  ],
};
