"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [hasCartItems, setHasCartItems] = useState(false)

  // Navigationsbar som visar inloggning, kundvagn och länkar beroende på status.

  useEffect(() => {
    // Kontrollerar om användaren är inloggad via servern
    async function fetchSession() {
      const res = await fetch("/api/auth/session")
      if (res.ok) {
        const data = await res.json()
        setIsLoggedIn(!!data.loggedIn)
      }
    }

    // Räknar antalet produkter i kundvagnen för att visa Cart-länken
    function updateCartCount() {
      try {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]")
        setHasCartItems(Array.isArray(cart) && cart.length > 0)
      } catch {
        setHasCartItems(false)
      }
    }

    // Uppdatera navbaren när inloggning eller kundvagn ändras
    function handleAuthOrCartChange() {
      fetchSession()
      updateCartCount()
    }

    function handleStorage(event: StorageEvent) {
      if (event.key === "auth-event" || event.key === "cart-event") {
        fetchSession()
        updateCartCount()
      }
    }

    fetchSession()
    updateCartCount()

    window.addEventListener("auth-change", handleAuthOrCartChange)
    window.addEventListener("cart-change", handleAuthOrCartChange)
    window.addEventListener("storage", handleStorage)
    return () => {
      window.removeEventListener("auth-change", handleAuthOrCartChange)
      window.removeEventListener("cart-change", handleAuthOrCartChange)
      window.removeEventListener("storage", handleStorage)
    }
  }, [])

  return (
    <nav className="flex justify-between items-center px-9 py-5 border-b">
      <Link href="/" className="font-bold text-lg">
        E-Store
      </Link>

      <div className="flex gap-5">
        {isLoggedIn ? (
          <>
            <Link href="/">
              <Button variant="ghost">Home</Button>
            </Link>

            {hasCartItems && (
              <Link href="/cart">
                <Button variant="ghost">Cart</Button>
              </Link>
            )}

            <Link href="/my-orders">
              <Button variant="ghost">My Orders</Button>
            </Link>

            <Button
              type="button"
              onClick={async () => {
                await fetch("/api/auth/logout", { method: "POST" })
                localStorage.removeItem("cart")
                localStorage.removeItem("auth-event")
                localStorage.removeItem("cart-event")
                window.dispatchEvent(new Event("auth-change"))
                window.location.href = "/"
              }}
              variant="destructive"
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>

            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
