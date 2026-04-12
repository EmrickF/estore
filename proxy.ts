import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Middleware som skyddar sidor beroende på cookie-autorisation och användarstatus.
export function proxy(request: NextRequest) {
  const userId = request.cookies.get("userId")?.value
  const userEmail = request.cookies.get("userEmail")?.value
  const { pathname } = request.nextUrl

  // Admin-sidor kräver att användaren är inloggad som rätt e-postadress.
  if (pathname.startsWith("/admin")) {
    if (!userId || userEmail !== "erik@gmail.com") {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  // Skydda kundvagn och orderhistorik för inloggade användare.
  if (
    (pathname.startsWith("/my-orders") ||
      pathname.startsWith("/cart")) &&
    !userId
  ) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Om användaren redan är inloggad, skicka bort från login/register-sidorna.
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