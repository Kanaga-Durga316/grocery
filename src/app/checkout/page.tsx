"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { formatPrice } from "@/lib/utils";
import { PageHeader } from "@/components/PageHeader";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const checkoutSchema = z.object({
  name: z.string().min(2, "Name is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  zip: z.string().min(5, "ZIP code is required"),
  cardName: z.string().min(2, "Name on card is required"),
  cardNumber: z.string().min(16, "Card number must be 16 digits").max(16),
  cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid format (MM/YY)"),
  cardCvc: z.string().min(3, "CVC must be 3 digits").max(4),
});

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: user?.name || "",
      address: "", city: "", zip: "",
      cardName: "", cardNumber: "", cardExpiry: "", cardCvc: "",
    },
  });
  
  useEffect(() => {
    if (cartItems.length === 0) {
      router.replace('/products');
    }
  }, [cartItems, router]);

  const onSubmit = (values: z.infer<typeof checkoutSchema>) => {
    console.log("Order placed:", {
      user: user?.id,
      items: cartItems.map(item => ({
        productId: item.product.id,
        variantId: item.variant?.id,
        quantity: item.quantity,
        price: item.variant ? item.variant.price : item.product.price,
      })),
      total: cartTotal,
      shippingInfo: values,
    });
    // In a real app, this would call a backend to process payment and create an order.
    clearCart();
    toast({
      title: "Order Placed!",
      description: "Thank you for your purchase.",
    });
    router.push("/order-confirmation");
  };

  const pageHeaderImage = PlaceHolderImages.find(p => p.id === 'page-header-checkout')!;

  if (cartItems.length === 0) {
    return null; // or a loading spinner
  }

  return (
    <>
      <PageHeader title="Checkout" image={pageHeaderImage} />
      <div className="container mx-auto px-4 py-12">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Details */}
              <Card>
                <CardHeader><CardTitle className="font-headline text-2xl">Shipping Information</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem className="sm:col-span-2"><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem className="sm:col-span-2"><FormLabel>Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="zip" render={({ field }) => (
                    <FormItem><FormLabel>ZIP Code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </CardContent>
              </Card>

              {/* Payment Details */}
              <Card>
                <CardHeader><CardTitle className="font-headline text-2xl">Payment Details</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <FormField control={form.control} name="cardName" render={({ field }) => (
                    <FormItem><FormLabel>Name on Card</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="cardNumber" render={({ field }) => (
                    <FormItem><FormLabel>Card Number</FormLabel><FormControl><Input placeholder="•••• •••• •••• ••••" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="cardExpiry" render={({ field }) => (
                      <FormItem><FormLabel>Expiry (MM/YY)</FormLabel><FormControl><Input placeholder="MM/YY" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="cardCvc" render={({ field }) => (
                      <FormItem><FormLabel>CVC</FormLabel><FormControl><Input placeholder="•••" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader><CardTitle className="font-headline text-2xl">Order Summary</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map(({ product, quantity, variant }) => {
                     const itemPrice = variant ? variant.price : product.price;
                     const itemName = variant ? `${product.name} (${variant.weight})` : product.name;
                     const itemId = variant ? variant.id : product.id;

                    return (
                    <div key={itemId} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Image src={product.imageUrl} alt={product.name} width={48} height={48} className="rounded-md" />
                        <div>
                          <p className="font-medium text-sm">{itemName}</p>
                          <p className="text-xs text-muted-foreground">Qty: {quantity}</p>
                        </div>
                      </div>
                      <p className="text-sm">{formatPrice(itemPrice * quantity)}</p>
                    </div>
                  )})}
                  <Separator />
                  <div className="flex justify-between text-muted-foreground"><p>Subtotal</p><p>{formatPrice(cartTotal)}</p></div>
                  <div className="flex justify-between text-muted-foreground"><p>Shipping</p><p>Free</p></div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg"><p>Total</p><p>{formatPrice(cartTotal)}</p></div>
                  <Button type="submit" size="lg" className="w-full">Place Order</Button>
                </CardContent>
              </Card>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
