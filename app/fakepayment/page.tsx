"use client"

import { Suspense, useEffect, useState } from "react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"

type Product = {
  id: number
  name: string
  price: string
  images: { src: string }[]
}

// Betalningssida som visar vald produkt och skapar en order när användaren bekräftar.
function FakePaymentContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const productId = searchParams.get("id")
    if (!productId) {
      setLoading(false)
      return
    }

    const id = Number(productId)
    if (Number.isNaN(id)) {
      setLoading(false)
      return
    }

    // Hämta produktinformation från produkt-API:et baserat på query-parametern.
    async function fetchProduct() {
      try {
        const res = await fetch("/api/products")
        const products: Product[] = await res.json()
        const item = products.find((productItem) => productItem.id === id)
        setProduct(item ?? null)
      } catch (error) {
        console.error("Failed to load product", error)
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [searchParams])

  // Skickar ordern till servern och hanterar statuskoder.
  async function placeOrder() {
    if (!product) return

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: product.name,
        amount: 1,
      }),
    })

    if (res.status === 401) {
      router.push("/login")
      return
    }

    if (!res.ok) {
      const errorData = await res.json()
      alert(errorData.message || "Kunde inte skapa beställning")
      return
    }

    alert(`beställde ${product.name} för ${product.price}`)
    router.push("/my-orders")
  }

  if (loading) {
    return <div className="p-10">Loading...</div>
  }

  if (!product) {
    return <div className="p-10">Could not load product.</div>
  }

  return (
    <div className="max-w-2xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-8">Fake Payment</h1>

      <div className="border rounded-lg p-6">
        <h2 className="text-2xl mb-4">{product.name}</h2>
        <p className="text-xl mb-4">Price: {product.price} €</p>
        {product.images?.[0] && (
          <Image
            src={product.images[0].src}
            alt={product.name}
            width={800}
            height={450}
            className="w-full h-64 object-cover rounded mb-4"
          />
        )}

        <button
          type="button"
          onClick={placeOrder}
          className="bg-black text-white px-6 py-3 rounded w-full"
        >
          Place Order
        </button>
      </div>
    </div>
  )
}

export const dynamic = "force-dynamic"

export default function FakePaymentPage() {
  return (
    <Suspense fallback={<div className="p-10">Loading...</div>}>
      <FakePaymentContent />
    </Suspense>
  )
}
