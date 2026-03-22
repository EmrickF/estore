import { getProducts } from "@/lib/woocommerce"
import { Product } from "@/types/product"
import Link from "next/link"

export default async function ProductsPage() {
  const products: Product[] = await getProducts()

  return (
    <div className="grid grid-cols-3 gap-6 p-8">
      {products.map((product) => (
        <Link key={product.id} href={`/produkter/${product.id}`}>
          <div className="border p-4 rounded hover:shadow">
            {product.images?.[0] && (
              <div className="overflow-hidden rounded">
                <img
                  src={product.images[0].src}
                  alt={product.images[0].alt}
                  className="transition-transform duration-200 hover:scale-110"
                />
              </div>
            )}

            <h2 className="font-bold">{product.name}</h2>
            <p>{product.price} €</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
