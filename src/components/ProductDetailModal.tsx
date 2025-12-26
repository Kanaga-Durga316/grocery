
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { Product } from '@/lib/types';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export function ProductDetailModal({ isOpen, onClose, product }: ProductDetailModalProps) {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-card rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="font-headline text-2xl text-primary">{product.name}</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-6 w-6" />
              </Button>
            </div>

            <div className="overflow-y-auto p-6 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                    <p className="text-3xl font-bold text-foreground">
                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(product.price)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                    </p>
                </div>
                 <p className="text-muted-foreground">{product.description}</p>
              </div>

              <Separator />

              {product.features && product.features.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-headline text-xl">Features</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {product.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {product.materials && product.materials.length > 0 && (
                 <div className="space-y-3">
                    <h3 className="font-headline text-xl">Materials / Ingredients</h3>
                     <div className="flex flex-wrap gap-2">
                        {product.materials.map((material, i) => (
                            <Badge key={i} variant="secondary">{material}</Badge>
                        ))}
                    </div>
                </div>
              )}
              
               <div className="space-y-2">
                 <h3 className="font-headline text-xl">Category</h3>
                 <p className="text-muted-foreground">{product.categoryId}</p>
              </div>

            </div>
            <div className="p-6 border-t mt-auto">
              <Button className="w-full" size="lg">Add to Cart</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
