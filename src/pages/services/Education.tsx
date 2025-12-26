import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap, Lightbulb, Presentation } from "lucide-react";
import heroImage from "@/assets/kien-hung-hero.jpg";

const offerings = [
  "Đào tạo kỹ năng mềm, kỹ năng kinh doanh và chăm sóc khách hàng cho đội ngũ sale/service.",
  "Chương trình nâng cao năng lực quản lý, lãnh đạo, lập kế hoạch và quản trị rủi ro.",
  "Workshop chuyên đề theo nhu cầu doanh nghiệp (marketing, vận hành, chuyển đổi số).",
  "Đánh giá đầu vào, thiết kế lộ trình học và kiểm tra đầu ra rõ ràng.",
];

const strengths = [
  { icon: Lightbulb, title: "Thực tiễn", desc: "Nội dung gắn với tình huống thực tế, dễ áp dụng vào công việc." },
  { icon: Presentation, title: "Huấn luyện tương tác", desc: "Coaching, thực hành tại lớp, phản hồi 1-1 để cải thiện nhanh." },
  { icon: GraduationCap, title: "Lộ trình rõ ràng", desc: "Thiết kế theo mục tiêu doanh nghiệp, đánh giá kết quả sau khóa học." },
];

const EducationPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImage} alt="Giáo dục & Đào tạo" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/75 to-transparent" />
          </div>
          <div className="relative container mx-auto px-6 lg:px-12 py-16 lg:py-24 text-primary-foreground">
            <p className="text-gold font-body text-sm tracking-widest uppercase mb-3">Lĩnh vực</p>
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <h1 className="font-heading text-3xl md:text-4xl font-bold leading-tight">Giáo dục & Đào tạo</h1>
              <Button variant="heroSolid" size="lg">Đặt lịch tư vấn</Button>
            </div>
            <p className="font-body text-lg text-primary-foreground/80 max-w-3xl mt-4 leading-relaxed">
              Chương trình đào tạo thực tế giúp nâng cao năng lực đội ngũ, gắn với mục tiêu kinh doanh.
            </p>
            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {[
                { label: "Khóa đào tạo", value: "50+" },
                { label: "Học viên doanh nghiệp", value: "1,000+" },
                { label: "Mức độ hài lòng", value: "4.8/5" },
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
              <p className="text-gold font-body text-sm tracking-widest uppercase mb-3">Chương trình</p>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">Thiết kế cho doanh nghiệp</h2>
              <p className="font-body text-muted-foreground mb-6 leading-relaxed">
                Kiến Hưng đồng hành cùng doanh nghiệp xác định nhu cầu, thiết kế lộ trình và đánh giá kết quả sau đào tạo.
              </p>
              <div className="space-y-4">
                {offerings.map((item) => (
                  <div key={item} className="p-4 rounded-lg border border-border bg-card shadow-soft">
                    <div className="flex items-start gap-3">
                      <BookOpen className="w-5 h-5 text-navy mt-0.5" />
                      <p className="font-body text-foreground leading-relaxed">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-secondary/50 border border-border shadow-elevated">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="w-6 h-6 text-navy" />
                <h3 className="font-heading text-lg font-semibold">Giá trị mang lại</h3>
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
              <h3 className="font-heading text-2xl font-bold text-foreground mb-3">Nâng cao năng lực đội ngũ</h3>
              <p className="font-body text-muted-foreground leading-relaxed max-w-2xl">
                Liên hệ để nhận kế hoạch đào tạo phù hợp mục tiêu doanh nghiệp, đo lường được kết quả.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="default" size="lg">Nhận tư vấn</Button>
              <Button variant="outline" size="lg">Xem chương trình mẫu</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EducationPage;
