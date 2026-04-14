import Image from "next/image"
import { getProductById } from "@/lib/woocommerce"
import { Product } from "@/types/product"

export const dynamic = "force-dynamic"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  let product: Product | null = null
  let errorMessage = ""

  try {
    product = await getProductById(params.id)
  } catch (error) {
    console.error("Product page load failed", error)
    errorMessage = "Kunde inte ladda produkten. Kontrollera att ID är korrekt eller försök igen senare."
  }

  if (!product) {
    return (
      <div className="p-7 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Produkt saknas</h1>
        <p className="text-red-500">{errorMessage}</p>
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
