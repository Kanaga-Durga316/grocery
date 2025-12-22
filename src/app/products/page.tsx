
"use client";

import { useMemo } from 'react';
import { getProducts, getCategories } from '@/lib/data';
import { PageHeader } from '@/components/PageHeader';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { MenuItem } from '@/components/MenuItem';
import type { Product } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Leaf } from 'lucide-react';

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
            <div className="flex justify-center items-center gap-4 mb-8">
                <h2 className="font-headline text-4xl text-center text-primary font-bold">{category.name}</h2>
                {category.id === 'fresh-produce' && (
                    <Badge variant="outline" className="border-green-600 text-green-700 bg-green-100 text-base">
                        <Leaf className="mr-2 h-5 w-5" />
                        Farm Fresh
                    </Badge>
                )}
            </div>
            
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
