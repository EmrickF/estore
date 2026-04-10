import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(req: Request) {
  const cookieStore = await cookies()

  cookieStore.delete("userId")
  cookieStore.delete("userEmail")

  return NextResponse.redirect(new URL("/", new URL(req.url).origin))
}
