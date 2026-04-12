import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import bcrypt from "bcrypt"

//  registrera en ny user och spara lösenord (hashat).
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, password } = body

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Alla fält behöver vara ifyllda" },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: "Användare finns redan" },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return NextResponse.json({ message: "Användare skapad" }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Något gick fel" },
      { status: 500 }
    )
  }
}
