import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Handshake, Megaphone, Monitor, ShoppingCart, Target, Truck } from "lucide-react";
import { Seo } from "@/components/Seo";
import { CursorGlow, SectionReveal } from "@/components/effects";

const highlights = [
  {
    icon: Handshake,
    title: "Hợp tác linh hoạt",
    description: "Tùy chỉnh mô hình hợp tác, cung cấp dịch vụ trọn gói hoặc theo nhu cầu.",
  },
  {
    icon: Target,
    title: "Tập trung kết quả",
    description: "Cam kết hiệu quả, đo lường được và tối ưu chi phí cho khách hàng.",
  },
];

const serviceAreas = [
  {
    icon: ShoppingCart,
    title: "Thương mại & Phân phối",
    description: "Phân phối hàng hóa, kết nối nguồn cung và xây dựng kênh bán hàng B2B.",
    to: "/dich-vu/thuong-mai-phan-phoi",
    className: "lg:col-span-2 lg:row-span-2",
  },
  {
    icon: Monitor,
    title: "Công nghệ thông tin",
    description: "Giải pháp phần mềm, tự động hóa và tư vấn chuyển đổi số.",
    to: "/dich-vu/cong-nghe-thong-tin",
    className: "lg:col-span-1",
  },
  {
    icon: Megaphone,
    title: "Quảng cáo & Marketing",
    description: "Nghiên cứu thị trường, truyền thông và tăng trưởng khách hàng.",
    to: "/dich-vu/quang-cao-marketing",
    className: "lg:col-span-1",
  },
  {
    icon: Truck,
    title: "Logistics & Cho thuê xe",
    description: "Tối ưu vận chuyển, vận hành đội xe và hỗ trợ tuyến giao hàng.",
    to: "/dich-vu/logistics-cho-thue-xe",
    className: "lg:col-span-1",
  },
  {
    icon: GraduationCap,
    title: "Giáo dục & Đào tạo",
    description: "Đào tạo kỹ năng, phát triển nhân lực và lộ trình học thực tế.",
    to: "/dich-vu/giao-duc-dao-tao",
    className: "lg:col-span-1",
  },
];

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Lĩnh vực hoạt động | Kiến Hưng Investment"
        description="Tổng quan các lĩnh vực hoạt động của Kiến Hưng Investment: thương mại & phân phối, CNTT, marketing, logistics và giáo dục & đào tạo."
        keywords="đầu tư, thiết bị, thương mại, CNTT, marketing, logistics, đào tạo nghề, học AI"
        canonical="https://kienhunginvest.com/linh-vuc-hoat-dong"
        image="https://kienhunginvest.com/favicon.jpg"
      />
      <Header />
      <main>
        <section className="bg-secondary/50 border-b border-border">
          <div className="container mx-auto px-6 lg:px-12 py-14 lg:py-20">
            <p className="text-gold font-mono text-sm font-semibold tracking-normal uppercase mb-3">
              Lĩnh vực hoạt động
            </p>
            <div className="grid lg:grid-cols-[2fr,1fr] gap-10 items-center">
              <SectionReveal>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Giải pháp đa ngành, tối ưu cho doanh nghiệp
                </h1>
                <p className="font-body text-lg text-muted-foreground leading-relaxed">
                  Kiến Hưng Investment cung cấp danh mục dịch vụ toàn diện từ thương mại,
                  công nghệ đến marketing và logistics, giúp doanh nghiệp vận hành hiệu quả
                  và mở rộng thị trường.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <Button variant="default" size="lg" className="group" asChild>
                    <Link to="/lien-he">
                      Nhận tư vấn
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/gioi-thieu">Xem hồ sơ năng lực</Link>
                  </Button>
                </div>
              </SectionReveal>
              <div className="grid gap-4">
                {highlights.map((item, index) => (
                  <SectionReveal
                    key={item.title}
                    delay={index * 0.08}
                    className="p-5 rounded-xl bg-card border border-border shadow-soft flex gap-3"
                  >
                    <div className="w-11 h-11 rounded-lg bg-navy/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-navy" />
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-semibold text-foreground mb-1">
                        {item.title}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <SectionReveal className="max-w-3xl mb-10">
              <p className="text-gold font-mono text-sm font-semibold uppercase tracking-normal mb-3">Danh mục dịch vụ</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Lưới bento theo trọng tâm triển khai
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Các lĩnh vực được sắp xếp theo vai trò trong chuỗi giá trị, giúp khách hàng nhìn nhanh đâu là năng lực chủ lực và đâu là nhóm hỗ trợ mở rộng.
              </p>
            </SectionReveal>

            <div className="grid auto-rows-[minmax(210px,auto)] gap-5 lg:grid-cols-4">
              {serviceAreas.map((service, index) => {
                const isPrimary = index === 0;
                const content = (
                  <Link
                    to={service.to}
                    className={`group relative flex h-full min-h-[210px] flex-col justify-between overflow-hidden rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated ${
                      isPrimary
                        ? "border-primary-foreground/15 bg-hero text-primary-foreground"
                        : "border-border bg-card text-foreground"
                    } ${service.className}`}
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-gold" />
                    <div>
                      <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-lg ${isPrimary ? "bg-gold/20" : "bg-navy/10"}`}>
                        <service.icon className={`h-6 w-6 ${isPrimary ? "text-gold" : "text-navy"}`} />
                      </div>
                      <h3 className={`font-display text-2xl font-bold ${isPrimary ? "text-primary-foreground" : "text-foreground"}`}>
                        {service.title}
                      </h3>
                      <p className={`mt-3 max-w-lg leading-relaxed ${isPrimary ? "text-primary-foreground/78" : "text-muted-foreground"}`}>
                        {service.description}
                      </p>
                    </div>
                    <span className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${isPrimary ? "text-gold" : "text-navy"}`}>
                      Xem chi tiết
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                );

                return (
                  <SectionReveal key={service.title} delay={index * 0.06} className={service.className}>
                    {isPrimary ? <CursorGlow className="h-full">{content}</CursorGlow> : content}
                  </SectionReveal>
                );
              })}
            </div>
          </div>
        </section>

        <SectionReveal>
          <ContactSection />
        </SectionReveal>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
