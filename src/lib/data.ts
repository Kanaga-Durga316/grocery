import type { Product, Category, Review, User, Order } from './types';
import { PlaceHolderImages } from './placeholder-images';

const users: User[] = [
  { id: 'user-1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Customer' },
  { id: 'user-2', name: 'Bob Williams', email: 'bob@example.com', role: 'Customer' },
  { id: 'user-3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'Customer' },
  { id: 'admin-1', name: 'Admin User', email: 'admin@example.com', role: 'Admin' },
];

const categories: Category[] = [];

const products: Product[] = [];

const reviews: Review[] = [];

const orders: Order[] = [];


// Data access functions
export const getCategories = () => categories;
export const getProducts = (categoryId?: string) => {
  if (!categoryId) return products;
  return products.filter(p => p.categoryId === categoryId);
};
export const getProductById = (id: string) => products.find(p => p.id === id);
export const getFeaturedProducts = () => products.slice(0, 4);
export const getReviewsForProduct = (productId: string) => reviews.filter(r => r.productId === productId);
export const getUserById = (id: string) => users.find(u => u.id === id);
export const getOrders = () => orders;
export const getOrderById = (id: string) => orders.find(o => o.id === id);
