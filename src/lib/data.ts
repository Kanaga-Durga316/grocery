import type { Product, Category, Review, User, Order } from './types';
import { PlaceHolderImages } from './placeholder-images';

const users: User[] = [
  { id: 'user-1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Customer' },
  { id: 'user-2', name: 'Bob Williams', email: 'bob@example.com', role: 'Customer' },
  { id: 'user-3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'Customer' },
  { id: 'admin-1', name: 'Admin User', email: 'admin@example.com', role: 'Admin' },
];

const categories: Category[] = [
  { id: 'fresh-produce', name: 'Fresh Produce', description: 'The freshest fruits and vegetables.' },
  { id: 'dairy-eggs', name: 'Dairy & Eggs', description: 'Milk, cheese, eggs, and more.' },
  { id: 'bakery', name: 'Bakery', description: 'Freshly baked bread, cakes, and pastries.' },
  { id: 'prepared-foods', name: 'Prepared Foods', description: 'Ready-to-eat meals and snacks.' },
];

const products: Product[] = [
  // Fresh Produce
  { id: 'prod-1', name: 'Organic Apples', description: 'Crisp and juicy organic Gala apples, perfect for snacking.', price: 3.99, stock: 150, categoryId: 'fresh-produce', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-apple')?.imageUrl!, imageHint: 'red apples' },
  { id: 'prod-2', name: 'Ripe Bananas', description: 'A bunch of perfectly ripe organic bananas.', price: 1.99, stock: 200, categoryId: 'fresh-produce', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-banana')?.imageUrl!, imageHint: 'ripe bananas' },
  { id: 'prod-3', name: 'Fresh Broccoli', description: 'Fresh, green broccoli crowns, rich in vitamins.', price: 2.49, stock: 100, categoryId: 'fresh-produce', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-broccoli')?.imageUrl!, imageHint: 'fresh broccoli' },
  { id: 'prod-4', name: 'Organic Carrots', description: 'Sweet and crunchy organic carrots.', price: 2.99, stock: 120, categoryId: 'fresh-produce', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-carrot')?.imageUrl!, imageHint: 'organic carrots' },
  
  // Dairy & Eggs
  { id: 'prod-5', name: 'Organic Whole Milk', description: 'A half-gallon of fresh, organic whole milk.', price: 4.50, stock: 80, categoryId: 'dairy-eggs', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-milk')?.imageUrl!, imageHint: 'milk carton' },
  { id: 'prod-6', name: 'Aged Cheddar Cheese', description: 'A sharp and flavorful 8oz block of aged cheddar.', price: 6.99, stock: 60, categoryId: 'dairy-eggs', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-cheese')?.imageUrl!, imageHint: 'cheddar cheese' },
  { id: 'prod-7', name: 'Greek Yogurt', description: 'Thick and creamy plain Greek yogurt.', price: 3.29, stock: 90, categoryId: 'dairy-eggs', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-yogurt')?.imageUrl!, imageHint: 'yogurt pot' },
  { id: 'prod-8', name: 'Free-Range Eggs', description: 'A dozen large brown free-range eggs.', price: 5.99, stock: 100, categoryId: 'dairy-eggs', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-eggs')?.imageUrl!, imageHint: 'eggs carton' },
  
  // Bakery
  { id: 'prod-9', name: 'Sourdough Loaf', description: 'Artisanal sourdough bread with a crispy crust.', price: 5.49, stock: 40, categoryId: 'bakery', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-bread')?.imageUrl!, imageHint: 'sourdough bread' },
  { id: 'prod-10', name: 'Butter Croissants', description: 'A pack of 4 flaky and buttery croissants.', price: 6.00, stock: 50, categoryId: 'bakery', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-croissant')?.imageUrl!, imageHint: 'butter croissants' },
  { id: 'prod-11', name: 'Chocolate Fudge Cake', description: 'A rich and decadent slice of chocolate fudge cake.', price: 4.99, stock: 30, categoryId: 'bakery', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-cake')?.imageUrl!, imageHint: 'chocolate cake' },
  { id: 'prod-12', name: 'Blueberry Muffins', description: 'A pack of 4 soft muffins bursting with blueberries.', price: 7.50, stock: 45, categoryId: 'bakery', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-muffin')?.imageUrl!, imageHint: 'blueberry muffin' },
  
  // Prepared Foods
  { id: 'prod-13', name: 'Classic Beef Lasagna', description: 'A single-serving ready-to-heat beef lasagna.', price: 9.99, stock: 25, categoryId: 'prepared-foods', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-lasagna')?.imageUrl!, imageHint: 'beef lasagna' },
  { id: 'prod-14', name: 'Sushi Combo Platter', description: 'A delicious assortment of fresh sushi rolls and nigiri.', price: 15.99, stock: 20, categoryId: 'prepared-foods', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-sushi')?.imageUrl!, imageHint: 'sushi platter' },
  { id: 'prod-15', name: 'Chicken Caesar Salad', description: 'Grilled chicken, romaine lettuce, croutons, and caesar dressing.', price: 8.50, stock: 35, categoryId: 'prepared-foods', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-salad')?.imageUrl!, imageHint: 'caesar salad' },
  { id: 'prod-16', name: 'Margherita Pizza', description: 'A 12-inch personal margherita pizza with fresh mozzarella and basil.', price: 12.00, stock: 30, categoryId: 'prepared-foods', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-pizza')?.imageUrl!, imageHint: 'margherita pizza' },
];

const reviews: Review[] = [
  { id: 'rev-1', productId: 'prod-1', userId: 'user-1', rating: 5, comment: 'These apples are incredibly fresh and delicious! Best I have had in a long time.', timestamp: '2023-10-26T10:00:00Z' },
  { id: 'rev-2', productId: 'prod-1', userId: 'user-2', rating: 4, comment: 'Very good apples, though a bit on the pricey side. The quality is undeniable.', timestamp: '2023-10-25T14:30:00Z' },
  { id: 'rev-3', productId: 'prod-1', userId: 'user-3', rating: 5, comment: 'Perfect for my kids lunches. They love them!', timestamp: '2023-10-27T09:00:00Z' },
  { id: 'rev-4', productId: 'prod-9', userId: 'user-1', rating: 5, comment: 'This sourdough has an amazing crust and a wonderfully tangy flavor. Makes the best toast.', timestamp: '2023-10-26T11:00:00Z' },
  { id: 'rev-5', productId: 'prod-9', userId: 'user-3', rating: 3, comment: 'It was good, but I have had better. A bit dense for my liking.', timestamp: '2023-10-25T18:00:00Z' },
  { id: 'rev-6', productId: 'prod-14', userId: 'user-2', rating: 4, comment: 'Surprisingly good for grocery store sushi. The fish was fresh and the rice was well-seasoned.', timestamp: '2023-10-27T19:30:00Z' },
  { id: 'rev-7', productId: 'prod-14', userId: 'user-1', rating: 2, comment: 'Not great. The rice was dry and the fish selection was boring. I would not buy it again.', timestamp: '2023-10-28T12:00:00Z' },
  { id: 'rev-8', productId: 'prod-6', userId: 'user-3', rating: 5, comment: 'A fantastic cheddar! Sharp, crumbly, and full of flavor. Excellent on a cheese board or melted on a burger.', timestamp: '2023-10-24T15:00:00Z' },
];

const orders: Order[] = [
  {
    id: 'order-1',
    userId: 'user-1',
    items: [
      { productId: 'prod-1', quantity: 2, price: 3.99 },
      { productId: 'prod-5', quantity: 1, price: 4.50 },
    ],
    totalAmount: 12.48,
    status: 'Delivered',
    deliveryAddress: {
      name: 'Alice Johnson',
      address: '123 Main St',
      city: 'Anytown',
      zip: '12345',
    },
    timestamp: '2023-10-25T10:00:00Z',
  },
  {
    id: 'order-2',
    userId: 'user-2',
    items: [{ productId: 'prod-14', quantity: 1, price: 15.99 }],
    totalAmount: 15.99,
    status: 'Out for Delivery',
    deliveryAddress: {
      name: 'Bob Williams',
      address: '456 Oak Ave',
      city: 'Someplace',
      zip: '67890',
    },
    timestamp: '2023-10-28T11:00:00Z',
  },
    {
    id: 'order-3',
    userId: 'user-3',
    items: [
        { productId: 'prod-9', quantity: 1, price: 5.49 },
        { productId: 'prod-11', quantity: 2, price: 4.99 },
    ],
    totalAmount: 15.47,
    status: 'Processing',
    deliveryAddress: {
      name: 'Charlie Brown',
      address: '789 Pine Ln',
      city: 'Elsewhere',
      zip: '54321',
    },
    timestamp: '2023-10-29T14:00:00Z',
  },
];


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
