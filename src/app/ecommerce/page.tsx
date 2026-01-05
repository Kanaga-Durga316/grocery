
"use client";

import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { getCategories, getProducts } from '@/lib/data';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Smartphone, Shirt, Tv, HardDrive, HeartPulse, ShoppingCart as ShoppingCartIcon, Footprints, Leaf, Sun, ShoppingBasket, CakeSlice, Wheat, Drumstick, GlassWater, Home, Utensils, Flame, Package, Filter } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { MenuItem } from '@/components/MenuItem';
import { ProductDetailModal } from '@/components/ProductDetailModal';
import type { Product } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const categoryIcons: { [key: string]: React.ElementType } = {
  // E-commerce
  'Electronics': Smartphone,
  'Fashion': Shirt,
  'Footwear': Footprints,
  'Accessories': Tv,
  'Home & Kitchen': HardDrive,
  'Beauty & Personal Care': HeartPulse,
  'Baby & Kids': ShoppingCartIcon,
  // Grocery
  'Fresh Produce': ShoppingBasket,
  'Dairy & Eggs': CakeSlice,
  'Staples & Grains': Wheat,
  'Meat & Seafood': Drumstick,
  'Snacks & Beverages': GlassWater,
  'Household Essentials': Home,
  'Personal Care & Wellness': HeartPulse,
  'Spices & Masalas': Flame,
  'Packaged & Instant Foods': Package,
};

export default function EcommercePage() {
  const allProducts = useMemo(() => getProducts(), []);
  const allCategories = useMemo(() => getCategories(), []);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [produceFilter, setProduceFilter] = useState<'all' | 'under30' | 'combo'>('all');
  const [dairyBrandFilter, setDairyBrandFilter] = useState<string>('all');
  const [pantryBenefitFilter, setPantryBenefitFilter] = useState<'all' | 'High Protein' | 'Low GI'>('all');
  const [beverageFilter, setBeverageFilter] = useState<'all' | 'diet-zero'>('all');
  const [isSunday, setIsSunday] = useState(false);

  useEffect(() => {
    const today = new Date();
    setIsSunday(today.getDay() === 0);
  }, []);
  
  const ecommerceCategories = useMemo(() => {
    return allCategories.filter(c => c.id !== 'cooking-oils-ghee' && c.id !== 'bakery-breakfast');
  }, [allCategories]);

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
    return ecommerceCategories.map(category => {
      let productsToStructure = allProducts.filter(product => product.categoryId === category.id);
      
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

      let structuredProducts = subCategories.map(subCategory => ({
        name: subCategory,
        products: productsToStructure.filter(p => p.subCategory === subCategory)
      })).filter(sc => sc.products.length > 0);

      const productsWithoutSubCategory = productsToStructure.filter(p => !p.subCategory);
      if (productsWithoutSubCategory.length > 0) {
          structuredProducts.push({
              name: category.name,
              products: productsWithoutSubCategory,
          });
      }

      if (category.id === 'meat-seafood' && isSunday) {
        const sundaySpecialNames = ['Mutton & Lamb (Aattu Iraichi)', 'Chicken (Kozhi)'];
        const specialProducts = structuredProducts.filter(sc => sundaySpecialNames.includes(sc.name));
        const regularProducts = structuredProducts.filter(sc => !sundaySpecialNames.includes(sc.name));

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
        structuredProducts: structuredProducts
      };
    }).filter(category => category.structuredProducts && category.structuredProducts.length > 0);
  }, [allProducts, ecommerceCategories, produceFilter, dairyBrandFilter, pantryBenefitFilter, beverageFilter, isSunday]);

  const pageHeaderImage = {
    id: 'ecommerce-header',
    description: 'E-commerce background',
    imageUrl: '/background/e-commerce.png',
    imageHint: 'ecommerce background'
  };

  return (
    <>
      <PageHeader
        title="E-Commerce & Grocery"
        subtitle="Shop for electronics, fashion, groceries, and more."
        image={pageHeaderImage}
      />
      <div className="container mx-auto px-4 py-12">
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-headline text-center text-foreground mb-12">
              Shop by Department
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
              {ecommerceCategories.map((category) => {
                const Icon = categoryIcons[category.name] || ShoppingCartIcon;
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
                 {category.id === 'fresh-produce' && (
                    <Badge variant="outline" className="border-green-600 text-green-700 bg-green-100 text-base">
                        <Leaf className="mr-2 h-5 w-5" />
                        Farm Fresh
                    </Badge>
                )}
              </div>
              
              {category.productType === 'grocery' && (
                 <>
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
                 </>
              )}

              <div className="space-y-12">
                {category.structuredProducts.length > 0 ? (
                  category.structuredProducts.map(subCat => (
                    <div key={subCat.name}>
                      <h3 className={`font-headline text-2xl font-bold mb-6 border-b pb-2 flex items-center gap-2 text-accent border-border`}>
                        {subCat.name.includes("Sunday Special") && <Sun className="text-yellow-500" />}
                        {subCat.name}
                      </h3>

                      {category.productType === 'ecommerce' ? (
                         <Carousel
                            opts={{ align: "start" }}
                            className="w-full"
                          >
                            <CarouselContent>
                              {subCat.products.map((product, index) => (
                                <CarouselItem key={index} className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                                  <div className="p-1">
                                    <ProductCard product={product} onViewDetailsClick={() => setSelectedProduct(product)} />
                                  </div>
                                </CarouselItem>
                              ))}
                            </CarouselContent>
                            <CarouselPrevious className="hidden lg:flex" />
                            <CarouselNext className="hidden lg:flex" />
                          </Carousel>
                      ) : (
                         <div className="grid md:grid-cols-2 gap-x-8 gap-y-10">
                            {subCat.products.map(product => (
                                <MenuItem key={product.id} product={product} onViewDetailsClick={() => setSelectedProduct(product)} />
                            ))}
                         </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground">No items in this category yet.</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-16">
            <p className="text-muted-foreground">More products coming soon!</p>
          </div>
        )}
      </div>
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}
