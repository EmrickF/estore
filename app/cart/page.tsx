"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function CartPage() {
  type CartItem = {
    id: number
    name: string
    price: string
  }

  const router = useRouter()
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    function loadCart() {
      if (typeof window === "undefined") return
      try {
        const stored = JSON.parse(localStorage.getItem("cart") || "[]")
        setCart(Array.isArray(stored) ? stored : [])
      } catch {
        setCart([])
      }
    }

    function handleCartChange() {
      loadCart()
    }

    loadCart()
    window.addEventListener("cart-change", handleCartChange)
    function handleStorage(event: StorageEvent) {
      if (event.key === "cart-event") {
        loadCart()
      }
    }
    window.addEventListener("storage", handleStorage)

    return () => {
      window.removeEventListener("cart-change", handleCartChange)
      window.removeEventListener("storage", handleStorage)
    }
  }, [])

  async function orderAll() {
    if (cart.length === 0) {
      alert("Your cart is empty.")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orders: cart.map((item) => ({
            product: item.name,
            amount: 1,
            paymentMethod: "card",
          })),
        }),
      })

      if (res.status === 401) {
        router.push("/login")
        return
      }

      if (!res.ok) {
        const data = await res.json()
        alert(data.message || "Could not place order")
        return
      }

      localStorage.removeItem("cart")
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("cart-change"))
        localStorage.setItem("cart-event", Date.now().toString())
      }
      setCart([])
      router.push("/my-orders")
    } catch (error) {
      console.error(error)
      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl">Cart</h1>
        {cart.length > 0 && (
          <button
            type="button"
            onClick={orderAll}
            disabled={loading}
            className="bg-black text-white px-4 py-2 rounded"
          >
            {loading ? "Ordering..." : "Order All"}
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item, i) => (
          <div key={i} className="border p-4 mb-2">
            {item.name} - {item.price} €
          </div>
        ))
      )}
    </div>
  )
}
