
"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import type { Product } from '@/lib/types';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

interface CircularProductCarouselProps {
  items: Product[];
  onSelectProduct: (product: Product) => void;
}

const CAROUSEL_SIZE = 600;
const ITEM_SIZE = 150;
const RADIUS = CAROUSEL_SIZE / 2 - ITEM_SIZE / 2;

export function CircularProductCarousel({ items, onSelectProduct }: CircularProductCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const dragX = useMotionValue(0);
  const rotate = useTransform(dragX, [-CAROUSEL_SIZE * 2, CAROUSEL_SIZE * 2], [-360, 360]);
  const dragXRef = useRef<number>(0);
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveringRef = useRef(false);

  const startAutoRotate = () => {
    if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    autoRotateRef.current = setInterval(() => {
      if (!isHoveringRef.current) {
        const currentX = dragX.get();
        const newX = currentX - (CAROUSEL_SIZE * 2) / items.length / 50; 
        dragX.set(newX);
      }
    }, 50);
  };

  const stopAutoRotate = () => {
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
      autoRotateRef.current = null;
    }
  };

  useEffect(() => {
    startAutoRotate();
    return () => stopAutoRotate();
  }, [items.length]);

  useEffect(() => {
    const unsubscribe = dragX.on("change", (latest) => {
      dragXRef.current = latest;
      const anglePerItem = 360 / items.length;
      const currentAngle = (latest / (CAROUSEL_SIZE * 2)) * 360;
      const newIndex = Math.round(-currentAngle / anglePerItem + items.length) % items.length;
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    });
    return () => unsubscribe();
  }, [dragX, items.length, activeIndex]);

  const handleDragEnd = () => {
    const anglePerItem = 360 / items.length;
    const currentRotation = (dragXRef.current / (CAROUSEL_SIZE * 2)) * 360;
    const closestAngle = Math.round(currentRotation / anglePerItem) * anglePerItem;
    const targetX = (closestAngle / 360) * (CAROUSEL_SIZE * 2);

    animate(dragX, targetX, {
      type: "spring",
      stiffness: 300,
      damping: 30,
    });
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div 
        className="relative" 
        style={{ width: CAROUSEL_SIZE, height: CAROUSEL_SIZE }}
        onMouseEnter={() => { isHoveringRef.current = true; }}
        onMouseLeave={() => { isHoveringRef.current = false; }}
      >
        <motion.div
          className="absolute w-full h-full rounded-full cursor-grab"
          style={{ 
            rotate, 
            transformStyle: 'preserve-3d',
          }}
          drag="x"
          _dragX={dragX}
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
        >
          {items.map((item, index) => {
            const angle = (360 / items.length) * index;
            const itemRotate = useTransform(rotate, (latest) => latest + angle);
            const scale = useTransform(itemRotate, (r) => 1 - Math.abs((r % 360) - 180) / 360);
            const zIndex = useTransform(scale, (s) => Math.round(s * 100));

            return (
              <motion.div
                key={item.id}
                className="absolute"
                style={{
                  width: ITEM_SIZE,
                  height: ITEM_SIZE,
                  top: `calc(50% - ${ITEM_SIZE / 2}px)`,
                  left: `calc(50% - ${ITEM_SIZE / 2}px)`,
                  transform: `rotate(${angle}deg) translate(${RADIUS}px) rotate(${-angle}deg)`,
                  transformStyle: 'preserve-3d',
                  zIndex
                }}
              >
                <motion.div
                  style={{
                    scale,
                    rotateY: itemRotate,
                    backfaceVisibility: 'hidden',
                  }}
                  className={cn(
                    "w-full h-full relative rounded-full overflow-hidden shadow-lg border-4 transition-all duration-300",
                    activeIndex === index ? "border-primary" : "border-transparent"
                  )}
                  onClick={() => onSelectProduct(item)}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes={`${ITEM_SIZE}px`}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="mt-8 text-center w-full max-w-sm h-48 flex flex-col justify-between">
        {items[activeIndex] && (
            <AnimatePresenceWrapper>
                <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center"
                >
                    <h3 className="font-headline text-2xl font-bold text-foreground">{items[activeIndex].name}</h3>
                    <p className="text-xl font-semibold text-primary mt-2">{formatPrice(items[activeIndex].price)}</p>
                    <Button 
                        variant="ghost" 
                        className="mt-4 text-primary hover:text-primary"
                        onClick={() => onSelectProduct(items[activeIndex])}
                    >
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </motion.div>
            </AnimatePresenceWrapper>
        )}
      </div>
    </div>
  );
}


function AnimatePresenceWrapper({ children }: { children: React.ReactNode }) {
    const [isPresent, setIsPresent] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => setIsPresent(false), 300);
      return () => clearTimeout(timer);
    }, [children]);
  
    return isPresent ? <>{children}</> : null;
  }
