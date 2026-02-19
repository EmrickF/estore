import { Navbar } from "@/components/ui/navbar"
import { getProducts } from "@/lib/woocommerce"
import { Product } from "@/types/product"

export default async function Home() {
  const products: Product[] = await getProducts()

  return (
    <div className="grid grid-cols-3 gap-6 p-8">
      {products.map((product) => (
        <div key={product.id} className="border p-5 rounded">
          {product.images?.[0] && (
            <img
              src={product.images[0].src}
              alt={product.images[0].alt}
              className="mb-2"
            />
          )}
          <h2 className="font-bold ">{product.name}</h2>
          <p>{product.price} €</p>
        </div>
      ))}
    </div>
  )
}
