import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { SectionReveal } from "@/components/effects";

const studies = [
  {
    title: "Chuỗi cung ứng logistics cho FMCG",
    industry: "Logistics & Phân phối",
    scope: "Tái cấu trúc tuyến giao hàng, tối ưu kho",
    result: "+28% tốc độ giao hàng, -18% chi phí vận hành",
  },
  {
    title: "Chuyển đổi số hệ thống tài chính nội bộ",
    industry: "Công nghệ thông tin",
    scope: "Tự động hóa báo cáo, chuẩn hóa dashboard",
    result: "Giảm 40% sai sót, tiết kiệm 200 giờ/quý",
  },
  {
    title: "Mở rộng kênh phân phối khu vực miền Nam",
    industry: "Thương mại & Đầu tư",
    scope: "Kết nối đối tác, tối ưu danh mục sản phẩm",
    result: "Doanh số tăng 2,1x trong 6 tháng",
  },
  {
    title: "Tái định vị thương hiệu cho doanh nghiệp dịch vụ",
    industry: "Marketing & Thương hiệu",
    scope: "Nghiên cứu thị trường, chiến lược truyền thông",
    result: "Tăng 60% lượng khách hàng tiềm năng",
  },
];

const CaseStudies = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    updateButtons();
    emblaApi.on("select", updateButtons);
    emblaApi.on("reInit", updateButtons);

    return () => {
      emblaApi.off("select", updateButtons);
      emblaApi.off("reInit", updateButtons);
    };
  }, [emblaApi, updateButtons]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Case study Kiến Hưng Investment với kết quả đo lường"
        description="Xem các case study tiêu biểu của Kiến Hưng Investment với phạm vi triển khai, kết quả đo lường và tác động vận hành rõ ràng cho từng dự án thực tế."
        canonicalPath="/case-studies"
        ogImage="/logo-512.png"
      />
      <Header />
      <main className="container mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <SectionReveal className="max-w-3xl">
          <p className="text-gold font-mono text-sm font-semibold uppercase tracking-normal mb-3">Case study</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Dự án tiêu biểu & kết quả đo lường
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Chúng tôi ưu tiên minh bạch hiệu quả bằng các chỉ số kinh doanh, KPI và tác động vận hành rõ ràng.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.12} className="mt-10">
          <div className="mb-5 flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">Vuốt ngang trên mobile hoặc dùng nút điều hướng.</p>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={scrollPrev} disabled={!canScrollPrev} aria-label="Xem case study trước">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={scrollNext} disabled={!canScrollNext} aria-label="Xem case study tiếp theo">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-5">
              {studies.map((study, index) => (
                <article
                  key={study.title}
                  className={`min-w-0 flex-[0_0_88%] rounded-xl border border-border bg-card p-6 shadow-soft md:flex-[0_0_52%] lg:flex-[0_0_42%] ${
                    index === 0 ? "bg-hero text-primary-foreground" : ""
                  }`}
                >
                  <p className={`font-mono text-xs uppercase tracking-normal mb-3 ${index === 0 ? "text-gold" : "text-muted-foreground"}`}>
                    {study.industry}
                  </p>
                  <h3 className={`font-display text-2xl font-bold mb-4 ${index === 0 ? "text-primary-foreground" : "text-foreground"}`}>
                    {study.title}
                  </h3>
                  <div className={`space-y-3 text-sm ${index === 0 ? "text-primary-foreground/75" : "text-muted-foreground"}`}>
                    <p><span className={index === 0 ? "text-primary-foreground font-medium" : "text-foreground font-medium"}>Phạm vi:</span> {study.scope}</p>
                    <p><span className={index === 0 ? "text-primary-foreground font-medium" : "text-foreground font-medium"}>Kết quả:</span> {study.result}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.16} className="mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-xl border border-border bg-secondary/40 p-6">
          <div>
            <h3 className="font-display text-xl font-bold text-foreground">Bạn muốn dự án tương tự?</h3>
            <p className="text-sm text-muted-foreground">
              Hãy gửi yêu cầu, chúng tôi sẽ thiết kế lộ trình và KPI phù hợp với mô hình của bạn.
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/yeu-cau-bao-gia">
              <Button>Gửi yêu cầu</Button>
            </Link>
            <Link to="/dat-lich-hen">
              <Button variant="outline">Đặt lịch hẹn</Button>
            </Link>
          </div>
        </SectionReveal>
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudies;
