import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Navbar from "../pages/Navbar";
import { useCart } from "@/context/CartContext";

export default function Cart() {
  const { cart, loading, addToCart, removeFromCart } = useCart();

  if (loading) return null;

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.qty,
    0,
  );

  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-[#FDFBF9]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 pt-32 pb-24">
        <motion.div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="flex-grow">
            <h1 className="text-4xl font-serif mb-8">Shopping Bag</h1>

            {cart.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl">
                <ShoppingBag className="w-16 h-16 mx-auto mb-6 opacity-50" />
                <p>Your bag is empty</p>
              </div>
            ) : (
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div key={item.product._id} layout>
                    <Card className="mb-6">
                      <CardContent className="p-6">
                        <div className="flex gap-6">
                          <img
                            src={item.product?.images[0]?.url}
                            className="w-28 h-28 object-cover rounded"
                          />

                          <div className="flex-grow">
                            <h3>{item.product.name}</h3>

                            <div className="flex justify-between mt-4">
                              {/* Quantity */}
                              <div className="flex gap-3">
                                <button
                                  onClick={() => {
                                    if (item.qty > 1) {
                                      addToCart(item.product._id, -1);
                                    } else {
                                      removeFromCart(item.product._id);
                                    }
                                  }}
                                >
                                  <Minus />
                                </button>

                                <span>{item.qty}</span>

                                <button
                                  onClick={() => addToCart(item.product._id, 1)}
                                >
                                  <Plus />
                                </button>
                              </div>

                              <p>
                                Rs. {(item.product.price * item.qty).toFixed(2)}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product._id)}
                          >
                            <Trash2 />
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* Summary */}
          {cart.length > 0 && (
            <div className="lg:w-[400px]">
              <div className="bg-white p-8 rounded-xl sticky top-32">
                <h2 className="text-xl mb-6">Order Summary</h2>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <Button className="w-full mt-6">
                  Checkout
                  <ArrowRight className="ml-2" />
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
