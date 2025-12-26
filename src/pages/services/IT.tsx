import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Code2, Cpu, Shield, Server, Workflow } from "lucide-react";
import heroImage from "@/assets/kien-hung-hero.jpg";

const offerings = [
  "Tư vấn chuyển đổi số, đánh giá hiện trạng hệ thống, lộ trình và ngân sách.",
  "Phát triển phần mềm web/mobile, tích hợp API và các nền tảng đám mây.",
  "Triển khai hạ tầng, bảo trì, giám sát hiệu năng và bảo mật.",
  "Đào tạo vận hành, chuyển giao tài liệu và hỗ trợ sau triển khai.",
];

const strengths = [
  { icon: Cpu, title: "Kiến trúc tối ưu", desc: "Thiết kế kiến trúc linh hoạt, dễ mở rộng, tối ưu chi phí vận hành." },
  { icon: Shield, title: "An toàn & tuân thủ", desc: "Thực hành bảo mật tốt, kiểm thử và sao lưu dữ liệu định kỳ." },
  { icon: Workflow, title: "Quy trình minh bạch", desc: "Quản lý dự án Agile, báo cáo tiến độ rõ ràng, bám sát mục tiêu kinh doanh." },
];

const ITPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImage} alt="Công nghệ thông tin" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/75 to-transparent" />
          </div>
          <div className="relative container mx-auto px-6 lg:px-12 py-16 lg:py-24 text-primary-foreground">
            <p className="text-gold font-body text-sm tracking-widest uppercase mb-3">Lĩnh vực</p>
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <h1 className="font-heading text-3xl md:text-4xl font-bold leading-tight">Công nghệ thông tin & Phần mềm</h1>
              <Button variant="heroSolid" size="lg" asChild>
                <Link to="/yeu-cau-bao-gia">Đặt lịch tư vấn</Link>
              </Button>
            </div>
            <p className="font-body text-lg text-primary-foreground/80 max-w-3xl mt-4 leading-relaxed">
              Giải pháp phần mềm và hạ tầng giúp doanh nghiệp vận hành linh hoạt, an toàn và tăng trưởng bền vững.
            </p>
            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {[
                { label: "Dự án triển khai", value: "25+" },
                { label: "Thời gian hỗ trợ", value: "24/7" },
                { label: "Độ sẵn sàng", value: "99.9%" },
              ].map((item) => (
                <div key={item.label} className="p-4 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20">
                  <p className="font-heading text-2xl font-semibold">{item.value}</p>
                  <p className="font-body text-sm text-primary-foreground/70">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-[1.3fr,1fr] gap-10">
            <div>
              <p className="text-gold font-body text-sm tracking-widest uppercase mb-3">Dịch vụ</p>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">Giải pháp công nghệ end-to-end</h2>
              <p className="font-body text-muted-foreground mb-6 leading-relaxed">
                Từ tư vấn lộ trình chuyển đổi số đến phát triển phần mềm và vận hành hạ tầng, Kiến Hưng đồng hành cùng doanh nghiệp
                trên toàn bộ vòng đời dự án.
              </p>
              <div className="space-y-4">
                {offerings.map((item) => (
                  <div key={item} className="p-4 rounded-lg border border-border bg-card shadow-soft">
                    <div className="flex items-start gap-3">
                      <Code2 className="w-5 h-5 text-navy mt-0.5" />
                      <p className="font-body text-foreground leading-relaxed">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-secondary/50 border border-border shadow-elevated">
              <div className="flex items-center gap-3 mb-4">
                <Server className="w-6 h-6 text-navy" />
                <h3 className="font-heading text-lg font-semibold">Lợi thế triển khai</h3>
              </div>
              <div className="space-y-4">
                {strengths.map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg bg-navy/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-navy" />
                    </div>
                    <div>
                      <p className="font-heading text-base font-semibold text-foreground">{item.title}</p>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 lg:py-18 bg-secondary/60 border-y border-border">
          <div className="container mx-auto px-6 lg:px-12 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-3">Tăng tốc chuyển đổi số</h3>
              <p className="font-body text-muted-foreground leading-relaxed max-w-2xl">
                Liên hệ để nhận lộ trình công nghệ phù hợp, tối ưu chi phí và bảo mật cao.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="default" size="lg" asChild>
                <Link to="/yeu-cau-bao-gia">Nhận tư vấn</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/yeu-cau-bao-gia">Xem case study</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ITPage;
