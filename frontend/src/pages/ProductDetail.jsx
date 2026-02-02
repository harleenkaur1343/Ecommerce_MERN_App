import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import { Navbar } from "@/components/layout/Navbar";
//import { products } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import {
  Star,
  Minus,
  Plus,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import api from "@/axios/axios";
import { Link } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/product/${id}`);

        //console.log("The product:", res.data.product);
        setProduct(res.data.product);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading product...</p>
      </div>
    );
  }
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <p>Product not found</p>
        <button
          onClick={() => navigate("/products")}
          className="text-primary underline"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* <Navbar /> */}
      <main className="container mx-auto px-4 py-8 md:py-16">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">
            Back to Collection
          </span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="aspect-square bg-white rounded-[3rem] overflow-hidden border border-primary/5 shadow-2xl shadow-primary/5 group">
              <img
                src={product?.images?.[0]?.url}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {/* <div className="grid grid-cols-4 gap-4">
              {[0, 1, 2, 3].map((i) => (
                <button 
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                    selectedImage === i ? "border-primary" : "border-transparent opacity-50 hover:opacity-100"
                  }`}
                >
                  <img src={product.image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div> */}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 w-fit">
                <Star className="w-3 h-3 fill-current" />
                <span className="text-[10px] font-bold tracking-widest uppercase">
                  Top Rated Choice
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                {/* <div className="flex items-center text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-current" : ""}`}
                    />
                  ))}
                </div> */}
                {/* <span className="text-sm text-muted-foreground">
                  ({product.rating} / 5.0)
                </span>
                <span className="text-sm text-primary font-bold underline underline-offset-4">
                  124 Reviews
                </span> */}
              </div>
              <p className="text-3xl font-display font-bold text-foreground mt-4">
                Rs. {product.price.toFixed(2)}
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed text-lg">
              {product.description}
            </p>

            <div className="space-y-6 pt-6 border-t border-primary/5">
              <div className="flex items-center gap-6">
                <div className="flex items-center bg-secondary/50 rounded-full p-1 border border-primary/5">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="rounded-full w-10 h-10 flex items-center justify-center"
                  >
                    {/* Lucide icons have flex-shrink:1 by default, when buttons are rounded have animations background changes etc their width can go to zero, hence using shrink-0 when using flex for this  */}
                    {/* For >1 icons add in button className="... [&_svg]:shrink-0"> */}
                    <Minus className="w-4 h-4 shrink-0" />
                  </button>
                  <span className="w-12 text-center font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white transition-colors"
                  >
                    <Plus className="w-4 h-4 shrink-0" />
                  </button>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-12 h-12 border-primary/10"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="flex-1 h-16 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-xl shadow-primary/20 group"
                >
                  Add to Ritual
                  <ShoppingBag className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-primary/5">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Free Shipping</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    On orders over $100
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-primary/5">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Pure Promise</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    30-day organic guarantee
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
