import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Building2, GraduationCap, Megaphone, Monitor, Shield, ShoppingCart, Truck } from "lucide-react";
import { CursorGlow, MagneticButton, SectionReveal, StatCounter } from "@/components/effects";

const highlights = [
  { icon: Building2, text: "Doanh nghiệp uy tín" },
  { icon: Shield, text: "Hoạt động minh bạch" },
  { icon: Award, text: "Đối tác tin cậy" },
];

const sectors = [
  { icon: ShoppingCart, name: "Thương mại", value: 28, color: "hsl(var(--gold))" },
  { icon: Monitor, name: "Công nghệ thông tin", value: 22, color: "hsl(var(--navy-light))" },
  { icon: Megaphone, name: "Quảng cáo", value: 18, color: "hsl(200 70% 58%)" },
  { icon: Truck, name: "Logistics", value: 17, color: "hsl(160 45% 46%)" },
  { icon: GraduationCap, name: "Giáo dục", value: 15, color: "hsl(265 38% 58%)" },
];

const tickerItems = ["Thương mại", "Công nghệ thông tin", "Quảng cáo", "Logistics", "Giáo dục đào tạo"];

const stats = [
  { value: 5, suffix: "+", label: "Lĩnh vực" },
  { value: 30, suffix: "+", label: "Dự án" },
  { value: 50, suffix: "+", label: "Đối tác" },
];

const donutGradient = `conic-gradient(
  ${sectors[0].color} 0deg 101deg,
  ${sectors[1].color} 101deg 180deg,
  ${sectors[2].color} 180deg 245deg,
  ${sectors[3].color} 245deg 306deg,
  ${sectors[4].color} 306deg 360deg
)`;

