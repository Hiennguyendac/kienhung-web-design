import { Link } from "react-router-dom";
import { ArrowRight, Bot, CheckCircle2, FileCheck2, FileSearch, Network, ShieldCheck, UploadCloud } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/SEO";
import { Button } from "@/components/ui/button";

const features = [
  { icon: UploadCloud, title: "Tập trung tài liệu", description: "Quản lý PDF, Word và tài liệu scan trong một kho tri thức thống nhất." },
  { icon: FileSearch, title: "Tìm kiếm tiếng Việt", description: "Tìm nhanh nội dung có dấu hoặc không dấu trên tài liệu và trang tri thức." },
  { icon: Bot, title: "Beacon AI có trích dẫn", description: "Hỏi đáp trên dữ liệu nội bộ và kiểm tra lại câu trả lời từ đúng tài liệu nguồn." },
  { icon: FileCheck2, title: "Kiểm duyệt nội dung", description: "Mọi đề xuất của AI đi qua luồng bản nháp và phê duyệt trước khi xuất bản." },
  { icon: ShieldCheck, title: "Phân quyền rõ ràng", description: "Kiểm soát quyền truy cập theo tổ chức, phòng ban và vai trò của nhân viên." },
  { icon: Network, title: "Kết nối AI Agent", description: "Cho phép agent truy vấn và đề xuất nội dung có kiểm soát qua API và MCP." },
];

const useCases = ["Doanh nghiệp có nhiều quy trình và tài liệu nội bộ", "Trường học, trung tâm đào tạo và đơn vị nghiên cứu", "Phòng hành chính, pháp chế, kỹ thuật và vận hành", "Tổ chức cần AI trả lời dựa trên nguồn có thể kiểm chứng"];

const BeaconProduct = () => (
  <div className="min-h-screen bg-background">
    <Seo
      title="Beacon — Nền tảng quản trị tri thức doanh nghiệp bằng AI | Kiến Hưng"
      description="Beacon giúp doanh nghiệp tập trung tài liệu, tìm kiếm tiếng Việt, hỏi đáp AI có trích dẫn, phân quyền và kiểm duyệt nội dung."
      keywords="Beacon, quản trị tri thức, AI doanh nghiệp, tìm kiếm tài liệu, RAG, chuyển đổi số"
      canonical="https://kienhunginvest.com/san-pham/beacon"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Beacon — Knowledge OS",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: "Nền tảng quản trị tri thức doanh nghiệp bằng AI do Kiến Hưng phát triển.",
      }}
    />
    <Header />
    <main>
      <section className="relative overflow-hidden bg-navy py-20 text-primary-foreground lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,193,7,0.18),transparent_35%)]" aria-hidden />
        <div className="relative container mx-auto px-6 lg:px-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-gold">Sản phẩm của Kiến Hưng</p>
          <h1 className="max-w-4xl font-heading text-4xl font-bold leading-tight md:text-6xl">Beacon — Knowledge OS cho doanh nghiệp Việt</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-primary-foreground/75 md:text-xl">
            Biến tài liệu rời rạc thành kho tri thức có cấu trúc, dễ tìm kiếm và có thể hỏi đáp bằng AI với nguồn tham chiếu rõ ràng.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button variant="heroSolid" size="lg" asChild>
              <Link to="/yeu-cau-bao-gia?san-pham=beacon">Yêu cầu tài khoản dùng thử</Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/dat-lich-hen">Đặt lịch demo 30 phút</Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-primary-foreground/60">Tài khoản thử nghiệm được cấp riêng để bảo vệ dữ liệu và kiểm soát chi phí AI.</p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">Năng lực cốt lõi</p>
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">Một nơi để lưu trữ, kiểm chứng và khai thác tri thức</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-gold/40 hover:shadow-elevated">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-navy/10 text-navy"><feature.icon className="h-6 w-6" /></div>
                <h3 className="font-heading text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40 py-16 lg:py-20">
        <div className="container mx-auto grid gap-10 px-6 lg:grid-cols-2 lg:items-center lg:px-12">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">Quy trình rõ ràng</p>
            <h2 className="font-heading text-3xl font-bold text-foreground">Từ tài liệu thô đến tri thức được kiểm duyệt</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">Beacon kết hợp tự động hóa AI với bước kiểm duyệt của con người, giúp doanh nghiệp tăng tốc mà vẫn giữ quyền kiểm soát.</p>
          </div>
          <ol className="grid gap-4">
            {["Tải lên và trích xuất nội dung tài liệu", "AI tổng hợp thành trang tri thức có nguồn", "Người phụ trách xem xét và phê duyệt", "Nhân viên tìm kiếm hoặc hỏi Beacon AI"].map((step, index) => (
              <li key={step} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy font-bold text-white">{index + 1}</span>
                <span className="font-medium text-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container mx-auto grid gap-10 px-6 lg:grid-cols-[0.9fr,1.1fr] lg:items-center lg:px-12">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">Phù hợp với</p>
            <h2 className="font-heading text-3xl font-bold text-foreground">Tổ chức coi tri thức là tài sản</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {useCases.map((item) => <div key={item} className="flex gap-3 rounded-xl border border-border bg-card p-5"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" /><p className="text-foreground">{item}</p></div>)}
          </div>
        </div>
      </section>

      <section className="bg-navy py-16 text-primary-foreground">
        <div className="container mx-auto flex flex-col gap-7 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div><h2 className="font-heading text-3xl font-bold">Sẵn sàng trải nghiệm Beacon?</h2><p className="mt-3 text-primary-foreground/70">Nhận tài khoản dùng thử riêng hoặc đặt lịch để xem toàn bộ quy trình trên dữ liệu mẫu.</p></div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="heroSolid" size="lg" asChild><Link to="/yeu-cau-bao-gia?san-pham=beacon">Yêu cầu dùng thử <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
            <Button variant="heroOutline" size="lg" asChild><Link to="/dat-lich-hen">Đặt lịch demo</Link></Button>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default BeaconProduct;
