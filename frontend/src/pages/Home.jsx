import React from "react";
import Navbar from "@/pages/Navbar";
import Hero from "@/pages/Hero";
import TrendingSection from "@/pages/TrendingSection";

function Home() {
  return (
    <>
<div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar/>
      <main>
        {/* The Hero component you just converted */}
        <Hero />

        {/* Featured Products/Section */}
        <TrendingSection/>

        {/* Simple Footer Section */}
        <footer className="bg-foreground text-background py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Branding Logo */}
              <div className="font-display font-bold text-2xl tracking-tighter flex items-center gap-2">
                <span className="bg-primary text-primary-foreground w-8 h-8 rounded-lg flex items-center justify-center text-lg">
                  L
                </span>
                NuraSkin
              </div>

              <p className="text-muted-foreground text-sm">
                © {new Date().getFullYear()} NuraSkin Inc. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
    </>
    
  );
}

export default Home;
