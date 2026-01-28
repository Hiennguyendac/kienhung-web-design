import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Brain, Sparkles, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";

const keyPoints = [
  {
    icon: Brain,
    title: "Gán trọng số thông minh",
    desc: "Attention giúp mô hình tự biết từ/ngữ cảnh nào quan trọng hơn thay vì coi mọi từ như nhau.",
  },
  {
    icon: Sparkles,
    title: "Tiết kiệm & chính xác hơn",
    desc: "Tập trung vào tín hiệu mạnh, giảm nhiễu, tăng chất lượng mô hình ngôn ngữ và thị giác.",
  },
  {
    icon: Eye,
    title: "Trực quan hóa được",
    desc: "Heatmap/bản đồ attention cho thấy mô hình “nhìn” vào đâu, giúp debug và giải thích.",
  },
];

const AttentionModelsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Attention Models trong Deep Learning | Kiến Hưng Investment"
        description="Giải thích trực quan self-attention, Q-K-V, heatmap và multi-head attention; cách mô hình gán trọng số để hiểu ngữ cảnh sâu hơn."
        keywords="attention models, deep learning, học AI, mô hình chú ý, Q K V"
        canonical="https://kienhunginvest.com/tin-tuc/attention-models"
        image="https://kienhunginvest.com/news/attention-architecture.svg"
        type="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": "Attention Models trong Deep Learning: Mô hình đang chú ý vào đâu?",
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
            "https://kienhunginvest.com/news/attention-architecture.svg",
            "https://kienhunginvest.com/news/attention-heatmap.svg"
          ],
          "mainEntityOfPage": "https://kienhunginvest.com/tin-tuc/attention-models",
          "inLanguage": "vi-VN"
        }}
      />
      <Header />
      <main className="container mx-auto px-6 lg:px-12 py-10 lg:py-14">
        <div className="mb-6 flex items-center gap-3 text-sm text-muted-foreground">
          <Badge variant="outline" className="border-gold text-gold">
            Deep Learning
          </Badge>
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="w-4 h-4" /> 29/12/2025
          </span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight">
          Attention Models trong Deep Learning: Mô hình đang chú ý vào đâu?
        </h1>
        <p className="mt-4 font-body text-lg text-muted-foreground max-w-4xl">
          Attention giúp mô hình tự chọn thông tin quan trọng, thay vì coi mọi phần của dữ liệu đều ngang nhau. Bài viết tóm lược cách
          attention hoạt động, ví dụ Q–K–V đời thường, self-attention và multi-head attention.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {keyPoints.map((item) => (
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
          <h2 className="font-heading text-2xl font-semibold text-foreground">1. Ví dụ trực quan: không phải từ nào cũng quan trọng</h2>
          <p className="text-muted-foreground font-body leading-relaxed">
            Với câu “The cat sat on the mat”, khi tập trung vào “cat”, mô hình sẽ gán trọng số cao cho “cat” và “mat”, thấp cho “the”, “on”.
            Đây là cơ chế attention: tự động phân bổ mức chú ý cho từng token. (Hình minh họa: độ đậm/nhạt cho thấy trọng số attention).
          </p>
          <figure className="mt-4 rounded-xl border border-border bg-card shadow-soft overflow-hidden">
        <img
          src="/news/attention-conversation.svg"
          alt="Các head attention với sắc độ khác nhau trên hội thoại"
          className="w-full"
          loading="lazy"
          decoding="async"
        />
            <figcaption className="px-4 py-3 text-sm text-muted-foreground">
              Mỗi head (màu) tập trung vào phần khác nhau của hội thoại; độ dày thanh màu = trọng số mạnh/yếu.
            </figcaption>
          </figure>
        </section>

        <section className="mt-8 space-y-4">
          <h2 className="font-heading text-2xl font-semibold text-foreground">2. Q – K – V qua ví dụ “tìm người trong đám đông”</h2>
          <p className="text-muted-foreground font-body leading-relaxed">
            Query (Q) = “tìm bạn Bảo đội nón đỏ”; Key (K) = mô tả từng người; Value (V) = thông tin cần lấy. Mô hình so sánh Q với từng K để
            tìm ai có “nón đỏ” và chỉ tập trung vào Value tương ứng. Đây chính là attention: không nhìn tất cả như nhau.
          </p>
          <figure className="mt-4 rounded-xl border border-border bg-card shadow-soft overflow-hidden">
        <img
          src="/news/attention-architecture.svg"
          alt="Sơ đồ luồng Q-K-V, tính điểm, softmax và tạo vector ngữ cảnh"
          className="w-full"
          loading="lazy"
          decoding="async"
        />
            <figcaption className="px-4 py-3 text-sm text-muted-foreground">
              Q-K-V được chiếu từ hidden state → tính điểm tương đồng → softmax → nhân với V để tạo context vector chuyển sang Decoder.
            </figcaption>
          </figure>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-heading text-2xl font-semibold text-foreground">3. Bản đồ Attention: mô hình đang nhìn vào đâu?</h2>
          <p className="text-muted-foreground font-body leading-relaxed">
            Heatmap thể hiện mức chú ý: ô sáng = tập trung cao, ô tối = bỏ qua. Trong câu dài, mỗi từ có pattern chú ý riêng; từ quan trọng
            thu hút nhiều attention head. (Hình minh họa: heatmap attention).
          </p>
          <figure className="mt-4 rounded-xl border border-border bg-card shadow-soft overflow-hidden">
        <img
          src="/news/attention-links.svg"
          alt="Các đường nối thể hiện attention của token 'it' tới phần còn lại câu"
          className="w-full"
          loading="lazy"
          decoding="async"
        />
            <figcaption className="px-4 py-3 text-sm text-muted-foreground">
              Độ đậm/độ dày đường nối cho biết token “it” chú ý mạnh nhất đến những token nào trong chuỗi.
            </figcaption>
          </figure>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-heading text-2xl font-semibold text-foreground">4. Self-Attention: mỗi từ nhìn toàn bộ các từ khác</h2>
          <p className="text-muted-foreground font-body leading-relaxed">
            Mỗi token “đeo kính viễn vọng” nhìn toàn bộ chuỗi, tự quyết định ai quan trọng. Không cần đọc tuần tự như RNN, giúp tốc độ nhanh
            và hiểu ngữ cảnh sâu hơn. (Hình minh họa: sơ đồ self-attention).
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-heading text-2xl font-semibold text-foreground">5. Multi-Head Attention: nhiều góc nhìn song song</h2>
          <p className="text-muted-foreground font-body leading-relaxed">
            Hình dung xem phim với nhiều góc nhìn: head1 nhìn ánh sáng, head2 nhìn biểu cảm, head3 nhìn chuyển động, head4 nhìn phông cảnh.
            Ghép các “góc nhìn” để hiểu sâu hơn. Đây là multi-head attention. (Hình minh họa: sơ đồ nhiều head).
          </p>
          <figure className="mt-4 rounded-xl border border-border bg-card shadow-soft overflow-hidden">
        <img
          src="/news/attention-heatmap.svg"
          alt="Heatmap attention biểu diễn nhiều head trên câu the cat chased the mouse"
          className="w-full"
          loading="lazy"
          decoding="async"
        />
            <figcaption className="px-4 py-3 text-sm text-muted-foreground">
              Heatmap nhiều head: ô sáng hơn = trọng số cao hơn, cho phép mô hình học nhiều góc nhìn ngữ cảnh cùng lúc.
            </figcaption>
          </figure>
        </section>

        <Separator className="my-10" />

        <div className="grid gap-4 md:grid-cols-2">
          <Button asChild variant="default" size="lg" className="justify-center">
            <a href="mailto:contact@kienhunginvest.com?subject=Tu%20van%20AI%20Attention%20Models">Liên hệ tư vấn giải pháp AI</a>
          </Button>
          <Button asChild variant="outline" size="lg" className="justify-center">
            <Link to="/yeu-cau-bao-gia">Nhận báo giá triển khai AI</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AttentionModelsPage;
