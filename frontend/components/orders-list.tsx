import Link from "next/link"
import { ChevronRight, Eye, Package, Calendar, CheckCircle, Clock, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

interface Order {
  id: string
  date: string
  status: "Delivered" | "Processing" | "Shipped" | "Cancelled"
  total: number
  items: number
}

export function OrdersList({ orders }: { orders: Order[] }) {
  const statusConfig = {
    Delivered: {
      icon: CheckCircle,
      bgColor: "bg-purple-100",
      textColor: "text-purple-800",
      borderColor: "border-purple-200"
    },
    Processing: {
      icon: Clock,
      bgColor: "bg-amber-100",
      textColor: "text-amber-800",
      borderColor: "border-amber-200"
    },
    Shipped: {
      icon: Package,
      bgColor: "bg-blue-100",
      textColor: "text-blue-800",
      borderColor: "border-blue-200"
    },
    Cancelled: {
      icon: XCircle,
      bgColor: "bg-gray-100",
      textColor: "text-gray-800",
      borderColor: "border-gray-200"
    }
  }

  return (
    <div className="rounded-lg border border-purple-100 bg-white shadow-sm overflow-hidden">
      <Table className="min-w-full divide-y divide-purple-50">
        <TableHeader className="bg-purple-50">
          <TableRow className="hover:bg-purple-50">
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
              <div className="flex items-center">
                <Package className="h-4 w-4 mr-2" />
                Order ID
              </div>
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Date
              </div>
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
              Status
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
              Total
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
              Items
            </TableHead>
            <TableHead className="px-6 py-3 text-right text-xs font-medium text-purple-700 uppercase tracking-wider">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white divide-y divide-purple-50">
          {orders.map((order) => {
            const StatusIcon = statusConfig[order.status].icon
            return (
              <TableRow key={order.id} className="hover:bg-purple-50/50 transition-colors">
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-900">
                  #{order.id}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {order.date}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <div className={cn(
                    "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border",
                    statusConfig[order.status].bgColor,
                    statusConfig[order.status].textColor,
                    statusConfig[order.status].borderColor
                  )}>
                    <StatusIcon className="h-3 w-3 mr-1.5" />
                    {order.status}
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-900">
                  EGP {order.total.toFixed(2)}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {order.items} {order.items === 1 ? 'item' : 'items'}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    asChild
                    className="text-purple-600 hover:text-purple-800 hover:bg-purple-100"
                  >
                    <Link href={`/orders/${order.id}`} className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}