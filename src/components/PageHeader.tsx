import Image from 'next/image';
import type { ImagePlaceholder } from '@/lib/placeholder-images';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  image: ImagePlaceholder;
}

export function PageHeader({ title, subtitle, image }: PageHeaderProps) {
  return (
    <section className="relative w-full h-64 text-white">
      {image && (
        <Image
          src={image.imageUrl}
          alt={image.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={image.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="font-headline text-5xl md:text-6xl font-bold drop-shadow-lg">
          {title}
        </h1>
        {subtitle && <p className="mt-2 text-lg md:text-xl max-w-2xl font-body">{subtitle}</p>}
      </div>
    </section>
  );
}
