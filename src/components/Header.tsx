import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import kienHungLogo from "@/assets/kien-hung-logo.jpg";

const navItems = [
  { label: "Trang chủ", to: "/" },
  { label: "Giới thiệu", to: "/gioi-thieu" },
  { label: "Lĩnh vực hoạt động", to: "/linh-vuc-hoat-dong" },
  { label: "Tin tức", to: "/tin-tuc" },
  { label: "Liên hệ", to: "/lien-he" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Top Bar */}
      <div className="bg-navy text-primary-foreground py-2 hidden md:block">
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:0903103198" className="flex items-center gap-2 hover:text-gold transition-colors">
              <Phone className="w-4 h-4" />
              <span>Hotline: 0903 103 198</span>
            </a>
            <a href="mailto:contact@kienhunginvest.vn" className="flex items-center gap-2 hover:text-gold transition-colors">
              <Mail className="w-4 h-4" />
              <span>contact@kienhunginvest.vn</span>
            </a>
          </div>
          <div className="text-primary-foreground/80">
            KIẾN HƯNG INVESTMENT
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-background/98 backdrop-blur-md border-b border-border shadow-soft">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gold/40 shadow-[0_10px_24px_rgba(15,23,42,0.18)]">
                <img 
                  src={kienHungLogo} 
                  alt="Kiến Hưng Investment Logo" 
                  className="w-full h-full object-cover object-top scale-125"
                />
              </div>
              <div className="hidden sm:block">
                <div className="font-heading text-lg font-bold text-navy leading-tight">
                  KIẾN HƯNG
                </div>
                <div className="text-xs text-muted-foreground tracking-wider">
                  INVESTMENT
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`relative px-3 py-2 rounded-full text-foreground transition-all font-body text-sm font-medium hover:bg-navy/5 hover:text-navy ${
                    location.pathname === item.to ? "text-navy bg-navy/5 shadow-inner" : ""
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {location.pathname === item.to && (
                    <span
                      className="absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-gold shadow-[0_0_0_4px_rgba(255,193,7,0.2)]"
                      aria-hidden
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Link to="/lien-he">
                <Button variant="default" size="sm">
                  Liên hệ tư vấn
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-background border-t border-border"
            >
              <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="py-3 text-foreground font-body border-b border-border last:border-0"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-3 mt-4">
                  <Link to="/lien-he" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="default" className="w-full">
                      Liên hệ tư vấn
                    </Button>
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
