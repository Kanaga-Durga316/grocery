"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({ quantity, setQuantity, min = 1, max = 99 }: QuantitySelectorProps) {
  const increment = () => setQuantity(Math.min(quantity + 1, max));
  const decrement = () => setQuantity(Math.max(quantity - 1, min));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setQuantity(Math.max(min, Math.min(value, max)));
    } else if (e.target.value === '') {
      // Allow clearing the input, default to min value
      setQuantity(min);
    }
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
     if (e.target.value === '') {
        setQuantity(min);
     }
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon" className="h-9 w-9 rounded-full" onClick={decrement} disabled={quantity <= min}>
        <Minus className="h-4 w-4" />
        <span className="sr-only">Decrease quantity</span>
      </Button>
      <Input
        type="text"
        className="w-12 h-9 text-center border-border/80"
        value={quantity}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-label="Quantity"
      />
      <Button variant="outline" size="icon" className="h-9 w-9 rounded-full" onClick={increment} disabled={quantity >= max}>
        <Plus className="h-4 w-4" />
        <span className="sr-only">Increase quantity</span>
      </Button>
    </div>
  );
}
