# GrocerEase - SQL Database Design

## Overview

This directory contains the SQL database schema and seed data for the **GrocerEase** grocery e-commerce application. The schema is designed for PostgreSQL and replaces the previous Firestore-based data model with a fully normalized relational design.

## Files

| File | Description |
|------|-------------|
| `schema.sql` | Complete DDL: enums, tables, indexes, constraints, triggers |
| `seed.sql` | Sample data matching the TypeScript types in `src/lib/types.ts` and `src/lib/data.ts` |

## Entity Relationship Summary

```
users (Customer, Admin, Delivery, Seller)
  ├── products (seller_id → users)
  ├── orders (user_id → users)
  ├── reviews (user_id → users)
  └── cart_items (user_id → users)

categories (self-referencing parent_id)
  └── products (category_id → categories)

products
  ├── product_variants (product_id → products)
  ├── cleaning_options (product_id → products)
  ├── reviews (product_id → products)
  ├── order_items (product_id → products)
  ├── cart_items (product_id → products)
  ├── product_tags (many-to-many → tags)
  ├── product_cooking_methods (many-to-many → cooking_methods)
  └── pairing_ids (self-referencing, via UUID array)

orders
  ├── order_items (order_id → orders)
  ├── payments (order_id → orders)
  └── order_status_history (order_id → orders)
```

## Tables

### `users`

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID | Primary key |
| `name` | VARCHAR(255) | |
| `email` | VARCHAR(255) | Unique |
| `role` | user_role enum | Customer, Admin, Delivery, Seller |
| `password_hash` | VARCHAR(255) | For SQL auth; nullable if using Firebase Auth |
| `phone` | VARCHAR(20) | |
| `avatar_url` | TEXT | |
| `created_at` | TIMESTAMPTZ | |
| `updated_at` | TIMESTAMPTZ | Auto-updated by trigger |
| `deleted_at` | TIMESTAMPTZ | Soft delete |

### `categories`

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID | Primary key |
| `name` | VARCHAR(255) | |
| `description` | TEXT | |
| `product_type` | product_type enum | food, grocery, ecommerce |
| `parent_id` | UUID | Self-referencing for sub-categories |
| `image_url` | TEXT | |
| `sort_order` | INTEGER | |
| `created_at` / `updated_at` / `deleted_at` | TIMESTAMPTZ | |

### `products`

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID | Primary key |
| `name` | VARCHAR(255) | |
| `description` | TEXT | |
| `price` | NUMERIC(10,2) | Base price for single-variant products |
| `stock` | INTEGER | Base stock for single-variant products |
| `product_type` | product_type enum | |
| `category_id` | UUID | FK → categories |
| `seller_id` | UUID | FK → users |
| `image_url` | TEXT | |
| `image_hint` | VARCHAR(255) | |
| `sub_category` | VARCHAR(255) | |
| `brand` | VARCHAR(255) | |
| `best_before` | VARCHAR(100) | |
| `serves` | VARCHAR(100) | |
| `tags` | JSONB | Array of tag strings (also normalized in product_tags) |
| `features` | JSONB | Array of feature strings |
| `materials` | JSONB | Array of material strings |
| `cooking_methods` | JSONB | Array of cooking method strings (also normalized) |
| `pairing_ids` | UUID[] | Self-referencing product pairings |
| `created_at` / `updated_at` / `deleted_at` | TIMESTAMPTZ | |

### `product_variants`

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID | Primary key |
| `product_id` | UUID | FK → products |
| `weight` | VARCHAR(100) | e.g., "1kg", "500g" |
| `price` | NUMERIC(10,2) | |
| `stock` | INTEGER | |
| `sort_order` | INTEGER | |

### `cleaning_options`

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID | Primary key |
| `product_id` | UUID | FK → products |
| `type` | cleaning_option_type enum | Whole, Cleaned & Gutted, Skin-off, Slices |
| `price_modifier` | NUMERIC(10,2) | Added to base price |
| `sort_order` | INTEGER | |

### `tags` & `product_tags`

Normalized tag definitions with a many-to-many junction table linking products to tags.

### `cooking_methods` & `product_cooking_methods`

