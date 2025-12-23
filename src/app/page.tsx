

"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getCategories, getFeaturedProducts } from '@/lib/data';
import { ArrowRight, Utensils, ShoppingBasket, CakeSlice, Wheat, Drumstick, GlassWater, Sparkles, Home as HomeIcon, HeartPulse, ShoppingCart as ShoppingCartIcon, Shirt, Pizza, Salad, Soup, Smartphone, Tv, HardDrive } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const categoryIcons: { [key: string]: React.ElementType } = {
  // Grocery
  'Fresh Produce': ShoppingBasket,
  'Dairy & Eggs': CakeSlice,
  'Staples & Grains': Wheat,
  'Meat & Seafood': Drumstick,
  'Snacks & Beverages': GlassWater,
  'Household Essentials': HomeIcon,
  'Personal Care & Wellness': HeartPulse,

  // Food
  'Fast Food': Pizza,
  'Main Course': Utensils,
  'Healthy & Diet Food': Salad,
  'Street Food': Soup,
  'Bakery & Desserts': CakeSlice,
  'Beverages': GlassWater,

  // E-Commerce
  'Electronics': Smartphone,
  'Fashion': Shirt,
  'Footwear': Shirt, // Using shirt icon as a placeholder
  'Accessories': Tv, // Using TV as a placeholder
  'Home & Kitchen': HardDrive, // Using HardDrive as placeholder
  'Beauty & Personal Care': HeartPulse,
  'Baby & Kids': ShoppingCartIcon,
};

export default function Home() {
  const categories = getCategories();
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
              Everything, Delivered
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl font-body">
              Groceries, food, and your favorite products, right to your doorstep.
            </p>
            <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg">
              <Link href="/products">Shop Now <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </section>

        <Tabs defaultValue="grocery" className="w-full">
          <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-sm">
            <div className="container mx-auto px-4">
              <TabsList className="grid w-full grid-cols-3 h-14">
                <TabsTrigger value="grocery" asChild className="text-lg h-10"><Link href="/products"><ShoppingCartIcon className="mr-2" /> Grocery</Link></TabsTrigger>
                <TabsTrigger value="food" asChild className="text-lg h-10"><Link href="/food"><Utensils className="mr-2" /> Food</Link></TabsTrigger>
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

            {/* Categories Section */}
            <section className="py-16 lg:py-24 bg-background">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-headline text-center text-foreground mb-12">
                  Browse by Category
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
                  {categories.filter(c => c.productType === 'grocery' && c.id !== 'packaged-instant-foods' && c.id !== 'cooking-oils-ghee' && c.id !== 'spices-masalas').map((category) => {
                    const Icon = categoryIcons[category.name] || Utensils;
                    return (
                      <Link href={`/products#${category.id}`} key={category.id}>
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

            {/* Featured Products Section */}
            <section className="py-16 lg:py-24 bg-secondary/50">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-headline text-center text-foreground mb-12">
                  Our Featured Products
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
          <TabsContent value="food">
             {/* Food Categories Section */}
            <section className="py-16 lg:py-24 bg-background">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-headline text-center text-foreground mb-12">
                  What are you craving?
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
                  {categories.filter(c => c.productType === 'food').map((category) => {
                    const Icon = categoryIcons[category.name] || Utensils;
                    return (
                      <Link href={`/food#${category.id}`} key={category.id}>
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
            
             <section className="py-16 lg:py-24 bg-secondary/50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-headline text-center text-foreground mb-12">
                        Featured Food Items
                    </h2>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.filter(p => p.productType === 'food').map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                     <div className="text-center mt-12">
                        <Button asChild size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                            <Link href="/food">View Full Menu <ArrowRight className="ml-2 h-5 w-5" /></Link>
                        </Button>
                    </div>
                </div>
            </section>
          </TabsContent>
          <TabsContent value="ecommerce">
              <div className="container mx-auto px-4 py-16 text-center">
                  <h2 className="text-3xl md:text-4xl font-headline text-center text-foreground mb-4">Coming Soon!</h2>
                  <p className="text-muted-foreground max-w-xl mx-auto">Our E-commerce section is under construction. Soon you'll be able to shop for electronics, fashion, and more. Stay tuned!</p>
              </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
