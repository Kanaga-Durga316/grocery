
'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { QuantitySelector } from '@/components/QuantitySelector';
import { AddToCartButton } from '@/components/AddToCartButton';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/lib/types';
import { Tag, Package, Layers, Info } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return null;
  }
  
  const categoryName = product.categoryId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl grid-cols-1 md:grid-cols-2 gap-8 p-0">
        <div className="relative aspect-square md:aspect-auto">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover rounded-l-lg"
          />
        </div>
        <div className="p-6 flex flex-col">
          <div className="flex-grow">
            <Badge variant="secondary" className="mb-2">{categoryName}</Badge>
            <h2 className="text-3xl font-headline font-bold mb-2">{product.name}</h2>
            <p className="text-muted-foreground mb-4">{product.description}</p>
            
            <div className="flex items-center justify-between mb-4">
              <p className="text-3xl font-bold text-primary">{formatPrice(product.price)}</p>
              <Badge variant={product.stock > 0 ? 'default' : 'destructive'} className={product.stock > 0 ? "bg-green-100 text-green-800 border-green-200" : ""}>
                {product.stock > 0 ? `${product.stock} in Stock` : 'Out of Stock'}
              </Badge>
            </div>
            
            <Separator className="my-6" />

            {product.features && product.features.length > 0 && (
                 <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><Info /> Features</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        {product.features.map((feature, index) => <li key={index}>{feature}</li>)}
                    </ul>
                </div>
            )}

            {product.materials && product.materials.length > 0 && (
                 <div>
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><Layers /> Materials</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        {product.materials.map((material, index) => <li key={index}>{material}</li>)}
                    </ul>
                </div>
            )}

          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
                <AddToCartButton
                    product={product}
                    quantity={quantity}
                    className="w-full sm:w-auto flex-grow"
                    size="lg"
                />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

    