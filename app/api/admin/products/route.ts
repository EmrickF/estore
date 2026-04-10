import { NextResponse } from "next/server"

export async function GET() {
  const res = await fetch(
    `${process.env.WC_URL}/wp-json/wc/v3/products?consumer_key=${process.env.WC_CONSUMER_KEY}&consumer_secret=${process.env.WC_CONSUMER_SECRET}`
  )

  const products = await res.json()
  return NextResponse.json(products)
}
export async function PUT(req: Request) {
  const body = await req.json()
  const { id, name, price } = body

  const res = await fetch(
    `${process.env.WC_URL}/wp-json/wc/v3/products/${id}?consumer_key=${process.env.WC_CONSUMER_KEY}&consumer_secret=${process.env.WC_CONSUMER_SECRET}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        regular_price: price,
      }),
    }
  )

  const updated = await res.json()
  return NextResponse.json(updated)
}