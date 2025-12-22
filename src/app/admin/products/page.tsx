import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ProductDataTable } from "@/components/admin/ProductDataTable";
import { PlusCircle } from "lucide-react";

export default function AdminProductsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl">Products</h1>
          <p className="text-muted-foreground">Manage your products here.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Product List</CardTitle>
            <CardDescription>An overview of all products in your store.</CardDescription>
        </CardHeader>
        <CardContent>
            <ProductDataTable />
        </CardContent>
      </Card>
    </div>
  );
}
