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

```
nuraSkin/
├── src/
│   ├── components/
│   │   ├── ui/               # shadcn/ui components
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Register.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── OTP.jsx
│   │   │   └── Logout.jsx
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminOverview.jsx
│   │   │   ├── AdminProducts.jsx
│   │   │   ├── AdminOrders.jsx
│   │   │   ├── AddProduct.jsx
│   │   │   └── EditProduct.jsx
│   │   ├── Products.jsx
│   │   ├── Checkout.jsx
│   │   └── ...
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── axios/
│   │   └── axios.js         # API configuration
│   └── App.jsx
├── backend/
│   ├── models/
│   │   ├── user_model.js
│   │   ├── product_model.js
│   │   ├── order_model.js
│   │   └── cart_model.js
│   ├── routes/
│   │   ├── auth_routes.js
│   │   ├── product_routes.js
│   │   ├── order_routes.js
│   │   ├── cart_routes.js
│   │   └── payment_routes.js
│   ├── controllers/
│   ├── middleware/
│   │   └── auth_middleware.js
│   ├── config/
│   │   └── stripe.js
│   └── server.js
└── README.md
``` -->

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Stripe Account (for payments)
- npm or yarn


1. **Clone the repository**
```bash
git clone https://github.com/harleenkaur1343/Ecommerce_MERN_App.git
cd nuraskin
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd backend
npm install
```

4. **Set up environment variables**

Create `.env` in the root directory:
```env
# Frontend
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
```

Create `.env` in the backend directory:
```env
# Database
MONGO_URI=mongodb://localhost:27017/nuraskin
# or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/nuraskin

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_REFRESH_SECRET=your_refresh_secret_key_here

# Stripe
STRIPE_SECRET_KEY=sk_test_your_secret_key

# Email (for OTP)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Server
PORT=5000
```

5. **Run the development servers**

Backend:
```bash
cd backend
npm run dev
```

Frontend (in a new terminal):
```bash
npm run dev
```

6. **Access the application**
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000` -->

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
<!-- 
## 💳 Payment Testing -->
<!-- 
Use these Stripe test cards:

| Card Number         | Result    |
|---------------------|-----------|
| 4242 4242 4242 4242 | ✅ Success |
| 4000 0000 0000 9995 | ❌ Declined|

- Expiry: Any future date (e.g., 12/34)
- CVC: Any 3 digits (e.g., 123) -->

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


<!-- 
## Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy the 'dist' folder
```

### Backend (Heroku/Railway/Render)
```bash
# Set environment variables in platform dashboard
# Deploy from GitHub repository
```

### Environment Variables for Production
Remember to update:
- Stripe keys (live keys)
- MongoDB URI (production database)
- JWT secrets (strong, random strings)
- Frontend API URL -->






