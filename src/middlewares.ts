import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((request) => {
  const isLoggedIn = !!request.auth;
  const pathname = request.nextUrl.pathname;

  const isTaskPage = pathname.startsWith("/tasks");
  const isDashboardPage = pathname.startsWith("/dashboard");
  const isLoginPage = pathname === "/login";

  if (!isLoggedIn && (isTaskPage || isDashboardPage)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/tasks/:path*", "/dashboard/:path*", "/login"],
};