import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { OrderDataTable } from "@/components/admin/OrderDataTable";

export default function AdminOrdersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl">Orders</h1>
        <p className="text-muted-foreground">View and manage customer orders.</p>
      </div>
       <Card>
        <CardHeader>
            <CardTitle>All Orders</CardTitle>
            <CardDescription>A list of all orders placed in your store.</CardDescription>
        </CardHeader>
        <CardContent>
          <OrderDataTable />
        </CardContent>
      </Card>
    </div>
  );
}
