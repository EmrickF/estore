"use client"

import { useEffect, useState } from "react"

type Product = {
  id: number
  name: string
  price: string
  images: { src: string }[]
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/products")
      const data = await res.json()
      setProducts(data)
    }

    fetchProducts()
  }, [])

  async function orderProduct(product: Product) {
    await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: product.name,
        amount: 1,
        paymentMethod: "card",
      }),
    })

    alert("Order created!")
  }

  return (
    <div className="max-w-6xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-8">Products</h1>

      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 flex flex-col"
          >
            {product.images?.[0] && (
              <img
                src={product.images[0].src}
                alt={product.name}
                className="h-40 object-cover mb-4"
              />
            )}

            <h2 className="font-semibold">{product.name}</h2>

            <p className="text-gray-500 mb-3">{product.price} €</p>

            <button
              onClick={() => orderProduct(product)}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Order
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
