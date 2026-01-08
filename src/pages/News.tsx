import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CalendarDays, ArrowRight, Newspaper } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const articles = [
  {
    title: "Kiến Hưng mở rộng dịch vụ logistics và cho thuê xe doanh nghiệp",
    summary:
      "Tăng cường năng lực vận tải, bổ sung đội xe mới và tối ưu quy trình giao nhận cho khách hàng doanh nghiệp tại TP. HCM.",
    date: "05/03/2024",
    tag: "Logistics",
  },
  {
    title: "Ra mắt gói giải pháp chuyển đổi số cho doanh nghiệp vừa và nhỏ",
    summary:
      "Gói dịch vụ trọn gói từ tư vấn, phát triển phần mềm đến đào tạo vận hành, giúp doanh nghiệp chuyển đổi số nhanh chóng.",
    date: "12/02/2024",
    tag: "Công nghệ",
  },
  {
    title: "Hợp tác chiến lược với đối tác quảng cáo đa nền tảng",
    summary:
      "Ký kết hợp tác để mở rộng năng lực quảng cáo và nghiên cứu thị trường, mang lại hiệu quả truyền thông tốt hơn cho khách hàng.",
    date: "28/01/2024",
    tag: "Marketing",
  },
  {
    title: "Active Learning: Giảm chi phí gán nhãn, tăng tốc mô hình AI",
    summary:
      "Active Learning giúp mô hình chủ động chọn mẫu khó, tiết kiệm 30–70% chi phí gán nhãn nhưng vẫn nâng cao độ chính xác. Ứng dụng rộng rãi cho NLP, CV, Speech.",
    date: "29/12/2025",
    tag: "AI & Data",
    link: "/tin-tuc/active-learning",
  },
  {
    title: "Hiệu quả Bayesian: Học đúng – học nhanh – học bền",
    summary:
      "Bayesian hiệu quả khi ít dữ liệu vẫn học được, hội tụ nhanh, chịu nhiễu tốt và chi phí tính toán hợp lý. Gợi ý kỹ thuật HMC/NUTS, VI, tối ưu prior.",
    date: "29/12/2025",
    tag: "Bayes & Inference",
    link: "/tin-tuc/hieu-qua-bayesian",
  },
  {
    title: "Bayes Factor Explained: Hướng dẫn thực chiến cho người mới bắt đầu",
    summary:
      "Giải thích Bayes Factor, công thức/ý nghĩa, thang Jeffrey, ảnh hưởng của prior, ưu điểm và hạn chế khi dùng trong kiểm định giả thuyết.",
    date: "08/01/2026",
    tag: "Bayes & Inference",
    link: "/tin-tuc/bayes-factor",
  },
  {
    title: "Attention Models: Mô hình đang chú ý vào đâu?",
    summary:
      "Giải thích trực quan self-attention, Q-K-V, heatmap và multi-head attention; cách mô hình gán trọng số để hiểu ngữ cảnh sâu hơn.",
    date: "29/12/2025",
    tag: "Deep Learning",
    link: "/tin-tuc/attention-models",
  },
];

const NewsPage = () => {
  const subscribeHref = useMemo(
    () => "mailto:contact@kienhunginvest.vn?subject=Dang%20ky%20nhan%20ban%20tin",
    [],
  );
  const pageSize = 6;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(articles.length / pageSize));
  const pagedArticles = useMemo(
    () => articles.slice((page - 1) * pageSize, page * pageSize),
    [page, pageSize],
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="bg-secondary/50 border-b border-border">
          <div className="container mx-auto px-6 lg:px-12 py-14 lg:py-20">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-gold font-body text-sm tracking-widest uppercase mb-3">
                  Tin tức & sự kiện
                </p>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
                  Cập nhật mới nhất từ Kiến Hưng
                </h1>
                <p className="font-body text-lg text-muted-foreground max-w-2xl leading-relaxed">
                  Hoạt động kinh doanh, hợp tác chiến lược và các chương trình hỗ trợ
                  khách hàng được cập nhật thường xuyên.
                </p>
              </div>
              <Button asChild variant="outline" className="w-fit">
                <a href={subscribeHref}>Đăng ký nhận tin</a>
              </Button>
            </div>
          </div>
        </section>

        <section id="news" className="py-14 lg:py-20">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {pagedArticles.map((article) => (
                <div
                  key={article.title}
                  className="p-6 rounded-xl border border-border bg-card shadow-soft flex flex-col gap-4"
                >
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="px-3 py-1 rounded-full bg-navy/10 text-navy font-medium text-xs">
                      {article.tag}
                    </span>
                    <CalendarDays className="w-4 h-4" />
                    <span>{article.date}</span>
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground">
                    {article.title}
                  </h3>
                  <p className="font-body text-muted-foreground leading-relaxed">
                    {article.summary}
                  </p>
                  {article.link ? (
                    <Link
                      to={article.link}
                      className="inline-flex items-center gap-2 text-navy hover:text-gold transition-colors text-sm font-medium"
                    >
                      Đọc thêm
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-navy/70 text-sm font-medium">
                      <ArrowRight className="w-4 h-4" />
                      Đọc thêm
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-4 shadow-soft">
              <div className="text-sm text-muted-foreground">
                Trang <span className="font-semibold text-foreground">{page}</span> / {totalPages}
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                >
                  Previous
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  disabled={page === totalPages}
                  onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                >
                  Next
                </Button>
              </div>
            </div>

            <div className="mt-12 p-6 rounded-xl bg-navy text-primary-foreground flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                  <Newspaper className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-heading text-lg font-semibold">Theo dõi bản tin Kiến Hưng</p>
                  <p className="font-body text-sm text-primary-foreground/70">
                    Nhận thông báo khi có cập nhật về dịch vụ, ưu đãi và sự kiện.
                  </p>
                </div>
              </div>
              <Button asChild variant="hero" size="lg">
                <a href={subscribeHref}>Nhận bản tin</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NewsPage;
