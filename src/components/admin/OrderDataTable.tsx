"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getOrders, getUserById } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import type { Order } from "@/lib/types";
import { format } from "date-fns";

const statusColors: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  "Placed": "outline",
  "Confirmed": "secondary",
  "Packed": "default",
  "Out for Delivery": "default",
  "Delivered": "default",
  "Cancelled": "destructive"
}

export function OrderDataTable() {
  const orders = getOrders();

  const getCustomerName = (userId: string) => {
    const user = getUserById(userId);
    return user ? user.name : "Unknown User";
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead className="hidden sm:table-cell">Status</TableHead>
          <TableHead className="hidden sm:table-cell">Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order: Order) => (
          <TableRow key={order.id}>
            <TableCell>
              <div className="font-medium">{getCustomerName(order.userId)}</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                {order.deliveryAddress.city}
              </div>
            </TableCell>
             <TableCell className="hidden sm:table-cell">
              <Badge variant={statusColors[order.status] || "default"} className={order.status === 'Delivered' ? 'bg-green-600/20 text-green-800 border-green-600/30' : ''}>
                {order.status}
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {format(new Date(order.timestamp), "MMM d, yyyy")}
            </TableCell>
            <TableCell className="text-right">
              {formatPrice(order.totalAmount)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
