import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login", // 将登录页面设置为 /login
  },
  // https://nextjs.org/learn/dashboard-app/adding-authentication 
  // prevent unauthenticated users from accessing the dashboard
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log("AUTH_SECRET:", process.env.AUTH_SECRET, "nextUrl:", nextUrl);
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;
