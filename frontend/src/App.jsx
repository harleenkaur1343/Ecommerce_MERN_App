import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "../src/auth/Register";
import VerifyOTP from "../src/auth/VerifyOTP";
import Login from "./auth/Login";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/otp" element={<VerifyOTP />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/products" element={<Products/>}></Route>
        <Route path="/product/:id" element={<ProductDetail/>}></Route>
        {/* <Route
  path="/admin"
  element={
    <ProtectedRoute role="admin">
      <AdminDashboard />
    </ProtectedRoute>
  }
/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
