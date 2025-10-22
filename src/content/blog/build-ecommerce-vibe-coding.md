---
title: "สร้างเว็บ E-commerce ด้วย Vibe Coding ใน 1 สัปดาห์"
meta_title: "สร้างเว็บ E-commerce ด้วย Vibe Coding ใน 1 สัปดาห์"
description: "คู่มือสร้างเว็บ E-commerce สมบูรณ์ด้วย Vibe Coding ตั้งแต่ Product listing, Shopping cart, Checkout จนถึง Payment integration ใน 7 วัน"
date: 2025-10-22T11:00:00Z
image: "/images/blog-default.svg"
categories: ["Vibe Coding", "E-commerce"]
author: "AI Unlocked Team"
tags: ["Vibe Coding", "E-commerce", "สร้างเว็บขายของ", "AI web development", "Next.js", "คอร์ส Vibe Coding"]
draft: false
---

# สร้างเว็บ E-commerce ด้วย Vibe Coding ใน 1 สัปดาห์

สร้าง **เว็บขายของออนไลน์**สมบูรณ์ด้วย Vibe Coding ไม่ต้องเป็น developer มืออาชีพ บทความนี้จะสอนทีละขั้นตอนตั้งแต่เริ่มต้นจนถึง deploy จริง ใน 7 วัน

## สิ่งที่จะได้

- 🛍️ Product catalog + Search
- 🛒 Shopping cart
- 💳 Checkout + Payment (Stripe/PromptPay)
- 👤 User authentication
- 📱 Responsive design
- 🚀 Deploy production

## Tech Stack

- **Frontend:** Next.js 14 + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** Supabase
- **Payment:** Stripe
- **Auth:** Supabase Auth
- **Hosting:** Vercel

อ่านเพิ่มเติม: [Cursor AI Guide](/blog/cursor-ai-complete-guide/)

## Week Plan

### วันที่ 1: Setup + Product Listing
**เวลา: 6-8 ชม.**
- Project setup
- Database schema
- Product grid
- Product detail page

### วันที่ 2: Shopping Cart
**เวลา: 4-6 ชม.**
- Cart state management
- Add/Remove items
- Cart UI
- Cart persistence

### วันที่ 3: Authentication
**เวลา: 4-6 ชม.**
- Login/Register
- Profile page
- Protected routes

### วันที่ 4: Checkout
**เวลา: 6-8 ชม.**
- Checkout form
- Order summary
- Order confirmation

### วันที่ 5: Payment Integration
**เวลา: 6-8 ชม.**
- Stripe setup
- Payment flow
- Webhook handling

### วันที่ 6: Admin Dashboard
**เวลา: 6-8 ชม.**
- Product management
- Order management
- Analytics

### วันที่ 7: Polish + Deploy
**เวลา: 4-6 ชม.**
- Bug fixes
- SEO optimization
- Deploy to Vercel

อ่านเพิ่มเติม: [Vibe Coding Project Examples](/blog/vibe-coding-project-examples/)

## Day 1: Setup + Product Listing

### Step 1: Create Project

```bash
npx create-next-app@latest my-ecommerce
cd my-ecommerce
cursor .
```

### Step 2: Install Dependencies

```bash
npm install @supabase/supabase-js
npm install -D @types/node
npx shadcn-ui@latest init
```

### Step 3: Database Schema (Supabase)

**ใช้ Cursor Composer (Cmd+I):**
```
สร้าง Supabase schema สำหรับ e-commerce:

Tables:
- products (id, name, description, price, image_url, stock, category)
- cart_items (id, user_id, product_id, quantity)
- orders (id, user_id, total, status, created_at)
- order_items (id, order_id, product_id, quantity, price)

Include:
- Foreign keys
- Indexes
- Row level security policies
```

### Step 4: Product Listing Page

**Prompt for Cursor:**
```
สร้าง Product Listing Page:

Components:
- ProductGrid (responsive grid 1-4 columns)
- ProductCard (image, name, price, add to cart button)
- SearchBar
- CategoryFilter
- PriceFilter

Features:
- Load products from Supabase
- Search by name
- Filter by category & price
- Pagination

Use Next.js 14 App Router, TypeScript, Tailwind, shadcn/ui
```

### Step 5: Product Detail Page

```
สร้าง Product Detail Page:

Layout:
- Image gallery (main + thumbnails)
- Product info (name, price, description)
- Quantity selector
- Add to cart button
- Related products

Dynamic route: app/products/[id]/page.tsx
Fetch product by ID from Supabase
```

อ่านเพิ่มเติม: [Vibe Coding vs Traditional](/blog/vibe-coding-vs-traditional/)

## Day 2: Shopping Cart

### Step 1: Cart State Management

```
Setup cart context:

File: lib/cart-context.tsx

Features:
- Add item to cart
- Remove item from cart
- Update quantity
- Calculate total
- Persist to localStorage
- Sync with Supabase (if logged in)

Use React Context + useReducer
TypeScript types for Cart and CartItem
```

### Step 2: Cart UI

