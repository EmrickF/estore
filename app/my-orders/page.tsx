import { prisma } from "@/lib/db"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function MyOrdersPage() {
  const cookieStore = await cookies()
  const userId = cookieStore.get("userId")?.value

  if (!userId) {
    redirect("/login")
  }

  const orders = await prisma.order.findMany({
    where: { userId: Number(userId) },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold">My Orders</h1>

      {orders.length === 0 && <p>No orders found.</p>}

      {orders.map((order) => (
        <div key={order.id} className="border p-4 rounded-lg">
          <p><strong>Product:</strong> {order.product}</p>
          <p><strong>Amount:</strong> {order.amount}</p>
          <p className="text-sm text-gray-500">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  )


}