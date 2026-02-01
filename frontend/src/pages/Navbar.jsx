import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, User, Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const isAdmin = user?.role === "ADMIN";
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/products" },
    isAdmin && { name: "Dashboard", href: "/admin" },
    !user && { name: "Log In", href: "/login" },
    !user && { name: "Sign Up", href: "/register" },
  ].filter(Boolean);
  // (5) [{…}, {…}, {…}, false, false]

  console.log("Navlinks", navLinks);

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-primary/5 shadow-md shadow-primary/5">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        <Link
          to="/"
          className="font-display font-bold text-2xl tracking-tighter text-foreground flex items-center gap-2 group cursor-pointer hover:text-primary/80"
        >
          <Sparkle className="w-6 h-6 text-primary group-hover:rotate-12 transition-transform" />
          Nura Skin
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "text-xs font-bold uppercase tracking-[0.2em] transition-colors hover:text-primary cursor-pointer",
                location.pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground/80",
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* <button className="p-2.5 hover:bg-primary/5 rounded-full transition-colors text-foreground/80 cursor-pointer">
            <Search className="w-5 h-5" />
          </button> */}

          <button className="p-2.5 hover:bg-primary/5 rounded-full transition-colors text-foreground/80 cursor-pointer">
            <User className="w-5 h-5" />
          </button>

          <button className="p-2.5 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-all relative cursor-pointer shadow-lg shadow-primary/20">
            <ShoppingBag className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-foreground text-background text-[9px] flex items-center justify-center rounded-full font-black">
              2
            </span>
          </button>

          <button
            className="md:hidden p-2.5 hover:bg-primary/5 rounded-full text-foreground/80 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-border p-6 bg-background animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-bold uppercase tracking-widest text-foreground hover:text-primary cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
export default Navbar;
