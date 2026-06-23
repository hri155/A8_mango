import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { buildCorsHeaders } from "@/lib/cors";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // CORS for all API routes
  if (pathname.startsWith("/api/")) {
    if (request.method === "OPTIONS") {
      return new NextResponse(null, {
        status: 204,
        headers: buildCorsHeaders(request),
      });
    }

    const response = NextResponse.next();
    Object.entries(buildCorsHeaders(request)).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    return response;
  }

  const sessionCookie = getSessionCookie(request);

  const isProtected =
    pathname.startsWith("/books/") ||
    pathname === "/profile" ||
    pathname.startsWith("/profile/");

  if (isProtected && !sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/books/:path*", "/profile", "/profile/:path*"],
};
