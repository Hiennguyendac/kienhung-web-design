import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Trang chủ", href: "#" },
  { label: "Giới thiệu", href: "#about" },
  { label: "Lĩnh vực hoạt động", href: "#services" },
  { label: "Tin tức", href: "#news" },
  { label: "Liên hệ", href: "#contact" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-navy text-primary-foreground py-2 hidden md:block">
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:0123456789" className="flex items-center gap-2 hover:text-gold transition-colors">
              <Phone className="w-4 h-4" />
              <span>Hotline: 0123 456 789</span>
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
            <a href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-navy rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-xl">KH</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-heading text-lg font-bold text-navy leading-tight">
                  KIẾN HƯNG
                </div>
                <div className="text-xs text-muted-foreground tracking-wider">
                  INVESTMENT
                </div>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-foreground hover:text-navy transition-colors font-body text-sm font-medium"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Button variant="default" size="sm">
                Liên hệ tư vấn
              </Button>
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
                  <a
                    key={item.label}
                    href={item.href}
                    className="py-3 text-foreground font-body border-b border-border last:border-0"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="flex flex-col gap-3 mt-4">
                  <Button variant="default" className="w-full">
                    Liên hệ tư vấn
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
