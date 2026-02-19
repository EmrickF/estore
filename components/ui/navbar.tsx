"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        <Link href="/" className="text-xl font-bold">
          E-Store
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>

          <Link href="/register">
            <Button>Register</Button>
          </Link>

          <Link href="/orders">
            <Button variant="ghost">My Orders</Button>
          </Link>
        </div>

      </div>
    </nav>
  )
}
