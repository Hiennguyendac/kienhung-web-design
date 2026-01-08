import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Scale, Sigma, Lightbulb, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const highlights = [
  {
    icon: Scale,
    title: "So sánh bằng chứng",
    desc: "Bayes Factor đo tỷ lệ bằng chứng ủng hộ H1 so với H0, trực quan hơn p-value.",
  },
  {
    icon: Sigma,
    title: "Cập nhật khi có dữ liệu mới",
    desc: "Bạn có thể cập nhật BF liên tục khi thêm dữ liệu mà không làm sai kết luận.",
  },
  {
    icon: Lightbulb,
    title: "Dễ diễn giải",
    desc: "BF cho biết mức độ ủng hộ, không ép quyết định nhị phân.",
  },
];

const BayesFactorPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 lg:px-12 py-10 lg:py-14">
        <div className="mb-6 flex items-center gap-3 text-sm text-muted-foreground">
          <Badge variant="outline" className="border-gold text-gold">
            Bayes & Inference
          </Badge>
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="w-4 h-4" /> 08/01/2026
          </span>
        </div>

        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight">
          Bayes Factor Explained: Hướng dẫn thực chiến cho người mới bắt đầu
        </h1>
        <p className="mt-4 font-body text-lg text-muted-foreground max-w-4xl">
          Bayes Factor (BF) là thước đo tỷ lệ bằng chứng giữa hai giả thuyết cạnh tranh. Bài viết này giải thích khái niệm, cách diễn giải theo
          thang Jeffrey, ảnh hưởng của prior và điểm mạnh/yếu khi ứng dụng trong thực tế.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="p-4 rounded-xl border border-border bg-card shadow-soft flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-navy/10 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-navy" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-10 space-y-4">
          <h2 className="font-heading text-2xl font-semibold text-foreground">1. Bayes Factor là gì?</h2>
          <p className="text-muted-foreground font-body leading-relaxed">
            Bayes Factor (BF) là tỷ lệ so sánh bằng chứng ủng hộ hai giả thuyết cạnh tranh. Thay vì chỉ trả lời “có ý nghĩa thống kê hay không”,
            BF cho biết giả thuyết nào được dữ liệu ủng hộ mạnh hơn. Ví dụ: so sánh H1 “thuốc mới hiệu quả hơn thuốc cũ” với H0 “thuốc mới không
            hiệu quả hơn thuốc cũ”.
          </p>
        </section>

        <section className="mt-8 space-y-4">
          <h2 className="font-heading text-2xl font-semibold text-foreground">2. Công thức và ý nghĩa</h2>
          <p className="text-muted-foreground font-body leading-relaxed">
            Bayes Factor BF10 đo mức độ ủng hộ H1 so với H0 dựa trên xác suất dữ liệu xảy ra dưới mỗi giả thuyết. Nếu BF10 &gt; 1, dữ liệu ủng hộ
            H1 nhiều hơn H0; nếu BF10 &lt; 1 thì ngược lại. BF10 = 1 nghĩa là dữ liệu không cung cấp bằng chứng rõ ràng cho giả thuyết nào.
          </p>
        </section>

        <section className="mt-8 space-y-4">
          <h2 className="font-heading text-2xl font-semibold text-foreground">3. Diễn giải theo thang Jeffrey</h2>
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
            <div className="grid grid-cols-2 gap-px bg-border text-sm">
              <div className="bg-muted px-4 py-3 font-semibold text-foreground">Bayes Factor (BF10)</div>
              <div className="bg-muted px-4 py-3 font-semibold text-foreground">Bằng chứng</div>
              <div className="bg-background px-4 py-3">&gt; 100</div>
              <div className="bg-background px-4 py-3">Cực mạnh ủng hộ H1</div>
              <div className="bg-background px-4 py-3">30 - 100</div>
              <div className="bg-background px-4 py-3">Rất mạnh ủng hộ H1</div>
              <div className="bg-background px-4 py-3">10 - 30</div>
              <div className="bg-background px-4 py-3">Mạnh ủng hộ H1</div>
              <div className="bg-background px-4 py-3">3 - 10</div>
              <div className="bg-background px-4 py-3">Vừa đủ ủng hộ H1</div>
              <div className="bg-background px-4 py-3">1 - 3</div>
              <div className="bg-background px-4 py-3">Không đáng kể ủng hộ H1</div>
              <div className="bg-background px-4 py-3">1</div>
              <div className="bg-background px-4 py-3">Không có bằng chứng</div>
              <div className="bg-background px-4 py-3">1/3 - 1</div>
              <div className="bg-background px-4 py-3">Không đáng kể ủng hộ H0</div>
              <div className="bg-background px-4 py-3">1/10 - 1/3</div>
              <div className="bg-background px-4 py-3">Vừa đủ ủng hộ H0</div>
              <div className="bg-background px-4 py-3">1/30 - 1/10</div>
              <div className="bg-background px-4 py-3">Mạnh ủng hộ H0</div>
              <div className="bg-background px-4 py-3">1/100 - 1/30</div>
              <div className="bg-background px-4 py-3">Rất mạnh ủng hộ H0</div>
              <div className="bg-background px-4 py-3">&lt; 1/100</div>
              <div className="bg-background px-4 py-3">Cực mạnh ủng hộ H0</div>
            </div>
          </div>
          <p className="text-muted-foreground font-body leading-relaxed">
            Ví dụ: BF10 = 5 nghĩa là có bằng chứng vừa đủ ủng hộ H1.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-heading text-2xl font-semibold text-foreground">4. Lưu ý về prior</h2>
          <p className="text-muted-foreground font-body leading-relaxed">
            Bayes Factor phụ thuộc vào prior (niềm tin ban đầu). Prior hợp lý giúp kết luận ổn định hơn; prior không phù hợp có thể làm BF lệch.
            Khi có kiến thức nền, dùng informative prior; nếu không, dùng non-informative prior để giảm ảnh hưởng chủ quan.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-heading text-2xl font-semibold text-foreground">5. Ưu điểm</h2>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground font-body leading-relaxed">
            <li>Không ép quyết định nhị phân; BF thể hiện mức độ ủng hộ dữ liệu cho mỗi giả thuyết.</li>
            <li>Cho phép cập nhật kết luận khi có thêm dữ liệu.</li>
            <li>Không phụ thuộc stopping rule như một số kiểm định truyền thống.</li>
            <li>Dễ diễn giải hơn p-value trong bối cảnh ra quyết định.</li>
          </ul>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-heading text-2xl font-semibold text-foreground">6. Hạn chế</h2>
          <div className="rounded-xl border border-border bg-card p-4 shadow-soft flex gap-3">
            <div className="w-10 h-10 rounded-lg bg-gold/15 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="text-muted-foreground font-body leading-relaxed">
                BF nhạy với prior, tính toán có thể phức tạp và tốn thời gian cho mô hình lớn. Chọn prior phù hợp và phương pháp tính hiệu quả là
                yếu tố then chốt để ứng dụng thực tế.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-heading text-2xl font-semibold text-foreground">Kết luận</h2>
          <p className="text-muted-foreground font-body leading-relaxed">
            Bayes Factor là công cụ mạnh để kiểm định giả thuyết, cung cấp bằng chứng chi tiết hơn so với phương pháp truyền thống. Dù có hạn
            chế, BF vẫn là lựa chọn tốt khi cần đánh giá mức độ ủng hộ giữa các giả thuyết cạnh tranh.
          </p>
        </section>

        <Separator className="my-10" />

        <div className="grid gap-4 md:grid-cols-2">
          <Button asChild variant="default" size="lg" className="justify-center">
            <a href="mailto:contact@kienhunginvest.vn?subject=Tu%20van%20Bayes%20Factor">Trao đổi về Bayes Factor</a>
          </Button>
          <Button asChild variant="outline" size="lg" className="justify-center">
            <Link to="/yeu-cau-bao-gia">Nhận tư vấn triển khai</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BayesFactorPage;