export const HeroSection = () => {
  return (
    <section className="relative flex min-h-[calc(100vh-117px)] flex-col overflow-hidden bg-hero pb-2">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsla(45_80%_55%_/_0.18),transparent_36%),linear-gradient(180deg,hsla(210_80%_15%_/_0.28),hsla(210_80%_8%_/_0.72))]" />
      <div className="absolute left-[8%] top-20 h-56 w-56 rounded-full bg-gold/20 blur-3xl animate-blob motion-reduce:animate-none" />
      <div className="absolute bottom-14 right-[10%] h-64 w-64 rounded-full bg-sky-400/20 blur-3xl animate-blob [animation-delay:2.5s] motion-reduce:animate-none" />

      <div className="relative z-10 flex flex-1 items-center">
        <div className="container mx-auto px-6 py-6 lg:px-12 lg:py-8">
        <div className="grid items-center gap-7 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
          <div className="max-w-3xl">
            <SectionReveal delay={0.05}>
              <p className="mb-3 font-mono text-sm font-semibold uppercase tracking-normal text-gold">
                Công ty TNHH Thương mại Dịch vụ Đầu tư
              </p>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl">
                KIẾN HƯNG
                <span className="block text-gold">INVESTMENT</span>
              </h1>
            </SectionReveal>

            <SectionReveal delay={0.25}>
              <p className="mb-5 max-w-2xl font-body text-lg leading-snug text-primary-foreground/85 md:text-xl">
                Đối tác đáng tin cậy trong thương mại, công nghệ thông tin, quảng cáo, logistics và giáo dục đào tạo.
                Chúng tôi tập trung tạo giá trị bền vững cho khách hàng và đối tác.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.35} className="mb-5 flex flex-wrap gap-x-6 gap-y-2">
              {highlights.map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-primary-foreground/80">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/20">
                    <item.icon className="h-4 w-4 text-gold" />
                  </div>
                  <span className="font-body text-sm">{item.text}</span>
                </div>
              ))}
            </SectionReveal>

            <SectionReveal delay={0.45} className="flex flex-col gap-2.5 sm:flex-row">
              <MagneticButton
                href="/gioi-thieu"
                className="group bg-gold px-9 py-3.5 text-lg font-semibold text-navy-dark shadow-gold hover:bg-gold-light"
              >
                Tìm hiểu thêm
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </MagneticButton>
              <Button variant="hero" size="xl" asChild>
                <Link to="/lien-he">Liên hệ hợp tác</Link>
              </Button>
            </SectionReveal>

            <SectionReveal delay={0.55} className="mt-6 grid grid-cols-3 overflow-hidden rounded-lg border border-primary-foreground/15 bg-primary-foreground/[0.08] px-2 py-2.5 backdrop-blur-md md:max-w-2xl">
              {stats.map((stat, index) => (
                <div key={stat.label} className={index === 0 ? "px-4" : "border-l border-primary-foreground/20 px-4"}>
                  <StatCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    label={stat.label}
                    className="[&>div:first-child]:text-primary-foreground [&>div:last-child]:text-primary-foreground/65"
                  />
                </div>
              ))}
            </SectionReveal>
          </div>

          <SectionReveal delay={0.3}>
            <CursorGlow className="border border-primary-foreground/18 bg-primary-foreground/[0.1] p-3 shadow-2xl shadow-navy-dark/30 backdrop-blur-2xl md:p-4">
              <div className="relative overflow-hidden rounded-lg border border-primary-foreground/15 bg-navy-dark/45 p-4">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs font-semibold uppercase tracking-normal text-gold">Tỉ trọng hoạt động</p>
                    <h2 className="mt-2 font-display text-2xl font-bold text-primary-foreground md:text-3xl">
                      Năm lĩnh vực trọng tâm
                    </h2>
                  </div>
                  <div className="rounded-md border border-gold/25 bg-gold/10 px-3 py-2 font-mono text-xs font-semibold text-gold">
                    2026
                  </div>
                </div>

                <div className="grid items-center gap-5 md:grid-cols-[0.88fr_1.12fr]">
                  <div className="relative mx-auto aspect-square w-full max-w-[200px] rounded-full p-3" style={{ background: donutGradient }}>
                    <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-primary-foreground/10 bg-navy-dark/95 text-center shadow-inner">
                      <span className="font-mono text-4xl font-bold text-primary-foreground">5</span>
                      <span className="mt-1 max-w-28 text-sm text-primary-foreground/70">lĩnh vực hoạt động</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    {sectors.map((sector) => (
                      <div key={sector.name} className="flex items-center gap-3 rounded-md border border-primary-foreground/10 bg-primary-foreground/[0.06] px-3 py-1">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary-foreground/10">
                          <sector.icon className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-primary-foreground">{sector.name}</p>
                          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-primary-foreground/10">
                            <div className="h-full rounded-full" style={{ width: `${sector.value}%`, backgroundColor: sector.color }} />
                          </div>
                        </div>
                        <span className="font-mono text-sm font-semibold text-primary-foreground">{sector.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CursorGlow>
          </SectionReveal>
        </div>
        </div>
      </div>

      <div className="relative z-10 flex h-11 max-h-12 items-center border-y border-primary-foreground/10 bg-navy-dark/45 backdrop-blur-xl">
        <div className="flex overflow-hidden">
          <div className="flex min-w-full shrink-0 animate-marquee items-center gap-8 pr-8 motion-reduce:animate-none">
            {[...tickerItems, ...tickerItems].map((item, index) => (
              <div key={`${item}-${index}`} className="flex items-center gap-8">
                <span className="whitespace-nowrap font-mono text-sm font-semibold uppercase tracking-normal text-primary-foreground/80">
                  {item}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              </div>
            ))}
          </div>
          <div className="flex min-w-full shrink-0 animate-marquee items-center gap-8 pr-8 motion-reduce:animate-none" aria-hidden="true">
            {[...tickerItems, ...tickerItems].map((item, index) => (
              <div key={`${item}-copy-${index}`} className="flex items-center gap-8">
                <span className="whitespace-nowrap font-mono text-sm font-semibold uppercase tracking-normal text-primary-foreground/80">
                  {item}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
