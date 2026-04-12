import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// API-route för att kontrollera om användaren är inloggad via cookie.
export async function GET() {
  const cookieStore = await cookies()
  const userId = cookieStore.get("userId")?.value

  return NextResponse.json({
    loggedIn: Boolean(userId),
  })
}
