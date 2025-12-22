
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
  { id: 'dairy-bakery', name: 'Dairy & Bakery', description: 'Fresh milk, cheese, bread, and other dairy and bakery products.' },
  { id: 'staples-pantry', name: 'Staples & Pantry', description: 'Essential cooking ingredients, spices, and pantry items.' },
  { id: 'meat-seafood', name: 'Meat & Seafood', description: 'Fresh, high-quality meat and seafood products.' },
  { id: 'prepared-foods', name: 'Prepared Foods', description: 'Ready-to-eat meals, handcrafted for your convenience.' },
  { id: 'snacks', name: 'Snacks', description: 'A delicious assortment of savory, crispy, and sweet traditional snacks.' },
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
  { id: 'prod-72', name: 'Sprouted Moong Dal', description: 'Healthy and nutritious sprouted moong dal (200g).', price: 45, stock: 120, categoryId: 'fresh-produce', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-sprouted-moong')!.imageUrl, imageHint: 'sprouted moong', sellerId: 'seller-1', subCategory: 'Cut & Sprouted (Convenience)', tags: ['High Protein'] },
  { id: 'prod-73', name: 'Grated Coconut', description: 'Freshly grated coconut for cooking and garnishing (1 cup).', price: 50, stock: 100, categoryId: 'fresh-produce', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-grated-coconut')!.imageUrl, imageHint: 'grated coconut', sellerId: 'seller-1', subCategory: 'Cut & Sprouted (Convenience)' },
  { id: 'prod-74', name: 'Weekly Veggie Combo', description: 'A curated combo of Onion (1kg), Potato (1kg), and Tomato (1kg).', price: 99, stock: 50, categoryId: 'fresh-produce', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-veggie-combo')!.imageUrl, imageHint: 'vegetable combo', sellerId: 'seller-1', subCategory: 'Combos' },

  // Staples & Pantry - Seller 1
  // Rice & Rice Products
  { 
    id: 'prod-ponni-rice', name: 'Ponni Rice', description: 'Popular South Indian Ponni rice, perfect for daily meals.', price: 0, stock: 0, 
    categoryId: 'staples-pantry', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-rice-bag')!.imageUrl, imageHint: 'rice bag', sellerId: 'seller-1', subCategory: 'Rice & Rice Products',
    tags: ['Low GI'],
    variants: [
      { id: 'prod-ponni-rice-1kg', weight: '1kg', price: 70, stock: 100 },
      { id: 'prod-ponni-rice-5kg', weight: '5kg', price: 350, stock: 100 },
      { id: 'prod-ponni-rice-10kg', weight: '10kg', price: 680, stock: 50 },
    ]
  },
  { 
    id: 'prod-basmati-rice', name: 'Basmati Rice', description: 'Long-grain aromatic Basmati rice, ideal for biryani and pulao.', price: 0, stock: 0, 
    categoryId: 'staples-pantry', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-basmati-rice')!.imageUrl, imageHint: 'basmati rice', sellerId: 'seller-1', subCategory: 'Rice & Rice Products',
    variants: [
      { id: 'prod-basmati-rice-1kg', weight: '1kg', price: 120, stock: 80 },
      { id: 'prod-basmati-rice-5kg', weight: '5kg', price: 600, stock: 80 },
    ]
  },
  { id: 'prod-idli-rice', name: 'Idli & Dosa Rice', description: 'Special parboiled rice for making perfect soft idlis and crispy dosas (5kg).', price: 320, stock: 90, categoryId: 'staples-pantry', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-idli-rice')!.imageUrl, imageHint: 'rice grains', sellerId: 'seller-1', subCategory: 'Rice & Rice Products' },
  { id: 'prod-poha', name: 'Poha (Aval)', description: 'Flattened rice, great for a quick and easy breakfast (1kg).', price: 80, stock: 120, categoryId: 'staples-pantry', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-poha')!.imageUrl, imageHint: 'flattened rice', sellerId: 'seller-1', subCategory: 'Rice & Rice Products' },
  
  // Atta & Flours (Maavu)
  { 
    id: 'prod-atta', name: 'Whole Wheat Atta', description: 'Premium quality whole wheat flour for soft rotis and chapatis.', price: 0, stock: 0,
    categoryId: 'staples-pantry', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-atta')!.imageUrl, imageHint: 'atta flour', sellerId: 'seller-1', subCategory: 'Atta & Flours (Maavu)',
    variants: [
      { id: 'prod-atta-1kg', weight: '1kg', price: 55, stock: 100 },
      { id: 'prod-atta-5kg', weight: '5kg', price: 250, stock: 100 },
    ]
  },
  { id: 'prod-besan', name: 'Besan (Gram Flour)', description: 'Fine gram flour, essential for bhajis, pakoras, and sweets (1kg).', price: 110, stock: 150, categoryId: 'staples-pantry', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-besan')!.imageUrl, imageHint: 'gram flour', sellerId: 'seller-1', subCategory: 'Atta & Flours (Maavu)', tags: ['High Protein'] },
  { id: 'prod-rice-flour', name: 'Rice Flour (Arisi Maavu)', description: 'Finely ground rice flour for murukku, seedai, and other snacks (1kg).', price: 70, stock: 130, categoryId: 'staples-pantry', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-rice-flour')!.imageUrl, imageHint: 'rice flour', sellerId: 'seller-1', subCategory: 'Atta & Flours (Maavu)' },
  { id: 'prod-ragi-flour', name: 'Ragi Flour (Finger Millet)', description: 'Nutritious ragi flour, perfect for making healthy dosas and porridge (1kg).', price: 90, stock: 100, categoryId: 'staples-pantry', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-ragi-flour')!.imageUrl, imageHint: 'ragi flour', sellerId: 'seller-1', subCategory: 'Atta & Flours (Maavu)', tags: ['Low GI'] },

  // Dals & Pulses (Paruppu)
  { id: 'prod-toor-dal', name: 'Toor Dal (Sambar Paruppu)', description: 'Split pigeon peas, the base for delicious sambar and dal dishes (1kg).', price: 160, stock: 200, categoryId: 'staples-pantry', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-toor-dal')!.imageUrl, imageHint: 'toor dal', sellerId: 'seller-1', subCategory: 'Dals & Pulses (Paruppu)', tags: ['High Protein'] },
  { id: 'prod-urad-dal', name: 'Urad Dal (Split)', description: 'Split and skinned black gram, essential for idli/dosa batter and tempering (1kg).', price: 180, stock: 180, categoryId: 'staples-pantry', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-urad-dal')!.imageUrl, imageHint: 'urad dal', sellerId: 'seller-1', subCategory: 'Dals & Pulses (Paruppu)', tags: ['High Protein'] },
  { id: 'prod-chickpeas', name: 'Kabuli Chana (Chickpeas)', description: 'Large, white chickpeas for making chana masala and salads (1kg).', price: 150, stock: 150, categoryId: 'staples-pantry', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-chickpeas')!.imageUrl, imageHint: 'chickpeas bowl', sellerId: 'seller-1', subCategory: 'Dals & Pulses (Paruppu)', tags: ['High Protein'] },

  // Salt, Sugar & Jaggery
  { id: 'prod-crystal-salt', name: 'Crystal Salt (Kallu Uppu)', description: 'Coarse sea salt crystals, preferred for traditional cooking (1kg).', price: 25, stock: 300, categoryId: 'staples-pantry', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-crystal-salt')!.imageUrl, imageHint: 'crystal salt', sellerId: 'seller-1', subCategory: 'Salt, Sugar & Jaggery' },
  { id: 'prod-sugar', name: 'White Sugar', description: 'Refined white sugar for all your sweetening needs (1kg).', price: 50, stock: 400, categoryId: 'staples-pantry', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-sugar')!.imageUrl, imageHint: 'sugar cubes', sellerId: 'seller-1', subCategory: 'Salt, Sugar & Jaggery' },
  { id: 'prod-jaggery', name: 'Jaggery (Vellam)', description: 'Traditional unrefined cane sugar, rich in minerals (500g block).', price: 70, stock: 200, categoryId: 'staples-pantry', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-jaggery')!.imageUrl, imageHint: 'jaggery block', sellerId: 'seller-1', subCategory: 'Salt, Sugar & Jaggery', tags: ['Low GI'] },

  // Healthy Millets
  { id: 'prod-barnyard-millet', name: 'Kuthiraivali (Barnyard Millet)', description: 'A healthy and gluten-free millet, cooks fast (500g).', price: 80, stock: 90, categoryId: 'staples-pantry', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-barnyard-millet')!.imageUrl, imageHint: 'millet grains', sellerId: 'seller-1', subCategory: 'Healthy Millets (Siru Dhanyangal)', tags: ['Low GI'] },
  { id: 'prod-foxtail-millet', name: 'Thinai (Foxtail Millet)', description: 'A nutritious ancient grain, perfect for upma and payasam (500g).', price: 85, stock: 85, categoryId: 'staples-pantry', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-foxtail-millet')!.imageUrl, imageHint: 'foxtail millet', sellerId: 'seller-1', subCategory: 'Healthy Millets (Siru Dhanyangal)', tags: ['Low GI'] },
  
  // Existing from before, re-categorized
  { id: 'prod-43', name: 'Groundnut Oil', description: 'Cold-pressed groundnut oil, ideal for all types of cooking (1L).', price: 220, stock: 120, categoryId: 'staples-pantry', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-oil')!.imageUrl, imageHint: 'cooking oil', sellerId: 'seller-1', subCategory: 'Oils & Ghee' },
  { id: 'prod-44', name: 'Assorted Masalas', description: 'A combo pack of essential Indian spices including turmeric, chili, and coriander powder (100g each).', price: 180, stock: 150, categoryId: 'staples-pantry', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-spices')!.imageUrl, imageHint: 'indian spices', sellerId: 'seller-1', subCategory: 'Masalas & Spices' },
  { id: 'prod-45', name: 'Mixed Dry Fruits', description: 'A healthy mix of almonds, cashews, raisins, and walnuts (250g).', price: 350, stock: 90, categoryId: 'staples-pantry', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-dry-fruits')!.imageUrl, imageHint: 'dry fruits', sellerId: 'seller-1', subCategory: 'Dry Fruits & Seeds' },


  // Meat & Seafood - Seller 1
  { id: 'prod-46', name: 'Chicken Breast', description: 'Skinless, boneless chicken breast, tender and juicy (500g).', price: 250, stock: 70, categoryId: 'meat-seafood', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-chicken')!.imageUrl, imageHint: 'chicken breast', sellerId: 'seller-1', subCategory: 'Chicken & Poultry', tags: ['High Protein'] },
  { id: 'prod-47', name: 'Fresh Salmon Fillet', description: 'Rich and flavorful Atlantic salmon fillet, high in omega-3s (250g).', price: 500, stock: 40, categoryId: 'meat-seafood', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-salmon')!.imageUrl, imageHint: 'salmon fillet', sellerId: 'seller-1', subCategory: 'Fish & Seafood', tags: ['High Protein'] },
  { id: 'prod-48', name: 'Mutton Curry Cut', description: 'Tender, bone-in mutton pieces perfect for rich curries (500g).', price: 400, stock: 50, categoryId: 'meat-seafood', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-mutton')!.imageUrl, imageHint: 'mutton pieces', sellerId: 'seller-1', subCategory: 'Mutton & Red Meat', tags: ['High Protein'] },
  { id: 'prod-80', name: 'Country Eggs (Nattu Kozhi)', description: 'A pack of 6 nutritious country chicken eggs.', price: 90, stock: 80, categoryId: 'meat-seafood', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-eggs-brown')!.imageUrl, imageHint: 'brown eggs', sellerId: 'seller-1', subCategory: 'Eggs', tags: ['High Protein'] },
  { id: 'prod-8', name: 'Farm-Fresh White Eggs', description: 'A dozen fresh, white eggs from the farm.', price: 70, stock: 100, categoryId: 'meat-seafood', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-eggs-white')!.imageUrl, imageHint: 'carton eggs', sellerId: 'seller-1', subCategory: 'Eggs', tags: ['High Protein'] },

  // Dairy & Bakery
  // Milk & Fresh Products - Seller 1
  { id: 'prod-5', name: 'Toned Milk Pouch', description: '500ml Aavin toned milk pouch, a daily essential.', price: 25, stock: 100, categoryId: 'dairy-bakery', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-milk-pouch')!.imageUrl, imageHint: 'milk pouch', sellerId: 'seller-1', subCategory: 'Milk & Fresh Products', brand: 'Aavin' },
  { id: 'prod-75', name: 'Full Cream Milk Pouch', description: '500ml Aavin full cream milk pouch, rich and creamy.', price: 30, stock: 80, categoryId: 'dairy-bakery', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-milk-pouch-full')!.imageUrl, imageHint: 'milk pouch', sellerId: 'seller-1', subCategory: 'Milk & Fresh Products', brand: 'Aavin' },
  { id: 'prod-76', name: 'Buttermilk Pouch', description: 'Refreshing Neer Mor (spiced buttermilk), perfect for summer (200ml).', price: 15, stock: 120, categoryId: 'dairy-bakery', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-buttermilk')!.imageUrl, imageHint: 'buttermilk glass', sellerId: 'seller-1', subCategory: 'Milk & Fresh Products', brand: 'Aavin' },
  { id: 'prod-81', name: 'Heritage Toned Milk', description: '500ml Heritage toned milk pouch.', price: 26, stock: 100, categoryId: 'dairy-bakery', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-milk-pouch')!.imageUrl, imageHint: 'milk pouch', sellerId: 'seller-1', subCategory: 'Milk & Fresh Products', brand: 'Heritage' },
  
  // Curd & Yogurt - Seller 1
  { id: 'prod-7', name: 'Plain Curd', description: 'Thick and creamy plain curd (thayir), essential for meals (400g).', price: 40, stock: 90, categoryId: 'dairy-bakery', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-curd')!.imageUrl, imageHint: 'curd bowl', sellerId: 'seller-1', subCategory: 'Curd & Yogurt' },
  { id: 'prod-77', name: 'Greek Yogurt', description: 'Plain Greek yogurt, high in protein (150g cup).', price: 80, stock: 70, categoryId: 'dairy-bakery', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-yogurt')!.imageUrl, imageHint: 'yogurt pot', sellerId: 'seller-1', subCategory: 'Curd & Yogurt', tags: ['High Protein'] },

  // Butter, Cheese & More - Seller 1
  { id: 'prod-78', name: 'Salted Butter', description: 'Classic salted butter, perfect for toast and cooking (100g).', price: 55, stock: 100, categoryId: 'dairy-bakery', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-butter')!.imageUrl, imageHint: 'butter block', sellerId: 'seller-1', subCategory: 'Butter, Cheese & More' },
  { id: 'prod-6', name: 'Cheddar Cheese Slices', description: 'A pack of 10 convenient cheddar cheese slices for sandwiches.', price: 150, stock: 60, categoryId: 'dairy-bakery', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-cheese')!.imageUrl, imageHint: 'cheese slices', sellerId: 'seller-1', subCategory: 'Butter, Cheese & More' },
  { id: 'prod-79', name: 'Fresh Paneer', description: 'Soft and fresh paneer (cottage cheese), ideal for curries (200g).', price: 90, stock: 80, categoryId: 'dairy-bakery', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-paneer')!.imageUrl, imageHint: 'paneer cubes', sellerId: 'seller-1', subCategory: 'Butter, Cheese & More', tags: ['High Protein'] },
  
  // Fresh Bakery - Seller 2
  { id: 'prod-9', name: 'Sandwich Bread', description: 'A loaf of soft and fresh white sandwich bread.', price: 40, stock: 50, categoryId: 'dairy-bakery', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-bread')!.imageUrl, imageHint: 'sandwich bread', sellerId: 'seller-2', subCategory: 'Fresh Bakery', bestBefore: '3 days' },
  { id: 'prod-10', name: 'Butter Croissants', description: 'Pack of 2 flaky, all-butter croissants, a bakery delight.', price: 120, stock: 40, categoryId: 'dairy-bakery', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-croissant')!.imageUrl, imageHint: 'butter croissants', sellerId: 'seller-2', subCategory: 'Fresh Bakery', bestBefore: '2 days' },
  { id: 'prod-11', name: 'Chocolate Cake Slice', description: 'Rich, decadent chocolate fudge cake slice.', price: 120, stock: 30, categoryId: 'dairy-bakery', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-cake')!.imageUrl, imageHint: 'chocolate cake', sellerId: 'seller-2', subCategory: 'Fresh Bakery', bestBefore: '4 days' },
  { id: 'prod-12', name: 'Tea Rusk', description: 'Crispy and crunchy tea rusk, perfect for dipping (200g).', price: 50, stock: 100, categoryId: 'dairy-bakery', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-rusk')!.imageUrl, imageHint: 'tea rusk', sellerId: 'seller-2', subCategory: 'Fresh Bakery', bestBefore: '30 days' },
  
  // Eggs (in Dairy & Bakery) - Seller 1
  { id: 'prod-100', name: 'Farm-Fresh White Eggs (Dairy)', description: 'A dozen fresh, white eggs from the farm.', price: 70, stock: 100, categoryId: 'dairy-bakery', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-eggs-white')!.imageUrl, imageHint: 'carton eggs', sellerId: 'seller-1', subCategory: 'Eggs', tags: ['High Protein'] },
  { id: 'prod-101', name: 'Country Eggs (Nattu Kozhi - Dairy)', description: 'A pack of 6 nutritious country chicken eggs.', price: 90, stock: 80, categoryId: 'dairy-bakery', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-eggs-brown')!.imageUrl, imageHint: 'brown eggs', sellerId: 'seller-1', subCategory: 'Eggs', tags: ['High Protein'] },


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
  { id: 'prod-21', name: 'Murukku', description: 'Classic crispy spiral snack. Available in Manaparai, Kai, and Butter varieties (200g).', price: 80, stock: 100, categoryId: 'snacks', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-murukku')!.imageUrl, imageHint: 'murukku snack', sellerId: 'seller-3', subCategory: 'Savory Snacks' },
  { id: 'prod-22', name: 'Thattai', description: 'Crispy and savory deep-fried rice flour discs, a traditional South Indian snack (200g).', price: 75, stock: 100, categoryId: 'snacks', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-thattai')!.imageUrl, imageHint: 'thattai snack', sellerId: 'seller-3', subCategory: 'Savory Snacks' },
  { id: 'prod-23', name: 'Mixture', description: 'A crunchy mix of various fried snacks like sev, boondi, peanuts, and more (250g).', price: 100, stock: 80, categoryId: 'snacks', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-mixture')!.imageUrl, imageHint: 'mixture snack', sellerId: 'seller-3', subCategory: 'Savory Snacks' },
  { id: 'prod-24', name: 'Ribbon Pakoda', description: 'Also known as Ribbon Seeval, a crunchy and savory snack made from rice flour (200g).', price: 85, stock: 90, categoryId: 'snacks', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-ribbon-pakoda')!.imageUrl, imageHint: 'ribbon pakoda', sellerId: 'seller-3', subCategory: 'Savory Snacks' },
  { id: 'prod-26', name: 'Onion Pakora (Bhajji)', description: 'Crispy onion fritters made with gram flour and spices. A perfect tea-time snack (4 pcs).', price: 50, stock: 120, categoryId: 'snacks', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-pakora')!.imageUrl, imageHint: 'onion pakora', sellerId: 'seller-3', subCategory: 'Savory Snacks' },
  { id: 'prod-28', name: 'Banana Chips', description: 'Thinly sliced, deep-fried bananas, a classic crunchy snack from Kerala (150g).', price: 70, stock: 150, categoryId: 'snacks', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-banana-chips')!.imageUrl, imageHint: 'banana chips', sellerId: 'seller-3', subCategory: 'Savory Snacks' },

  { id: 'prod-30', name: 'Kadalai Mittai', description: 'Traditional groundnut candy bars, a sweet and crunchy delight (200g).', price: 80, stock: 120, categoryId: 'snacks', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-kadalai-mittai')!.imageUrl, imageHint: 'groundnut candy', sellerId: 'seller-3', subCategory: 'Sweet Snacks' },
  { id: 'prod-31', name: 'Adhirasam', description: 'A traditional sweet pastry made from rice flour and jaggery (4 pcs).', price: 100, stock: 80, categoryId: 'snacks', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-adhirasam')!.imageUrl, imageHint: 'adhirasam sweet', sellerId: 'seller-3', subCategory: 'Sweet Snacks' },
  { id: 'prod-32', name: 'Tirunelveli Halwa', description: 'A famous, gooey, and rich wheat halwa from Tirunelveli (250g).', price: 150, stock: 60, categoryId: 'snacks', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-halwa')!.imageUrl, imageHint: 'tirunelveli halwa', sellerId: 'seller-3', subCategory: 'Sweet Snacks' },
  { id: 'prod-33', name: 'Palkova', description: 'A delicious sweet made by simmering milk until it thickens (200g).', price: 120, stock: 70, categoryId: 'snacks', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-palkova')!.imageUrl, imageHint: 'palkova milk', sellerId: 'seller-3', subCategory: 'Sweet Snacks' },
  { id: 'prod-37', name: 'Boondi Ladoo', description: 'Popular Indian sweet made from gram flour pearls (boondi) (4 pcs).', price: 90, stock: 130, categoryId: 'snacks', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-boondi-ladoo')!.imageUrl, imageHint: 'boondi ladoo', sellerId: 'seller-3', subCategory: 'Sweet Snacks' },
  { id: 'prod-38', name: 'Mysore Pak', description: 'A rich, buttery sweet made from gram flour, ghee, and sugar (200g).', price: 130, stock: 75, categoryId: 'snacks', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-mysore-pak')!.imageUrl, imageHint: 'mysore pak', sellerId: 'seller-3', subCategory: 'Sweet Snacks' },
  

  // Beverages - Seller 1, Seller 2
  { id: 'prod-49', name: 'Tata Tea Gold', description: 'A perfect blend of Assam CTC and long leaves for a rich taste (500g).', price: 250, stock: 100, categoryId: 'beverages', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-tea')!.imageUrl, imageHint: 'tea box', sellerId: 'seller-1', subCategory: 'Tea & Coffee' },
  { id: 'prod-50', name: 'Bru Instant Coffee', description: 'Rich aromatic instant coffee for a quick start to your day (200g).', price: 300, stock: 80, categoryId: 'beverages', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-coffee')!.imageUrl, imageHint: 'coffee jar', sellerId: 'seller-1', subCategory: 'Tea & Coffee' },
  { id: 'prod-51', name: 'Coca-Cola Can', description: 'The classic refreshing Coca-Cola soft drink (330ml Can).', price: 40, stock: 200, categoryId: 'beverages', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-coke')!.imageUrl, imageHint: 'coke can', sellerId: 'seller-2', subCategory: 'Soft Drinks & Juices' },
  { id: 'prod-52', name: 'Tropicana Orange Juice', description: '100% pure pressed orange juice, not from concentrate (1L).', price: 140, stock: 120, categoryId: 'beverages', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-juice')!.imageUrl, imageHint: 'juice carton', sellerId: 'seller-2', subCategory: 'Soft Drinks & Juices' },
  { id: 'prod-53', name: 'Bournvita Health Drink', description: 'Chocolate health drink that provides essential nutrients (500g Jar).', price: 230, stock: 90, categoryId: 'beverages', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-bournvita')!.imageUrl, imageHint: 'bournvita jar', sellerId: 'seller-1', subCategory: 'Health Drinks' },
  { id: 'prod-54', name: 'Red Bull Energy Drink', description: 'The classic energy drink to give you wings (250ml Can).', price: 125, stock: 150, categoryId: 'beverages', imageUrl: PlaceHolderImages.find(p => p.id === 'prod-redbull')!.imageUrl, imageHint: 'red bull', sellerId: 'seller-2', subCategory: 'Energy Drinks' },

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
export const getProductById = (id: string) => {
  // First check if it's a base product ID
  const baseProduct = products.find(p => p.id === id);
  if (baseProduct) return baseProduct;

  // If not, check if it's a variant ID
  for (const prod of products) {
    if (prod.variants) {
      const variant = prod.variants.find(v => v.id === id);
      if (variant) {
        // Return the base product but with variant details merged for convenience
        return {
          ...prod,
          id: variant.id, // The ID of the item card should be the variant's
          name: `${prod.name} (${variant.weight})`,
          price: variant.price,
          stock: variant.stock,
          variants: undefined, // Clear variants so we don't show a dropdown for a variant
        };
      }
    }
  }
  return undefined;
};
export const getFeaturedProducts = () => products.slice(16, 20);
export const getReviewsForProduct = (productId: string) => reviews.filter(r => r.productId === productId);
export const getUserById = (id: string) => users.find(u => u.id === id);
export const getOrders = () => orders;
export const getOrderById = (id: string) => orders.find(o => o.id === id);

    
