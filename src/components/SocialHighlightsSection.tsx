import { Facebook, Linkedin, ArrowUpRight } from "lucide-react";

const highlights = [
  {
    title: "Báo cáo xu hướng đầu tư 2026",
    desc: "Phân tích các ngành tăng trưởng nhanh và chiến lược phân bổ vốn.",
    platform: "LinkedIn",
    href: "https://www.linkedin.com/company/ai-business-vn/?viewAsMember=true",
  },
  {
    title: "Cập nhật dự án logistics mới",
    desc: "Tối ưu vận hành kho vận cho đối tác tại TP.HCM.",
    platform: "Facebook",
    href: "https://www.facebook.com/AIforbusinessvietnam/",
  },
  {
    title: "Chương trình đào tạo AI Office",
    desc: "Lộ trình 5 mô-đun giúp tăng hiệu suất văn phòng.",
    platform: "LinkedIn",
    href: "https://www.linkedin.com/company/ai-business-vn/?viewAsMember=true",
  },
];

export const SocialHighlightsSection = () => {
  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-3xl">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">Social updates</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Theo dõi hoạt động mới nhất
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Cập nhật nhanh về dự án, báo cáo thị trường và sự kiện qua các kênh chính thức.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {highlights.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl border border-border bg-card p-6 shadow-soft hover:-translate-y-1 transition-transform"
            >
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <span className="inline-flex items-center gap-2">
                  {item.platform === "LinkedIn" ? <Linkedin className="w-4 h-4" /> : <Facebook className="w-4 h-4" />}
                  {item.platform}
                </span>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-navy" />
              </div>
              <h3 className="font-heading text-lg text-foreground mb-3">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
