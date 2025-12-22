


"use client";

import { useMemo, useState } from 'react';
import { getProducts, getCategories } from '@/lib/data';
import { PageHeader } from '@/components/PageHeader';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { MenuItem } from '@/components/MenuItem';
import type { Product } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Leaf, Filter } from 'lucide-react';

export default function MenuPage() {
  const allProducts = useMemo(() => getProducts(), []);
  const categories = useMemo(() => getCategories(), []);
  const [produceFilter, setProduceFilter] = useState<'all' | 'under30' | 'combo'>('all');
  const [dairyBrandFilter, setDairyBrandFilter] = useState<string>('all');
  const [pantryBenefitFilter, setPantryBenefitFilter] = useState<'all' | 'High Protein' | 'Low GI'>('all');
  
  const pageHeaderImage = PlaceHolderImages.find(p => p.id === 'page-header-products')!;

  const dairyBrands = useMemo(() => {
    const brands = new Set<string>();
    allProducts.forEach(p => {
      if (p.categoryId === 'dairy-bakery' && p.brand) {
        brands.add(p.brand);
      }
    });
    return Array.from(brands);
  }, [allProducts]);

  const productsByCategory = useMemo(() => {
    return categories.map(category => {
      let originalCategoryProducts = allProducts.filter(product => product.categoryId === category.id);
      let structuredProducts: { name: string; products: Product[] }[] = [];

      if (['fresh-produce', 'dairy-bakery', 'staples-pantry', 'meat-seafood', 'beverages'].includes(category.id)) {
        let productsToStructure = originalCategoryProducts;
        
        if (category.id === 'fresh-produce') {
            if (produceFilter === 'under30') {
                productsToStructure = productsToStructure.filter(p => p.price < 30);
            } else if (produceFilter === 'combo') {
                productsToStructure = productsToStructure.filter(p => p.subCategory === 'Combos');
            }
        }
        
        if (category.id === 'dairy-bakery') {
            if (dairyBrandFilter !== 'all') {
                productsToStructure = productsToStructure.filter(p => p.brand === dairyBrandFilter);
            }
        }

        if (category.id === 'staples-pantry') {
          if (pantryBenefitFilter !== 'all') {
            productsToStructure = productsToStructure.filter(p => p.tags?.includes(pantryBenefitFilter));
          }
        }

        const subCategories = Array.from(new Set(productsToStructure.map(p => p.subCategory).filter(Boolean)));
        
        structuredProducts = subCategories.map(subCategory => ({
          name: subCategory,
          products: productsToStructure.filter(p => p.subCategory === subCategory)
        })).filter(sc => sc.products.length > 0);
        
        return {
          ...category,
          products: [],
          structuredProducts: structuredProducts
        };
      }
      
      // For categories without sub-category logic
      return {
        ...category,
        products: originalCategoryProducts,
        structuredProducts: []
      };

    }).filter(category => category.products.length > 0 || (category.structuredProducts && category.structuredProducts.length > 0));
  }, [allProducts, categories, produceFilter, dairyBrandFilter, pantryBenefitFilter]);

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
            <div className="flex justify-center items-center gap-4 mb-4">
                <h2 className="font-headline text-4xl text-center text-primary font-bold">{category.name}</h2>
                {category.id === 'fresh-produce' && (
                    <Badge variant="outline" className="border-green-600 text-green-700 bg-green-100 text-base">
                        <Leaf className="mr-2 h-5 w-5" />
                        Farm Fresh
                    </Badge>
                )}
            </div>

            {category.id === 'fresh-produce' && (
              <div className="flex justify-center items-center gap-2 mb-8">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Quick Filters:</span>
                <Button variant={produceFilter === 'all' ? 'secondary' : 'outline'} size="sm" onClick={() => setProduceFilter('all')}>All</Button>
                <Button variant={produceFilter === 'under30' ? 'secondary' : 'outline'} size="sm" onClick={() => setProduceFilter('under30')}>Under ₹30</Button>
                <Button variant={produceFilter === 'combo' ? 'secondary' : 'outline'} size="sm" onClick={() => setProduceFilter('combo')}>Combos</Button>
              </div>
            )}
            
            {category.id === 'dairy-bakery' && (
              <div className="flex justify-center items-center gap-2 mb-8">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Filter by Brand:</span>
                <Button variant={dairyBrandFilter === 'all' ? 'secondary' : 'outline'} size="sm" onClick={() => setDairyBrandFilter('all')}>All Brands</Button>
                {dairyBrands.map(brand => (
                    <Button key={brand} variant={dairyBrandFilter === brand ? 'secondary' : 'outline'} size="sm" onClick={() => setDairyBrandFilter(brand)}>{brand}</Button>
                ))}
              </div>
            )}

            {category.id === 'staples-pantry' && (
              <div className="flex justify-center items-center gap-2 mb-8">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Filter by Benefit:</span>
                <Button variant={pantryBenefitFilter === 'all' ? 'secondary' : 'outline'} size="sm" onClick={() => setPantryBenefitFilter('all')}>All</Button>
                <Button variant={pantryBenefitFilter === 'High Protein' ? 'secondary' : 'outline'} size="sm" onClick={() => setPantryBenefitFilter('High Protein')}>High Protein</Button>
                <Button variant={pantryBenefitFilter === 'Low GI' ? 'secondary' : 'outline'} size="sm" onClick={() => setPantryBenefitFilter('Low GI')}>Low GI</Button>
              </div>
            )}
            
            {category.structuredProducts && category.structuredProducts.length > 0 ? (
              <div className="space-y-12">
                 {category.structuredProducts.length > 0 ? (
                    category.structuredProducts.map(subCat => (
                      <div key={subCat.name}>
                        <h3 className="font-headline text-2xl text-accent font-bold mb-6 border-b border-border pb-2">{subCat.name}</h3>
                        <div className="grid md:grid-cols-2 gap-x-8 gap-y-10">
                          {subCat.products.map(product => (
                            <MenuItem key={product.id} product={product} />
                          ))}
                        </div>
                      </div>
                    ))
                 ) : (
                    <p className="text-center text-muted-foreground">No products match the selected filter.</p>
                 )}
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
