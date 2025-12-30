import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, ArrowLeft, Sparkles, Target, Brain, Layers, Shield, BarChart4 } from "lucide-react";
import { Link } from "react-router-dom";

const highlightBlocks = [
  {
    icon: Target,
    title: "Tiết kiệm 30–70% chi phí gán nhãn",
    desc: "Chọn đúng mẫu quan trọng nhất để gán nhãn, giảm số lượng nhãn cần thiết.",
  },
  {
    icon: Brain,
    title: "Học nhanh hơn với ít dữ liệu hơn",
    desc: "Mô hình chủ động hỏi người gán nhãn ở các mẫu mơ hồ nhất.",
  },
  {
    icon: Layers,
    title: "Tăng tốc trong môi trường dữ liệu hạn chế",
    desc: "Phù hợp bài toán ảnh y tế, NLP, giọng nói, sản phẩm doanh nghiệp.",
  },
];

const strategies = [
  {
    title: "Uncertainty Sampling",
    desc: "Ưu tiên mẫu mô hình kém tự tin (ví dụ xác suất 51% mèo/chó).",
  },
  {
    title: "Query by Committee",
    desc: "Nhiều mô hình cùng dự đoán và chọn mẫu có mức bất đồng cao.",
  },
  {
    title: "Expected Model Change",
    desc: "Chọn mẫu dự kiến ảnh hưởng lớn nhất tới mô hình nếu biết nhãn.",
  },
];

const useCases = [
  "NLP: gán nhãn cảm xúc, nhận dạng thực thể.",
  "Computer Vision: ảnh y tế, phân loại ảnh công nghiệp.",
  "Speech: tối ưu hóa giọng nói từng người dùng.",
  "Information Retrieval: cải thiện hệ thống đề xuất và tìm kiếm.",
];

const challenges = [
  "Chiến lược truy vấn phải đủ hiệu quả.",
  "Chuyên gia gán nhãn cần chính xác, nhất quán.",
  "Mẫu được chọn có thể thiếu tính đại diện, cần kiểm soát bias.",
  "Khó xác định thời điểm dừng tối ưu.",
];

const ActiveLearningPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="bg-background">
        <article className="container mx-auto px-6 lg:px-12 py-10 lg:py-14">
          <div className="mb-6 flex items-center gap-3 text-sm text-muted-foreground">
            <Badge variant="outline" className="border-gold text-gold">AI</Badge>
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="w-4 h-4" /> 29/12/2025
            </span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight">
            Active Learning: Tối ưu chi phí gán nhãn dữ liệu nhưng vẫn tăng độ chính xác mô hình
          </h1>
          <p className="mt-4 font-body text-lg text-muted-foreground max-w-4xl">
            Trong kỷ nguyên AI bùng nổ, chi phí gán nhãn dữ liệu là thách thức lớn. Active Learning cho phép mô hình chủ động chọn
            dữ liệu khó và “hỏi” chuyên gia, nhờ đó giảm 30–70% chi phí gán nhãn và tăng tốc huấn luyện trong điều kiện dữ liệu hạn chế.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {highlightBlocks.map((item) => (
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
            <h2 className="font-heading text-2xl font-semibold text-foreground">Active Learning hoạt động thế nào?</h2>
            <p className="font-body text-muted-foreground">
              Khác với passive learning, mô hình chủ động chọn mẫu khó/quan trọng để hỏi chuyên gia, rồi học lại qua vòng lặp 5 bước: huấn luyện nhỏ → dự đoán →
              chọn mẫu mơ hồ → gán nhãn → học lại. Giả định: “Được chọn dữ liệu mình muốn học, mô hình học nhanh và tốt hơn”.
            </p>
            <ul className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>Huấn luyện mô hình với tập nhỏ.</li>
              <li>Dự đoán trên dữ liệu chưa gán nhãn.</li>
              <li>Chọn mẫu mơ hồ nhất / quan trọng nhất.</li>
              <li>Chuyên gia gán nhãn.</li>
              <li>Mô hình học lại và lặp chu kỳ.</li>
            </ul>
          </section>

          <section className="mt-8 space-y-3">
            <h3 className="font-heading text-xl font-semibold text-foreground">Ba chiến lược phổ biến</h3>
            <div className="grid gap-3 md:grid-cols-3">
              {strategies.map((s) => (
                <div key={s.title} className="p-4 rounded-lg border border-border bg-card shadow-soft">
                  <h4 className="font-heading text-base font-semibold text-foreground">{s.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10 grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-heading text-xl font-semibold text-foreground">Ứng dụng thực tế</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                {useCases.map((u) => (
                  <li key={u}>{u}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-heading text-xl font-semibold text-foreground">Thách thức cần lưu ý</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                {challenges.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mt-10 space-y-3">
            <h3 className="font-heading text-xl font-semibold text-foreground">Tóm tắt lợi ích</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-border bg-card flex items-start gap-3">
                <ListChecks className="w-5 h-5 text-navy mt-1" />
                <div>
                  <p className="font-heading font-semibold text-foreground">Doanh nghiệp</p>
                  <p className="text-sm text-muted-foreground">
                    Giảm chi phí gán nhãn, tăng tốc đưa sản phẩm AI ra thị trường, ra quyết định dựa trên dữ liệu, tối ưu quy trình.
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card flex items-start gap-3">
                <BarChart4 className="w-5 h-5 text-navy mt-1" />
                <div>
                  <p className="font-heading font-semibold text-foreground">Nhà nghiên cứu</p>
                  <p className="text-sm text-muted-foreground">
                    Tăng độ chính xác mô hình khi dữ liệu hạn chế; tập trung gán nhãn vào mẫu giá trị cao; đánh giá chiến lược truy vấn hiệu quả.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <Separator className="my-10" />

          <div className="grid gap-4 md:grid-cols-2">
            <Button asChild variant="default" size="lg" className="justify-center">
              <a href="mailto:contact@kienhunginvest.vn?subject=Tu%20van%20Active%20Learning">Liên hệ tư vấn Active Learning</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="justify-center">
              <Link to="/yeu-cau-bao-gia">Nhận báo giá giải pháp AI</Link>
            </Button>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default ActiveLearningPage;
