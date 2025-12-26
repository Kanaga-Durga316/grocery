'use client';
import { useState } from 'react';
import { collection } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductDetailModal } from '@/components/ProductDetailModal';
import type { Product } from '@/lib/types';
import { Progress } from '@/components/ui/progress';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

export default function ShowcasePage() {
  const firestore = useFirestore();
  const productsQuery = useMemoFirebase(
    () => (firestore ? collection(firestore, 'products') : null),
    [firestore]
  );
  const { data: products, isLoading } = useCollection<Product>(productsQuery);

  const [[page, direction], setPage] = useState([0, 0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const paginate = (newDirection: number) => {
    if (!products) return;
    const newPage = (page + newDirection + products.length) % products.length;
    setPage([newPage, newDirection]);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground">No products found.</p>
      </div>
    );
  }

  const currentProduct = products[page];
  const progressValue = ((page + 1) / products.length) * 100;

  return (
    <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center relative w-full overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
            <motion.div
                key={page}
                className="w-full h-full absolute flex items-center justify-center"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x);
                if (swipe > 50) {
                    paginate(offset.x > 0 ? -1 : 1);
                }
                }}
            >
                <div
                className="relative w-full max-w-md aspect-square cursor-pointer"
                onClick={() => setIsModalOpen(true)}
                >
                <Image
                    src={currentProduct.imageUrl}
                    alt={currentProduct.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
                </div>
            </motion.div>
            </AnimatePresence>

            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-11/12 max-w-md">
                <Progress value={progressValue} className="h-2" />
                <p className="text-center text-sm text-muted-foreground mt-2">
                    {page + 1} / {products.length}
                </p>
            </div>


            <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full h-12 w-12"
            onClick={() => paginate(-1)}
            >
            <ArrowLeft className="h-6 w-6" />
            </Button>
            <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full h-12 w-12"
            onClick={() => paginate(1)}
            >
            <ArrowRight className="h-6 w-6" />
            </Button>

            <div className="absolute bottom-8 text-center z-10">
                <h2 className="font-headline text-3xl font-bold">{currentProduct.name}</h2>
                <p className="text-xl text-primary">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(currentProduct.price)}</p>
            </div>

            <ProductDetailModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            product={currentProduct}
            />
        </main>
        <Footer/>
    </div>
  );
}
