import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const isLoggedIn = false // ersätt med riktig auth check

  if (!isLoggedIn && request.nextUrl.pathname.startsWith("/orders")) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}
