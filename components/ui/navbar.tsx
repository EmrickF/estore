import Link from "next/link"
import { cookies } from "next/headers"
import { Button } from "@/components/ui/button"

export default async function Navbar() {
  const userId = (await cookies()).get("userId")?.value
  const isLoggedIn = !!userId

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

            <Link href="/my-orders">
              <Button variant="ghost">My Orders</Button>
            </Link>

            <form action="/api/auth/logout" method="POST">
              <Button type="submit" variant="destructive">
                Logout
              </Button>
            </form>
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
