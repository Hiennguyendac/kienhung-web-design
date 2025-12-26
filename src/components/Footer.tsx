import { Linkedin, Twitter, Youtube } from "lucide-react";

const footerLinks = {
  solutions: [
    { label: "Institutional", href: "#" },
    { label: "Intermediary", href: "#" },
    { label: "Individual Investors", href: "#" },
    { label: "Retirement", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Leadership", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Newsroom", href: "#" },
  ],
  resources: [
    { label: "Insights", href: "#" },
    { label: "Research", href: "#" },
    { label: "Events", href: "#" },
    { label: "Contact", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Use", href: "#" },
    { label: "Disclosures", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export const Footer = () => {
  return (
    <footer className="bg-navy-dark text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
            <a href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center">
                <span className="text-navy-dark font-heading font-bold text-xl">R</span>
              </div>
              <span className="font-heading text-xl font-semibold">
                Russell
              </span>
            </a>
            <p className="font-body text-sm text-primary-foreground/60 mb-6 max-w-xs">
              Helping investors achieve their financial goals since 1936.
            </p>
            <div className="flex gap-4">
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

          {/* Link Columns */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-4 text-gold">
              Solutions
            </h4>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold mb-4 text-gold">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold mb-4 text-gold">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold mb-4 text-gold">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="font-body text-xs text-primary-foreground/50">
              © {new Date().getFullYear()} Russell Investments. All rights reserved.
            </p>
            <p className="font-body text-xs text-primary-foreground/50 max-w-2xl">
              Investing involves risk, including possible loss of principal. Past performance is not indicative of future results.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
