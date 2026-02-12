import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "../src/auth/Register";
import VerifyOTP from "../src/auth/VerifyOTP";
import Login from "./auth/Login";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import AdminRoute from "./pages/admin/AdminRoute";
import AddProduct from "./pages/admin/AddProduct";
import Logout from "./auth/Logout";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import TrendingSection from "./pages/TrendingSection";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminDashboard from "./pages/admin/AdminDashboard";
import EditProduct from "./pages/admin/EditProduct";
import Cart from "./pages/Cart";
import ProtectedRoute from "./auth/ProtectedRoute";
import CheckoutForm from "./pages/Checkout";
function App() {
  const { user } = useAuth();
  //console.log("User in app.jsx", user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp" element={<VerifyOTP />} />
        <Route path="/logout" element={<Logout />} />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutForm />
            </ProtectedRoute>
          }
        />

        <Route path="/product/:id" element={<ProductDetail />} />

        {/* <Route element={<AdminRoute />}>
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/products/add" element={<AddProduct />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Route> */}
        <Route element={<AdminRoute />}>
          {/* AdminDashboard is the layout wrapper with sidebar */}
          <Route path="/admin" element={<AdminDashboard />}>
            {/* These routes render INSIDE AdminDashboard's <Outlet /> */}
            {/* <Route index element={<AdminOverview />} /> */}
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="products/edit/:id" element={<EditProduct />} />
            {/* <Route path="orders" element={<AdminOrders />} /> */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
