
"use client";

import { useMemo } from 'react';
import Link from 'next/link';
import { getCategories } from '@/lib/data';
import { PageHeader } from '@/components/PageHeader';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Smartphone, Shirt, Tv, HardDrive, HeartPulse, ShoppingCart as ShoppingCartIcon } from 'lucide-react';

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
  const ecommerceCategories = useMemo(() => {
    return getCategories().filter(c => c.productType === 'ecommerce');
  }, []);

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
                  <Link href={`#`} key={category.id}>
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
            <div className="text-center mt-16">
              <p className="text-muted-foreground">More products coming soon!</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
