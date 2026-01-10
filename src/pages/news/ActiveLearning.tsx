import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, ArrowLeft, Sparkles, Target, Brain, Layers, Shield, BarChart4 } from "lucide-react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";

const highlightBlocks = [
  {
    icon: Target,
    title: "Tiết kiệm 30–70% chi phí gán nhãn",
    description: "Chỉ gán nhãn những mẫu khó, loại bỏ công việc thừa.",
  },
  {
    icon: Brain,
    title: "Nâng cao độ chính xác mô hình",
    description: "Học từ mẫu biên, tăng khả năng phân biệt.",
  },
  {
    icon: Layers,
    title: "Ứng dụng đa lĩnh vực",
    description: "NLP, Computer Vision, Speech Recognition, Medical AI.",
  },
  {
    icon: Shield,
    title: "Giảm thiểu thiên lệch dữ liệu",
    description: "Chọn mẫu đa dạng, tránh overfitting.",
  },
];

const ActiveLearningPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Active Learning | Giảm chi phí gán nhãn, tăng tốc huấn luyện AI"
        description="Active Learning giúp mô hình chủ động chọn mẫu cần gán nhãn, tiết kiệm chi phí và nâng cao độ chính xác. Ứng dụng rộng rãi trong NLP, CV, y tế."
        keywords="học AI, Active Learning, gán nhãn dữ liệu, mô hình AI, đào tạo nghề AI"
        canonical="https://kienhunginvest.com/tin-tuc/active-learning"
        image="https://kienhunginvest.com/favicon.jpg"
        type="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": "Active Learning: Giảm chi phí gán nhãn, tăng tốc huấn luyện mô hình AI",
          "datePublished": "2024-12-29",
          "dateModified": "2024-12-29",
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
          "mainEntityOfPage": "https://kienhunginvest.com/tin-tuc/active-learning",
          "inLanguage": "vi-VN"
        }}
      />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-navy/5 via-background to-gold/5 border-b border-border">
          <div className="container mx-auto px-6 lg:px-12 py-14 lg:py-20">
            <Link
              to="/tin-tuc"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại Tin tức
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="secondary" className="bg-navy/10 text-navy border-0">
                AI & Data
              </Badge>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="w-4 h-4" />
                <span>29/12/2024</span>
              </div>
            </div>

            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 max-w-4xl">
              Active Learning: Giảm chi phí gán nhãn, tăng tốc huấn luyện mô hình AI
            </h1>
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              Phương pháp học chủ động giúp mô hình thông minh hơn trong việc chọn mẫu cần gán nhãn,
              tiết kiệm tài nguyên và nâng cao hiệu suất.
            </p>
          </div>
        </section>

        {/* Highlight Blocks */}
        <section className="py-12 lg:py-16 bg-secondary/30">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {highlightBlocks.map((block) => (
                <div
                  key={block.title}
                  className="p-6 rounded-xl bg-card border border-border shadow-soft"
                >
                  <div className="w-12 h-12 rounded-lg bg-navy/10 flex items-center justify-center mb-4">
                    <block.icon className="w-6 h-6 text-navy" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                    {block.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    {block.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-14 lg:py-20">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-4xl mx-auto">
              <article className="prose prose-lg max-w-none">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-gold" />
                  Active Learning là gì?
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-6">
                  Active Learning (Học chủ động) là một nhánh của Machine Learning, trong đó mô hình
                  có khả năng <strong className="text-foreground">chủ động lựa chọn</strong> những mẫu dữ liệu
                  nào cần được gán nhãn tiếp theo, thay vì nhận dữ liệu một cách thụ động.
                </p>
                <p className="font-body text-muted-foreground leading-relaxed mb-8">
                  Điều này đặc biệt hữu ích khi chi phí gán nhãn cao (như trong y tế, pháp lý) hoặc
                  khi dữ liệu có nhãn khan hiếm.
                </p>

                <Separator className="my-8" />

                <h2 className="font-heading text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <BarChart4 className="w-6 h-6 text-gold" />
                  Các chiến lược lấy mẫu phổ biến
                </h2>

                <div className="space-y-4 mb-8">
                  <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                    <h4 className="font-heading font-semibold text-foreground mb-2">
                      1. Uncertainty Sampling
                    </h4>
                    <p className="font-body text-sm text-muted-foreground">
                      Chọn mẫu mà mô hình <em>ít chắc chắn nhất</em> — thường là những mẫu có xác suất
                      dự đoán gần ngưỡng quyết định (ví dụ: 50% cho bài toán nhị phân).
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                    <h4 className="font-heading font-semibold text-foreground mb-2">
                      2. Query-by-Committee (QBC)
                    </h4>
                    <p className="font-body text-sm text-muted-foreground">
                      Sử dụng nhiều mô hình (committee) cùng dự đoán. Mẫu được chọn là mẫu có
                      <em> sự bất đồng lớn nhất</em> giữa các mô hình.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                    <h4 className="font-heading font-semibold text-foreground mb-2">
                      3. Expected Model Change
                    </h4>
                    <p className="font-body text-sm text-muted-foreground">
                      Chọn mẫu mà nếu được gán nhãn, sẽ tạo ra <em>thay đổi lớn nhất</em> cho mô hình
                      (ví dụ: gradient lớn nhất).
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                    <h4 className="font-heading font-semibold text-foreground mb-2">
                      4. Diversity Sampling
                    </h4>
                    <p className="font-body text-sm text-muted-foreground">
                      Kết hợp với uncertainty để chọn mẫu vừa khó vừa <em>đa dạng</em>, tránh chọn
                      các mẫu tương tự nhau.
                    </p>
                  </div>
                </div>

                <Separator className="my-8" />

                <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                  Ứng dụng thực tế
                </h2>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0" />
                    <span className="font-body text-muted-foreground">
                      <strong className="text-foreground">NLP:</strong> Phân loại văn bản, NER, sentiment analysis với ít dữ liệu có nhãn.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0" />
                    <span className="font-body text-muted-foreground">
                      <strong className="text-foreground">Computer Vision:</strong> Phát hiện đối tượng, phân đoạn ảnh y tế.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0" />
                    <span className="font-body text-muted-foreground">
                      <strong className="text-foreground">Speech:</strong> Nhận dạng giọng nói với các accent hiếm.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0" />
                    <span className="font-body text-muted-foreground">
                      <strong className="text-foreground">Medical AI:</strong> Chẩn đoán hình ảnh với dữ liệu bệnh hiếm.
                    </span>
                  </li>
                </ul>

                <Separator className="my-8" />

                <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                  Kết luận
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-6">
                  Active Learning là một phương pháp mạnh mẽ giúp tối ưu hóa quy trình gán nhãn dữ liệu,
                  đặc biệt phù hợp với các dự án AI có ngân sách hạn chế hoặc dữ liệu có nhãn khan hiếm.
                </p>
                <p className="font-body text-muted-foreground leading-relaxed">
                  Kiến Hưng Investment cung cấp dịch vụ tư vấn và triển khai các giải pháp AI/ML,
                  bao gồm Active Learning pipeline cho doanh nghiệp.
                </p>
              </article>

              {/* CTA */}
              <div className="mt-12 p-6 rounded-xl bg-navy text-primary-foreground">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <p className="font-heading text-lg font-semibold mb-1">
                      Cần tư vấn về AI & Data?
                    </p>
                    <p className="font-body text-sm text-primary-foreground/70">
                      Liên hệ với chúng tôi để được hỗ trợ triển khai giải pháp phù hợp.
                    </p>
                  </div>
                  <Button asChild variant="hero" size="lg">
                    <Link to="/lien-he">Liên hệ ngay</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ActiveLearningPage;
