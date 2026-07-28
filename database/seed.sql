-- ============================================================
-- GrocerEase - Seed Data (PostgreSQL)
-- ============================================================

-- ============================================================
-- SEED: Users
-- ============================================================

INSERT INTO users (id, name, email, role, password_hash, phone) VALUES
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Alice', 'alice@example.com', 'Customer', '$2b$10$hashedpassword1', '+91-9876543210'),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Admin User', 'admin@example.com', 'Admin', '$2b$10$hashedpassword2', '+91-9876543211'),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Bob', 'bob@example.com', 'Delivery', '$2b$10$hashedpassword3', '+91-9876543212'),
    ('d4e5f6a7-b8c9-0123-defa-234567890123', 'FarmFresh Organics', 'contact@farmfresh.com', 'Seller', '$2b$10$hashedpassword4', '+91-9876543213'),
    ('e5f6a7b8-c9d0-1234-efab-345678901234', 'Artisan Bakery', 'hello@artisanbakery.com', 'Seller', '$2b$10$hashedpassword5', '+91-9876543214'),
    ('f6a7b8c9-d0e1-2345-fabc-456789012345', 'Amma Kitchen', 'support@ammaskitchen.com', 'Seller', '$2b$10$hashedpassword6', '+91-9876543215');

-- ============================================================
-- SEED: Categories
-- ============================================================

INSERT INTO categories (id, name, description, product_type) VALUES
    ('cat-001', 'Fresh Produce', 'Fresh fruits and vegetables.', 'grocery'),
    ('cat-002', 'Dairy & Eggs', 'Milk, cheese, eggs, and more.', 'grocery'),
    ('cat-003', 'Staples & Grains', 'Rice, flour, dals, and other essentials.', 'grocery'),
    ('cat-004', 'Spices & Masalas', 'Aromatic spices and masalas.', 'grocery'),
    ('cat-005', 'Bakery & Breakfast', 'Bread, biscuits, cereals, and spreads.', 'grocery'),
    ('cat-006', 'Cooking Oils & Ghee', 'Essential cooking oils and ghee.', 'grocery'),
    ('cat-007', 'Packaged & Instant Foods', 'Noodles, ready-to-eat meals, and more.', 'grocery'),
    ('cat-008', 'Snacks & Beverages', 'Chips, chocolates, drinks, and more.', 'grocery'),
    ('cat-009', 'Personal Care & Wellness', 'Health and beauty products.', 'grocery'),
    ('cat-010', 'Household Essentials', 'Cleaning supplies and other home needs.', 'grocery'),
    ('cat-011', 'Meat & Seafood', 'Fresh meat and seafood items.', 'grocery'),
    ('cat-012', 'Electronics', 'Mobiles, accessories, and smart gadgets.', 'ecommerce'),
    ('cat-013', 'Fashion', 'Clothing for men, women, and kids.', 'ecommerce'),
    ('cat-014', 'Footwear', 'Casual shoes, sports shoes, and sandals.', 'ecommerce'),
    ('cat-015', 'Accessories', 'Bags, watches, and sunglasses.', 'ecommerce'),
    ('cat-016', 'Home & Kitchen', 'Cookware, storage, and home decor.', 'ecommerce'),
    ('cat-017', 'Beauty & Personal Care', 'Makeup, skin care, and hair styling tools.', 'ecommerce'),
    ('cat-018', 'Baby & Kids', 'Toys and baby essentials.', 'ecommerce');

-- ============================================================
-- SEED: Tags (normalized)
-- ============================================================

INSERT INTO tags (id, name) VALUES
    ('tag-001', 'High Protein'),
    ('tag-002', 'Low GI'),
    ('tag-003', 'Halaal'),
    ('tag-004', 'Antibiotic-free'),
    ('tag-005', 'Fresh Catch'),
    ('tag-006', 'No Preservatives'),
    ('tag-007', 'Low Sodium'),
    ('tag-008', 'Chilled Delivery'),
    ('tag-009', 'Diet/Zero'),
    ('tag-010', 'Veg'),
    ('tag-011', 'Non-Veg');

-- ============================================================
-- SEED: Cooking Methods (normalized)
-- ============================================================

INSERT INTO cooking_methods (id, name) VALUES
    ('cm-001', 'Microwave'),
    ('cm-002', 'Pan Fry'),
    ('cm-003', 'Air Fryer'),
    ('cm-004', 'Deep Fry'),
    ('cm-005', 'Grill');

-- ============================================================
-- SEED: Products (representative subset)
-- ============================================================

