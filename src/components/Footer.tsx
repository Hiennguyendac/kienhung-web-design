import { Facebook, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  company: [
    { label: "Giới thiệu", href: "#about" },
    { label: "Lĩnh vực hoạt động", href: "#services" },
    { label: "Tin tức", href: "#news" },
    { label: "Tuyển dụng", href: "#" },
  ],
  services: [
    { label: "Thương mại & Phân phối", href: "#" },
    { label: "Công nghệ thông tin", href: "#" },
    { label: "Quảng cáo & Marketing", href: "#" },
    { label: "Vận tải & Logistics", href: "#" },
  ],
  legal: [
    { label: "Điều khoản sử dụng", href: "#" },
    { label: "Chính sách bảo mật", href: "#" },
    { label: "Quy định chung", href: "#" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export const Footer = () => {
  return (
    <footer className="bg-navy-dark text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center">
                <span className="text-navy-dark font-heading font-bold text-xl">KH</span>
              </div>
              <div>
                <div className="font-heading text-lg font-bold leading-tight">
                  KIẾN HƯNG
                </div>
                <div className="text-xs text-primary-foreground/60 tracking-wider">
                  INVESTMENT
                </div>
              </div>
            </a>
            <p className="font-body text-sm text-primary-foreground/70 mb-6 leading-relaxed">
              Công ty TNHH Thương mại Dịch vụ Đầu tư Kiến Hưng - Đối tác đáng tin cậy 
              của doanh nghiệp Việt Nam.
            </p>
            <div className="space-y-3">
              <a href="tel:0123456789" className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-gold transition-colors">
                <Phone className="w-4 h-4" />
                0123 456 789
              </a>
              <a href="mailto:contact@kienhunginvest.vn" className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-gold transition-colors">
                <Mail className="w-4 h-4" />
                contact@kienhunginvest.vn
              </a>
              <div className="flex items-start gap-3 text-sm text-primary-foreground/70">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Số XX, Đường XX, Quận XX, TP. Hồ Chí Minh</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-5 text-gold">
              Về công ty
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-5 text-gold">
              Lĩnh vực hoạt động
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-5 text-gold">
              Chính sách
            </h4>
            <ul className="space-y-3 mb-8">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <h4 className="font-heading text-sm font-semibold mb-4 text-gold">
              Kết nối với chúng tôi
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-gold hover:text-navy-dark transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="font-body text-xs text-primary-foreground/50">
              © {new Date().getFullYear()} CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ ĐẦU TƯ KIẾN HƯNG. Bản quyền đã được bảo hộ.
            </p>
            <p className="font-body text-xs text-primary-foreground/50">
              MST: XXXXXXXXXX | Giấy phép ĐKKD do Sở KH&ĐT cấp
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
