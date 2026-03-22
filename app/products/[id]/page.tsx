import { getProductById } from "@/lib/woocommerce"
import { Product } from "@/types/product"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const product: Product = await getProductById(params.id)

  return (
    <div className="p-7 max-w-4xl mx-auto">
      {product.images?.[0] && (
        <img
          src={product.images[0].src}
          alt={product.images[0].alt}
          className="mb-4"
        />
      )}
      <h1 className="text-2xl font-bold mb-3">
        {product.name}
      </h1>
      <p className="text-lg mb-3">
        {product.price} €
      </p>
      <div
        dangerouslySetInnerHTML={{
          __html: product.description,
        }}
      />
    </div>
  )
}
