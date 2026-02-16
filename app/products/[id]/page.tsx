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
    <div className="p-8 max-w-3xl mx-auto">
      {product.images?.[0] && (
        <img
          src={product.images[0].src}
          alt={product.images[0].alt}
          className="mb-4"
        />
      )}

      <h1 className="text-2xl font-bold mb-2">
        {product.name}
      </h1>

      <p className="text-lg mb-4">
        {product.price} kr
      </p>

      <div
        dangerouslySetInnerHTML={{
          __html: product.description,
        }}
      />
    </div>
  )
}
