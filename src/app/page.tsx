import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getCategories, getFeaturedProducts } from '@/lib/data';
import { ArrowRight, Utensils, Carrot, CakeSlice, Wheat } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const categoryIcons: { [key: string]: React.ElementType } = {
  'Fresh Produce': Carrot,
  'Dairy & Bakery': CakeSlice,
  'Prepared Foods': Utensils,
  'Staples & Pantry': Wheat,
};

export default function Home() {
  const categories = getCategories();
  const featuredProducts = getFeaturedProducts();
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-1');

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
              Freshness Delivered
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl font-body">
              Quality groceries and delicious meals, right to your doorstep. Experience the ease of online shopping with GrocerEase.
            </p>
            <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg">
              <Link href="/products">View Menu <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-headline text-center text-foreground mb-12">
              Browse by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {categories.map((category) => {
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
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-12">
               <Button asChild size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link href="/products">View Full Menu <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

    