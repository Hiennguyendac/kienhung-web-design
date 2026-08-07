import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronDown, HelpCircle, Menu, X, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import kienHungLogo from "@/assets/kien-hung-logo.jpg";
import kienHungLogoWebp from "@/assets/kien-hung-logo.webp";
import { trackCtaClick } from "@/lib/analytics";

const navItems = [
  { label: "Trang chủ", to: "/" },
  { label: "Giới thiệu", to: "/gioi-thieu" },
  { label: "Lĩnh vực hoạt động", to: "/linh-vuc-hoat-dong" },
  { label: "Case study", to: "/case-studies" },
  { label: "Tin tức", to: "/tin-tuc" },
  { label: "Liên hệ", to: "/lien-he" },
];

const resourceItems = [
  { label: "Beacon", description: "Công cụ AI hỗ trợ doanh nghiệp", to: "/san-pham/beacon", icon: BookOpen },
  { label: "Hỏi đáp", description: "Giải đáp thắc mắc thường gặp", to: "/hoi-dap", icon: HelpCircle },
];

const normalizePath = (path: string) => path.replace(/\/$/, "") || "/";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const location = useLocation();
  const isResourceActive = resourceItems.some((item) => normalizePath(location.pathname) === normalizePath(item.to));

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setIsResourcesOpen(false);
  };

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
            <a href="mailto:contact@kienhunginvest.com" className="flex items-center gap-2 hover:text-gold transition-colors">
              <Mail className="w-4 h-4" />
              <span>contact@kienhunginvest.com</span>
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
                <picture className="block h-full w-full">
                  <source srcSet={kienHungLogoWebp} type="image/webp" />
                  <img
                    src={kienHungLogo}
                    alt="Kiến Hưng Investment Logo"
                    width={1078}
                    height={1280}
                    crossOrigin="anonymous"
                    decoding="async"
                    className="w-full h-full object-cover object-top scale-125"
                  />
                </picture>
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
            <nav className="hidden lg:flex items-center gap-3 xl:gap-4 whitespace-nowrap">
              {navItems.slice(0, 5).map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`relative px-2 py-2 rounded-full text-foreground transition-all font-body text-sm font-medium hover:bg-navy/5 hover:text-navy ${
                    normalizePath(location.pathname) === normalizePath(item.to) ? "text-navy bg-navy/5 shadow-inner" : ""
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {normalizePath(location.pathname) === normalizePath(item.to) && (
                    <span
                      className="absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-gold shadow-[0_0_0_4px_rgba(255,193,7,0.2)]"
                      aria-hidden
                    />
                  )}
                </Link>
              ))}

              <DropdownMenu>
                <DropdownMenuTrigger
                  className={`relative inline-flex items-center gap-1 rounded-full px-2 py-2 font-body text-sm font-medium text-foreground outline-none transition-all hover:bg-navy/5 hover:text-navy data-[state=open]:bg-navy/5 ${
                    isResourceActive ? "bg-navy/5 text-navy shadow-inner" : ""
                  }`}
                >
                  Tài nguyên
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
                  {isResourceActive && (
                    <span
                      className="absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-gold shadow-[0_0_0_4px_rgba(255,193,7,0.2)]"
                      aria-hidden
                    />
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 p-2">
                  {resourceItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem key={item.to} asChild className="p-0 focus:bg-transparent">
                        <Link
                          to={item.to}
                          className="flex items-start gap-3 rounded-md p-3 hover:bg-navy/5"
                        >
                          <Icon className="mt-0.5 h-5 w-5 shrink-0 text-navy" aria-hidden="true" />
                          <span className="min-w-0">
                            <span className="block font-heading text-sm font-semibold text-foreground">{item.label}</span>
                            <span className="mt-0.5 block whitespace-normal font-body text-xs leading-relaxed text-muted-foreground">
                              {item.description}
                            </span>
                          </span>
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>

              {navItems.slice(5).map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`relative px-2 py-2 rounded-full text-foreground transition-all font-body text-sm font-medium hover:bg-navy/5 hover:text-navy ${
                    normalizePath(location.pathname) === normalizePath(item.to) ? "text-navy bg-navy/5 shadow-inner" : ""
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {normalizePath(location.pathname) === normalizePath(item.to) && (
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
              <Link to="/dat-lich-hen" onClick={() => trackCtaClick("Đặt lịch hẹn")}>
                <Button variant="outline" size="sm">
                  Đặt lịch hẹn
                </Button>
              </Link>
              <Link to="/lien-he" onClick={() => trackCtaClick("Liên hệ tư vấn")}>
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
              <nav className="container mx-auto flex flex-col gap-4 px-6 py-6">
                {navItems.slice(0, 5).map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="py-3 text-foreground font-body border-b border-border last:border-0"
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="border-b border-border">
                  <button
                    type="button"
                    className={`flex w-full items-center justify-between py-3 text-left font-body text-foreground ${isResourceActive ? "text-navy" : ""}`}
                    aria-expanded={isResourcesOpen}
                    onClick={() => setIsResourcesOpen((open) => !open)}
                  >
                    <span>Tài nguyên</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${isResourcesOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isResourcesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-2 pb-3 pl-3">
                          {resourceItems.map((item) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={item.to}
                                to={item.to}
                                className="flex items-start gap-3 rounded-md px-2 py-2 hover:bg-navy/5"
                                onClick={closeMobileMenu}
                              >
                                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-navy" aria-hidden="true" />
                                <span>
                                  <span className="block font-heading text-sm font-semibold text-foreground">{item.label}</span>
                                  <span className="block font-body text-xs text-muted-foreground">{item.description}</span>
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {navItems.slice(5).map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="py-3 text-foreground font-body border-b border-border"
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-3 mt-4">
                  <Link to="/dat-lich-hen" onClick={() => { closeMobileMenu(); trackCtaClick("Đặt lịch hẹn"); }}>
                    <Button variant="outline" className="w-full">
                      Đặt lịch hẹn
                    </Button>
                  </Link>
                  <Link to="/lien-he" onClick={() => { closeMobileMenu(); trackCtaClick("Liên hệ tư vấn"); }}>
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
