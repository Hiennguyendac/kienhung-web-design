import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, ShieldCheck, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";

const caseStudies = [
  {
    title: "Tối ưu chuỗi cung ứng logistics cho doanh nghiệp FMCG",
    industry: "Logistics & Phân phối",
    outcome: "+28% tốc độ giao hàng, -18% chi phí vận hành",
    icon: TrendingUp,
  },
  {
    title: "Chuyển đổi số quy trình tài chính nội bộ",
    industry: "Công nghệ thông tin",
    outcome: "Tự động hóa 70% báo cáo, giảm 40% sai sót",
    icon: Cpu,
  },
  {
    title: "Tái cấu trúc thương mại và mở rộng kênh phân phối",
    industry: "Thương mại & Đầu tư",
    outcome: "Tăng trưởng 2,1x doanh số trong 6 tháng",
    icon: ShieldCheck,
  },
];

export const CaseStudiesSection = () => {
  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-3xl">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">Case study</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Dự án tiêu biểu & kết quả đo lường
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Các dự án được chọn lọc thể hiện năng lực triển khai, quản trị rủi ro và hiệu quả thực tế.
            </p>
          </div>
          <Link to="/case-studies">
            <Button variant="outline" className="gap-2">
              Xem toàn bộ
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="w-12 h-12 rounded-xl bg-navy/10 text-navy flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5" />
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                {item.industry}
              </p>
              <h3 className="font-heading text-lg text-foreground mb-3">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.outcome}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
