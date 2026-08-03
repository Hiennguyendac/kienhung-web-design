import { Link } from "react-router-dom";
import { ArrowRight, Bot, FileSearch, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const highlights = [
  { icon: FileSearch, label: "Tìm kiếm tài liệu tiếng Việt" },
  { icon: Bot, label: "Hỏi đáp AI kèm nguồn trích dẫn" },
  { icon: ShieldCheck, label: "Phân quyền và quy trình phê duyệt" },
];

export const BeaconProductSection = () => (
  <section className="relative overflow-hidden bg-navy py-16 text-primary-foreground lg:py-20">
    <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gold/15 blur-3xl" aria-hidden />
    <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl" aria-hidden />
    <div className="relative container mx-auto grid gap-10 px-6 lg:grid-cols-[1.1fr,0.9fr] lg:items-center lg:px-12">
      <div>
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-sm text-gold">
          <Sparkles className="h-4 w-4" />
          Sản phẩm công nghệ nổi bật
        </div>
        <h2 className="font-heading text-3xl font-bold leading-tight md:text-4xl">
          Beacon — biến tài liệu nội bộ thành kho tri thức có thể hỏi đáp
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-primary-foreground/75">
          Tập trung tài liệu, tìm đúng thông tin và khai thác tri thức doanh nghiệp bằng AI có trích dẫn, phân quyền và kiểm soát nội dung.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button variant="heroSolid" size="lg" asChild>
            <Link to="/san-pham/beacon" className="gap-2">
              Khám phá Beacon <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="heroOutline" size="lg" asChild>
            <Link to="/yeu-cau-bao-gia?san-pham=beacon">Yêu cầu dùng thử</Link>
          </Button>
        </div>
      </div>
      <div className="grid gap-4">
        {highlights.map((item) => (
          <div key={item.label} className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
              <item.icon className="h-5 w-5" />
            </div>
            <p className="font-heading font-semibold">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