```
สร้าง Cart Components:

1. CartButton (in Navbar)
   - Icon + item count badge
   - Click → open cart drawer

2. CartDrawer
   - Slide from right
   - List of cart items
   - Quantity controls
   - Remove button
   - Subtotal
   - Checkout button

3. CartItem Component
   - Product image
   - Name, price
   - Quantity selector
   - Remove button

Use shadcn/ui Sheet component
Animated transitions
```

### Step 3: Integration

```
Integrate Cart:

1. Add "Add to Cart" button in:
   - Product cards
   - Product detail page

2. Toast notifications:
   - Item added
   - Item removed
   - Quantity updated

3. Empty cart state

Use shadcn/ui Toast
```

## Day 3: Authentication

### Step 1: Supabase Auth Setup

```
Setup Supabase Authentication:

Files:
- lib/supabase.ts (client setup)
- lib/auth-context.tsx (auth state)

Features:
- Email/Password signup
- Email/Password login
- Social login (Google, Facebook)
- Logout
- Session management
- Protected routes HOC

TypeScript types for User
```

### Step 2: Auth UI

```
สร้าง Auth Pages:

1. /login
   - Email + Password form
   - Social login buttons
   - Link to register
   - Forgot password

2. /register
   - Name, Email, Password
   - Terms checkbox
   - Link to login

3. /profile
   - User info
   - Order history
   - Logout button

Use shadcn/ui Form components
Validation with Zod
Loading states
Error handling
```

### Step 3: Protected Routes

```
Create middleware:

File: middleware.ts

Protect routes:
- /checkout
- /profile
- /orders
- /admin/*

Redirect to /login if not authenticated
Preserve return URL
```

อ่านเพิ่มเติม: [AI Coding Programming](/blog/ai-coding-programming/)

## Day 4: Checkout

### Step 1: Checkout Page

```
สร้าง Checkout Flow:

Layout: 3 columns
1. Shipping Info Form
   - Name, Address, Phone
   - Save to profile option

2. Order Summary
   - Cart items list
   - Subtotal
   - Shipping fee
   - Total

3. Payment Method
   - Credit Card (Stripe)
   - Bank Transfer
   - PromptPay

Route: app/checkout/page.tsx
Multi-step form or single page
Form validation
```

### Step 2: Order Creation

```
Create Order API:

File: app/api/orders/route.ts

Process:
1. Validate cart items
2. Check stock availability
3. Calculate total
4. Create order in DB
5. Create order items
6. Reduce product stock
7. Clear cart
8. Return order ID

Error handling
Transaction rollback
```

### Step 3: Order Confirmation

```
Order Confirmation Page:

Route: app/orders/[id]/confirmation

Show:
- Order number
- Order date
- Items ordered
- Shipping address
- Payment status
- Estimated delivery

Call-to-action:
- Continue shopping
- Track order
- View orders
```

## Day 5: Payment Integration

### Step 1: Stripe Setup

```bash
npm install stripe @stripe/stripe-js
```

**Config:**
```typescript
// lib/stripe.ts
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
```

### Step 2: Payment Intent API

```
Create Payment API:

File: app/api/create-payment-intent/route.ts

Process:
1. Get order total
2. Create Stripe Payment Intent
3. Return client_secret

Handle:
- Currency (THB)
- Metadata (order_id, user_id)
```

### Step 3: Payment UI

```
Stripe Checkout Component:

Features:
- Card input (Stripe Elements)
- Payment button
- Loading state during payment
- Success/Error handling
- 3D Secure support

Redirect to confirmation on success
```

### Step 4: Webhook Handler

```
Stripe Webhook:

File: app/api/webhooks/stripe/route.ts

Listen to:
- payment_intent.succeeded
- payment_intent.failed

Actions:
- Update order status
- Send confirmation email
- Trigger fulfillment
```

อ่านเพิ่มเติม: [สอน Vibe Code AI](/blog/sorn-vibe-code-ai-programming/)

## Day 6: Admin Dashboard

### Step 1: Admin Layout

```
Create Admin Dashboard:

Route: app/admin/layout.tsx

Sidebar Menu:
- Dashboard (stats)
- Products
- Orders
- Customers
- Settings

Protected: Check user role === 'admin'
```

### Step 2: Product Management

```
Product CRUD:

Pages:
- /admin/products (list + search)
- /admin/products/new (create)
- /admin/products/[id]/edit

Features:
- DataTable with sort/filter
- Image upload (Supabase Storage)
- Rich text editor (description)
- Category/tag management
- Bulk actions

Use shadcn/ui DataTable
```

### Step 3: Order Management

```
Order Management:

Features:
- Order list (all statuses)
- Filter by status/date
- Order detail modal
- Update order status
- Print invoice
- Export orders

Statuses:
- Pending
- Processing
- Shipped
- Delivered
- Cancelled
```

### Step 4: Dashboard Stats

```
Analytics Dashboard:

Metrics:
- Today's revenue
- Total orders
- New customers
- Popular products

Charts:
- Revenue trend (7/30 days)
- Top selling products
- Order status distribution

Use recharts library
Real-time updates
```

