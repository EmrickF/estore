"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { addToCart } from "@/lib/cart"

type Product = {
  id: number
  name: string
  price: string
  images: { src: string }[]
}

// Startsidan visar produkter och låter användaren beställa eller lägga till i kundvagnen.
export default function HomePage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Hämta produktlistan från servern
    async function fetchProducts() {
      const res = await fetch("/api/products")
      const data = await res.json()
      setProducts(data)
    }

    // Kolla om användaren är inloggad via session-API
    async function fetchSession() {
      const res = await fetch("/api/auth/session")
      if (res.ok) {
        const data = await res.json()
        setIsLoggedIn(!!data.loggedIn)
      }
    }

    fetchProducts()
    fetchSession()
  }, [])

  // Navigerar till betalningssidan om användaren är inloggad
  async function orderProduct(product: Product) {
    if (!isLoggedIn) {
      router.push('/login')
      return
    }
    router.push(`/fakepayment?id=${product.id}`)
  }

  return (
    <div className="max-w-6xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-8">Products</h1>

      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
         <div
  key={product.id}
className="border rounded-lg p-4 flex flex-col"
>
  <div className="group relative flex-1 flex flex-col">
    
    {product.images?.[0] && (
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        <Image
          src={product.images[0].src}
          alt={product.name}
          width={600}
          height={600}
          className="max-h-full w-full object-contain transition duration-300 group-hover:scale-105"
        />
      </div>
    )}

    <div className="mt-2">
      <h2 className="font-bold">{product.name}</h2>
      <p>{product.price} €</p>
    </div>
  </div>

  <button
    type="button"
    onClick={() => orderProduct(product)}
    className="bg-black text-white px-4 py-2 rounded mt-auto"
  >
    Order
  </button>

  <button
    type="button"
    onClick={() => {
      if (!isLoggedIn) {
        router.push('/login')
        return
      }
      addToCart(product)
      alert("Added to cart")
    }}
    className="bg-gray-500 text-white px-4 py-2 rounded mt-2"
  >
    Add to Cart
  </button>
</div>

        ))}
      </div>
    </div>
  )
}
