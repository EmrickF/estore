import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import bcrypt from "bcrypt"
import { cookies } from "next/headers"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email och password krävs " },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json(
        { message: "Ogiltiga inloggningsuppgifter" },
        { status: 401 }
      )
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Ogiltiga inloggningsuppgifter" },
        { status: 401 }
      )
    }

    (await cookies()).set("userId", user.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 12, 
    })

    return NextResponse.json({ message: "Inloggning lyckades" })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Något gick fel" },
      { status: 500 }
    )
  }
}
