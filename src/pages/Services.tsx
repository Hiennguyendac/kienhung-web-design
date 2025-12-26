import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServicesSection } from "@/components/ServicesSection";
import { ContactSection } from "@/components/ContactSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Handshake, Target } from "lucide-react";

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

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="bg-secondary/50 border-b border-border">
          <div className="container mx-auto px-6 lg:px-12 py-14 lg:py-20">
            <p className="text-gold font-body text-sm tracking-widest uppercase mb-3">
              Lĩnh vực hoạt động
            </p>
            <div className="grid lg:grid-cols-[2fr,1fr] gap-10 items-center">
              <div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
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
              </div>
              <div className="grid gap-4">
                {highlights.map((item) => (
                  <div
                    key={item.title}
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
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
