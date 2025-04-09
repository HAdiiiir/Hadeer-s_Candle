import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Order {
  id: string
  date: string
  status: string
  total: number
  items: number
}

export function OrdersList({ orders }: { orders: Order[] }) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Items</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    order.status === "Delivered"
                      ? "bg-[#A569BD] text-[#6C3483]" // موف فاتح للحالة "Delivered"
                      : "bg-[#E8D9F5] text-[#8E44AD]" // موف فاتح للحالة الأخرى
                  }`}
                >
                  {order.status}
                </span>
              </TableCell>
              <TableCell>EGP {order.total}</TableCell>
              <TableCell>{order.items}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/orders/${order.id}`}>
                    <span className="sr-only">View order</span>
                    <ChevronRight className="h-4 w-4 text-[#8E44AD] hover:text-[#6C3483]" />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
