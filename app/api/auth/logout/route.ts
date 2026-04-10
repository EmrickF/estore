import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  const cookieStore = await cookies()

  cookieStore.delete("userId")

  return NextResponse.redirect(new URL("/", "http://localhost:3000"))
}
