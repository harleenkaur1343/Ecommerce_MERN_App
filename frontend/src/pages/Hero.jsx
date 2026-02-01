import React from "react";
import { ArrowRight, Leaf, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroImage from '../../assets/images/premium_organic_facial_serum_bottle.png';

function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-8 pb-10 md:pt-16 md:pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6 z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary w-fit border border-primary/20">
              <Leaf className="w-3 h-3" />
              <span className="text-[10px] font-bold tracking-widest uppercase">100% Organic & Vegan</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-foreground">
              Pure Glow, <br/>
              <span className="italic font-serif font-light text-primary">
                Nature's Soul.
              </span>
            </h1>
            
            <p className="text-muted-foreground text-lg md:text-xl max-w-[500px] leading-relaxed">
              Experience the transformative power of botanical extracts. Our minimalist formulas respect your skin's natural balance.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
              <Button size="lg" className="rounded-full px-10 h-14 text-base font-semibold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all hover:scale-105">
                Discover the Collection
              </Button>
              <Button variant="link" size="lg" className="h-14 text-foreground font-semibold group">
                Our Rituals <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="flex items-center gap-10 mt-8 border-t border-border pt-8">
              <div className="flex flex-col gap-1">
                <span className="font-display font-bold text-2xl">25k+</span>
                <span className="text-xs text-muted-foreground uppercase tracking-widest">Happy Skins</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-display font-bold text-2xl">4.9/5</span>
                <span className="text-xs text-muted-foreground uppercase tracking-widest">Average Rating</span>
              </div>
            </div>
          </motion.div>

          {/* Visual/Image Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative lg:h-[700px] flex items-center justify-center"
          >
            {/* Soft Organic Background Blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 blur-[100px] rounded-full" />
            
            <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
              <div className="relative group">
                <img 
                  src={heroImage} 
                  alt="Organic Serum Bottle" 
                  className="w-full max-w-[550px] object-contain drop-shadow-3xl transition-transform duration-1000 group-hover:scale-105"
                />
                
                {/* Floating Micro-Badge Animation */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/4 -right-4 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-primary/10 flex items-center gap-3"
                >
                  <div className="bg-primary/20 p-2 rounded-full">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">Bestseller</p>
                    <p className="text-sm font-bold">Deep Hydration</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}

export default Hero;