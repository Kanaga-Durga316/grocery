export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface ProductVariant {
  id: string; // Unique ID for the variant, e.g., prod-ponni-rice-5kg
  weight: string;
  price: number;
  stock: number;
}

export interface CleaningOption {
  id: string;
  type: 'Whole' | 'Cleaned & Gutted' | 'Skin-off' | 'Slices';
  priceModifier?: number; // Added to base price
}

export interface Product {
  id: string; // Base product ID, e.g., prod-ponni-rice
  name: string;
  description: string;
  price: number; // Retain for single-variant products or as a base price
  stock: number; // Retain for single-variant products or as base stock
  categoryId: string;
  imageUrl: string;
  imageHint: string;
  sellerId: string;
  subCategory?: string;
  brand?: string;
  bestBefore?: string;
  variants?: ProductVariant[];
  cleaningOptions?: CleaningOption[];
  tags?: ('High Protein' | 'Low GI' | 'Halaal' | 'Antibiotic-free' | 'Fresh Catch')[];
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  timestamp: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Customer' | 'Admin' | 'Delivery' | 'Seller';
}

export interface CartItem {
  product: Product;
  quantity: number;
  variant?: ProductVariant;
}

export interface Order {
  id: string;
  userId: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
    variantId?: string;
  }[];
  totalAmount: number;
  status: 'Pending' | 'Processing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  deliveryAddress: {
    name: string;
    address: string;
    city: string;
    zip: string;
  };
  timestamp: string;
}
