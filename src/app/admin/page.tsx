import { StatCard } from "@/components/admin/StatCard";
import { DollarSign, ShoppingCart, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderDataTable } from "@/components/admin/OrderDataTable";
import { formatPrice } from "@/lib/utils";
import { getOrders } from "@/lib/data";

export default function AdminDashboardPage() {

  const orders = getOrders();
  const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);
  const totalSales = orders.flatMap(order => order.items).reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="space-y-8">
       <h1 className="font-headline text-3xl">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard 
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          description="+20.1% from last month"
        />
        <StatCard 
          title="Sales"
          value={`+${totalSales}`}
          icon={ShoppingCart}
          description="+19% from last month"
        />
        <StatCard 
          title="Active Orders"
          value={orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length.toString()}
          icon={Package}
          description="+2 since last hour"
        />
      </div>
      <div>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
                <OrderDataTable />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
