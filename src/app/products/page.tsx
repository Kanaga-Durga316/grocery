"use client";

import { useState, useMemo } from 'react';
import { getProducts, getCategories } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';
import { PageHeader } from '@/components/PageHeader';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import type { Category } from '@/lib/types';

export default function ProductsPage() {
  const allProducts = useMemo(() => getProducts(), []);
  const categories = useMemo(() => getCategories(), []);
  const maxPrice = useMemo(() => Math.max(...allProducts.map(p => p.price)), [allProducts]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number]>([maxPrice]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.categoryId);
      const matchesPrice = product.price <= priceRange[0];
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesPrice && matchesSearch;
    });
  }, [allProducts, searchTerm, priceRange, selectedCategories]);

  const clearFilters = () => {
    setSearchTerm('');
    setPriceRange([maxPrice]);
    setSelectedCategories([]);
  };

  const pageHeaderImage = PlaceHolderImages.find(p => p.id === 'page-header-products')!;

  return (
    <>
      <PageHeader
        title="All Products"
        subtitle="Find everything you need, from fresh produce to pantry staples."
        image={pageHeaderImage}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <div className="space-y-4">
                <h3 className="font-headline text-2xl">Filters</h3>
                <div className="relative">
                  <Input 
                    placeholder="Search products..." 
                    className="pr-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Categories</h4>
                <div className="space-y-2">
                  {categories.map((category: Category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={category.id} 
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => handleCategoryChange(category.id)}
                      />
                      <Label htmlFor={category.id} className="cursor-pointer">{category.name}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Price</h4>
                <Slider
                  min={0}
                  max={maxPrice}
                  step={1}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number])}
                />
                <p className="text-sm text-muted-foreground">Up to: {formatPrice(priceRange[0])}</p>
              </div>

              <Button onClick={clearFilters} variant="outline" className="w-full">
                <X className="mr-2 h-4 w-4" /> Clear Filters
              </Button>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="font-headline text-2xl">No Products Found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your filters or search term.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
