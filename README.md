# nuraSkin - Botanical Skincare E-Commerce Platform

> A luxurious, botanical-themed e-commerce platform for natural skincare products. Built with modern technologies and a focus on elegant user experience.

## Features

### Customer Features
- **Product Browsing** - Beautiful product catalog with filtering and search
- **Shopping Cart** - Real-time cart management with context state
- **Secure Checkout** - Stripe integration for safe payments (backend only for now)
- **User Authentication** - JWT-based auth with email OTP verification
- **Order Tracking** - View order history and status (backend only for now)
- **Responsive Design** - Seamless experience across all devices

### Admin Features
<!-- - **Dashboard Overview** - Key metrics and analytics at a glance -->
- **Product Management** - Full CRUD operations with multi-image support
<!-- - **Order Management** - Track and update order statuses -->
<!-- - **Inventory Tracking** - Low stock alerts and stock management -->
- **Role-Based Access** - Secure admin-only routes

## Design Philosophy

nuraSkin embodies a warm, botanical aesthetic:
- **Color Palette**: Soft terracotta (#c5a880) and cream tones
- **Typography**: Clean, elegant fonts with generous spacing
- **UI/UX**: Glassmorphism effects, smooth animations, intuitive navigation
- **Accessibility**: WCAG compliant with proper ARIA labels

## Tech Stack

### Frontend
```json
{
  "core": ["React 19.2.0", "React Router 7.12.0"],
  "ui": ["Tailwind CSS", "shadcn/ui", "Radix UI"],
  "animations": ["Framer Motion 12.27.0"],
  "icons": ["Lucide React"],
  "payments": ["Stripe.js", "Stripe React Elements"],
  "http": ["Axios 1.13.2"]
}
```

### Backend
```json
{
  "runtime": "Node.js",
  "framework": "Express.js",
  "database": "MongoDB",
  "auth": "JWT + OTP",
  "payments": "Stripe",
  "file-upload": "Multer (for product images), Cloudinary"
}
```

## API Endpoints

### Authentication
```
POST   /api/auth/register      - Register new user
POST   /api/auth/verify-otp    - Verify OTP
POST   /api/auth/login         - Login user
POST   /api/auth/refresh       - Refresh access token
POST   /api/auth/logout        - Logout user
```

### Products
```
GET    /api/product/products   - Get all products (with filters)
GET    /api/product/:id        - Get single product
POST   /api/product            - Create product (Admin)
PUT    /api/product/:id        - Update product (Admin)
DELETE /api/product/:id        - Delete product (Admin)
```

### Cart
```
GET    /api/cart               - Get user cart
POST   /api/cart               - Add item to cart
DELETE /api/cart/:productId    - Remove item from cart
```

### Orders
```
GET    /api/orders             - Get user orders (or all for admin)
POST   /api/orders             - Create new order
PUT    /api/orders/:id/status  - Update order status (Admin)
```

### Payments
```
POST   /api/payment/create-intent  - Create Stripe payment intent
```


## Key Features Implementation

### 1. Multi-Image Product Support
Products support multiple images with drag-and-drop upload, preview, and individual image removal.

### 2. Cart Context Management
Global cart state using React Context API for seamless cart operations across the app.

### 3. Stripe Integration
Secure payment processing with Stripe Elements and Payment Intents API.

### 4. Role-Based Access Control
JWT-based authentication with role checks for admin routes.

### 5. Responsive Admin Dashboard
Beautiful admin panel with product management, order tracking, and analytics.

## Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt for password security
- **OTP Verification** - Email-based two-factor authentication
- **Role-Based Access** - Protected admin routes
- **Input Validation** - Frontend and backend validation
- **HTTPS Ready** - Secure communication in production

## Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Tablet Support** - Adaptive layouts for tablets
- **Desktop Enhanced** - Full-featured desktop experience
- **Touch Friendly** - Proper hit targets and interactions








