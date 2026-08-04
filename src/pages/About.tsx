import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AboutSection } from "@/components/AboutSection";
import { LegalSection } from "@/components/LegalSection";
import { ServicesSection } from "@/components/ServicesSection";
import { SEO } from "@/components/SEO";
import { SectionReveal, StatCounter } from "@/components/effects";
import { ShieldCheck, Sparkles, Users2 } from "lucide-react";

const stats = [
  { icon: ShieldCheck, label: "Lĩnh vực thế mạnh", value: 5, suffix: "+" },
  { icon: Sparkles, label: "Dự án đã triển khai", value: 30, suffix: "+" },
  { icon: Users2, label: "Đối tác tin cậy", value: 50, suffix: "+" },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Giới thiệu Kiến Hưng Investment và lĩnh vực uy tín"
        description="Tìm hiểu Kiến Hưng Investment, doanh nghiệp uy tín hoạt động trong thương mại, CNTT, quảng cáo, logistics và giáo dục với định hướng hợp tác bền vững."
        canonicalPath="/gioi-thieu"
        ogImage="/logo-512.png"
      />
      <Header />
      <main>
        <section className="relative overflow-hidden bg-navy text-primary-foreground">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,193,7,0.15),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.08),transparent_30%)]" />
          <div className="container relative mx-auto px-6 lg:px-12 py-16 lg:py-24">
            <SectionReveal>
              <p className="text-gold font-mono text-sm font-semibold tracking-normal uppercase mb-3">
                Giới thiệu
              </p>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-5">
                Kiến Hưng Investment
              </h1>
              <p className="font-body text-lg text-primary-foreground/80 max-w-3xl leading-relaxed">
                Đối tác đồng hành của doanh nghiệp Việt trong thương mại, công nghệ,
                quảng cáo, logistics và đào tạo. Chúng tôi phát triển bền vững dựa
                trên uy tín, minh bạch và tinh thần hợp tác lâu dài.
              </p>
            </SectionReveal>

            <div className="grid sm:grid-cols-3 gap-4 md:gap-6 mt-10">
              {stats.map((item, index) => (
                <SectionReveal
                  key={item.label}
                  delay={index * 0.08}
                  className="p-5 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 flex items-center gap-3"
                >
                  <div className="w-11 h-11 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-gold" />
                  </div>
                  <StatCounter
                    value={item.value}
                    suffix={item.suffix}
                    label={item.label}
                    className="[&>div:first-child]:text-primary-foreground [&>div:first-child]:text-2xl [&>div:last-child]:text-primary-foreground/70"
                  />
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        <SectionReveal>
          <AboutSection />
        </SectionReveal>
        <SectionReveal delay={0.08}>
          <ServicesSection />
        </SectionReveal>
        <SectionReveal delay={0.08}>
          <LegalSection />
        </SectionReveal>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
