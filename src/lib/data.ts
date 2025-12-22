import type { Product, Category, Review, User, Order } from './types';
import { PlaceHolderImages } from './placeholder-images';

const users: User[] = [
  { id: 'user-1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Customer' },
  { id: 'user-2', name: 'Bob Williams', email: 'bob@example.com', role: 'Customer' },
  { id: 'user-3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'Customer' },
  { id: 'admin-1', name: 'Admin User', email: 'admin@example.com', role: 'Admin' },
  { id: 'seller-1', name: 'Farm Fresh Co.', email: 'contact@farmfresh.com', role: 'Seller' },
  { id: 'seller-2', name: 'The Artisan Bakery', email: 'hello@artisanbakery.com', role: 'Seller' },
  { id: 'seller-3', name: 'Amma\'s Kitchen', email: 'support@ammaskitchen.com', role: 'Seller' },
];

const categories: Category[] = [
  { id: 'fresh-produce', name: 'Fresh Produce', description: 'The freshest fruits and vegetables, sourced locally and organically.' },
  { id: 'dairy-eggs', name: 'Dairy & Eggs', description: 'Farm-fresh eggs, milk, cheese, and other dairy products.' },
  { id: 'bakery', name: 'Bakery', description: 'Warm bread, delicious pastries, and custom cakes for any occasion.' },
  { id: 'prepared-foods', name: 'Prepared Foods', description: 'Ready-to-eat meals, handcrafted for your convenience.' },
  { id: 'snacks', name: 'Snacks', description: 'Savory & Crispy Snacks from Tamil Nadu.' },
];

const products: Product[] = [
  // Fresh Produce - Seller 1
  { id: 'prod-1', name: 'Organic Apples', description: 'Crisp and juicy organic Gala apples, perfect for snacking (1kg).', price: 120, stock: 150, categoryId: 'fresh-produce', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-apple')!.imageUrl, imageHint: 'red apples', sellerId: 'seller-1' },
  { id: 'prod-2', name: 'Ripe Bananas', description: 'A bunch of perfectly ripe organic bananas (Doz).', price: 50, stock: 200, categoryId: 'fresh-produce', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-banana')!.imageUrl, imageHint: 'ripe bananas', sellerId: 'seller-1' },
  { id: 'prod-3', name: 'Fresh Broccoli', description: 'Fresh, green broccoli crowns, rich in vitamins (500g).', price: 65, stock: 100, categoryId: 'fresh-produce', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-broccoli')!.imageUrl, imageHint: 'fresh broccoli', sellerId: 'seller-1' },
  { id: 'prod-4', name: 'Organic Carrots', description: 'Sweet and crunchy organic carrots (1kg).', price: 55, stock: 120, categoryId: 'fresh-produce', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-carrot')!.imageUrl, imageHint: 'organic carrots', sellerId: 'seller-1' },

  // Dairy & Eggs - Seller 1
  { id: 'prod-5', name: 'Organic Milk', description: '1L packet of fresh, whole organic milk.', price: 60, stock: 80, categoryId: 'dairy-eggs', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-milk')!.imageUrl, imageHint: 'milk carton', sellerId: 'seller-1' },
  { id: 'prod-6', name: 'Cheddar Cheese Block', description: 'A block of sharp cheddar cheese, perfect for slicing or grating (200g).', price: 200, stock: 60, categoryId: 'dairy-eggs', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-cheese')!.imageUrl, imageHint: 'cheddar cheese', sellerId: 'seller-1' },
  { id: 'prod-7', name: 'Greek Yogurt', description: 'Thick and creamy plain Greek yogurt (400g).', price: 150, stock: 90, categoryId: 'dairy-eggs', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-yogurt')!.imageUrl, imageHint: 'yogurt pot', sellerId: 'seller-1' },
  { id: 'prod-8', name: 'Free-Range Eggs', description: 'One dozen large brown free-range eggs.', price: 95, stock: 110, categoryId: 'dairy-eggs', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-eggs')!.imageUrl, imageHint: 'eggs carton', sellerId: 'seller-1' },
  
  // Bakery - Seller 2
  { id: 'prod-9', name: 'Sourdough Bread', description: 'Artisan loaf of freshly baked sourdough bread.', price: 180, stock: 50, categoryId: 'bakery', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-bread')!.imageUrl, imageHint: 'sourdough bread', sellerId: 'seller-2' },
  { id: 'prod-10', name: 'Butter Croissants', description: 'Pack of 4 flaky, all-butter croissants.', price: 220, stock: 40, categoryId: 'bakery', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-croissant')!.imageUrl, imageHint: 'butter croissants', sellerId: 'seller-2' },
  { id: 'prod-11', name: 'Chocolate Cake', description: 'Rich, decadent chocolate fudge cake slice.', price: 120, stock: 30, categoryId: 'bakery', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-cake')!.imageUrl, imageHint: 'chocolate cake', sellerId: 'seller-2' },
  { id: 'prod-12', name: 'Blueberry Muffins', description: 'Pack of 4 soft muffins bursting with blueberries.', price: 200, stock: 45, categoryId: 'bakery', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-muffin')!.imageUrl, imageHint: 'blueberry muffin', sellerId: 'seller-2' },

  // Prepared Foods - Seller 1 & 2
  { id: 'prod-13', name: 'Beef Lasagna', description: 'Family-size beef lasagna, ready to heat and eat.', price: 500, stock: 20, categoryId: 'prepared-foods', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-lasagna')!.imageUrl, imageHint: 'beef lasagna', sellerId: 'seller-1' },
  { id: 'prod-14', name: 'Sushi Platter', description: 'An assortment of fresh sushi rolls including California, Tuna, and Salmon.', price: 450, stock: 25, categoryId: 'prepared-foods', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-sushi')!.imageUrl, imageHint: 'sushi platter', sellerId: 'seller-1' },
  { id: 'prod-15', name: 'Chicken Caesar Salad', description: 'Classic Caesar salad with grilled chicken, croutons, and parmesan.', price: 280, stock: 35, categoryId: 'prepared-foods', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-salad')!.imageUrl, imageHint: 'caesar salad', sellerId: 'seller-1' },
  { id: 'prod-16', name: 'Margherita Pizza', description: 'A classic 12-inch Margherita pizza with fresh mozzarella and basil.', price: 400, stock: 28, categoryId: 'prepared-foods', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-pizza')!.imageUrl, imageHint: 'margherita pizza', sellerId: 'seller-2' },

  // Tamil Foods - Seller 3
  { id: 'prod-17', name: 'Idli with Sambar', description: '4 pieces of soft, steamed rice cakes served with flavorful lentil-based vegetable stew.', price: 60, stock: 50, categoryId: 'prepared-foods', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-idli')!.imageUrl, imageHint: 'idli sambar', sellerId: 'seller-3' },
  { id: 'prod-18', name: 'Masala Dosa', description: 'A crispy rice and lentil crepe filled with a savory potato masala.', price: 90, stock: 40, categoryId: 'prepared-foods', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-dosa')!.imageUrl, imageHint: 'masala dosa', sellerId: 'seller-3' },
  { id: 'prod-19', name: 'Medu Vada (2 pcs)', description: 'Two savory, donut-shaped lentil fritters, crispy on the outside and soft on the inside.', price: 45, stock: 60, categoryId: 'prepared-foods', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-vada')!.imageUrl, imageHint: 'medu vada', sellerId: 'seller-3' },
  { id: 'prod-20', name: 'Ven Pongal', description: 'A comforting dish of rice and lentils cooked with black pepper, cumin, and ghee.', price: 75, stock: 35, categoryId: 'prepared-foods', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-pongal')!.imageUrl, imageHint: 'ven pongal', sellerId: 'seller-3' },

  // Snacks - Seller 3
  { id: 'prod-21', name: 'Murukku', description: 'Classic crispy spiral snack. Available in Manaparai, Kai, and Butter varieties (200g).', price: 80, stock: 100, categoryId: 'snacks', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-murukku')!.imageUrl, imageHint: 'murukku snack', sellerId: 'seller-3' },
  { id: 'prod-22', name: 'Thattai', description: 'Crispy and savory deep-fried rice flour discs, a traditional South Indian snack (200g).', price: 75, stock: 100, categoryId: 'snacks', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-thattai')!.imageUrl, imageHint: 'thattai snack', sellerId: 'seller-3' },
  { id: 'prod-23', name: 'Mixture', description: 'A crunchy mix of various fried snacks like sev, boondi, peanuts, and more (250g).', price: 100, stock: 80, categoryId: 'snacks', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-mixture')!.imageUrl, imageHint: 'mixture snack', sellerId: 'seller-3' },
  { id: 'prod-24', name: 'Ribbon Pakoda', description: 'Also known as Ribbon Seeval, a crunchy and savory snack made from rice flour (200g).', price: 85, stock: 90, categoryId: 'snacks', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-ribbon-pakoda')!.imageUrl, imageHint: 'ribbon pakoda', sellerId: 'seller-3' },
  { id: 'prod-25', name: 'Thenkuzhal', description: 'A delicate, crunchy snack made from rice flour and urad dal flour (200g).', price: 90, stock: 70, categoryId: 'snacks', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-thenkuzhal')!.imageUrl, imageHint: 'thenkuzhal snack', sellerId: 'seller-3' },
  { id: 'prod-26', name: 'Onion Pakora (Bhajji)', description: 'Crispy onion fritters made with gram flour and spices. A perfect tea-time snack (4 pcs).', price: 50, stock: 120, categoryId: 'snacks', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-pakora')!.imageUrl, imageHint: 'onion pakora', sellerId: 'seller-3' },
  { id: 'prod-27', name: 'Parippu Vada', description: 'Spicy and crispy lentil fritters, a popular street food snack from Kerala (4 pcs).', price: 60, stock: 110, categoryId: 'snacks', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-parippu-vada')!.imageUrl, imageHint: 'parippu vada', sellerId: 'seller-3' },
  { id: 'prod-28', name: 'Banana Chips', description: 'Thinly sliced, deep-fried bananas, a classic crunchy snack from Kerala (150g).', price: 70, stock: 150, categoryId: 'snacks', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-banana-chips')!.imageUrl, imageHint: 'banana chips', sellerId: 'seller-3' },
  { id: 'prod-29', name: 'Omapodi', description: 'Fine, crispy strands of gram flour noodles seasoned with carom seeds (omam) (200g).', price: 65, stock: 95, categoryId: 'snacks', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-omapodi')!.imageUrl, imageHint: 'omapodi snack', sellerId: 'seller-3' },
];


const reviews: Review[] = [
  { id: 'rev-1', productId: 'prod-1', userId: 'user-1', rating: 5, comment: 'So fresh and delicious! Best apples I\'ve had in a while.', timestamp: '2024-05-20T10:00:00Z' },
  { id: 'rev-2', productId: 'prod-1', userId: 'user-2', rating: 4, comment: 'Very good, a little on the small side but great taste.', timestamp: '2024-05-21T14:30:00Z' },
  { id: 'rev-3', productId: 'prod-1', userId: 'user-3', rating: 5, comment: 'Perfect for my kids\' lunches. They love them!', timestamp: '2024-05-22T09:00:00Z' },
  { id: 'rev-4', productId: 'prod-9', userId: 'user-1', rating: 5, comment: 'This sourdough is absolutely amazing. Perfect crust and crumb.', timestamp: '2024-05-23T11:00:00Z' },
  { id: 'rev-5', productId: 'prod-9', userId: 'user-2', rating: 5, comment: 'I buy this every week. It makes the best toast.', timestamp: '2024-05-24T18:00:00Z' },
  { id: 'rev-6', productId: 'prod-14', userId: 'user-3', rating: 4, comment: 'Pretty good for store-bought sushi! The fish was fresh.', timestamp: '2024-05-25T19:00:00Z' },
  { id: 'rev-7', productId: 'prod-17', userId: 'user-1', rating: 5, comment: 'Reminds me of home! The idlis are so soft and the sambar is perfect.', timestamp: '2024-05-26T10:00:00Z' },
  { id: 'rev-8', productId: 'prod-18', userId: 'user-2', rating: 5, comment: 'The best dosa I have had outside of India. Crispy and delicious!', timestamp: '2024-05-27T12:30:00Z' },
];

const orders: Order[] = [
  {
    id: 'order-1',
    userId: 'user-1',
    items: [
      { productId: 'prod-1', quantity: 2, price: 120 },
      { productId: 'prod-5', quantity: 1, price: 60 },
    ],
    totalAmount: 300,
    status: 'Delivered',
    deliveryAddress: { name: 'Alice Johnson', address: '123 Main St', city: 'Anytown', zip: '12345' },
    timestamp: '2024-05-20T10:05:00Z',
  },
  {
    id: 'order-2',
    userId: 'user-2',
    items: [{ productId: 'prod-9', quantity: 1, price: 180 }],
    totalAmount: 180,
    status: 'Out for Delivery',
    deliveryAddress: { name: 'Bob Williams', address: '456 Oak Ave', city: 'Someplace', zip: '67890' },
    timestamp: '2024-05-24T18:10:00Z',
  },
  {
    id: 'order-3',
    userId: 'user-1',
    items: [
      { productId: 'prod-17', quantity: 2, price: 60 },
      { productId: 'prod-19', quantity: 1, price: 45 },
    ],
    totalAmount: 165,
    status: 'Processing',
    deliveryAddress: { name: 'Alice Johnson', address: '123 Main St', city: 'Anytown', zip: '12345' },
    timestamp: '2024-05-26T12:00:00Z',
  },
   {
    id: 'order-4',
    userId: 'user-3',
    items: [
      { productId: 'prod-18', quantity: 1, price: 90 },
    ],
    totalAmount: 90,
    status: 'Pending',
    deliveryAddress: { name: 'Charlie Brown', address: '789 Pine Ln', city: 'Elsewhere', zip: '10112' },
    timestamp: '2024-05-27T10:00:00Z',
  }
];


// Data access functions
export const getCategories = () => categories;
export const getProducts = (categoryId?: string) => {
  if (!categoryId) return products;
  return products.filter(p => p.categoryId === categoryId);
};
export const getProductsBySeller = (sellerId: string) => products.filter(p => p.sellerId === sellerId);
export const getProductById = (id: string) => products.find(p => p.id === id);
export const getFeaturedProducts = () => products.slice(16, 20);
export const getReviewsForProduct = (productId: string) => reviews.filter(r => r.productId === productId);
export const getUserById = (id: string) => users.find(u => u.id === id);
export const getOrders = () => orders;
export const getOrderById = (id: string) => orders.find(o => o.id === id);
