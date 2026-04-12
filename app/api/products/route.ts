import { NextResponse } from "next/server"

export async function GET() {
  if (!process.env.WC_URL || !process.env.WC_CONSUMER_KEY || !process.env.WC_CONSUMER_SECRET) {
    return NextResponse.json(
      { message: "WooCommerce environment variables är fejl or something idk." },
      { status: 500 }
    )
  }

  try {
    const res = await fetch(
      `${process.env.WC_URL}/wp-json/wc/v3/products?consumer_key=${process.env.WC_CONSUMER_KEY}&consumer_secret=${process.env.WC_CONSUMER_SECRET}`,
      { cache: "no-store" }
    )

    if (!res.ok) {
      const text = await res.text()
      console.error("WooCommerce fetch failed", res.status, text)
      return NextResponse.json(
        { message: "kunna int load in e lol." },
        { status: 500 }
      )
    }

    const products = await res.json()
    return NextResponse.json(products)
  } catch (error) {
    console.error("Product API error", error)
    return NextResponse.json(
      { message: "Kunna int fetch e lool." },
      { status: 500 }
    )
  }
}
