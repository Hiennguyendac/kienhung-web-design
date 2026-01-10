import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, GaugeCircle, ShieldCheck, Zap, TriangleAlert, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";

const highlights = [
  {
    icon: GaugeCircle,
    title: "Hội tụ nhanh",
    desc: "Posterior ổn định sớm, không phải đợi burn-in quá lâu hay tốn quá nhiều dữ liệu.",
  },
  {
    icon: ShieldCheck,
    title: "Chịu nhiễu tốt",
    desc: "Outlier hay dữ liệu lệch chuẩn ít làm mô hình sập, nhờ prior và cơ chế cập nhật Bayes.",
  },
  {
    icon: Zap,
    title: "Tính toán hợp lý",
    desc: "Sampler không đi lạc, tài nguyên chấp nhận được; có thể dùng xấp xỉ nếu cần tốc độ.",
  },
];

const BayesianEfficiencyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Hiệu quả Bayesian | Kiến Hưng Investment"
        description="Giải thích hiệu quả Bayesian: hội tụ nhanh, chịu nhiễu tốt, ít dữ liệu vẫn học được và chi phí tính toán hợp lý."
        keywords="Bayesian, hiệu quả Bayesian, học AI, suy luận Bayes, đào tạo nghề"
        canonical="https://kienhunginvest.com/tin-tuc/hieu-qua-bayesian"
        image="https://kienhunginvest.com/news/bayesian-efficiency.svg"
        type="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": "Hiệu quả Bayesian: vì sao có mô hình học rất nhanh, có mô hình thì chạy mãi không xong?",
          "datePublished": "2025-12-29",
          "dateModified": "2025-12-29",
          "author": {
            "@type": "Organization",
            "name": "Kiến Hưng Investment"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Kiến Hưng Investment",
            "logo": {
              "@type": "ImageObject",
              "url": "https://kienhunginvest.com/favicon.jpg"
            }
          },
          "image": [
            "https://kienhunginvest.com/news/bayesian-efficiency.svg"
          ],
          "mainEntityOfPage": "https://kienhunginvest.com/tin-tuc/hieu-qua-bayesian",
          "inLanguage": "vi-VN"
        }}
      />
      <Header />
      <main className="container mx-auto px-6 lg:px-12 py-10 lg:py-14">
        <div className="mb-6 flex items-center gap-3 text-sm text-muted-foreground">
          <Badge variant="outline" className="border-gold text-gold">
            Bayes & Inference
          </Badge>
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="w-4 h-4" /> 29/12/2025
          </span>
        </div>

        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight">
          Hiệu quả Bayesian: vì sao có mô hình học rất nhanh, có mô hình thì chạy mãi không xong?
        </h1>
        <p className="mt-4 font-body text-lg text-muted-foreground max-w-4xl">
          Hiệu quả Bayesian nói về khả năng học đúng – học nhanh – học bền của mô hình Bayes trên dữ liệu thật: ít dữ liệu vẫn học được,
          hội tụ nhanh, chịu nhiễu tốt và chi phí tính toán hợp lý. Bayes không phải chỉ để “cho đẹp” mà phải hiệu quả trong thực tế.
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
          <h2 className="font-heading text-2xl font-semibold text-foreground">🧠 Hiệu quả Bayesian là gì?</h2>
          <p className="text-muted-foreground font-body leading-relaxed">
            Đơn giản: mô hình Bayes được xem là hiệu quả khi ít dữ liệu vẫn học được, hội tụ nhanh, không “sập” khi dữ liệu có nhiễu/outlier
            và tài nguyên tính toán ở mức chấp nhận được. Bayes cập nhật niềm tin (posterior) sau khi thấy dữ liệu, không nói đúng/sai mà nói
            “tôi tin giả thuyết này bao nhiêu phần trăm”.
          </p>
        </section>

        <section className="mt-8 grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h2 className="font-heading text-2xl font-semibold text-foreground">📊 4 đặc điểm của mô hình Bayesian hiệu quả</h2>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground font-body leading-relaxed">
              <li>Hội tụ nhanh: posterior ổn định sớm, không cần quá nhiều data.</li>
              <li>Tính toán chấp nhận được: sampler không kẹt, burn-in không kéo dài.</li>
              <li>Chịu đòn tốt: dữ liệu lệch chuẩn, outlier vẫn cho kết quả hợp lý.</li>
              <li>Ít dữ liệu vẫn sống: lợi thế lớn trong y tế, kỹ thuật, nghiên cứu.</li>
            </ul>
          </div>
          <figure className="rounded-xl border border-border bg-card shadow-soft overflow-hidden">
            <img
              src="/news/bayesian-efficiency.svg"
              alt="Infographic tóm tắt hiệu quả Bayesian"
              className="w-full"
              loading="lazy"
              decoding="async"
            />
            <figcaption className="px-4 py-3 text-sm text-muted-foreground">
              Infographic: hiệu quả Bayesian = hội tụ nhanh, chịu nhiễu tốt, ít dữ liệu vẫn học, chi phí tính toán hợp lý.
            </figcaption>
          </figure>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-heading text-2xl font-semibold text-foreground">⚠️ Vì sao nhiều mô hình Bayes kém hiệu quả?</h2>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground font-body leading-relaxed">
            <li>Không gian tham số quá lớn khiến sampler đi lạc, khó hội tụ.</li>
            <li>Prior chọn cho có → chậm hội tụ hoặc làm lệch posterior.</li>
            <li>Thuật toán không phù hợp với posterior phức tạp.</li>
            <li>Bayes không sai; dùng sai thì mới mệt.</li>
          </ul>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-heading text-2xl font-semibold text-foreground">🚀 Làm gì để Bayes hiệu quả hơn?</h2>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground font-body leading-relaxed">
            <li>Dùng HMC/NUTS thay vì MCMC ngây thơ để sampler đi đúng hướng.</li>
            <li>Dùng xấp xỉ (Variational Inference) khi cần tốc độ hơn sampling.</li>
            <li>Tối ưu code, thư viện, phần cứng; tránh lãng phí tài nguyên.</li>
            <li>Thiết kế prior hợp lý để dẫn hướng posterior, đặc biệt khi dữ liệu ít.</li>
          </ul>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-heading text-2xl font-semibold text-foreground">🎯 Kết luận ngắn gọn</h2>
          <p className="text-muted-foreground font-body leading-relaxed">
            Bayesian không phải để “cho đẹp”. Nó đáng dùng khi kết luận đáng tin, chạy đủ nhanh và chi phí chấp nhận được. Đừng chỉ hỏi
            “Bayes có đúng không?”, hãy hỏi “Bayes này có hiệu quả không?”
          </p>
        </section>

        <Separator className="my-10" />

        <div className="grid gap-4 md:grid-cols-2">
          <Button asChild variant="default" size="lg" className="justify-center">
            <a href="mailto:contact@kienhunginvest.vn?subject=Tu%20van%20Bayesian">Trao đổi với chuyên gia Bayes</a>
          </Button>
          <Button asChild variant="outline" size="lg" className="justify-center">
            <Link to="/yeu-cau-bao-gia">Nhận báo giá triển khai mô hình Bayes</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BayesianEfficiencyPage;
