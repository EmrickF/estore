// Hjälpfunktion för att lägga till en produkt i localStorage-kundvagnen.
export function addToCart(product: unknown) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]") as unknown[]
  cart.push(product)
  localStorage.setItem("cart", JSON.stringify(cart))

  if (typeof window !== "undefined") {
    // Skicka en event så andra komponenter kan uppdatera sig direkt
    window.dispatchEvent(new Event("cart-change"))
    localStorage.setItem("cart-event", Date.now().toString())
  }
}
