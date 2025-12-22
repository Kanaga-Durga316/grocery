
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import type { Product, ProductVariant, CleaningOption } from '@/lib/types';
import { getProductById } from '@/lib/data';
import { AddToCartButton } from './AddToCartButton';
import { useState, useMemo } from 'react';
import { QuantitySelector } from './QuantitySelector';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar, Repeat, ShoppingBag, TrendingUp, Snowflake, Users, CookingPot, Microwave, Flame, Zap, Link2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface MenuItemProps {
  product: Product;
}

const CookingMethodIcon = ({ method }: { method: string }) => {
    const icons: { [key: string]: React.ElementType } = {
        'Microwave': Microwave,
        'Pan Fry': Flame,
        'Air Fryer': Zap,
        'Deep Fry': CookingPot,
        'Grill': Flame,
    };
    const Icon = icons[method];
    if (!Icon) return null;

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                    <p>{method}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export function MenuItem({ product }: MenuItemProps) {
    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(product.variants?.[0]);
    const [selectedCleaning, setSelectedCleaning] = useState<CleaningOption | undefined>(product.cleaningOptions?.[0]);

    const handleAddToCart = (product: Product, quantity: number, variant?: ProductVariant) => {
      // This is a placeholder. The actual logic is in AddToCartButton
      console.log('Adding to cart:', { product, quantity, variant });
    };

    const currentPrice = useMemo(() => {
        let price = selectedVariant?.price ?? product.price;
        if (selectedCleaning?.priceModifier) price += selectedCleaning.priceModifier;
        return price;
    }, [selectedVariant, selectedCleaning, product.price]);

    const currentStock = useMemo(() => {
      if (selectedVariant) return selectedVariant.stock;
      return product.stock;
    }, [selectedVariant, product.stock]);

    const hasStockUpBadge = useMemo(() => {
      return product.variants?.some(v => v.weight.includes('kg') && parseInt(v.weight, 10) >= 5);
    }, [product.variants]);

    const pairingProducts = useMemo(() => {
        return (product.pairingIds || []).map(id => getProductById(id)).filter(Boolean) as Product[];
    }, [product.pairingIds]);
    
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
                    <div className="flex items-center gap-2">
                      {hasStockUpBadge && (
                        <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-800 border-blue-200">
                          <TrendingUp className="mr-1.5 h-4 w-4" />
                          Stock Up
                        </Badge>
                      )}
                      {currentStock > 0 && currentStock <= 10 && (
                        <Badge variant="destructive" className="ml-2">
                          Only {currentStock} left
                        </Badge>
                      )}
                   </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1 hidden sm:block">{product.description}</p>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-xs text-muted-foreground">
                    {product.bestBefore && (
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Best Before: {product.bestBefore}</span>
                      </div>
                    )}
                    {product.categoryId === 'meat-seafood' && (
                       <Badge variant="outline" className="border-sky-300 text-sky-700 bg-sky-50">
                         <Snowflake className="mr-1.5 h-3.5 w-3.5" />
                         Chilled Delivery
                       </Badge>
                    )}
                    {product.serves && (
                        <div className="flex items-center gap-1.5">
                            <Users className="h-3.5 w-3.5" />
                            <span>Serves: {product.serves}</span>
                        </div>
                    )}
                    {product.cookingMethods && product.cookingMethods.length > 0 && (
                        <div className="flex items-center gap-1.5">
                            {product.cookingMethods.map(method => <CookingMethodIcon key={method} method={method} />)}
                        </div>
                    )}
                </div>

                {product.tags && product.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    {product.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                 <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-lg font-bold text-primary">{formatPrice(currentPrice)}</p>
                    <div className="flex items-center gap-2">
                        {product.variants && (
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
                        )}

                        {product.cleaningOptions && (
                             <Select
                                value={selectedCleaning?.id}
                                onValueChange={(cleaningId) => {
                                    const newCleaning = product.cleaningOptions?.find(c => c.id === cleaningId);
                                    setSelectedCleaning(newCleaning);
                                }}
                            >
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Cleaning" />
                                </SelectTrigger>
                                <SelectContent>
                                    {product.cleaningOptions.map(c => (
                                        <SelectItem key={c.id} value={c.id}>
                                          {c.type} {c.priceModifier ? `(+₹${c.priceModifier})` : ''}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}

                        {!product.variants && !product.cleaningOptions && (
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

                {pairingProducts.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-dashed">
                        <h4 className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1.5"><Link2 className="h-3.5 w-3.5" /> Pairs well with:</h4>
                        <div className="flex gap-2">
                            {pairingProducts.map(p => (
                                <Link key={p.id} href={`/products/${p.id}`}>
                                    <Badge variant="secondary" className="hover:bg-accent/80 transition-colors">{p.name}</Badge>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