INSERT INTO products (id, name, description, price, stock, product_type, category_id, seller_id, image_url, image_hint, sub_category, brand, best_before, serves, tags, features, materials, cooking_methods, pairing_ids) VALUES
    ('prod-potato', 'Potato (Aloo)', 'Versatile and essential for many dishes.', 30, 100, 'grocery', 'cat-001', 'd4e5f6a7-b8c9-0123-defa-234567890123', '/freshproduce/vegetables/potato.png', 'fresh potatoes', 'Vegetables', NULL, NULL, NULL, '["tag-010"]', '[]', '[]', '[]', '{}'),
    ('prod-onion', 'Onion (Vengayam)', 'A staple in every Indian kitchen.', 40, 80, 'grocery', 'cat-001', 'd4e5f6a7-b8c9-0123-defa-234567890123', '/freshproduce/vegetables/onion.png', 'fresh onions', 'Vegetables', NULL, NULL, NULL, '["tag-010"]', '[]', '[]', '[]', '{}'),
    ('prod-tomato', 'Tomato (Thakkali)', 'Ripe and juicy tomatoes.', 25, 120, 'grocery', 'cat-001', 'd4e5f6a7-b8c9-0123-defa-234567890123', '/freshproduce/vegetables/tomato.png', 'ripe tomatoes', 'Vegetables', NULL, NULL, NULL, '["tag-010"]', '[]', '[]', '[]', '{}'),
    ('prod-apple', 'Apple', 'Crisp and delicious red apples.', 150, 80, 'grocery', 'cat-001', 'd4e5f6a7-b8c9-0123-defa-234567890123', '/freshproduce/fruits/apple.png', 'red apples', 'Fruits', NULL, NULL, NULL, '["tag-010"]', '[]', '[]', '[]', '{}'),
    ('prod-milk-pouch', 'Aavin Toned Milk', 'Fresh toned milk from Aavin.', 22, 150, 'grocery', 'cat-002', 'd4e5f6a7-b8c9-0123-defa-234567890123', '/dairy&eggs/aavin.png', 'milk pouch', 'Milk & Curd', 'Aavin', NULL, NULL, '["tag-008"]', '[]', '[]', '[]', '{}'),
    ('prod-ponni-rice', 'Ponni Rice', 'High-quality Ponni rice for daily meals.', 550, 50, 'grocery', 'cat-003', 'f6a7b8c9-d0e1-2345-fabc-456789012345', '/staples&grains/basmati.png', 'rice bag', 'Rice', NULL, NULL, NULL, '[]', '[]', '[]', '[]', '{}'),
    ('prod-chicken-curry-cut', 'Chicken Curry Cut', 'Fresh, bone-in chicken pieces perfect for curries.', 250, 20, 'grocery', 'cat-011', 'd4e5f6a7-b8c9-0123-defa-234567890123', '/meat&seafood/boneless.png', 'chicken curry cut', 'Chicken (Kozhi)', NULL, NULL, NULL, '["tag-003", "tag-004", "tag-008"]', '[]', '[]', '[]', '{}'),
    ('prod-seer-fish', 'Seer Fish (Vanjaram)', 'Freshly caught seer fish, perfect for frying.', 950, 7, 'grocery', 'cat-011', 'd4e5f6a7-b8c9-0123-defa-234567890123', '/meat&seafood/seer.png', 'seer fish', 'Fresh Seafood (Meen Vagaigal)', NULL, NULL, NULL, '["tag-005", "tag-008"]', '[]', '[]', '[]', '{}'),
    ('prod-murukku', 'Butter Murukku', 'Classic crunchy spiral snack made from rice flour and butter.', 80, 100, 'grocery', 'cat-008', 'f6a7b8c9-d0e1-2345-fabc-456789012345', '/snacks&beverages/murukku.png', 'murukku snack', 'Chips & Namkeen', NULL, NULL, NULL, '[]', '[]', '[]', '[]', '{}'),
    ('prod-tea', 'Assam Black Tea', 'Strong and malty black tea.', 250, 100, 'grocery', 'cat-008', 'f6a7b8c9-d0e1-2345-fabc-456789012345', '/snacks&beverages/tea.png', 'tea box', 'Tea & Coffee', NULL, NULL, NULL, '[]', '[]', '[]', '[]', '{}'),
    ('prod-floor-cleaner', 'Lizol Floor Cleaner', 'Kills 99.9% of germs, leaving a pleasant fragrance.', 190, 80, 'ecommerce', 'cat-010', 'd4e5f6a7-b8c9-0123-defa-234567890123', '/householdessentials/lizol.png', 'floor cleaner bottle', 'Cleaning Products', NULL, NULL, NULL, '[]', '[]', '[]', '[]', '{}'),
    ('prod-shampoo', 'Clinic Plus Shikakai Shampoo', 'Nourishing shampoo with Shikakai for naturally long and strong hair.', 180, 100, 'ecommerce', 'cat-009', 'd4e5f6a7-b8c9-0123-defa-234567890123', '/PersonalCare/clinic plus shikakai shampoo.png', 'shikakai shampoo bottle', 'Hair Care', 'Clinic Plus', NULL, NULL, '[]', '[]', '[]', '[]', '{}'),
    ('prod-android-64', 'Android Smartphone (64 GB)', 'A reliable Android smartphone with 64 GB of storage.', 14999, 150, 'ecommerce', 'cat-012', 'd4e5f6a7-b8c9-0123-defa-234567890123', '/electronics/phone.png', 'android phone', 'Mobile Phones', 'Pixel', NULL, NULL, '[]', '[]', '[]', '[]', '{}'),
    ('prod-men-tshirt', 'Men''s Graphic T-Shirt', 'Comfortable cotton t-shirt with a stylish graphic print.', 799, 150, 'ecommerce', 'cat-013', 'f6a7b8c9-d0e1-2345-fabc-456789012345', '/fashion/graphic.png', 'men t-shirt', 'Men''s Clothing', 'StyleUp', NULL, NULL, '[]', '[]', '[]', '[]', '{}'),
    ('prod-sneakers', 'Classic Canvas Sneakers', 'Timeless canvas sneakers for everyday wear.', 2999, 120, 'ecommerce', 'cat-014', 'e5f6a7b8-c9d0-1234-efab-345678901234', '/footwear/sneakers.png', 'casual sneakers', 'Casual Shoes', 'WalkEasy', NULL, NULL, '[]', '[]', '[]', '[]', '{}'),
    ('prod-non-stick-pan', 'Non-Stick Frying Pan', 'A durable non-stick pan for healthy, everyday cooking.', 1499, 100, 'ecommerce', 'cat-016', 'e5f6a7b8-c9d0-1234-efab-345678901234', '/home&kitchen/pan.png', 'frying pan', 'Cookware', 'KitchenPro', NULL, NULL, '[]', '[]', '[]', '[]', '{}');