Normalized cooking method definitions with a many-to-many junction table.

### `reviews`

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID | Primary key |
| `product_id` | UUID | FK → products |
| `user_id` | UUID | FK → users |
| `rating` | INTEGER | 1–5, CHECK constraint |
| `comment` | TEXT | |
| `created_at` / `updated_at` / `deleted_at` | TIMESTAMPTZ | |

### `orders`

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID | Primary key |
| `user_id` | UUID | FK → users |
| `total_amount` | NUMERIC(12,2) | |
| `status` | order_status enum | Placed → Confirmed → Packed → Out for Delivery → Delivered |
| `payment_status` | payment_status enum | Success, Failure, Pending |
| `payment_method` | VARCHAR(100) | Card, UPI, COD, etc. |
| `delivery_address` | JSONB | { name, address, city, zip } |
| `created_at` / `updated_at` | TIMESTAMPTZ | |

### `order_items`

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID | Primary key |
| `order_id` | UUID | FK → orders |
| `product_id` | UUID | FK → products |
| `name` | VARCHAR(255) | Snapshot of product name at order time |
| `image_url` | TEXT | |
| `quantity` | INTEGER | CHECK > 0 |
| `price` | NUMERIC(10,2) | Snapshot of price at order time |
| `variant_id` | UUID | Optional FK reference |
| `variant_weight` | VARCHAR(100) | Snapshot of variant weight |

### `cart_items`

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID | Primary key |
| `user_id` | UUID | FK → users |
| `product_id` | UUID | FK → products |
| `quantity` | INTEGER | CHECK > 0 |
| `variant_id` | UUID | Optional |
| `created_at` / `updated_at` | TIMESTAMPTZ | |
| Unique constraint | (user_id, product_id, variant_id) | |

### `payments`

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID | Primary key |
| `order_id` | UUID | FK → orders |
| `amount` | NUMERIC(12,2) | |
| `method` | VARCHAR(100) | |
| `status` | payment_status enum | |
| `transaction_id` | VARCHAR(255) | Gateway transaction reference |
| `created_at` / `updated_at` | TIMESTAMPTZ | |

### `order_status_history`

Tracks every status change on an order for audit trails and delivery role management.

## Key Design Decisions

1. **UUID primary keys** — Match the string ID format used in the TypeScript types and Firestore document IDs.
2. **JSONB for flexible arrays** — `tags`, `features`, `materials`, `cooking_methods`, and `delivery_address` use JSONB for flexibility while still supporting GIN indexing.
3. **Normalized many-to-many** — Tags and cooking methods are fully normalized with junction tables, while also retaining the JSONB arrays on `products` for backward compatibility with the existing Firestore-based frontend.
4. **Soft deletes** — `deleted_at` columns on users, categories, products, and reviews allow admin management without data loss.
5. **Price/name snapshots in order_items** — Order items store copies of product name, price, and image at purchase time, ensuring historical accuracy even if the product is later updated or deleted.
6. **Auto-updated timestamps** — A `update_updated_at_column()` trigger keeps `updated_at` current across all tables.
7. **Order status history** — Full audit trail for order lifecycle, supporting the Admin and Delivery role workflows described in the blueprint.

## Indexes

Key indexes for query performance:

- `idx_users_email` — Fast login lookups
- `idx_users_role` — Role-based filtering
- `idx_products_category` — Browse by category
- `idx_products_seller` — Seller product management
- `idx_products_tags` (GIN) — Tag-based filtering
- `idx_products_pairing_ids` (GIN) — Product pairing lookups
- `idx_orders_user` — User order history
- `idx_orders_status` — Order management by status
- `idx_reviews_product` — Product review listing
- `idx_cart_items_user` — Cart retrieval per user

## Migration from Firestore

When migrating from Firestore to this SQL schema:

1. Export Firestore collections (`users`, `categories`, `products`, `product_variants`, `cleaning_options`, `reviews`, `orders`, `order_items`, `cart_items`)
2. Transform document IDs to UUIDs
3. Flatten nested objects (e.g., `delivery_address` in orders) into JSONB
4. Insert into the corresponding SQL tables using the schema DDL
5. Run `ANALYZE` to update statistics for the query planner