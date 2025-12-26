import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BarChart2, Megaphone, PenTool, Target, Users } from "lucide-react";
import heroImage from "@/assets/hero-building.jpg";

const offerings = [
  "Chiến lược truyền thông đa kênh (digital, PR, offline) gắn với mục tiêu kinh doanh.",
  "Nghiên cứu thị trường, phân khúc khách hàng và thông điệp giá trị.",
  "Thực thi chiến dịch quảng cáo, tối ưu hiệu suất liên tục (CPC/CPA).",
  "Thiết kế nội dung sáng tạo: landing page, social, video ngắn, ấn phẩm thương hiệu.",
];

const strengths = [
  { icon: Target, title: "Tập trung hiệu quả", desc: "Đo lường rõ ràng theo KPI chuyển đổi, tối ưu ngân sách theo thời gian thực." },
  { icon: Users, title: "Hiểu hành vi khách hàng", desc: "Nghiên cứu và phân tích insights để điều chỉnh thông điệp chính xác." },
  { icon: BarChart2, title: "Báo cáo minh bạch", desc: "Dashboard số liệu, báo cáo tuần/tháng giúp bám sát hiệu quả." },
];

const MarketingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImage} alt="Quảng cáo & Marketing" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/75 to-transparent" />
          </div>
          <div className="relative container mx-auto px-6 lg:px-12 py-16 lg:py-24 text-primary-foreground">
            <p className="text-gold font-body text-sm tracking-widest uppercase mb-3">Lĩnh vực</p>
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <h1 className="font-heading text-3xl md:text-4xl font-bold leading-tight">Quảng cáo & Nghiên cứu thị trường</h1>
              <Button variant="heroSolid" size="lg" asChild>
                <Link to="/yeu-cau-bao-gia">Yêu cầu báo giá</Link>
              </Button>
            </div>
            <p className="font-body text-lg text-primary-foreground/80 max-w-3xl mt-4 leading-relaxed">
              Thiết kế chiến lược truyền thông, thực thi chiến dịch và tối ưu hiệu suất để tăng trưởng khách hàng.
            </p>
            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {[
                { label: "Chiến dịch đã triển khai", value: "40+" },
                { label: "Ngành hàng phục vụ", value: "10+" },
                { label: "Tỷ lệ tối ưu ngân sách", value: "20-30%" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-4 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 backdrop-blur-sm shadow-lg shadow-black/10"
                >
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
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">Chiến lược & thực thi liền mạch</h2>
              <p className="font-body text-muted-foreground mb-6 leading-relaxed">
                Từ nghiên cứu thị trường đến triển khai và tối ưu, Kiến Hưng đảm bảo thông điệp phù hợp và hiệu quả cao.
              </p>
              <div className="space-y-4">
                {offerings.map((item) => (
                  <div
                    key={item}
                    className="p-4 rounded-lg border border-border bg-card shadow-soft hover:-translate-y-1 hover:border-gold/40 hover:shadow-elevated transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <Megaphone className="w-5 h-5 text-navy mt-0.5" />
                      <p className="font-body text-foreground leading-relaxed">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-card/90 border border-border shadow-elevated">
              <div className="flex items-center gap-3 mb-4">
                <PenTool className="w-6 h-6 text-navy" />
                <h3 className="font-heading text-lg font-semibold">Điểm khác biệt</h3>
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

        <section className="py-14 lg:py-18 bg-gradient-to-r from-secondary/80 via-secondary/40 to-gold/10 border-y border-border">
          <div className="container mx-auto px-6 lg:px-12 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-3">Khởi động chiến dịch mới</h3>
              <p className="font-body text-muted-foreground leading-relaxed max-w-2xl">
                Nhận kế hoạch truyền thông và dự toán ngân sách phù hợp mục tiêu doanh nghiệp.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="default" size="lg" asChild>
                <Link to="/yeu-cau-bao-gia">Đặt lịch tư vấn</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/yeu-cau-bao-gia">Tải media kit</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MarketingPage;