-- ============================================================
-- SEED: Product Variants
-- ============================================================

INSERT INTO product_variants (id, product_id, weight, price, stock, sort_order) VALUES
    ('var-potato-500g', 'prod-potato', '500g', 15, 50, 1),
    ('var-potato-1kg', 'prod-potato', '1kg', 30, 30, 2),
    ('var-potato-5kg', 'prod-potato', '5kg', 140, 20, 3),
    ('var-onion-500g', 'prod-onion', '500g', 20, 40, 1),
    ('var-onion-1kg', 'prod-onion', '1kg', 40, 30, 2),
    ('var-tomato-500g', 'prod-tomato', '500g', 13, 60, 1),
    ('var-tomato-1kg', 'prod-tomato', '1kg', 25, 60, 2),
    ('var-apple-1kg', 'prod-apple', '1kg', 150, 80, 1),
    ('var-milk-1l', 'prod-milk-pouch', '1L', 22, 150, 1),
    ('var-rice-1kg', 'prod-ponni-rice', '1kg', 60, 20, 1),
    ('var-rice-5kg', 'prod-ponni-rice', '5kg', 280, 20, 2),
    ('var-rice-10kg', 'prod-ponni-rice', '10kg', 550, 10, 3),
    ('var-chicken-500g', 'prod-chicken-curry-cut', '500g', 250, 20, 1),
    ('var-seer-whole', 'prod-seer-fish', 'Whole', 950, 7, 1),
    ('var-seer-slices', 'prod-seer-fish', 'Slices', 1000, 0, 2),
    ('var-murukku-50g', 'prod-murukku', '50g (Trial)', 20, 50, 1),
    ('var-murukku-250g', 'prod-murukku', '250g', 80, 50, 2),
    ('var-tea-box', 'prod-tea', 'Tea Box (25 bags)', 250, 100, 1),
    ('var-android-64', 'prod-android-64', '64 GB', 14999, 150, 1),
    ('var-tshirt', 'prod-men-tshirt', 'Regular', 799, 150, 1),
    ('var-sneakers', 'prod-sneakers', 'Regular', 2999, 120, 1),
    ('var-pan', 'prod-non-stick-pan', '28cm', 1499, 100, 1);

