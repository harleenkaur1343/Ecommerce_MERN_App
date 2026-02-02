import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, ArrowRight } from "lucide-react";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      await logout();
      //navigate("/login");
    };

    handleLogout();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <main className="container w-full lg:w-1/2 mx-auto px-4 py-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white/50 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-primary/10 shadow-2xl shadow-primary/5"
        >
          {/* <p className="text-muted-foreground text-sm leading-relaxed">
            You have been logged out. See you soon!
          </p>
           */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <LogOut className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-3">
              Until Next Time
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              You have been logged out successfully. Your skin ritual awaits
              your return.
            </p>
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline underline-offset-4 transition-all hover:font-bold hover:text-primary"
            >
              Go back to login
            </Link>
          </div>

        </motion.div>
      </main>
    </div>
  );
};

export default Logout;
