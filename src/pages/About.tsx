import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AboutSection } from "@/components/AboutSection";
import { LegalSection } from "@/components/LegalSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ShieldCheck, Sparkles, Users2 } from "lucide-react";

const stats = [
  { icon: ShieldCheck, label: "Lĩnh vực thế mạnh", value: "5+" },
  { icon: Sparkles, label: "Dự án đã triển khai", value: "30+" },
  { icon: Users2, label: "Đối tác tin cậy", value: "50+" },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative overflow-hidden bg-navy text-primary-foreground">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,193,7,0.15),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.08),transparent_30%)]" />
          <div className="container relative mx-auto px-6 lg:px-12 py-16 lg:py-24">
            <p className="text-gold font-body text-sm tracking-widest uppercase mb-3">
              Giới thiệu
            </p>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5">
              Kiến Hưng Investment
            </h1>
            <p className="font-body text-lg text-primary-foreground/80 max-w-3xl leading-relaxed">
              Đối tác đồng hành của doanh nghiệp Việt trong thương mại, công nghệ,
              quảng cáo, logistics và đào tạo. Chúng tôi phát triển bền vững dựa
              trên uy tín, minh bạch và tinh thần hợp tác lâu dài.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 md:gap-6 mt-10">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="p-5 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 flex items-center gap-3"
                >
                  <div className="w-11 h-11 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <div className="font-heading text-2xl font-semibold">{item.value}</div>
                    <p className="font-body text-sm text-primary-foreground/70">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <AboutSection />
        <ServicesSection />
        <LegalSection />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
