import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductById, getReviewsForProduct, getUserById } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import { RatingStars } from '@/components/RatingStars';
import { AddToCartButton } from '@/components/AddToCartButton';
import { QuantitySelector } from '@/components/QuantitySelector';
import { ReviewSummary } from '@/components/ReviewSummary';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ContactSellerDialog } from '@/components/ContactSellerDialog';
import { Store } from 'lucide-react';

type ProductDetailPageProps = {
  params: { id: string };
};

function ProductReviews({ reviews }: { reviews: ReturnType<typeof getReviewsForProduct> }) {
  return (
    <div className="space-y-6">
      {reviews.map(review => {
        const user = getUserById(review.userId);
        return (
          <div key={review.id} className="flex gap-4">
            <Avatar>
              <AvatarImage src={`https://i.pravatar.cc/150?u=${user?.id}`} alt={user?.name} />
              <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(review.timestamp), "MMM d, yyyy")}
                  </p>
                </div>
                <RatingStars rating={review.rating} />
              </div>
              <p className="mt-2 text-muted-foreground">{review.comment}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AddToCartSection({ product }: { product: NonNullable<ReturnType<typeof getProductById>> }) {
  "use client";
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
      <AddToCartButton
        product={product}
        quantity={quantity}
        className="w-full sm:w-auto"
        size="lg"
      />
    </div>
  );
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  const seller = getUserById(product.sellerId);
  const reviews = getReviewsForProduct(params.id);
  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            data-ai-hint={product.imageHint}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground">
              {product.name}
            </h1>
            <div className="mt-4 flex items-center gap-4">
              <p className="text-3xl font-bold text-primary">{formatPrice(product.price)}</p>
              <div className="flex items-center gap-2">
                <RatingStars rating={averageRating} />
                <span className="text-muted-foreground text-sm">({reviews.length} reviews)</span>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          
          <AddToCartSection product={product} />
          
          <Separator />
          
          {seller && (
             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 rounded-lg border bg-card text-card-foreground shadow-sm p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`https://avatar.vercel.sh/${seller.id}.png`} alt={seller.name} />
                    <AvatarFallback><Store /></AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm text-muted-foreground">Sold by</p>
                    <Link href={`/sellers/${seller.id}`} className="font-semibold text-foreground hover:text-primary transition-colors">
                        {seller.name}
                    </Link>
                  </div>
                </div>
                <ContactSellerDialog seller={seller} product={product} />
              </div>
          )}

          <div>
             <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">Category:</span> {product.categoryId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</p>
             <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">Stock:</span> {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}</p>
          </div>
        </div>
      </div>

      <div className="mt-16 lg:mt-24 space-y-12">
        {/* AI Review Summary */}
        <ReviewSummary productId={product.id} reviews={reviews} />

        {/* Customer Reviews */}
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Customer Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            {reviews.length > 0 ? <ProductReviews reviews={reviews} /> : <p>No reviews yet.</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
