
'use client';

import { useState } from 'react';
import { getProducts } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';
import { ProductDetailModal } from '@/components/ProductDetailModal';
import { PageHeader } from '@/components/PageHeader';
import type { Product } from '@/lib/types';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function ShowcasePage() {
  const products = getProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const pageHeaderImage = {
    id: 'page-header-products',
    description: 'Overhead view of a variety of fresh produce on a market stall.',
    imageUrl: 'https://images.unsplash.com/photo-1705929192183-847aef14ba29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxwcm9kdWNlJTIwbWFya2V0fGVufDB8fHx8MTc2NjM4NDQ5Mnww&ixlib.rb-4.1.0&q=80&w=1080',
    imageHint: 'produce market',
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <PageHeader title="Product Showcase" image={pageHeaderImage} />
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetailsClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        </div>
        <ProductDetailModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </main>
      <Footer />
    </div>
  );
}
