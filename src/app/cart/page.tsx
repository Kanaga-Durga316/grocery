

"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { PageHeader } from "@/components/PageHeader";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, ArrowRight } from "lucide-react";
import { QuantitySelector } from "@/components/QuantitySelector";
import { useToast } from "@/hooks/use-toast";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();
  const pageHeaderImage = PlaceHolderImages.find(p => p.id === 'page-header-cart')!;
  const { toast } = useToast();

  const handleRemoveFromCart = (productId: string, variantId?: string) => {
    removeFromCart(productId, variantId);
    toast({
      title: "Item Removed from Cart 💔",
      variant: "destructive",
    })
  }

  return (
    <>
      <PageHeader title="Your Shopping Cart" image={pageHeaderImage} />
      <div className="container mx-auto px-4 py-12">
        {cartCount > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                   <CardTitle className="font-headline text-2xl">Items ({cartCount})</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px] hidden md:table-cell"></TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cartItems.map(({ product, quantity, variant }) => {
                        const itemPrice = variant ? variant.price : product.price;
                        const itemName = variant ? `${product.name} (${variant.weight})` : product.name;
                        const itemId = variant ? variant.id : product.id;
                        
                        return (
                        <TableRow key={itemId}>
                          <TableCell className="hidden md:table-cell">
                             <Image
                                src={product.imageUrl}
                                alt={product.name}
                                width={64}
                                height={64}
                                className="rounded-md object-cover"
                              />
                          </TableCell>
                          <TableCell className="font-medium">{itemName}</TableCell>
                          <TableCell>
                            <QuantitySelector 
                              quantity={quantity} 
                              setQuantity={(newQuantity) => updateQuantity(product.id, newQuantity, variant?.id)}
                            />
                          </TableCell>
                          <TableCell className="text-right">{formatPrice(itemPrice * quantity)}</TableCell>
                          <TableCell className="text-right">
                             <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveFromCart(product.id, variant?.id)}
                              >
                                <Trash2 className="h-5 w-5 text-muted-foreground" />
                                <span className="sr-only">Remove item</span>
                              </Button>
                          </TableCell>
                        </TableRow>
                      )})}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                   <Button asChild size="lg" className="w-full mt-4">
                     <Link href="/checkout">
                       Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5"/>
                     </Link>
                   </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="font-headline text-3xl">Your cart is empty</h2>
            <p className="text-muted-foreground mt-2">Looks like you haven't added anything to your cart yet.</p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/ecommerce">Start Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
