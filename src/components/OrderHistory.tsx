'use client';

import { useMemo } from 'react';
import { collection, query, orderBy } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import type { Order } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

const statusColors: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
  Placed: 'outline',
  Confirmed: 'secondary',
  Packed: 'default',
  'Out for Delivery': 'default',
  Delivered: 'default',
  Cancelled: 'destructive',
};

export function OrderHistory({ userId }: { userId: string }) {
  const firestore = useFirestore();

  const ordersQuery = useMemoFirebase(
    () =>
      firestore
        ? query(collection(firestore, 'users', userId, 'orders'), orderBy('timestamp', 'desc'))
        : null,
    [firestore, userId]
  );

  const { data: orders, isLoading } = useCollection<Order>(ordersQuery);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Order History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Order History</CardTitle>
      </CardHeader>
      <CardContent>
        {orders && orders.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {orders.map(order => (
              <AccordionItem value={order.id} key={order.id}>
                <AccordionTrigger>
                  <div className="flex justify-between items-center w-full pr-4">
                    <div className="text-left">
                      <p className="font-semibold">Order #{order.id.slice(0, 7)}...</p>
                      <p className="text-sm text-muted-foreground">
                        {order.timestamp ? format(new Date(order.timestamp.seconds * 1000), 'MMM d, yyyy') : 'Date not available'}
                      </p>
                    </div>
                    <div className="text-right">
                       <Badge variant={statusColors[order.status] || 'default'} className={order.status === 'Delivered' ? 'bg-green-600/20 text-green-800 border-green-600/30' : ''}>
                        {order.status}
                      </Badge>
                      <p className="font-semibold mt-1">{formatPrice(order.totalAmount)}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Image src={item.imageUrl} alt={item.name} width={48} height={48} className="rounded-md" />
                          <div>
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="text-sm">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))}
                    <Separator />
                    <div className="text-sm">
                      <p><span className="font-semibold">Deliver to:</span> {order.deliveryAddress.name}</p>
                      <p className="text-muted-foreground">{order.deliveryAddress.address}, {order.deliveryAddress.city}, {order.deliveryAddress.zip}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="text-muted-foreground text-center">You have not placed any orders yet.</p>
        )}
      </CardContent>
    </Card>
  );
}
