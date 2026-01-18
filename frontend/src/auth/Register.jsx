import api from "../axios/axios.js";
import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
//import { Navbar } from "@/components/layout/Navbar";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setErrors] = useState(null);

  const handleOnChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log("Updated form", form);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("Registering user:", form);
  };
  return (
    // <form>
    //   <h2>Register</h2>
    //   <input
    //     name="name"
    //     value={form.name}
    //     placeholder="Your Name"
    //     onChange={handleOnChange}
    //   ></input>
    //   <input
    //     name="email"
    //     value={form.email}
    //     placeholder="Email"
    //     onChange={handleOnChange}
    //   ></input>
    //   <input
    //     name="password"
    //     value={form.password}
    //     placeholder="Password"
    //     onChange={handleOnChange}
    //   ></input>
    // </form>
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
              Create an account to save your skin profile and access exclusive
              botanical insights.
            </p>
          </div>

          <form onSubmit={handleOnSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1"
              >
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  placeholder="E.g. Selene Waters"
                  onChange={handleOnChange}
                  className="h-14 pl-12 bg-white/80 border-primary/10 rounded-2xl focus:ring-primary/20 transition-all text-sm"
                  required
                />
              </div>
            </div>

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
                Create Password
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
              Start My Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </form>

          <p className="text-center mt-8 text-sm text-muted-foreground">
            Already a member?{" "}
            <a
              href="#"
              className="text-primary font-bold hover:underline transition-all underline-offset-4"
            >
              Sign In
            </a>
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default Register;
