import React from "react";
import { useState, useEffect } from "react";
import api from "@/axios/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Loader2,
  SlidersHorizontal,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
          limit: 10,
        },
      });

      setProducts(data.products);
      setPages(data.pages);
      setLoading(false);
      //also have the page and the total products in the query
    } catch (err) {
      console.error("Fetch products error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect( () => {
    fetchProducts();
  }, [search, minPrice, maxPrice, category, page]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
        {/* <Navbar></Navbar> */}
        <main className=""></main>
    </div>
  );
};

export default Products;
