
"use client";

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { Button } from './ui/button';
import { AddToCartButton } from './AddToCartButton';
import { QuantitySelector } from './QuantitySelector';
import { useState } from 'react';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface ProductDetailViewProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductDetailView({ product, open, onOpenChange }: ProductDetailViewProps) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 h-full w-full max-w-md bg-background z-50 shadow-2xl overflow-y-auto"
        >
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 rounded-full bg-background/50 hover:bg-background/80"
              onClick={() => onOpenChange(false)}
            >
              <X />
              <span className="sr-only">Close</span>
            </Button>

            <div className="relative w-full aspect-square">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background to-transparent" />
            </div>

            <div className="p-6 space-y-6 -mt-16 relative z-10">
              <h2 className="font-headline text-4xl font-bold text-foreground">{product.name}</h2>
              
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
                <Badge variant={product.stock > 0 ? "secondary" : "destructive"}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                </Badge>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
                <AddToCartButton product={product} quantity={quantity} className="w-full" size="lg" />
              </div>
              
              <Separator />

              <div className="space-y-4 text-sm text-muted-foreground">
                <p>{product.description}</p>
                
                {product.features && product.features.length > 0 && (
                    <div>
                        <h4 className="font-semibold text-foreground mb-2">Features</h4>
                        <ul className="list-disc list-inside space-y-1">
                            {product.features.map((feature, i) => <li key={i}>{feature}</li>)}
                        </ul>
                    </div>
                )}

                {product.materials && product.materials.length > 0 && (
                    <div>
                        <h4 className="font-semibold text-foreground mb-2">Materials</h4>
                         <ul className="list-disc list-inside space-y-1">
                            {product.materials.map((material, i) => <li key={i}>{material}</li>)}
                        </ul>
                    </div>
                )}
                 <div>
                    <h4 className="font-semibold text-foreground mb-2">Category</h4>
                    <p>{product.categoryId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</p>
                 </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
