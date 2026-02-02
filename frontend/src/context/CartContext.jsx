import { createContext, useContext, useEffect, useState } from "react";
import api from "@/axios/axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    // console.log("Cart repeat", cart);
  }, [cart]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/cart");

      setCart([...(data?.items || [])]);
    } catch (err) {
      console.error("Fetch cart failed", err);
      setError("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, qty = 1) => {
    try {
      const { data } = await api.post("/cart", {
        productId,
        quantity: qty,
      });

      setCart([...data.cart.items]);
      fetchCart();
    } catch (err) {
      console.error("Add to cart failed", err);
      setError("Could not add item");
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const { data } = await api.delete(`/cart/${productId}`);

      setCart([...data.cart.items]);
      fetchCart();
    } catch (err) {
      console.error("Remove failed", err);
      setError("Could not remove item");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        addToCart,
        removeFromCart,
        refreshCart: fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
