import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  ShoppingBag,
  CreditCard,
  MapPin,
  User,
  Mail,
  Phone,
  Lock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Loader2,
  CheckCircle,
} from "lucide-react";
import api from "@/axios/axios";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
//import Navbar from "@/components/Navbar";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
//Elements - Provider wrapper which gives Stripe context to child components - required - loadStripe object (returns a promise)
//CardElement - the UI input element for taking the card information number cvv expiry etc
//useStripe - Hooks which returns stripe instance for using
//useElements - Hook provides the element instance for manipulating the card element inputs

//initalizes the stripe's client side library for using the frontend elements
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY);

const CheckoutForm = ({ orderId, totalAmount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Yes");
    if (!stripe || elements) {
      return;
    }
    setProcessing(true);
    setError("");

    try {
      //get the payment intent created by backend
      const { data } = await api.post("payment/create-intent", { orderId });

      //Confirm payment with stripe
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });
      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
      } else if (paymentIntent.status === "succeeded") {
        onSuccess(paymentIntent);
      }
    } catch (error) {
      setError(
        err.response?.data?.message || "Payment failed. Please try again.",
      );
      setProcessing(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Card Element */}
      <div className="space-y-2">
        <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
          Card Details
        </Label>
        <div className="p-4 bg-white/80 border border-primary/10 rounded-2xl">
          <CardElement
            optioins={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#3d2516",
                  "::placeholder": {
                    color: "#a6896600",
                  },
                  invalid: {
                    color: "#dc2626",
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-destructive/10 border border-destructive/20 rounded-2xl text-destructive text-sm"
        >
          {error}
        </motion.div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={!stripe || processing}
        className="w-full h-14 rounded-full bg-primary hover: bg-primary/90 text-white font-bold text-base shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
      >
        {processing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Processing Payment...
          </>
        ) : (
          <>
            <Lock className="w-5 h-5 mr-2" />
            Pay Rs. {totalAmount.toFixed(2)}
          </>
        )}
      </Button>
      <p className="text-xs text-center text-muted-foreground">
        <Lock className="w-3 h-3 inline mr-1" />
        Secure payment powered by Stripe
      </p>
    </form>
  );
};

const Checkout = () => {
  const navigate = useNavigate();
  //the cart items
  const { cart, loading:cartLoading, refreshCart } = useCart();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  //Shipping info 
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email:"",
    phone:"",
    address:"",
    city:"",
    state:"",
    pincode:""
  })

  //whenever the cart changes - update the total 

  useEffect(()=>{
    calculateTotal();
  },[cart])

  const calculateTotal = () =>{
    const total = cart.reduce((sum,item)=>sum+item.product.price*item.quantity);
    setTotalAmount(total);
  }

  //the 
  
};
export default Checkout;
