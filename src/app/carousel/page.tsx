
'use client';

import { useState } from 'react';
import { collection } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { Loader2 } from 'lucide-react';

import type { Product } from '@/lib/types';
import { CircularProductCarousel } from '@/components/CircularProductCarousel';
import { ProductDetailView } from '@/components/ProductDetailView';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function CarouselPage() {
  const firestore = useFirestore();
  const productsQuery = useMemoFirebase(
    () => (firestore ? collection(firestore, 'products') : null),
    [firestore]
  );
  const { data: products, isLoading } = useCollection<Product>(productsQuery);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">No products available for carousel.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="relative flex-grow flex flex-col items-center justify-center overflow-hidden">
        <div className="text-center mb-8 z-10">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Product Showcase</h1>
          <p className="text-muted-foreground mt-2">Drag to explore our featured products</p>
        </div>
        <CircularProductCarousel 
          products={products} 
          onProductClick={setSelectedProduct} 
        />
        <ProductDetailView 
          product={selectedProduct}
          onOpenChange={(isOpen) => !isOpen && setSelectedProduct(null)}
        />
      </main>
      <Footer />
    </div>
  );
}

