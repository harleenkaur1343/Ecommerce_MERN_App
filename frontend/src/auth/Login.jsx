import api from "../axios/axios.js";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";

import { useAuth } from "@/context/AuthContext.jsx";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Invalid email");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      console.log("Inside login handler");

      const res = await api.post("/auth/login", form);

      login(res);

      alert(res.data.message);
      navigate("/products");

      //   console.log("Login", res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      console.log("Login err", err);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/products");
    }
  }, [user]);

  
  return (
    <div className="min-h-screen bg-background">
      {/* <Navbar /> */}

      <main className="container mx-auto px-4 py-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white/50 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-primary/10 shadow-2xl shadow-primary/5"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-3">
              Begin Your Ritual
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Login to your account to access exclusive botanical insights.
            </p>
          </div>

          <form onSubmit={handleOnSubmit} className="space-y-6">
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
                htmlFor="email"
                className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1"
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  placeholder="hello@nuraskin.com"
                  onChange={handleOnChange}
                  className="h-14 pl-12 bg-white/80 border-primary/10 rounded-2xl focus:ring-primary/20 transition-all text-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1"
              >
                Enter Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  placeholder="Min. 8 characters"
                  onChange={handleOnChange}
                  className="h-14 pl-12 bg-white/80 border-primary/10 rounded-2xl focus:ring-primary/20 transition-all text-sm"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-14 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-base shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] mt-4"
            >
              Login
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </form>

          <p className="text-center mt-8 text-sm text-muted-foreground">
            Visiting first time?{" "}
            <Link
              to="/register"
              className="text-primary font-bold hover:underline transition-all underline-offset-4"
            >
              Sign Up
            </Link>
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default Login;
