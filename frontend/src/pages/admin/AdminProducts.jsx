import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Package,
  DollarSign,
  Image as ImageIcon,
  AlertCircle,
} from "lucide-react";
import api from "@/axios/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const AdminProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    product: null,
  });
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/product/products", {
        params: {
          limit: 1000, // Get all products for admin panel
        },
      });
      // Handle both data.products (paginated) and data (direct array)
      const productList = data.products || data;
      setProducts(productList);
      setFilteredProducts(productList);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteDialog.product) return;

    try {
      setDeleting(true);
      await api.delete(`/product/${deleteDialog.product._id}`);
      setProducts(products.filter((p) => p._id !== deleteDialog.product._id));
      setDeleteDialog({ open: false, product: null });
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setDeleting(false);
    }
  };

  const getCategoryBadgeColor = (category) => {
    const colors = {
      serum: "bg-purple-100 text-purple-700 border-purple-200",
      moisturizer: "bg-blue-100 text-blue-700 border-blue-200",
      cleanser: "bg-green-100 text-green-700 border-green-200",
      mask: "bg-pink-100 text-pink-700 border-pink-200",
      toner: "bg-amber-100 text-amber-700 border-amber-200",
      sunscreen: "bg-orange-100 text-orange-700 border-orange-200",
      eyecare: "bg-indigo-100 text-indigo-700 border-indigo-200",
      bodycare: "bg-rose-100 text-rose-700 border-rose-200",
    };
    return colors[category] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full"
        />
      </div>
    );
  }
console.log("Products",products)
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Product Collection
          </h1>
          <p className="text-muted-foreground">
            Manage your botanical skincare offerings
          </p>
        </div>
        <Button
          onClick={() => navigate("/admin/products/add")}
          className="h-12 px-6 rounded-full bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Search Bar */}
      <Card className="bg-white/50 backdrop-blur-xl border-primary/10 shadow-lg">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40" />
            <Input
              type="text"
              placeholder="Search products by name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 pl-12 bg-white/80 border-primary/10 rounded-2xl focus:ring-primary/20 transition-all"
            />
          </div>
        </CardContent>
      </Card>

      {/* Products Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white/50 backdrop-blur-xl border-primary/10 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold">
                  Total Products
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {products.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/50 backdrop-blur-xl border-primary/10 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold">
                  In Stock
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {products.filter((p) => p.stock > 0).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/50 backdrop-blur-xl border-primary/10 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold">
                  Out of Stock
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {products.filter((p) => p.stock === 0).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <Card className="bg-white/50 backdrop-blur-xl border-primary/10 shadow-lg">
          <CardContent className="p-12 text-center">
            <Package className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">
              {searchQuery
                ? "No products found matching your search"
                : "No products yet"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="bg-white/50 backdrop-blur-xl border-primary/10 shadow-lg hover:shadow-xl transition-all group">
                <CardContent className="p-6">
                  {/* Product Image */}
                  <div className="w-full h-48 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl mb-4 flex items-center justify-center overflow-hidden">
                    {product.images ? (
                      <img
                        src={product.images[0].url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <ImageIcon className="w-16 h-16 text-primary/30" />
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-1 line-clamp-1">
                        {product.name}
                      </h3>
                      <Badge
                        className={`${getCategoryBadgeColor(
                          product.category,
                        )} border font-medium text-xs`}
                      >
                        {product.category}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">
                          Price
                        </p>
                        <p className="text-xl font-bold text-primary">
                          Rs. {parseFloat(product.price).toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">
                          Stock
                        </p>
                        <p
                          className={`text-xl font-bold ${
                            product.stock === 0
                              ? "text-destructive"
                              : product.stock < 10
                                ? "text-amber-600"
                                : "text-green-600"
                          }`}
                        >
                          {product.stock}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-4">
                      <Button
                        onClick={() =>
                          navigate(`/admin/products/edit/${product._id}`)
                        }
                        variant="outline"
                        className="flex-1 h-10 rounded-full border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => setDeleteDialog({ open: true, product })}
                        variant="outline"
                        className="flex-1 h-10 rounded-full border-destructive/20 hover:bg-destructive/5 hover:border-destructive/40 text-destructive transition-all"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open, product: null })}
      >
        <DialogContent className="bg-white/95 backdrop-blur-xl border-primary/10 rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Delete Product
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Are you sure you want to delete "{deleteDialog.product?.name}"?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setDeleteDialog({ open: false, product: null })}
              className="rounded-full border-primary/20 hover:bg-primary/5"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={deleting}
              className="rounded-full bg-destructive hover:bg-destructive/90 text-white"
            >
              {deleting ? "Deleting..." : "Delete Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
