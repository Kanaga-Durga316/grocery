import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  className?: string;
  starClassName?: string;
}

export function RatingStars({ rating, maxRating = 5, className, starClassName }: RatingStarsProps) {
  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {[...Array(maxRating)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            'h-4 w-4',
            i < Math.round(rating)
              ? 'text-accent fill-accent'
              : 'text-muted-foreground/50',
            starClassName
          )}
        />
      ))}
    </div>
  );
}
