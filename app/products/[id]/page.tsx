"use client"

import Image from "next/image"
import { Product } from "@/types/product"
import { useEffect, useState } from "react"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch("/api/products")
        if (!res.ok) {
          throw new Error("Failade fetchen")
        }
        const products: Product[] = await res.json()
        const foundProduct = products.find(p => p.id === Number(params.id))
        if (!foundProduct) {
          throw new Error("Product not found")
        }
        setProduct(foundProduct)
      } catch (err) {
        console.error("Error loading product", err)
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  if (loading) {
    return <div className="p-7 max-w-4xl mx-auto">Loading...</div>
  }

  if (error || !product) {
    return (
      <div className="p-7 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-red-500">{error || "Product could not be loaded."}</p>
      </div>
    )
  }

  return (
    <div className="p-7 max-w-4xl mx-auto">
      {product.images?.[0] && (
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt || product.name}
          width={800}
          height={600}
          className="mb-4 w-full max-w-full object-contain"
        />
      )}
      <p className="text-sm text-gray-500 mb-2">ID: {params.id}</p>
      <h1 className="text-2xl font-bold mb-3">{product.name}</h1>
      <p className="text-lg mb-3">{product.price} €</p>
      <div
        dangerouslySetInnerHTML={{
          __html: product.description,
        }}
      />
    </div>
  )
}
