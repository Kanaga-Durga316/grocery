
"use client";

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { getProducts, getCategories } from '@/lib/data';
import { PageHeader } from '@/components/PageHeader';
import { MenuItem } from '@/components/MenuItem';
import type { Product } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UtensilsCrossed, Filter, Pizza, Utensils, Salad, Soup, CakeSlice, GlassWater } from 'lucide-react';

const categoryIcons: { [key: string]: React.ElementType } = {
  'Fast Food': Pizza,
  'Main Course': Utensils,
  'Healthy & Diet Food': Salad,
  'Street Food': Soup,
  'Bakery & Desserts': CakeSlice,
  'Beverages': GlassWater,
};


export default function FoodPage() {
  const allProducts = useMemo(() => getProducts(), []);
  const allCategories = useMemo(() => getCategories(), []);
  
  const [fastFoodFilter, setFastFoodFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [mainCourseFilter, setMainCourseFilter] = useState<'all' | 'veg' | 'non-veg'>('all');

  const pageHeaderImage = {
    id: 'food-header',
    description: 'Food delivery background',
    imageUrl: '/background/food.png',
    imageHint: 'food delivery'
  };

  const foodCategoriesData = useMemo(() => allCategories.filter(c => c.productType === 'food'), [allCategories]);

  const productsByCategory = useMemo(() => {
    return allCategories.map(category => {
      if (category.productType !== 'food') {
        return { ...category, structuredProducts: [] };
      }

      let productsToStructure = allProducts.filter(product => product.categoryId === category.id);
      
      // Apply filters
      if (category.id === 'fast-food') {
          if (fastFoodFilter === 'veg') {
              productsToStructure = productsToStructure.filter(p => !p.tags?.includes('Non-Veg'));
          } else if (fastFoodFilter === 'non-veg') {
              productsToStructure = productsToStructure.filter(p => p.tags?.includes('Non-Veg'));
          }
      }

      if (category.id === 'main-course') {
           if (mainCourseFilter === 'veg') {
              productsToStructure = productsToStructure.filter(p => !p.tags?.includes('Non-Veg'));
          } else if (mainCourseFilter === 'non-veg') {
              productsToStructure = productsToStructure.filter(p => p.tags?.includes('Non-Veg'));
          }
      }

      const subCategories = Array.from(new Set(productsToStructure.map(p => p.subCategory).filter(Boolean)));

      const structuredProducts = subCategories.map(subCategory => ({
        name: subCategory,
        products: productsToStructure.filter(p => p.subCategory === subCategory)
      })).filter(sc => sc.products.length > 0);

      // Add products that don't have a subcategory
      const productsWithoutSubCategory = productsToStructure.filter(p => !p.subCategory);
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
  }, [allProducts, allCategories, fastFoodFilter, mainCourseFilter]);

  return (
    <>
      <PageHeader
        title="Food Delivery"
        subtitle="Delicious meals, delivered right to your door."
        image={pageHeaderImage}
      />
      <div className="container mx-auto px-4 py-12">
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-headline text-center text-foreground mb-12">
              Browse by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
              {foodCategoriesData.map((category) => {
                const Icon = categoryIcons[category.name] || Utensils;
                return (
                  <Link href={`#${category.id}`} key={category.id}>
                    <Card className="group overflow-hidden text-center transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 border-border/80">
                      <CardContent className="p-6 flex flex-col items-center justify-center">
                        <div className="p-4 bg-secondary rounded-full mb-4 group-hover:bg-accent transition-colors">
                          <Icon className="h-10 w-10 text-primary group-hover:text-accent-foreground" />
                        </div>
                        <h3 className="font-headline text-xl font-semibold text-foreground">{category.name}</h3>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {productsByCategory.length > 0 ? (
          productsByCategory.map(category => (
            <div key={category.id} className="mb-16">
              <div className="flex justify-center items-center gap-4 mb-4">
                <h2 id={category.id} className="font-headline text-4xl text-center font-bold text-primary scroll-mt-24">{category.name}</h2>
                {category.id === 'fast-food' && (
                    <Badge variant="outline" className="border-amber-600 text-amber-700 bg-amber-100 text-base">
                        <UtensilsCrossed className="mr-2 h-5 w-5" />
                        Hot & Fresh
                    </Badge>
                )}
              </div>
              
              {category.id === 'fast-food' && (
                <div className="flex justify-center items-center gap-2 mb-8">
                  <Filter className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Quick Filters:</span>
                  <Button variant={fastFoodFilter === 'all' ? 'secondary' : 'outline'} size="sm" onClick={() => setFastFoodFilter('all')}>All</Button>
                  <Button variant={fastFoodFilter === 'veg' ? 'secondary' : 'outline'} size="sm" onClick={() => setFastFoodFilter('veg')}>Veg</Button>
                  <Button variant={fastFoodFilter === 'non-veg' ? 'secondary' : 'outline'} size="sm" onClick={() => setFastFoodFilter('non-veg')}>Non-Veg</Button>
                </div>
              )}
               {category.id === 'main-course' && (
                <div className="flex justify-center items-center gap-2 mb-8">
                  <Filter className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Quick Filters:</span>
                  <Button variant={mainCourseFilter === 'all' ? 'secondary' : 'outline'} size="sm" onClick={() => setMainCourseFilter('all')}>All</Button>
                  <Button variant={mainCourseFilter === 'veg' ? 'secondary' : 'outline'} size="sm" onClick={() => setMainCourseFilter('veg')}>Veg</Button>
                  <Button variant={mainCourseFilter === 'non-veg' ? 'secondary' : 'outline'} size="sm" onClick={() => setMainCourseFilter('non-veg')}>Non-Veg</Button>
                </div>
              )}
              
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
                  <p className="text-center text-muted-foreground">No items match the current filter.</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16">
            <h2 className="font-headline text-3xl">No food items available</h2>
            <p className="text-muted-foreground mt-2">Check back later for delicious meals!</p>
          </div>
        )}
      </div>
    </>
  );
}
