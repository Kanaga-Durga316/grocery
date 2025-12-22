import { StatCard } from "@/components/admin/StatCard";
import { DollarSign, ShoppingCart, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderDataTable } from "@/components/admin/OrderDataTable";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
       <h1 className="font-headline text-3xl">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard 
          title="Total Revenue"
          value="$45,231.89"
          icon={DollarSign}
          description="+20.1% from last month"
        />
        <StatCard 
          title="Sales"
          value="+12,234"
          icon={ShoppingCart}
          description="+19% from last month"
        />
        <StatCard 
          title="Active Orders"
          value="573"
          icon={Package}
          description="+201 since last hour"
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
