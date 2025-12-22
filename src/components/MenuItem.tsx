"use client";

import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/lib/types';
import { AddToCartButton } from './AddToCartButton';
import { useState } from 'react';
import { QuantitySelector } from './QuantitySelector';

interface MenuItemProps {
  product: Product;
}

export function MenuItem({ product }: MenuItemProps) {
    const [quantity, setQuantity] = useState(1);
    
    return (
        <div className="flex gap-4 items-start border-b border-dashed border-border/50 pb-4">
            <Link href={`/products/${product.id}`}>
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={product.imageHint}
                  />
              </div>
            </Link>
            <div className="flex-grow">
                <Link href={`/products/${product.id}`}>
                    <h3 className="text-lg font-headline text-foreground hover:text-primary transition-colors">{product.name}</h3>
                </Link>
                <p className="text-sm text-muted-foreground mt-1 hidden sm:block">{product.description}</p>
                 <div className="mt-4 flex items-center gap-4">
                    <p className="text-lg font-bold text-primary">{formatPrice(product.price)}</p>
                    <div className="flex items-center gap-2">
                        <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
                        <AddToCartButton product={product} quantity={quantity} />
                    </div>
                </div>
            </div>
        </div>
    );
}
