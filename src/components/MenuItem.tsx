"use client";

import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import type { Product, ProductVariant } from '@/lib/types';
import { AddToCartButton } from './AddToCartButton';
import { useState, useMemo } from 'react';
import { QuantitySelector } from './QuantitySelector';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar, Repeat, ShoppingBag, TrendingUp } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MenuItemProps {
  product: Product;
}

export function MenuItem({ product }: MenuItemProps) {
    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(product.variants?.[0]);

    const handleAddToCart = (product: Product, quantity: number, variant?: ProductVariant) => {
      // This is a placeholder. The actual logic is in AddToCartButton
      console.log('Adding to cart:', { product, quantity, variant });
    };

    const currentPrice = useMemo(() => {
        if (selectedVariant) return selectedVariant.price;
        return product.price;
    }, [selectedVariant, product.price]);

    const hasStockUpBadge = useMemo(() => {
      return product.variants?.some(v => v.weight.includes('kg') && parseInt(v.weight, 10) >= 5);
    }, [product.variants]);
    
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
                <div className="flex justify-between items-start">
                    <Link href={`/products/${product.id}`}>
                        <h3 className="text-lg font-headline text-foreground hover:text-primary transition-colors">{product.name}</h3>
                    </Link>
                    {hasStockUpBadge && (
                       <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-800 border-blue-200">
                         <TrendingUp className="mr-1.5 h-4 w-4" />
                         Stock Up
                       </Badge>
                    )}
                </div>
                <p className="text-sm text-muted-foreground mt-1 hidden sm:block">{product.description}</p>
                
                {product.bestBefore && (
                  <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Best Before: {product.bestBefore}</span>
                  </div>
                )}

                 <div className="mt-4 flex items-center justify-between">
                    <p className="text-lg font-bold text-primary">{formatPrice(currentPrice)}</p>
                    <div className="flex items-center gap-2">
                        {product.variants ? (
                             <Select
                                value={selectedVariant?.id}
                                onValueChange={(variantId) => {
                                    const newVariant = product.variants?.find(v => v.id === variantId);
                                    setSelectedVariant(newVariant);
                                }}
                            >
                                <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="Select Weight" />
                                </SelectTrigger>
                                <SelectContent>
                                    {product.variants.map(v => (
                                        <SelectItem key={v.id} value={v.id}>{v.weight}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        ) : (
                            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
                        )}
                        <AddToCartButton product={product} quantity={quantity} variant={selectedVariant} />
                    </div>
                </div>

                {(product.subCategory === 'Milk & Fresh Products' || product.subCategory === 'Eggs') && (
                  <Button variant="outline" size="sm" className="mt-2 w-full">
                    <Repeat className="mr-2 h-4 w-4" />
                    Subscribe & Save
                  </Button>
                )}
            </div>
        </div>
    );
}
