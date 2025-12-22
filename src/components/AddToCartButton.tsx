"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import type { Product, ProductVariant } from "@/lib/types";
import { ShoppingCart, Check } from "lucide-react";
import { useState, useEffect } from "react";

interface AddToCartButtonProps {
  product: Product;
  quantity: number;
  variant?: ProductVariant;
  children?: React.ReactNode;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon" | null;
}

export function AddToCartButton({
  product,
  quantity,
  variant,
  children,
  className,
  ...props
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity, variant);
    setIsAdded(true);
  };
  
  useEffect(() => {
    if (!isAdded) return;
    const timer = setTimeout(() => setIsAdded(false), 2000);
    return () => clearTimeout(timer);
  }, [isAdded]);

  const isDisabled = isAdded || (!variant && product.variants && product.variants.length > 0);

  return (
    <Button onClick={handleAddToCart} className={className} disabled={isDisabled} {...props}>
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
