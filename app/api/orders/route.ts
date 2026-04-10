import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { cookies } from "next/headers"

export async function GET() {
  const cookieStore = await cookies()
  const userId = cookieStore.get("userId")?.value

  if (!userId) {
    return NextResponse.json(
      { message: "Not logged in" },
      { status: 401 }
    )
  }

  const orders = await prisma.order.findMany({
    where: { userId: Number(userId) },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(orders)
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")?.value

    if (!userId) {
      return NextResponse.json(
        { message: "inte auktoriserad" },
        { status: 401 }
      )
    }

    const body = await req.json()

    if (Array.isArray(body.orders)) {
      const orders = body.orders.map((order: any) => ({
        userId: Number(userId),
        product: order.product,
        amount: order.amount,
        paymentMethod: order.paymentMethod,
      }))

      const result = await prisma.order.createMany({
        data: orders,
      })

      return NextResponse.json({ count: result.count })
    }

    const { product, amount, paymentMethod } = body

    const order = await prisma.order.create({
      data: {
        userId: Number(userId),
        product,
        amount,
        paymentMethod,
      },
    })

    return NextResponse.json(order)

  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { message: "Fel vid skapande av beställning" },
      { status: 500 }
    )
  }
}
