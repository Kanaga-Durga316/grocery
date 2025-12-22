import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function OrderConfirmationPage() {
  const pageHeaderImage = PlaceHolderImages.find(p => p.id === 'page-header-confirmation')!;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <PageHeader title="Order Confirmed!" image={pageHeaderImage} />
        <div className="container mx-auto px-4 py-12">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="items-center text-center">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
              <CardTitle className="font-headline text-3xl mt-4">Thank You For Your Order!</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                We've received your order and will start processing it right away. 
                You will receive an email confirmation shortly with your order details.
              </p>
              <div className="flex justify-center gap-4 pt-4">
                <Button asChild>
                  <Link href="/products">Continue Shopping</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/account">View My Orders</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
