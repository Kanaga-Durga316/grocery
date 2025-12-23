
"use client";

import { useMemo } from 'react';
import { getProducts, getCategories } from '@/lib/data';
import { PageHeader } from '@/components/PageHeader';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { MenuItem } from '@/components/MenuItem';
import type { Product } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { UtensilsCrossed } from 'lucide-react';

export default function FoodPage() {
  const allProducts = useMemo(() => getProducts(), []);
  const categories = useMemo(() => getCategories(), []);
  const pageHeaderImage = PlaceHolderImages.find(p => p.id === 'hero-1')!;

  const productsByCategory = useMemo(() => {
    return categories
      .filter(category => category.productType === 'food')
      .map(category => {
        const products = allProducts.filter(product => product.categoryId === category.id);
        const subCategories = Array.from(new Set(products.map(p => p.subCategory).filter(Boolean)));

        const structuredProducts = subCategories.map(subCategory => ({
          name: subCategory,
          products: products.filter(p => p.subCategory === subCategory)
        })).filter(sc => sc.products.length > 0);

        // Add products that don't have a subcategory
        const productsWithoutSubCategory = products.filter(p => !p.subCategory);
        if (productsWithoutSubCategory.length > 0) {
            structuredProducts.push({
                name: category.name, // Use main category name if no sub-category
                products: productsWithoutSubCategory,
            });
        }
        
        return {
          ...category,
          structuredProducts: structuredProducts
        };
      }).filter(category => category.structuredProducts && category.structuredProducts.length > 0);
  }, [allProducts, categories]);

  return (
    <>
      <PageHeader
        title="Food Delivery"
        subtitle="Delicious meals, delivered right to your door."
        image={pageHeaderImage}
      />
      <div className="container mx-auto px-4 py-12">
        {productsByCategory.map(category => (
          <div key={category.id} className="mb-16">
            <div className="flex justify-center items-center gap-4 mb-8">
              <h2 id={category.id} className="font-headline text-4xl text-center font-bold text-primary scroll-mt-24">{category.name}</h2>
              <Badge variant="outline" className="border-amber-600 text-amber-700 bg-amber-100 text-base">
                <UtensilsCrossed className="mr-2 h-5 w-5" />
                Hot & Fresh
              </Badge>
            </div>
            
            <div className="space-y-12">
              {category.structuredProducts.length > 0 ? (
                category.structuredProducts.map(subCat => (
                  <div key={subCat.name}>
                    <h3 className="font-headline text-2xl font-bold mb-6 border-b pb-2 flex items-center gap-2 text-accent border-border">
                      {subCat.name}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-10">
                      {subCat.products.map(product => (
                        <MenuItem key={product.id} product={product} />
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground">No items in this category yet.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
