
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/types';

interface CircularProductCarouselProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

const CAROUSEL_RADIUS_DESKTOP = 300;
const CAROUSEL_RADIUS_MOBILE = 150;
const AUTO_ROTATE_SPEED = 0.002;

export function CircularProductCarousel({ products, onProductClick }: CircularProductCarouselProps) {
  const [rotation, setRotation] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; rotation: number } | null>(null);

  const controls = useAnimation();

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      if (!isHovering && !isDragging) {
        setRotation(prev => prev + AUTO_ROTATE_SPEED);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovering, isDragging]);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, rotation };
    document.body.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const newRotation = dragStartRef.current.rotation - dx * 0.005;
    setRotation(newRotation);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
    dragStartRef.current = null;
    document.body.style.cursor = 'default';
  };

  const numItems = products.length;
  const angleStep = (2 * Math.PI) / numItems;

  return (
    <div 
      className="relative w-full h-[400px] md:h-[700px] flex items-center justify-center cursor-grab"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => { setIsHovering(false); handleMouseUp(); }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="absolute w-full h-full">
        {products.map((product, i) => {
          const angle = i * angleStep + rotation;
          const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
          const radius = isMobile ? CAROUSEL_RADIUS_MOBILE : CAROUSEL_RADIUS_DESKTOP;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
          const scale = 0.5 + 0.5 * (Math.cos(angle - Math.PI / 2) + 1) / 2;
          const zIndex = Math.round(100 * scale);
          
          return (
            <motion.div
              key={product.id}
              className="absolute top-1/2 left-1/2"
              style={{
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`,
                zIndex,
              }}
              onClick={() => onProductClick(product)}
            >
              <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full bg-card shadow-lg border-2 border-primary/30 flex flex-col items-center justify-center p-2 cursor-pointer transition-all duration-300 hover:shadow-primary/30 hover:border-primary">
                 <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={120}
                    height={120}
                    className="rounded-full object-contain"
                 />
                 <p className="absolute -bottom-6 text-xs text-center text-foreground font-semibold truncate w-full px-2">{product.name}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
