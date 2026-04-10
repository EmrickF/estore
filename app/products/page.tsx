import { addToCart } from "@/lib/cart"
import { getProducts } from "@/lib/woocommerce"
import { Product } from "@/types/product"
import Image from "next/image"
import Link from "next/link"

export default async function ProductsPage() {
  const products: Product[] = await getProducts()

  return (
    <div className="grid grid-cols-3 gap-6 p-8">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded hover:shadow">
          <Link href={`/produkter/${product.id}`} className="group block">
            {product.images?.[0] && (
              <div className="border rounded-lg p-4 overflow-hidden">
                <Image
                  src={product.images[0].src}
                  alt={product.name}
                  width={500}
                  height={300}
                  className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            )}
            <h2 className="font-bold mt-4">{product.name}</h2>
            <p>{product.price} €</p>
          </Link>

          <button
            type="button"
            onClick={() => addToCart(product)}
            className="bg-black text-white px-4 py-2 mt-4 w-full"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  )
}