## Day 7: Polish + Deploy

### Checklist

**🎨 UI/UX:**
- [ ] Mobile responsive ทุกหน้า
- [ ] Loading states ทุกที่
- [ ] Error boundaries
- [ ] Toast notifications
- [ ] Empty states

**🔍 SEO:**
- [ ] Meta tags ทุกหน้า
- [ ] OpenGraph images
- [ ] Sitemap
- [ ] robots.txt

**⚡ Performance:**
- [ ] Image optimization
- [ ] Lazy loading
- [ ] Code splitting
- [ ] Lighthouse score > 90

**🔒 Security:**
- [ ] Environment variables
- [ ] CORS settings
- [ ] Rate limiting
- [ ] Input validation

**🚀 Deploy:**
```bash
# Push to GitHub
git add .
git commit -m "E-commerce site complete"
git push

# Deploy to Vercel
vercel deploy --prod
```

อ่านเพิ่มเติม: [Vibe Coding MVP](/blog/vibe-coding-mvp/)

## Prompts Library

### สำหรับแต่ละ Feature

**Responsive Design:**
```
Make this component fully responsive:
- Mobile: 1 column, full width
- Tablet: 2 columns
- Desktop: 3-4 columns
Add proper spacing and padding
Test on all breakpoints
```

**Error Handling:**
```
Add comprehensive error handling:
- Try-catch blocks
- User-friendly error messages
- Retry mechanism
- Fallback UI
- Error logging
```

**Loading States:**
```
Add loading states:
- Skeleton loaders for content
- Spinner for buttons
- Disable interactions during loading
- Show progress for multi-step
```

## Advanced Features (Optional)

**Week 2 Additions:**

1. **Product Reviews**
   - Star ratings
   - Review form
   - Review moderation

2. **Wishlist**
   - Save favorite products
   - Share wishlist

3. **Email Notifications**
   - Order confirmation
   - Shipping updates
   - Marketing emails

4. **Discount Codes**
   - Coupon system
   - Automatic discounts
   - Free shipping thresholds

5. **Inventory Management**
   - Stock alerts
   - Restock notifications
   - Low stock warnings

อ่านเพิ่มเติม: [Building SaaS with AI](/blog/building-saas-with-ai/)

## ตัวอย่าง Prompts ที่ดี

### สำหรับ Cursor Composer

```
สร้าง E-commerce Product Card Component:

Requirements:
- Product image (aspect ratio 1:1)
- Product name (2 lines max, ellipsis)
- Price (formatted with currency)
- Rating stars + count
- Add to cart button
- Quick view button (hover)
- Sale badge (if discounted)
- Out of stock overlay

Style:
- Clean, modern design
- Subtle hover effects
- Smooth transitions
- Tailwind CSS
- shadcn/ui Button

TypeScript:
- Strict typing
- Product interface
- Event handlers

Responsive:
- Works on mobile/tablet/desktop
```

## Tips สำหรับความสำเร็จ

### ✅ Do's

1. **เริ่มจาก MVP**
   - ทำ core features ก่อน
   - ค่อยเพิ่ม advanced features

2. **Test บ่อยๆ**
   - ทดสอบทุก feature หลัง implement
   - Test บน mobile ด้วย

3. **ใช้ Ready-made Components**
   - shadcn/ui
   - Headless UI
   - ประหยัดเวลามาก

4. **Iterate กับ AI**
   - ถ้าไม่ชอบ แก้ prompt
   - ลองหลายวิธี

### ❌ Don'ts

1. **อย่าทำทุกอย่างพร้อมกัน**
   - ทำทีละ feature
   - Test ให้เสร็จก่อนทำต่อ

2. **อย่าข้าม Error Handling**
   - User experience สำคัญ
   - Handle errors ทุกที่

3. **อย่าลืม Mobile**
   - คนส่วนใหญ่ใช้มือถือ
   - Test responsive ตลอด

## สรุป

สร้าง **E-commerce ครบระบบ** ด้วย Vibe Coding ใน **1 สัปดาห์** ทำได้จริง!

**สิ่งที่ต้องมี:**
- ⏱️ เวลา 40-50 ชั่วโมง
- 💻 Cursor AI
- 📚 Basic HTML/CSS/JS
- 🎯 Commitment

**ผลลัพธ์:**
- เว็บขายของที่ใช้งานได้จริง
- Portfolio piece
- ฝึกทักษะ Vibe Coding
- พื้นฐานสำหรับขยายต่อ

หากต้องการเรียน Vibe Coding สร้าง E-commerce แบบเจาะลึก เรียน **[คอร์ส Vibe Coding](https://aiunlock.co/)** กับเราได้

---

**บทความที่เกี่ยวข้อง:**
- [Cursor AI Guide](/blog/cursor-ai-complete-guide/)
- [Vibe Coding Project Examples](/blog/vibe-coding-project-examples/)
- [สอน Vibe Code AI](/blog/sorn-vibe-code-ai-programming/)
