"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import type { CartItem, Product, ProductVariant } from '@/lib/types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number, variant?: ProductVariant) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, quantity: number, variant?: ProductVariant) => {
    setCartItems(prevItems => {
      const itemIdentifier = variant ? variant.id : product.id;
      const existingItem = prevItems.find(item => {
        const currentIdentifier = item.variant ? item.variant.id : item.product.id;
        return currentIdentifier === itemIdentifier;
      });

      if (existingItem) {
        return prevItems.map(item => {
           const currentIdentifier = item.variant ? item.variant.id : item.product.id;
           if (currentIdentifier === itemIdentifier) {
              return { ...item, quantity: item.quantity + quantity }
           }
           return item;
        });
      }
      return [...prevItems, { product, quantity, variant }];
    });
  };

  const updateQuantity = (productId: string, quantity: number, variantId?: string) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        const itemIdentifier = item.variant ? item.variant.id : item.product.id;
        const targetIdentifier = variantId || productId;
        if (itemIdentifier === targetIdentifier) {
          return { ...item, quantity };
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    setCartItems(prevItems => prevItems.filter(item => {
        const itemIdentifier = item.variant ? item.variant.id : item.product.id;
        const targetIdentifier = variantId || productId;
        return itemIdentifier !== targetIdentifier;
    }));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => {
      const price = item.variant ? item.variant.price : item.product.price;
      return acc + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
