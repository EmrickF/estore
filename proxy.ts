import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const userId = request.cookies.get("userId")?.value
  const userEmail = request.cookies.get("userEmail")?.value
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/admin")) {
    if (!userId || userEmail !== "erik@gmail.com") {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  if (
    (pathname.startsWith("/my-orders") ||
      pathname.startsWith("/cart")) &&
    !userId
  ) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (
    (pathname.startsWith("/login") ||
      pathname.startsWith("/register")) &&
    userId
  ) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin", "/my-orders", "/cart", "/login", "/register"],
}