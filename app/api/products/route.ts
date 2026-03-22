import { NextResponse } from "next/server"

export async function GET() {
  const res = await fetch(
    `${process.env.WC_URL}/wp-json/wc/v3/products?consumer_key=${process.env.WC_CONSUMER_KEY}&consumer_secret=${process.env.WC_CONSUMER_SECRET}`
  )

  const products = await res.json()

  return NextResponse.json(products)
}
