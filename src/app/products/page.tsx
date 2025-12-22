"use client";

import { useMemo } from 'react';
import { getProducts, getCategories } from '@/lib/data';
import { PageHeader } from '@/components/PageHeader';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { MenuItem } from '@/components/MenuItem';
import type { Product } from '@/lib/types';

export default function MenuPage() {
  const allProducts = useMemo(() => getProducts(), []);
  const categories = useMemo(() => getCategories(), []);
  
  const pageHeaderImage = PlaceHolderImages.find(p => p.id === 'page-header-products')!;

  const productsByCategory = useMemo(() => {
    return categories.map(category => {
      const categoryProducts = allProducts.filter(product => product.categoryId === category.id);
      
      if (category.id === 'fresh-produce') {
        const subCategories = Array.from(new Set(categoryProducts.map(p => p.subCategory).filter(Boolean)));
        
        return {
          ...category,
          products: [],
          structuredProducts: subCategories.map(subCategory => ({
            name: subCategory,
            products: categoryProducts.filter(p => p.subCategory === subCategory)
          }))
        };
      }
      
      return {
        ...category,
        products: categoryProducts,
        structuredProducts: []
      };

    }).filter(category => category.products.length > 0 || (category.structuredProducts && category.structuredProducts.length > 0));
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
          <div key={category.id} id={category.id} className="mb-16 scroll-mt-20">
            <h2 className="font-headline text-4xl text-center text-primary mb-8">{category.name}</h2>
            
            {category.id === 'fresh-produce' && category.structuredProducts ? (
              <div className="space-y-12">
                {category.structuredProducts.map(subCat => (
                  <div key={subCat.name}>
                    <h3 className="font-headline text-2xl text-accent font-bold mb-6 border-b border-border pb-2">{subCat.name}</h3>
                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-10">
                      {subCat.products.map(product => (
                        <MenuItem key={product.id} product={product} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-10">
                {category.products.map(product => (
                  <MenuItem key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
