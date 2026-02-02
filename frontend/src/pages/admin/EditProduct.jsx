import { useState, useEffect } from "react";
import api from "@/axios/axios";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Textarea } from "@/components/ui/textarea";
import {
  Package,
  DollarSign,
  Layers,
  Hash,
  FileText,
  Image as ImageIcon,
  ArrowRight,
  Sparkles,
  Upload,
  X,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "0",
    description: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImage, setExistingImage] = useState([]);
  const [error, setError] = useState(null);

  //fetch the product

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      // Use the correct endpoint - adjust based on your API
      const { data } = await api.get(`/product/${id}`);
      const { name, price, stock, description, category } = data.product;
      //   console.log("DATA EDIT", data);
      setForm((prev) => ({
        name,
        price,
        stock,
        description,
        category,
      }));
      setExistingImage(data.images);

      //setExistingImage(data.image);
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleOnChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //fill in the form fields d
    setError("");

    // Validation
    if (
      !form.name ||
      !form.price ||
      !form.category ||
      !form.stock ||
      !form.description
    ) {
      setError("All fields are required");
      return;
    }

    if (parseFloat(form.price) <= 0) {
      setError("Price must be greater than 0");
      return;
    }

    if (parseInt(form.stock) < 0) {
      setError("Stock cannot be negative");
      return;
    }

    const formData = new FormData();

    if (image) {
      formData.append("images", image);
    }
    // formData.forEach((value, key) => {
    //   console.log(key, value);
    // });

    try {
      const url = `/product/${id}`;
      console.log("ID", id);
      setLoading(true);
      const { data } = await api.put(
        url,
        form,
        // headers: { "Content-Type": "multipart/form-data" },
      );
      console.log("Product edited:", data.product);

      await api.post(`/product/uploadimage/${id}`, formData);
      alert(data.message);
      navigate("/admin/products");
    } catch (error) {
      console.error("Add product error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-background">
      <main className="container w-full mx-auto px-4 py-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full bg/white/50 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-primary/10 shadow-2xl shadow-primay/5"
        >
          {/* text div  */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 mb-6 rounded-full">
              <Sparkles className="w-8 h-8 text-primary"></Sparkles>
            </div>
            <h2 className="text-foreground mb-3 font-bold font-display text-2xl">
              Edit Product
            </h2>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* grouping input and label together  */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-destructive/10 border border-destructive/20 rounded-2xl text-destructive text-sm"
              >
                {error}
              </motion.div>
            )}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1"
              >
                Product Name
              </Label>
              <Input
                className="h-12 bg-white/80 border-primary/10 rounded-2xl focus:ring-primary/20 transition-all text-sm"
                id="name"
                name="name"
                value={form.name}
                placeholder="Niacinamide Serum"
                onChange={handleOnChange}
                required
              ></Input>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="price"
                className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1"
              >
                Price
              </Label>
              <Input
                className="h-12 bg-white/80 border-primary/10 rounded-2xl focus:ring-primary/20 transition-all text-sm"
                id="price"
                name="price"
                type="number"
                value={form.price}
                onChange={handleOnChange}
                required
              ></Input>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="stock"
                className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1"
              >
                Stock
              </Label>
              <Input
                className="h-12 bg-white/80 border-primary/10 rounded-2xl focus:ring-primary/20 transition-all text-sm"
                id="stock"
                name="stock"
                type="number"
                value={form.stock}
                onChange={handleOnChange}
                required
              ></Input>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="category"
                className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1"
              >
                Category
              </Label>
              <Select
                value={form.category}
                onValueChange={(value) => setForm({ ...form, category: value })}
                name="category"
                id="category"
                required
              >
                <SelectTrigger className="h-14 bg-white/80 border-primary/10 rounded-2xl focus:ring-primary/20 transition-all text-sm">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-white border-primary/10 rounded-2xl">
                  <SelectItem value="serum">Serums</SelectItem>
                  <SelectItem value="moisturizer">Moisturizers</SelectItem>
                  <SelectItem value="cleanser">Cleansers</SelectItem>
                  <SelectItem value="toner">Toners & Essences</SelectItem>
                  <SelectItem value="sunscreen">Sunscreens</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1"
              >
                Product Description
              </Label>
              <Textarea
                id="description"
                placeholder="Describe the botanical ingredients, benefits, and ritual..."
                value={form.description}
                onChange={handleOnChange}
                name="description"
                rows={5}
                className="pt-4 bg-white/80 border-primary/10 rounded-2xl focus:ring-primary/20 transition-all text-sm resize-none"
                required
              />
            </div>
            <div className="space-y-2">
              {!imagePreview ? (
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center h-48 bg-white/80 border-2 border-dashed border-primary/20 rounded-2xl cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all"
                >
                  <Upload className="w-10 h-10 text-primary/40 mb-3" />
                  <span className="text-sm font-medium text-muted-foreground mb-1">
                    Click to upload image
                  </span>
                  <span className="text-xs text-muted-foreground/70">
                    PNG, JPG up to 5MB
                  </span>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="relative h-64 bg-white/80 border border-primary/10 rounded-2xl overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-destructive/10 hover:text-destructive transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-base shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] mt-8 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                  />
                  Adding Product...
                </>
              ) : (
                <>
                  Add to Collection
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/products")}
              className="w-full h-12 rounded-full border-primary/50 hover:bg-primary/5 text-foreground font-medium transition-all"
            >
              Cancel
            </Button>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default EditProduct;
