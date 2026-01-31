import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function ProductCard({ product }) {
  console.log("Product,", product);
  return (
    <div className="group relative bg-card rounded-3xl overflow-hidden border border-border/50 shadow-sm hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
      {/* Image Area - Aspect Square to match 1:1 generated images */}
      <div className="relative aspect-square bg-secondary/30 overflow-hidden group-hover:bg-secondary/50 transition-colors">
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
          <button className="p-2 rounded-full bg-white shadow-md text-gray-600 hover:text-red-500 transition-colors cursor-pointer">
            <Heart className="w-5 h-5" />
          </button>
          <Link
            to={`/product/${product._id}`}
            className="p-2 rounded-full bg-white shadow-md text-gray-600 hover:text-primary transition-colors cursor-pointer"
          >
            <Eye className="w-5 h-5" />
          </Link>
        </div>

        <Link to={`/product/${product._id}`}>
          <img
            src={product?.images?.[0]?.url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 cursor-pointer"
          />
        </Link>

        {/* Quick Add Button */}
        <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
          <Button className="w-full rounded-full bg-white/90 text-foreground hover:bg-primary hover:text-white shadow-lg backdrop-blur-sm transition-all font-semibold cursor-pointer">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Details */}
      <div className="p-5">
        <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
          {product.category}
        </div>
        <Link to={`/product/${product._id}`}>
          <h3 className="font-display font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1 cursor-pointer">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <span className="font-bold text-xl text-foreground">
            Rs. {product.price.toFixed(2)}
          </span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-slate-800 ring-1 ring-offset-1 ring-slate-200"></div>
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            <div className="w-2 h-2 rounded-full bg-orange-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
