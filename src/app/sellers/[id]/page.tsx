import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getUserById, getProductsBySeller } from '@/lib/data';
import { PageHeader } from '@/components/PageHeader';
import { ProductCard } from '@/components/ProductCard';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, Phone, Store } from 'lucide-react';

export default function SellerProfilePage({ params }: { params: { id: string } }) {
  const seller = getUserById(params.id);

  if (!seller || seller.role !== 'Seller') {
    notFound();
  }

  const products = getProductsBySeller(params.id);
  const pageHeaderImage = PlaceHolderImages.find(p => p.id === 'page-header-products')!;

  return (
    <>
      <PageHeader title={seller.name} image={pageHeaderImage} />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <aside className="lg:col-span-1">
             <Card className="sticky top-24">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                    <Avatar className="w-24 h-24 mb-4">
                        <AvatarImage src={`https://avatar.vercel.sh/${seller.id}.png`} alt={seller.name} />
                        <AvatarFallback><Store size={40}/></AvatarFallback>
                    </Avatar>
                    <h2 className="font-headline text-2xl text-foreground">{seller.name}</h2>
                    <p className="text-sm text-muted-foreground mb-4">Seller</p>

                    <div className="space-y-2 text-sm text-muted-foreground text-left">
                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            <span>{seller.email}</span>
                        </div>
                         <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            <span>(123) 456-7890</span>
                        </div>
                    </div>
                </CardContent>
             </Card>
          </aside>
          <main className="lg:col-span-3">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Products from {seller.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    ) : (
                    <p className="text-muted-foreground">This seller has no products yet.</p>
                    )}
                </CardContent>
             </Card>
          </main>
        </div>
      </div>
    </>
  );
}