-- ============================================================
-- SEED: Cleaning Options
-- ============================================================

INSERT INTO cleaning_options (id, product_id, type, price_modifier, sort_order) VALUES
    ('co-seer-whole', 'prod-seer-fish', 'Whole', 0, 1),
    ('co-seer-slices', 'prod-seer-fish', 'Slices', 50, 2),
    ('co-prawns-whole', 'prod-prawns', 'Whole', 0, 1),
    ('co-prawns-cleaned', 'prod-prawns', 'Cleaned & Gutted', 80, 2),
    ('co-salmon-whole', 'prod-salmon', 'Whole', 0, 1),
    ('co-salmon-skin-off', 'prod-salmon', 'Skin-off', 100, 2);

-- ============================================================
-- SEED: Product Tags (many-to-many)
-- ============================================================

INSERT INTO product_tags (product_id, tag_id) VALUES
    ('prod-potato', 'tag-010'),
    ('prod-onion', 'tag-010'),
    ('prod-tomato', 'tag-010'),
    ('prod-apple', 'tag-010'),
    ('prod-milk-pouch', 'tag-008'),
    ('prod-chicken-curry-cut', 'tag-003'),
    ('prod-chicken-curry-cut', 'tag-004'),
    ('prod-chicken-curry-cut', 'tag-008'),
    ('prod-seer-fish', 'tag-005'),
    ('prod-seer-fish', 'tag-008'),
    ('prod-murukku', 'tag-010');

-- ============================================================
-- SEED: Product Cooking Methods
-- ============================================================

INSERT INTO product_cooking_methods (product_id, cooking_method_id) VALUES
    ('prod-veg-cutlet-frozen', 'cm-004'),
    ('prod-veg-cutlet-frozen', 'cm-003'),
    ('prod-fish-fingers-frozen', 'cm-004'),
    ('prod-fish-fingers-frozen', 'cm-003'),
    ('prod-french-fries-frozen', 'cm-004'),
    ('prod-french-fries-frozen', 'cm-003');

-- ============================================================
-- SEED: Reviews
-- ============================================================

INSERT INTO reviews (id, product_id, user_id, rating, comment, created_at) VALUES
    ('rev-001', 'prod-apple', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 5, 'These apples are incredibly fresh and crisp!', '2024-07-26T10:00:00Z'),
    ('rev-002', 'prod-apple', 'b2c3d4e5-f6a7-8901-bcde-f12345678901', 4, 'Good quality, but a bit pricey.', '2024-07-25T14:30:00Z'),
    ('rev-003', 'prod-milk-pouch', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 5, 'Aavin milk is always reliable.', '2024-07-15T08:00:00Z'),
    ('rev-004', 'prod-chicken-curry-cut', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 4, 'Chicken was fresh but pieces were a bit small.', '2024-07-14T19:30:00Z'),
    ('rev-005', 'prod-android-64', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 5, 'Amazing phone! The camera is top-notch.', '2024-07-20T12:00:00Z'),
    ('rev-006', 'prod-men-tshirt', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 5, 'Great fit and very comfortable material.', '2024-07-22T10:00:00Z'),
    ('rev-007', 'prod-tea', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 4, 'Strong aroma and great flavor.', '2024-07-23T09:00:00Z'),
    ('rev-008', 'prod-seer-fish', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 5, 'Super fresh, cooked it the same day.', '2024-07-24T18:00:00Z');

-- ============================================================
-- SEED: Orders
-- ============================================================

