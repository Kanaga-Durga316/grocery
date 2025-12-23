

"use client";

import { useMemo, useState, useEffect } from 'react';
import { getProducts, getCategories } from '@/lib/data';
import { PageHeader } from '@/components/PageHeader';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { MenuItem } from '@/components/MenuItem';
import type { Product } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Leaf, Filter, Sun, Sparkles } from 'lucide-react';

export default function MenuPage() {
  const allProducts = useMemo(() => getProducts(), []);
  const categories = useMemo(() => getCategories(), []);
  const [produceFilter, setProduceFilter] = useState<'all' | 'under30' | 'combo'>('all');
  const [dairyBrandFilter, setDairyBrandFilter] = useState<string>('all');
  const [pantryBenefitFilter, setPantryBenefitFilter] = useState<'all' | 'High Protein' | 'Low GI'>('all');
  const [beverageFilter, setBeverageFilter] = useState<'all' | 'diet-zero'>('all');
  const [isSunday, setIsSunday] = useState(false);

  useEffect(() => {
    // This will only run on the client, preventing hydration mismatch
    const today = new Date();
    setIsSunday(today.getDay() === 0);
  }, []);

  const pageHeaderImage = PlaceHolderImages.find(p => p.id === 'page-header-products')!;

  const dairyBrands = useMemo(() => {
    const brands = new Set<string>();
    allProducts.forEach(p => {
      if (p.categoryId === 'dairy-eggs' && p.brand) {
        brands.add(p.brand);
      }
    });
    return Array.from(brands);
  }, [allProducts]);

  const productsByCategory = useMemo(() => {
    return categories.map(category => {
      let originalCategoryProducts = allProducts.filter(product => product.categoryId === category.id && product.productType === 'grocery');
      let structuredProducts: { name: string; products: Product[] }[] = [];

      // Only apply sub-category logic to grocery items
      if (category.productType !== 'food') {
        let productsToStructure = originalCategoryProducts;
        
        if (category.id === 'fresh-produce') {
            if (produceFilter === 'under30') {
                productsToStructure = productsToStructure.filter(p => p.price < 30);
            }
        }
        
        if (category.id === 'dairy-eggs') {
            if (dairyBrandFilter !== 'all') {
                productsToStructure = productsToStructure.filter(p => p.brand === dairyBrandFilter);
            }
        }

        if (category.id === 'staples-grains') {
          if (pantryBenefitFilter !== 'all') {
            productsToStructure = productsToStructure.filter(p => p.tags?.includes(pantryBenefitFilter));
          }
        }

        if (category.id === 'snacks-beverages') {
          if (beverageFilter === 'diet-zero') {
            productsToStructure = productsToStructure.filter(p => p.tags?.includes('Diet/Zero'));
          }
        }

        if (category.id === 'meat-seafood' && isSunday) {
           const sundaySpecials = productsToStructure.filter(p => p.subCategory === 'Mutton & Lamb (Aattu Iraichi)' || p.name.includes('Nattu Kozhi'));
           const otherProducts = productsToStructure.filter(p => !sundaySpecials.includes(p));
           productsToStructure = [...sundaySpecials, ...otherProducts];
        }

        const subCategories = Array.from(new Set(productsToStructure.map(p => p.subCategory).filter(Boolean)));
        
        structuredProducts = subCategories.map(subCategory => ({
          name: subCategory,
          products: productsToStructure.filter(p => p.subCategory === subCategory)
        })).filter(sc => sc.products.length > 0);

        // For Sunday Special, we might not have a subcategory, let's create one virtually
        if (category.id === 'meat-seafood' && isSunday) {
            const sundaySpecialNames = ['Mutton & Lamb (Aattu Iraichi)', 'Chicken (Kozhi)'];
            const specialProducts = structuredProducts.filter(sc => sundaySpecialNames.includes(sc.name));
            const regularProducts = structuredProducts.filter(sc => !sundaySpecialNames.includes(sc.name));

            // Manually re-order Country chicken to the top inside Chicken subcat
            const chickenSubCat = specialProducts.find(sc => sc.name === 'Chicken (Kozhi)');
            if(chickenSubCat) {
                const nattuKozhi = chickenSubCat.products.find(p => p.name.includes('Nattu Kozhi'));
                if(nattuKozhi) {
                    chickenSubCat.products = [nattuKozhi, ...chickenSubCat.products.filter(p => !p.name.includes('Nattu Kozhi'))];
                }
            }
            
            structuredProducts = [
              { name: "✨ Sunday Special", products: specialProducts.flatMap(sc => sc.products.filter(p => p.subCategory === 'Mutton & Lamb (Aattu Iraichi)' || p.name.includes('Nattu Kozhi'))) },
              ...specialProducts.filter(sc => sc.name !== "Mutton & Lamb (Aattu Iraichi)"),
              ...regularProducts
            ].filter(sc => sc.products.length > 0);
        }
        
        return {
          ...category,
          products: [],
          structuredProducts: structuredProducts
        };
      }
      
      // For food items, we might use a different logic in the future
      return {
        ...category,
        products: allProducts.filter(p => p.categoryId === category.id && p.productType === 'food'),
        structuredProducts: []
      };

    }).filter(category => category.products.length > 0 || (category.structuredProducts && category.structuredProducts.length > 0));
  }, [allProducts, categories, produceFilter, dairyBrandFilter, pantryBenefitFilter, beverageFilter, isSunday]);

  const groceryCategories = useMemo(() => productsByCategory.filter(c => c.id !== 'prepared-foods'), [productsByCategory]);

  return (
    <>
      <PageHeader
        title="Our Groceries"
        subtitle="Fresh produce, pantry staples, and household essentials."
        image={pageHeaderImage}
      />
      <div className="container mx-auto px-4 py-12">
        {groceryCategories.map(category => {
          
          const categoryContent = (
            <>
              <div className="flex justify-center items-center gap-4 mb-4">
                  <h2 id={category.id} className="font-headline text-4xl text-center font-bold text-primary scroll-mt-24">{category.name}</h2>
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
                </div>
              )}
              
              {category.id === 'dairy-eggs' && (
                <div className="flex justify-center items-center gap-2 mb-8">
                  <Filter className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Filter by Brand:</span>
                  <Button variant={dairyBrandFilter === 'all' ? 'secondary' : 'outline'} size="sm" onClick={() => setDairyBrandFilter('all')}>All Brands</Button>
                  {dairyBrands.map(brand => (
                      <Button key={brand} variant={dairyBrandFilter === brand ? 'secondary' : 'outline'} size="sm" onClick={() => setDairyBrandFilter(brand)}>{brand}</Button>
                  ))}
                </div>
              )}

              {category.id === 'staples-grains' && (
                <div className="flex justify-center items-center gap-2 mb-8">
                  <Filter className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Filter by Benefit:</span>
                  <Button variant={pantryBenefitFilter === 'all' ? 'secondary' : 'outline'} size="sm" onClick={() => setPantryBenefitFilter('all')}>All</Button>
                  <Button variant={pantryBenefitFilter === 'High Protein' ? 'secondary' : 'outline'} size="sm" onClick={() => setPantryBenefitFilter('High Protein')}>High Protein</Button>
                  <Button variant={pantryBenefitFilter === 'Low GI' ? 'secondary' : 'outline'} size="sm" onClick={() => setPantryBenefitFilter('Low GI')}>Low GI</Button>
                </div>
              )}

              {category.id === 'snacks-beverages' && (
                <div className="flex justify-center items-center gap-2 mb-8">
                  <Filter className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Quick Filters:</span>
                  <Button variant={beverageFilter === 'all' ? 'secondary' : 'outline'} size="sm" onClick={() => setBeverageFilter('all')}>All</Button>
                  <Button variant={beverageFilter === 'diet-zero' ? 'secondary' : 'outline'} size="sm" onClick={() => setBeverageFilter('diet-zero')}>Diet/Zero Sugar</Button>
                </div>
              )}
              
              {category.structuredProducts && category.structuredProducts.length > 0 ? (
                <div className="space-y-12">
                   {category.structuredProducts.length > 0 ? (
                      category.structuredProducts.map(subCat => (
                        <div key={subCat.name}>
                          <h3 className={`font-headline text-2xl font-bold mb-6 border-b pb-2 flex items-center gap-2 text-accent border-border`}>
                             {subCat.name.includes("Sunday Special") && <Sun className="text-yellow-500" />}
                             {subCat.name}
                          </h3>
                          <div className={`grid md:grid-cols-2 gap-x-8 gap-y-10`}>
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
            </>
          );
          
          return (
            <div key={category.id} className="mb-16">
              {categoryContent}
            </div>
          )
        })}
      </div>
    </>
  );
}

    

    

