'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/use-cart';
import { useAuth } from '@/hooks/use-auth';
import { formatPrice } from '@/lib/utils';
import { PageHeader } from '@/components/PageHeader';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { PaymentMethodSelector } from '@/components/PaymentMethodSelector';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  zip: z.string().min(5, 'ZIP code is required'),
  paymentMethod: z.string({ required_error: 'Please select a payment method.' }),
});

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: user?.name || '',
      address: '',
      city: '',
      zip: '',
      paymentMethod: 'card',
    },
  });

  useEffect(() => {
    if (cartItems.length === 0 && !isProcessing) {
      router.replace('/products');
    }
  }, [cartItems, router, isProcessing]);

  const onSubmit = (values: z.infer<typeof checkoutSchema>) => {
    setIsProcessing(true);
    console.log('Placing order with values:', values);

    // Simulate payment processing
    setTimeout(() => {
      console.log('Order placed:', {
        user: user?.id,
        items: cartItems.map(item => ({
          productId: item.product.id,
          variantId: item.variant?.id,
          quantity: item.quantity,
          price: item.variant ? item.variant.price : item.product.price,
        })),
        total: cartTotal,
        shippingInfo: {
          name: values.name,
          address: values.address,
          city: values.city,
          zip: values.zip,
        },
        paymentMethod: values.paymentMethod,
      });

      // In a real app, this would call a backend to process payment and create an order.
      clearCart();
      toast({
        title: 'Order Placed!',
        description: 'Thank you for your purchase.',
        variant: 'success',
      });
      router.push('/order-confirmation');
      setIsProcessing(false);
    }, 3000); // 3-second delay to simulate payment
  };

  const pageHeaderImage = PlaceHolderImages.find(p => p.id === 'page-header-checkout')!;

  if (cartItems.length === 0 && !isProcessing) {
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
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={isProcessing} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={isProcessing} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={isProcessing} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="zip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP Code</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={isProcessing} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Payment Details */}
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <Card>
                      <CardHeader>
                        <CardTitle className="font-headline text-2xl">Payment Method</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <FormControl>
                          <PaymentMethodSelector
                            value={field.value}
                            onChange={field.onChange}
                            disabled={isProcessing}
                          />
                        </FormControl>
                        <FormMessage className="mt-4" />
                      </CardContent>
                    </Card>
                  </FormItem>
                )}
              />
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Order Summary</CardTitle>
                </CardHeader>
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
                    );
                  })}
                  <Separator />
                  <div className="flex justify-between text-muted-foreground">
                    <p>Subtotal</p>
                    <p>{formatPrice(cartTotal)}</p>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <p>Shipping</p>
                    <p>Free</p>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <p>Total</p>
                    <p>{formatPrice(cartTotal)}</p>
                  </div>
                  <Button type="submit" size="lg" className="w-full" disabled={isProcessing}>
                    {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isProcessing ? 'Processing Payment...' : 'Place Order'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
