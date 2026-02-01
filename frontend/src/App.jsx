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


function App() {
  const { user } = useAuth();
  //console.log("User in app.jsx", user);
  return (
    <BrowserRouter>
  
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/otp" element={<VerifyOTP />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        {user ? (
          <Route path="/products" element={<Products />}></Route>
        ) : (
          <Route path="/login" element={<Login />}></Route>
        )}
        <Route path="/product/:id" element={<ProductDetail />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/login" element={<Login />}></Route>
        {/* <Route
  path="/admin"
  element={
    <ProtectedRoute role="admin">
      <AdminDashboard />
    </ProtectedRoute>
  }
/> */}
        <Route
          path="/admin/products/add"
          element={
            <AdminRoute>
              <AddProduct></AddProduct>
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
