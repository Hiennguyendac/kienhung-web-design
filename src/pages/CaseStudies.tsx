import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Case Study | Kiến Hưng Investment"
        description="Tổng hợp các dự án tiêu biểu và kết quả đo lường từ Kiến Hưng Investment."
        canonical="https://kienhunginvest.com/case-studies"
      />
      <Header />
      <main className="container mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <div className="max-w-3xl">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">Case study</p>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Dự án tiêu biểu & kết quả đo lường
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Chúng tôi ưu tiên minh bạch hiệu quả bằng các chỉ số kinh doanh, KPI và tác động vận hành rõ ràng.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {studies.map((study) => (
            <div key={study.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{study.industry}</p>
              <h3 className="font-heading text-lg text-foreground mb-3">{study.title}</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><span className="text-foreground font-medium">Phạm vi:</span> {study.scope}</p>
                <p><span className="text-foreground font-medium">Kết quả:</span> {study.result}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-2xl border border-border bg-secondary/40 p-6">
          <div>
            <h3 className="font-heading text-xl text-foreground">Bạn muốn dự án tương tự?</h3>
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudies;
