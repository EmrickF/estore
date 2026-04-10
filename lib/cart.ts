export function addToCart(product: any) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]")
  cart.push(product)
  localStorage.setItem("cart", JSON.stringify(cart))

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cart-change"))
    localStorage.setItem("cart-event", Date.now().toString())
  }
}
