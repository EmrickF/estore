import { Product } from "@/types/product"

// Hjälpfunktioner för att läsa produkter från WooCommerce via REST-API.
const baseUrl = process.env.WC_URL!
const consumerKey = process.env.WC_CONSUMER_KEY!
const consumerSecret = process.env.WC_CONSUMER_SECRET!

// Bygger en HTTP Basic-auth-sträng för WooCommerce API-anrop.
function getAuthString(): string {
  return Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64")
}

export async function getProducts(): Promise<Product[]> {
  const url = `${baseUrl}/wp-json/wc/v3/products?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`

  const res = await fetch(url, {
    cache: "no-store",
  })

  if (!res.ok) {
    const text = await res.text()
    console.error("WooCommerce Error:", res.status, text)
    throw new Error(`Woo error ${res.status}`)
  }

  return res.json()
}

// Hämtar en enskild produkt från WooCommerce baserat på id.
export async function getProductById(id: string): Promise<Product> {
  const res = await fetch(
    `${baseUrl}/wp-json/wc/v3/products/${id}`,
    {
      headers: {
        Authorization: `Basic ${getAuthString()}`,
      },
      cache: "no-store",
    }
  )

  if (!res.ok) {
    throw new Error("Failed to find product")
  }

  return res.json()
}
