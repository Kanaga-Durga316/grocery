"use client";

import { useMemo } from 'react';
import { getProducts, getCategories } from '@/lib/data';
import { PageHeader } from '@/components/PageHeader';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Category, Product } from '@/lib/types';
import { MenuItem } from '@/components/MenuItem';

export default function MenuPage() {
  const allProducts = useMemo(() => getProducts(), []);
  const categories = useMemo(() => getCategories(), []);
  
  const pageHeaderImage = PlaceHolderImages.find(p => p.id === 'page-header-products')!;

  const productsByCategory = useMemo(() => {
    return categories.map(category => ({
      ...category,
      products: allProducts.filter(product => product.categoryId === category.id)
    })).filter(category => category.products.length > 0);
  }, [allProducts, categories]);

  return (
    <>
      <PageHeader
        title="Our Menu"
        subtitle="Delicious meals and fresh groceries, crafted with care."
        image={pageHeaderImage}
      />
      <div className="container mx-auto px-4 py-12">
        {productsByCategory.map(category => (
          <div key={category.id} className="mb-12">
            <h2 className="font-headline text-4xl text-center text-primary mb-8">{category.name}</h2>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
              {category.products.map(product => (
                <MenuItem key={product.id} product={product} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
