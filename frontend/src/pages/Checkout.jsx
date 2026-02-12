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
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
//Elements - Provider wrapper which gives Stripe context to child components - required - loadStripe object (returns a promise)
//CardElement - the UI input element for taking the card information number cvv expiry etc 
//useStripe - Hooks which returns stripe instance for using 
//useElements - Hook provides the element instance for manipulating the card element inputs


//initalizes the stripe's client side library for using the frontend elements
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY);

const CheckoutForm = () => {
  return (
    <form onSubmit={handleSubmit} className = "space-y-6">

    </form>

  );
};

export default CheckoutForm;