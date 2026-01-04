
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getFeaturedProducts } from '@/lib/data';
import { ArrowRight, Sparkles, ShoppingCart as ShoppingCartIcon, Shirt } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-1');
  const diwaliBannerImage = PlaceHolderImages.find(p => p.id === 'banner-diwali');

  const [isDiwali, setIsDiwali] = useState(false);

  useEffect(() => {
    // This will only run on the client, preventing hydration mismatch
    const today = new Date();
    const month = today.getMonth(); // 0-11 (Jan-Dec)
    // Diwali is usually in October or November
    if (month === 9 || month === 10) {
      setIsDiwali(true);
    }
  }, []);


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] md:h-[70vh] text-white">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold drop-shadow-lg">
              Everything You Need, On the Go
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl font-body">
              Groceries, and your favorite products, right to your doorstep.
            </p>
            <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg">
              <Link href="/products">Shop Now <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </section>

        <Tabs defaultValue="grocery" className="w-full">
          <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-sm">
            <div className="container mx-auto px-4">
              <TabsList className="grid w-full grid-cols-2 h-14">
                <TabsTrigger value="grocery" asChild className="text-lg h-10"><Link href="/products"><ShoppingCartIcon className="mr-2" /> Grocery</Link></TabsTrigger>
                <TabsTrigger value="ecommerce" asChild className="text-lg h-10"><Link href="/ecommerce"><Shirt className="mr-2" /> E-Commerce</Link></TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="grocery">
             {/* Diwali Banner Section */}
            {isDiwali && diwaliBannerImage && (
              <section className="relative bg-gradient-to-r from-amber-500 to-orange-600 text-white py-12">
                 <div className="absolute inset-0">
                    <Image
                        src={diwaliBannerImage.imageUrl}
                        alt={diwaliBannerImage.description}
                        fill
                        className="object-cover opacity-20"
                        data-ai-hint={diwaliBannerImage.imageHint}
                    />
                 </div>
                 <div className="container mx-auto px-4 relative z-10 text-center">
                    <h2 className="font-headline text-4xl font-bold flex items-center justify-center gap-3"><Sparkles /> Diwali Sweets & Snacks <Sparkles /></h2>
                    <p className="mt-2 text-lg">Celebrate the festival of lights with our special collection of traditional sweets and savory snacks.</p>
                    <Button asChild variant="secondary" size="lg" className="mt-6">
                        <Link href="/products#snacks-beverages">Shop Diwali Specials</Link>
                    </Button>
                 </div>
              </section>
            )}

            {/* Featured Products Section */}
            <section className="py-16 lg:py-24 bg-secondary/50">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-headline text-center text-foreground mb-12">
                  Our Featured Groceries
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {featuredProducts.filter(p => p.productType === 'grocery').map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                <div className="text-center mt-12">
                   <Button asChild size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    <Link href="/products">View All Groceries <ArrowRight className="ml-2 h-5 w-5" /></Link>
                  </Button>
                </div>
              </div>
            </section>
          </TabsContent>
           <TabsContent value="ecommerce">
             <section className="py-16 lg:py-24 bg-secondary/50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md-text-4xl font-headline text-center text-foreground mb-12">
                        Featured Electronics
                    </h2>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.filter(p => p.productType === 'ecommerce').map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                     <div className="text-center mt-12">
                        <Button asChild size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                            <Link href="/ecommerce">View All Products <ArrowRight className="ml-2 h-5 w-5" /></Link>
                        </Button>
                    </div>
                </div>
            </section>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
