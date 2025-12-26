import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-building.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Modern glass office building reflecting golden sunset over city skyline"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-hero opacity-80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-20">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gold font-body text-sm tracking-widest uppercase mb-6"
          >
            Global Investment Solutions
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-heading text-4xl md:text-5xl lg:text-7xl text-primary-foreground leading-tight mb-8"
          >
            Investing with purpose.{" "}
            <span className="italic text-gold-light">Outcomes</span> that matter.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-body text-lg md:text-xl text-primary-foreground/80 max-w-2xl mb-10 leading-relaxed"
          >
            For over 85 years, we've helped institutions and individuals achieve their 
            financial goals through innovative investment strategies and unwavering commitment 
            to fiduciary excellence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button variant="heroSolid" size="xl" className="group">
              Explore Solutions
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="hero" size="xl" className="group">
              <Play className="w-5 h-5" />
              Watch Our Story
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-primary-foreground/60 text-xs tracking-widest uppercase font-body">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 bg-gold rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};