INSERT INTO orders (id, user_id, total_amount, status, payment_status, payment_method, delivery_address, created_at) VALUES
    ('ord-001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 322.00, 'Delivered', 'Success', 'Card', '{"name": "Alice", "address": "123 Green St", "city": "Chennai", "zip": "600001"}', '2024-07-15T10:00:00Z'),
    ('ord-002', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 300.00, 'Confirmed', 'Success', 'UPI', '{"name": "Alice", "address": "123 Green St", "city": "Chennai", "zip": "600001"}', '2024-07-20T11:30:00Z'),
    ('ord-003', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 980.00, 'Out for Delivery', 'Success', 'COD', '{"name": "Alice", "address": "123 Green St", "city": "Chennai", "zip": "600001"}', '2024-07-21T09:00:00Z'),
    ('ord-004', 'b2c3d4e5-f6a7-8901-bcde-f12345678901', 1599.00, 'Placed', 'Pending', 'UPI', '{"name": "Admin User", "address": "456 Park Ave", "city": "Chennai", "zip": "600008"}', '2024-07-28T14:00:00Z');

-- ============================================================
-- SEED: Order Items
-- ============================================================

INSERT INTO order_items (id, order_id, product_id, name, image_url, quantity, price, variant_id, variant_weight) VALUES
    ('oi-ord-001-01', 'ord-001', 'prod-apple', 'Apple', '/freshproduce/fruits/apple.png', 2, 150.00, NULL, NULL),
    ('oi-ord-001-02', 'ord-001', 'prod-milk-pouch', 'Aavin Toned Milk', '/dairy&eggs/aavin.png', 1, 22.00, NULL, NULL),
    ('oi-ord-002-01', 'ord-002', 'prod-idli-dosa-batter', 'Idli & Dosa Batter', '/packaged-instant-foods/idli-dosa-batter.png', 2, 70.00, NULL, NULL),
    ('oi-ord-002-02', 'ord-002', 'prod-coke', 'Coca-Cola Can', '/snacks&beverages/cola.png', 4, 40.00, NULL, NULL),
    ('oi-ord-003-01', 'ord-003', 'prod-mutton-curry-cut', 'Mutton Curry Cut', '/meat&seafood/mutton.png', 1, 800.00, NULL, NULL),
    ('oi-ord-003-02', 'ord-003', 'prod-basmati-rice', 'Basmati Rice', '/staples&grains/basmati.png', 1, 180.00, 'var-rice-1kg', '1kg'),
    ('oi-ord-004-01', 'ord-004', 'prod-sneakers', 'Classic Canvas Sneakers', '/footwear/sneakers.png', 1, 2999.00, NULL, NULL);

-- ============================================================
-- SEED: Cart Items
-- ============================================================

INSERT INTO cart_items (id, user_id, product_id, quantity, variant_id, created_at) VALUES
    ('cart-001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'prod-apple', 3, NULL, '2024-07-28T18:00:00Z'),
    ('cart-002', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'prod-milk-pouch', 2, NULL, '2024-07-28T18:05:00Z'),
    ('cart-003', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'prod-potato', 1, 'var-potato-500g', '2024-07-28T18:10:00Z'),
    ('cart-004', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'prod-chicken-curry-cut', 2, NULL, '2024-07-28T18:15:00Z');

-- ============================================================
-- SEED: Payments
-- ============================================================

INSERT INTO payments (id, order_id, amount, method, status, transaction_id, created_at) VALUES
    ('pay-001', 'ord-001', 322.00, 'Card', 'Success', 'txn_card_001', '2024-07-15T10:05:00Z'),
    ('pay-002', 'ord-002', 300.00, 'UPI', 'Success', 'txn_upi_001', '2024-07-20T11:35:00Z'),
    ('pay-003', 'ord-003', 980.00, 'COD', 'Success', NULL, '2024-07-21T09:05:00Z'),
    ('pay-004', 'ord-004', 1599.00, 'UPI', 'Pending', NULL, '2024-07-28T14:05:00Z');

-- ============================================================
-- SEED: Order Status History
-- ============================================================

INSERT INTO order_status_history (id, order_id, status, changed_by, created_at) VALUES
    ('osh-001', 'ord-001', 'Placed', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '2024-07-15T10:00:00Z'),
    ('osh-002', 'ord-001', 'Confirmed', 'b2c3d4e5-f6a7-8901-bcde-f12345678901', '2024-07-15T10:30:00Z'),
    ('osh-003', 'ord-001', 'Packed', 'b2c3d4e5-f6a7-8901-bcde-f12345678901', '2024-07-15T12:00:00Z'),
    ('osh-004', 'ord-001', 'Out for Delivery', 'c3d4e5f6-a7b8-9012-cdef-123456789012', '2024-07-15T14:00:00Z'),
    ('osh-005', 'ord-001', 'Delivered', 'c3d4e5f6-a7b8-9012-cdef-123456789012', '2024-07-16T09:00:00Z'),
    ('osh-006', 'ord-003', 'Placed', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '2024-07-21T09:00:00Z'),
    ('osh-007', 'ord-003', 'Confirmed', 'b2c3d4e5-f6a7-8901-bcde-f12345678901', '2024-07-21T09:30:00Z'),
    ('osh-008', 'ord-003', 'Packed', 'b2c3d4e5-f6a7-8901-bcde-f12345678901', '2024-07-21T11:00:00Z'),
    ('osh-009', 'ord-003', 'Out for Delivery', 'c3d4e5f6-a7b8-9012-cdef-123456789012', '2024-07-21T13:00:00Z');