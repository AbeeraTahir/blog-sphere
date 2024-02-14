import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/" ||
    path === "/login" ||
    path === "/signup" ||
    path === "/posts" ||
    path === "/posts/:id";

  const token = request.cookies.get("blogAppToken")?.value || "";

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/posts",
    "/posts/createPost",
    "/posts/:id",
    "/posts/:id/editPost",
    "/:userId",
  ],
};
