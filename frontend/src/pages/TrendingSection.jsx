import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import api from "@/axios/axios";
import { ProductCard } from "./ProductCard";

const TrendingSection = () => {
  const [activeCategory, setActiveCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const categories = [
    "",
    "serum",
    "cleanser",
    "toner",
    "sunscreen",
    "moisturizer",
  ];
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/product/products", {
        params: {
          search: "",
          category: activeCategory,
          minPrice: "",
          maxPrice: "",
          page: 1,
          limit: 15,
        },
      });

      setProducts(data.products);
      setLoading(false);
      //also have the page and the total products in the query
    } catch (error) {
      console.error("Fetch products error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [activeCategory]);

  const filteredProducts =
    activeCategory === ""
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Trending Now
            </h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                    activeCategory === cat
                      ? "bg-foreground text-background"
                      : "bg-background border border-border text-muted-foreground hover:text-foreground hover:border-foreground",
                  )}
                >
                  {cat === "" ? `All categories` : cat}
                </button>
              ))}
            </div>
          </div>

          <Button
            variant="ghost"
            className="hidden md:flex group text-primary font-semibold"
            onClick={()=>navigate("/products")}
          >
            View All Products{" "}
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Button
            variant="outline"
            className="rounded-full w-full"
            onClick={()=>navigate("/products")}
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
