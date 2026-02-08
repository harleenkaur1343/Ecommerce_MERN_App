import React from "react";
import { useState, useEffect } from "react";
import api from "@/axios/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./ProductCard.jsx";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Loader2,
  SlidersHorizontal,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar.jsx";

const Products = () => {
  //variables
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  //current page
  const [page, setPage] = useState(1);
  //total number of pages
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  //why not written the fetchProducts code inside the useEFFECT directly?
  //check the documentation

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/product/products", {
        params: {
          search,
          category,
          minPrice,
          maxPrice,
          page,
          limit: 12,
        },
      });

      setProducts(data.products);
      setPages(data.pages);
      setLoading(false);
      //also have the page and the total products in the query
    } catch (error) {
      console.error("Fetch products error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //adding time delay (pause - for searching)
    setTimeout(() => {
      fetchProducts();
      console.log("In fetchProducts");
    }, 500);
  }, [search, minPrice, maxPrice, category, page]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar></Navbar>
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* header n search bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">
              Our Collection
            </h1>
            <p className="text-muted-foreground italic font-serif">
              Curated botanical rituals for your unique glow
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative group flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40 group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 pl-12 rounded-full border-primary/10 bg-white/50 focus:ring-primary/20"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className={`rounded-full h-12 px-6 gap-2 transition-all ${showFilters ? "bg-primary text-white border-primary" : "border-primary/20"}`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-12"
            >
              <div className="bg-white/40 backdrop-blur-sm rounded-[2rem] p-8 border border-primary/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Category Filter */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                    Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "serum",
                      "cleanser",
                      "toner",
                      "sunscreen",
                      "moisturizer",
                    ].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat === category ? "" : cat)}
                        className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                          category === cat
                            ? "bg-primary text-white shadow-lg shadow-primary/20"
                            : "bg-white border border-primary/5 text-muted-foreground hover:border-primary/20"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-3 sm:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                    Price Range (Rs)
                  </label>
                  <div className="flex items-center gap-4">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="h-11 rounded-xl bg-white/50 border-primary/5"
                    />
                    <div className="w-4 h-px bg-primary/20" />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="h-11 rounded-xl bg-white/50 border-primary/5"
                    />
                  </div>
                </div>

                {/* Reset Action */}
                <div className="flex items-end">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setCategory("");
                      setMinPrice("");
                      setMaxPrice("");
                      setSearch("");
                    }}
                    className="w-full h-11 rounded-xl text-primary font-bold hover:bg-primary/5"
                  >
                    Reset All Filters
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <p className="font-serif italic text-muted-foreground">
              Sourcing botanical goodness...
            </p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white/20 rounded-[3rem] border border-dashed border-primary/20">
            <p className="text-xl font-display font-bold text-muted-foreground">
              No products found for this search.
            </p>
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-20">
            <Button
              variant="outline"
              size="icon"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-full border-primary/10"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <span className="text-sm font-bold tracking-widest text-muted-foreground">
              PAGE {page} OF {pages}
            </span>
            <Button
              variant="outline"
              size="icon"
              disabled={page === pages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-full border-primary/10"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        )}
      </main>
      <footer className="mt-32 bg-primary/5 py-12 border-t border-primary/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm font-serif italic">
            © 2025 Nura Skin. Crafted for the conscious soul.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Products;
