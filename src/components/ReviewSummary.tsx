"use client";

import { useEffect, useState, useMemo } from 'react';
import { summarizeProductReviews } from '@/ai/flows/summarize-product-reviews';
import type { Review } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface ReviewSummaryProps {
  productId: string;
  reviews: Review[];
}

export function ReviewSummary({ productId, reviews }: ReviewSummaryProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reviewTexts = useMemo(() => reviews.map(r => r.comment), [reviews]);

  useEffect(() => {
    if (reviewTexts.length === 0) {
      setIsLoading(false);
      return;
    }

    let isCancelled = false;

    const generateSummary = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await summarizeProductReviews({ productId, reviews: reviewTexts });
        if (!isCancelled) {
          setSummary(result.summary);
        }
      } catch (e) {
        console.error('Failed to generate review summary:', e);
        if (!isCancelled) {
          setError('Could not generate summary at this time.');
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    generateSummary();

    return () => {
      isCancelled = true;
    };
  }, [productId, reviewTexts]);

  if (reviews.length === 0) {
    return null;
  }

  return (
    <Card className="bg-secondary/50 border-accent/30 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl text-foreground">
          <Wand2 className="h-6 w-6 text-accent" />
          <span>AI-Powered Review Summary</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        )}
        {error && <p className="text-destructive">{error}</p>}
        {summary && <p className="text-muted-foreground italic leading-relaxed">"{summary}"</p>}
      </CardContent>
    </Card>
  );
}
