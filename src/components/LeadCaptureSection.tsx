import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Target, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    title: "Xác định mục tiêu hợp tác",
    desc: "Khoanh vùng lĩnh vực ưu tiên, nhu cầu nguồn lực và kỳ vọng lợi nhuận.",
    icon: Target,
  },
  {
    title: "Phân tích & đề xuất giải pháp",
    desc: "Đội ngũ Kiến Hưng tư vấn lộ trình triển khai dựa trên dữ liệu thị trường.",
    icon: Sparkles,
  },
  {
    title: "Ký kết & triển khai",
    desc: "Chuẩn hóa KPI, kiểm soát tiến độ và tối ưu hiệu quả dài hạn.",
    icon: Briefcase,
  },
];

export const LeadCaptureSection = () => {
  return (
    <section className="py-16 lg:py-20 bg-secondary/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div>
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">Khởi động nhanh</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nhận tư vấn chiến lược theo nhu cầu của bạn
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              Chia sẻ mục tiêu và bối cảnh triển khai, chúng tôi sẽ phản hồi với đề xuất phù hợp nhất trong 24 giờ.
            </p>

            <div className="mt-8 grid gap-4">
              {steps.map((step, index) => (
                <div key={step.title} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft">
                  <div className="w-12 h-12 rounded-xl bg-navy/10 flex items-center justify-center text-navy">
                    <step.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Bước {index + 1}</p>
                    <h3 className="font-heading text-lg text-foreground">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card shadow-elevated p-6 lg:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Lead form đa bước</p>
            <h3 className="font-heading text-xl text-foreground mb-4">Bắt đầu từ 3 phút</h3>
            <ul className="space-y-3 text-sm text-muted-foreground mb-6">
              <li>• Tư vấn lộ trình đầu tư & thương mại rõ KPI.</li>
              <li>• Đề xuất giải pháp công nghệ, logistics, đào tạo.</li>
              <li>• Gợi ý dịch vụ phù hợp dựa trên mục tiêu.</li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/yeu-cau-bao-gia" className="w-full sm:w-auto">
                <Button size="lg" className="w-full">
                  Bắt đầu tư vấn
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/dat-lich-hen" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full">
                  Đặt lịch hẹn
                </Button>
              </Link>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Dữ liệu được bảo mật. Nhấn “Bắt đầu tư vấn” để điền form đa bước.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
