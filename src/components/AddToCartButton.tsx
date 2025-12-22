"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types";
import { ShoppingCart, Check } from "lucide-react";
import { useState, useEffect } from "react";

interface AddToCartButtonProps {
  product: Product;
  quantity: number;
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive" | null;
  size?: "default" | "sm" | "lg" | "icon" | null;
}

export function AddToCartButton({
  product,
  quantity,
  children,
  className,
  ...props
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
  };
  
  useEffect(() => {
    if (!isAdded) return;
    const timer = setTimeout(() => setIsAdded(false), 2000);
    return () => clearTimeout(timer);
  }, [isAdded]);

  return (
    <Button onClick={handleAddToCart} className={className} disabled={isAdded} {...props}>
      {isAdded ? (
        <>
          <Check />
          Added!
        </>
      ) : children ? (
        children
      ) : (
        <>
          <ShoppingCart />
          Add to Cart
        </>
      )}
    </Button>
  );
}
