// export { default } from "next-auth/middleware";

// export const config = { matcher: ["/dashboard/:path*"]};
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ token }) {
      console.log("TOKEN", token);
      return !!token; // Hanya allow jika ada token
    },
  },
});

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|login|api/auth).*)',
  ],
};
