
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
  { id: 'meat-seafood', name: 'Meat & Seafood', description: 'Fresh, high-quality meat and seafood products.' },
  { id: 'dairy-bakery', name: 'Dairy & Bakery', description: 'Fresh milk, cheese, bread, and other dairy and bakery products.' },
  { id: 'prepared-foods', name: 'Prepared Foods', description: 'Ready-to-eat meals, handcrafted for your convenience.' },
  { id: 'snacks', name: 'Snacks', description: 'A delicious assortment of savory, crispy, and sweet traditional snacks.' },
  { id: 'staples-pantry', name: 'Staples & Pantry', description: 'Essential cooking ingredients, spices, and pantry items.' },
  { id: 'beverages', name: 'Beverages', description: 'Quench your thirst with our wide selection of drinks.' },
];

const products: Product[] = [
  // Fresh Produce - Seller 1
  { id: 'prod-1', name: 'Organic Apples', description: 'Crisp and juicy organic Gala apples, perfect for snacking (1kg).', price: 120, stock: 150, categoryId: 'fresh-produce', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-apple')!.imageUrl, imageHint: 'red apples', sellerId: 'seller-1', subCategory: 'Seasonal Fruits' },
  { id: 'prod-2', name: 'Ripe Bananas', description: 'A bunch of perfectly ripe organic bananas (Doz).', price: 50, stock: 200, categoryId: 'fresh-produce', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-banana')!.imageUrl, imageHint: 'ripe bananas', sellerId: 'seller-1', subCategory: 'Seasonal Fruits' },
  { id: 'prod-3', name: 'Fresh Broccoli', description: 'Fresh, green broccoli crowns, rich in vitamins (500g).', price: 65, stock: 100, categoryId: 'fresh-produce', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-broccoli')!.imageUrl, imageHint: 'fresh broccoli', sellerId: 'seller-1', subCategory: 'Exotic & Salad Veggies' },
  
  // Daily Vegetables
  { id: 'prod-55', name: 'Potato (Aloo)', description: 'Versatile potatoes, a staple for every kitchen (1kg).', price: 30, stock: 300, categoryId: 'fresh-produce', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-potato')!.imageUrl, imageHint: 'fresh potatoes', sellerId: 'seller-1', subCategory: 'Daily Vegetables' },
  { id: 'prod-56', name: 'Onion (Vengayam)', description: 'Essential for adding flavor to any dish (1kg).', price: 40, stock: 400, categoryId: 'fresh-produce', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-onion')!.imageUrl, imageHint: 'fresh onions', sellerId: 'seller-1', subCategory: 'Daily Vegetables' },
  { id: 'prod-57', name: 'Tomato (Thakkali)', description: 'Juicy, red tomatoes perfect for curries and salads (1kg).', price: 35, stock: 250, categoryId: 'fresh-produce', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-tomato')!.imageUrl, imageHint: 'ripe tomatoes', sellerId: 'seller-1', subCategory: 'Daily Vegetables' },

  // Leafy Greens
  { id: 'prod-58', name: 'Spinach (Palak)', description: 'Freshly Picked. Tender spinach leaves, rich in iron (1 bunch).', price: 20, stock: 100, categoryId: 'fresh-produce', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-spinach')!.imageUrl, imageHint: 'spinach leaves', sellerId: 'seller-1', subCategory: 'Leafy Greens (Keerai)' },
  { id: 'prod-59', name: 'Coriander (Kothamalli)', description: 'Freshly Picked. Aromatic coriander for garnishing (1 bunch).', price: 15, stock: 150, categoryId: 'fresh-produce', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-coriander')!.imageUrl, imageHint: 'coriander bunch', sellerId: 'seller-1', subCategory: 'Leafy Greens (Keerai)' },
  { id: 'prod-60', name: 'Mint (Pudina)', description: 'Freshly Picked. Refreshing mint leaves for chutneys and drinks (1 bunch).', price: 10, stock: 120, categoryId: 'fresh-produce', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-mint')!.imageUrl, imageHint: 'mint leaves', sellerId: 'seller-1', subCategory: 'Leafy Greens (Keerai)' },
  { id: 'prod-61', name: 'Curry Leaves (Karuveppilai)', description: 'Freshly Picked. Essential for tempering South Indian dishes (1 bunch).', price: 10, stock: 200, categoryId: 'fresh-produce', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-curry-leaves')!.imageUrl, imageHint: 'curry leaves', sellerId: 'seller-1', subCategory: 'Leafy Greens (Keerai)' },

  // Seasonal Fruits
  { id: 'prod-62', name: 'Mangoes (Summer)', description: 'Juicy and sweet mangoes, the king of fruits (1kg).', price: 150, stock: 100, categoryId: 'fresh-produce', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-mangoes')!.imageUrl, imageHint: 'ripe mangoes', sellerId: 'seller-1', subCategory: 'Seasonal Fruits' },
  { id: 'prod-63', name: 'Watermelon (Summer)', description: 'Refreshing and hydrating watermelon, perfect for hot days (1 piece).', price: 80, stock: 80, categoryId: 'fresh-produce', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-watermelon')!.imageUrl, imageHint: 'watermelon slice', sellerId: 'seller-1', subCategory: 'Seasonal Fruits' },
  { id: 'prod-64', name: 'Grapes (Winter)', description: 'Sweet and seedless green grapes (500g).', price: 100, stock: 90, categoryId: 'fresh-produce', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-grapes')!.imageUrl, imageHint: 'green grapes', sellerId: 'seller-1', subCategory: 'Seasonal Fruits' },
  { id: 'prod-65', name: 'Oranges (Winter)', description: 'Juicy oranges, packed with Vitamin C (1kg).', price: 90, stock: 110, categoryId: 'fresh-produce', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-oranges')!.imageUrl, imageHint: 'fresh oranges', sellerId: 'seller-1', subCategory: 'Seasonal Fruits' },
  
  // Exotic & Salad Veggies
  { id: 'prod-66', name: 'Bell Peppers (Capsicum)', description: 'A mix of red, yellow, and green bell peppers (500g).', price: 120, stock: 70, categoryId: 'fresh-produce', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-bell-peppers')!.imageUrl, imageHint: 'bell peppers', sellerId: 'seller-1', subCategory: 'Exotic & Salad Veggies' },
  { id: 'prod-67', name: 'Zucchini', description: 'Fresh green zucchini, great for grilling or salads (500g).', price: 70, stock: 60, categoryId: 'fresh-produce', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-zucchini')!.imageUrl, imageHint: 'fresh zucchini', sellerId: 'seller-1', subCategory: 'Exotic & Salad Veggies' },
  { id: 'prod-68', name: 'Lettuce', description: 'Crisp iceberg lettuce for salads and sandwiches (1 head).', price: 50, stock: 80, categoryId: 'fresh-produce', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-lettuce')!.imageUrl, imageHint: 'lettuce head', sellerId: 'seller-1', subCategory: 'Exotic & Salad Veggies' },
  { id: 'prod-69', name: 'Avocado', description: 'Creamy and nutritious avocado (1 piece).', price: 130, stock: 50, categoryId: 'fresh-produce', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-avocado')!.imageUrl, imageHint: 'ripe avocado', sellerId: 'seller-1', subCategory: 'Exotic & Salad Veggies' },
  
  // Cut & Sprouted
  { id: 'prod-70', name: 'Peeled Garlic', description: 'Conveniently peeled garlic cloves, ready to use (100g).', price: 40, stock: 100, categoryId: 'fresh-produce', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-peeled-garlic')!.imageUrl, imageHint: 'peeled garlic', sellerId: 'seller-1', subCategory: 'Cut & Sprouted (Convenience)' },
  { id: 'prod-71', name: 'Chopped Sambhar Mix', description: 'A ready mix of chopped vegetables for sambhar (250g).', price: 60, stock: 90, categoryId: 'fresh-produce', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-sambhar-mix')!.imageUrl, imageHint: 'chopped vegetables', sellerId: 'seller-1', subCategory: 'Cut & Sprouted (Convenience)' },
  { id: 'prod-72', name: 'Sprouted Moong Dal', description: 'Healthy and nutritious sprouted moong dal (200g).', price: 45, stock: 120, categoryId: 'fresh-produce', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-sprouted-moong')!.imageUrl, imageHint: 'sprouted moong', sellerId: 'seller-1', subCategory: 'Cut & Sprouted (Convenience)' },
  { id: 'prod-73', name: 'Grated Coconut', description: 'Freshly grated coconut for cooking and garnishing (1 cup).', price: 50, stock: 100, categoryId: 'fresh-produce', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-grated-coconut')!.imageUrl, imageHint: 'grated coconut', sellerId: 'seller-1', subCategory: 'Cut & Sprouted (Convenience)' },

  // Meat & Seafood - Seller 1
  { id: 'prod-46', name: 'Chicken Breast', description: 'Skinless, boneless chicken breast, tender and juicy (500g).', price: 250, stock: 70, categoryId: 'meat-seafood', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-chicken')!.imageUrl, imageHint: 'chicken breast', sellerId: 'seller-1' },
  { id: 'prod-47', name: 'Fresh Salmon Fillet', description: 'Rich and flavorful Atlantic salmon fillet, high in omega-3s (250g).', price: 500, stock: 40, categoryId: 'meat-seafood', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-salmon')!.imageUrl, imageHint: 'salmon fillet', sellerId: 'seller-1' },
  { id: 'prod-48', name: 'Mutton Curry Cut', description: 'Tender, bone-in mutton pieces perfect for rich curries (500g).', price: 400, stock: 50, categoryId: 'meat-seafood', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-mutton')!.imageUrl, imageHint: 'mutton pieces', sellerId: 'seller-1' },
  { id: 'prod-8', name: 'Free-Range Eggs', description: 'A dozen fresh, free-range brown eggs.', price: 90, stock: 100, categoryId: 'meat-seafood', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-eggs')!.imageUrl, imageHint: 'carton eggs', sellerId: 'seller-1' },

  // Dairy & Bakery - Seller 1 & 2
  { id: 'prod-5', name: 'Organic Milk', description: '1L packet of fresh, whole organic milk.', price: 60, stock: 80, categoryId: 'dairy-bakery', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-milk')!.imageUrl, imageHint: 'milk carton', sellerId: 'seller-1' },
  { id: 'prod-6', name: 'Cheddar Cheese Block', description: 'A block of sharp cheddar cheese, perfect for slicing or grating (200g).', price: 200, stock: 60, categoryId: 'dairy-bakery', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-cheese')!.imageUrl, imageHint: 'cheddar cheese', sellerId: 'seller-1' },
  { id: 'prod-7', name: 'Greek Yogurt', description: 'Thick and creamy plain Greek yogurt (400g).', price: 150, stock: 90, categoryId: 'dairy-bakery', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-yogurt')!.imageUrl, imageHint: 'yogurt pot', sellerId: 'seller-1' },
  { id: 'prod-9', name: 'Sourdough Bread', description: 'Artisan loaf of freshly baked sourdough bread.', price: 180, stock: 50, categoryId: 'dairy-bakery', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-bread')!.imageUrl, imageHint: 'sourdough bread', sellerId: 'seller-2' },
  { id: 'prod-10', name: 'Butter Croissants', description: 'Pack of 4 flaky, all-butter croissants.', price: 220, stock: 40, categoryId: 'dairy-bakery', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-croissant')!.imageUrl, imageHint: 'butter croissants', sellerId: 'seller-2' },
  { id: 'prod-11', name: 'Chocolate Cake', description: 'Rich, decadent chocolate fudge cake slice.', price: 120, stock: 30, categoryId: 'dairy-bakery', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-cake')!.imageUrl, imageHint: 'chocolate cake', sellerId: 'seller-2' },
  { id: 'prod-12', name: 'Blueberry Muffins', description: 'Pack of 4 soft muffins bursting with blueberries.', price: 200, stock: 45, categoryId: 'dairy-bakery', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-muffin')!.imageUrl, imageHint: 'blueberry muffin', sellerId: 'seller-2' },

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
  { id: 'prod-30', name: 'Kadalai Mittai', description: 'Traditional groundnut candy bars, a sweet and crunchy delight (200g).', price: 80, stock: 120, categoryId: 'snacks', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-kadalai-mittai')!.imageUrl, imageHint: 'groundnut candy', sellerId: 'seller-3' },
  { id: 'prod-31', name: 'Adhirasam', description: 'A traditional sweet pastry made from rice flour and jaggery (4 pcs).', price: 100, stock: 80, categoryId: 'snacks', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-adhirasam')!.imageUrl, imageHint: 'adhirasam sweet', sellerId: 'seller-3' },
  { id: 'prod-32', name: 'Tirunelveli Halwa', description: 'A famous, gooey, and rich wheat halwa from Tirunelveli (250g).', price: 150, stock: 60, categoryId: 'snacks', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-halwa')!.imageUrl, imageHint: 'tirunelveli halwa', sellerId: 'seller-3' },
  { id: 'prod-33', name: 'Palkova', description: 'A delicious sweet made by simmering milk until it thickens (200g).', price: 120, stock: 70, categoryId: 'snacks', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-palkova')!.imageUrl, imageHint: 'palkova milk', sellerId: 'seller-3' },
  { id: 'prod-34', name: 'Susiyam / Sooyan', description: 'Sweet lentil-filled balls, deep-fried to perfection (4 pcs).', price: 90, stock: 90, categoryId: 'snacks', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-susiyam')!.imageUrl, imageHint: 'susiyam sweet', sellerId: 'seller-3' },
  { id: 'prod-35', name: 'Jangiri', description: 'A flower-shaped sweet made from urad dal, soaked in sugar syrup (2 pcs).', price: 70, stock: 100, categoryId: 'snacks', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-jangiri')!.imageUrl, imageHint: 'jangiri sweet', sellerId: 'seller-3' },
  { id: 'prod-36', name: 'Rava Ladoo', description: 'Sweet balls made from roasted semolina (rava), sugar, and ghee (4 pcs).', price: 85, stock: 110, categoryId: 'snacks', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-rava-ladoo')!.imageUrl, imageHint: 'rava ladoo', sellerId: 'seller-3' },
  { id: 'prod-37', name: 'Boondi Ladoo', description: 'Popular Indian sweet made from gram flour pearls (boondi) (4 pcs).', price: 90, stock: 130, categoryId: 'snacks', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-boondi-ladoo')!.imageUrl, imageHint: 'boondi ladoo', sellerId: 'seller-3' },
  { id: 'prod-38', name: 'Mysore Pak', description: 'A rich, buttery sweet made from gram flour, ghee, and sugar (200g).', price: 130, stock: 75, categoryId: 'snacks', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-mysore-pak')!.imageUrl, imageHint: 'mysore pak', sellerId: 'seller-3' },
  { id: 'prod-39', name: 'Coconut Burfi', description: 'A classic sweet made with coconut, sugar, and milk (200g).', price: 110, stock: 95, categoryId: 'snacks', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-coconut-burfi')!.imageUrl, imageHint: 'coconut burfi', sellerId: 'seller-3' },
  { id: 'prod-40', name: 'Maa Ladoo', description: 'A quick and easy sweet made from roasted gram dal flour (pottukadalai) (4 pcs).', price: 80, stock: 100, categoryId: 'snacks', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-maa-ladoo')!.imageUrl, imageHint: 'maa ladoo', sellerId: 'seller-3' },

  // Staples & Pantry - Seller 1
  { id: 'prod-41', name: 'Whole Wheat Atta', description: 'Premium quality whole wheat flour for soft rotis and chapatis (5kg).', price: 250, stock: 100, categoryId: 'staples-pantry', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-atta')!.imageUrl, imageHint: 'atta flour', sellerId: 'seller-1' },
  { id: 'prod-42', name: 'Basmati Rice', description: 'Long-grain aromatic Basmati rice, perfect for biryani and pulao (5kg).', price: 600, stock: 80, categoryId: 'staples-pantry', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-rice')!.imageUrl, imageHint: 'basmati rice', sellerId: 'seller-1' },
  { id: 'prod-43', name: 'Groundnut Oil', description: 'Cold-pressed groundnut oil, ideal for all types of cooking (1L).', price: 220, stock: 120, categoryId: 'staples-pantry', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-oil')!.imageUrl, imageHint: 'cooking oil', sellerId: 'seller-1' },
  { id: 'prod-44', name: 'Assorted Masalas', description: 'A combo pack of essential Indian spices including turmeric, chili, and coriander powder (100g each).', price: 180, stock: 150, categoryId: 'staples-pantry', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-spices')!.imageUrl, imageHint: 'indian spices', sellerId: 'seller-1' },
  { id: 'prod-45', name: 'Mixed Dry Fruits', description: 'A healthy mix of almonds, cashews, raisins, and walnuts (250g).', price: 350, stock: 90, categoryId: 'staples-pantry', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-dry-fruits')!.imageUrl, imageHint: 'dry fruits', sellerId: 'seller-1' },

  // Beverages - Seller 1, Seller 2
  { id: 'prod-49', name: 'Tata Tea Gold', description: 'A perfect blend of Assam CTC and long leaves for a rich taste (500g).', price: 250, stock: 100, categoryId: 'beverages', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-tea')!.imageUrl, imageHint: 'tea box', sellerId: 'seller-1' },
  { id: 'prod-50', name: 'Bru Instant Coffee', description: 'Rich aromatic instant coffee for a quick start to your day (200g).', price: 300, stock: 80, categoryId: 'beverages', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-coffee')!.imageUrl, imageHint: 'coffee jar', sellerId: 'seller-1' },
  { id: 'prod-51', name: 'Coca-Cola Can', description: 'The classic refreshing Coca-Cola soft drink (330ml Can).', price: 40, stock: 200, categoryId: 'beverages', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-coke')!.imageUrl, imageHint: 'coke can', sellerId: 'seller-2' },
  { id: 'prod-52', name: 'Tropicana Orange Juice', description: '100% pure pressed orange juice, not from concentrate (1L).', price: 140, stock: 120, categoryId: 'beverages', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-juice')!.imageUrl, imageHint: 'juice carton', sellerId: 'seller-2' },
  { id: 'prod-53', name: 'Bournvita Health Drink', description: 'Chocolate health drink that provides essential nutrients (500g Jar).', price: 230, stock: 90, categoryId: 'beverages', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-bournvita')!.imageUrl, imageHint: 'bournvita jar', sellerId: 'seller-1' },
  { id: 'prod-54', name: 'Red Bull Energy Drink', description: 'The classic energy drink to give you wings (250ml Can).', price: 125, stock: 150, categoryId: 'beverages', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-redbull')!.imageUrl, imageHint: 'red bull', sellerId: 'seller-2' },

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

    
