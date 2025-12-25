
"use client";

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { getCategories, getProducts } from '@/lib/data';
import { PageHeader } from '@/components/PageHeader';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Smartphone, Shirt, Tv, HardDrive, HeartPulse, ShoppingCart as ShoppingCartIcon } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import type { Product } from '@/lib/types';
import { CircularProductCarousel } from '@/components/CircularProductCarousel';
import { ProductDetailView } from '@/components/ProductDetailView';

const categoryIcons: { [key: string]: React.ElementType } = {
  'Electronics': Smartphone,
  'Fashion': Shirt,
  'Footwear': Shirt,
  'Accessories': Tv,
  'Home & Kitchen': HardDrive,
  'Beauty & Personal Care': HeartPulse,
  'Baby & Kids': ShoppingCartIcon,
};

export default function EcommercePage() {
  const allProducts = useMemo(() => getProducts(), []);
  const allCategories = useMemo(() => getCategories(), []);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const ecommerceCategories = useMemo(() => {
    return allCategories.filter(c => c.productType === 'ecommerce');
  }, [allCategories]);

  const productsByCategory = useMemo(() => {
    return ecommerceCategories.map(category => {
      let productsToStructure = allProducts.filter(product => product.categoryId === category.id);
      
      const subCategories = Array.from(new Set(productsToStructure.map(p => p.subCategory).filter(Boolean)));

      const structuredProducts = subCategories.map(subCategory => ({
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
      
      return {
        ...category,
        structuredProducts: structuredProducts
      };
    }).filter(category => category.structuredProducts && category.structuredProducts.length > 0);
  }, [allProducts, ecommerceCategories]);

  const electronicsProducts = useMemo(() => {
    return allProducts.filter(p => p.categoryId === 'electronics');
  }, [allProducts]);

  const pageHeaderImage = PlaceHolderImages.find(p => p.id === 'page-header-products')!;

  return (
    <>
      <PageHeader
        title="E-Commerce"
        subtitle="Shop for electronics, fashion, home goods, and more."
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
              <div className="flex justify-center items-center gap-4 mb-8">
                <h2 id={category.id} className="font-headline text-4xl text-center font-bold text-primary scroll-mt-24">{category.name}</h2>
              </div>
              
              {category.id === 'electronics' ? (
                <div className="relative">
                  <CircularProductCarousel products={electronicsProducts} onProductClick={setSelectedProduct} />
                  <ProductDetailView product={selectedProduct} onOpenChange={(isOpen) => !isOpen && setSelectedProduct(null)} />
                </div>
              ) : (
                <div className="space-y-12">
                  {category.structuredProducts.length > 0 ? (
                    category.structuredProducts.map(subCat => (
                      <div key={subCat.name}>
                        <h3 className="font-headline text-2xl font-bold mb-6 border-b pb-2 text-accent border-border">
                          {subCat.name}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                          {subCat.products.map(product => (
                            <ProductCard key={product.id} product={product} />
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground">No items in this category yet.</p>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center mt-16">
            <p className="text-muted-foreground">More products coming soon!</p>
          </div>
        )}
      </div>
    </>
  );
}
