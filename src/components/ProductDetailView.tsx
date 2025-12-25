
"use client";

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { Button } from './ui/button';
import { AddToCartButton } from './AddToCartButton';
import { useState } from 'react';
import { QuantitySelector } from './QuantitySelector';

interface ProductDetailViewProps {
  product: Product | null;
  onOpenChange: (isOpen: boolean) => void;
}

export function ProductDetailView({ product, onOpenChange }: ProductDetailViewProps) {
  const [quantity, setQuantity] = useState(1);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const panelVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 },
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 z-40"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-md bg-background z-50 shadow-2xl flex flex-col"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="font-headline text-2xl text-primary">{product.name}</h2>
              <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              <div className="relative aspect-square w-full rounded-lg overflow-hidden">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-2">
                <p className="text-3xl font-bold text-foreground">{formatPrice(product.price)}</p>
                <p className="text-sm text-muted-foreground">{product.stock > 0 ? `${product.stock} available` : 'Out of stock'}</p>
              </div>

              <div className="space-y-4">
                <h3 className="font-headline text-xl border-b pb-2">Key Features</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-headline text-xl border-b pb-2">Category</h3>
                <p className="text-muted-foreground">{product.categoryId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} / {product.subCategory}</p>
              </div>

            </div>

            <div className="p-4 border-t mt-auto bg-secondary/50">
               <div className="flex items-center gap-4">
                 <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
                 <AddToCartButton product={product} quantity={quantity} className="w-full" size="lg" />
               </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
