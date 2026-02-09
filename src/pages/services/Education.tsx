import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, ClipboardCheck, GraduationCap } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";
import heroImage from "@/assets/kien-hung-hero.jpg";
import { trainingDomains } from "@/lib/trainingPrograms";

const academicFramework = [
  {
    icon: GraduationCap,
    title: "Cấu trúc học thuật chuẩn",
    desc: "Mỗi chương trình được thiết kế theo chuẩn đầu vào, mục tiêu đầu ra, rubrics đánh giá và minh chứng năng lực.",
  },
  {
    icon: ClipboardCheck,
    title: "Lộ trình rõ theo cấp độ",
    desc: "Tổ chức thành nền tảng, ứng dụng và chuyên sâu để người học dễ chọn lộ trình phù hợp vai trò công việc.",
  },
  {
    icon: BadgeCheck,
    title: "Gắn với năng lực nghề nghiệp",
    desc: "Sau mỗi chương trình, học viên có sản phẩm thực hành và hướng tiếp tục học chuyên sâu theo mục tiêu cá nhân.",
  },
];

const EducationPage = () => {
  const consultingHref = useMemo(
    () => "mailto:contact@kienhunginvest.com?subject=Tu%20van%20chuong%20trinh%20dao%20tao",
    [],
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-background">
      <Seo
        title="Giáo dục & Đào tạo | Kiến Hưng Investment"
        description="Trang học thuật theo lĩnh vực với danh mục chương trình đào tạo, lộ trình học rõ ràng và đăng ký học sau mỗi chương trình."
        keywords="giáo dục, đào tạo, chương trình học, AI, chuyển đổi số, tài chính, quản trị"
        canonical="https://kienhunginvest.com/dich-vu/giao-duc-dao-tao"
        image="https://kienhunginvest.com/favicon.jpg"
      />
      <Header />
      <main className="relative overflow-hidden">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImage} alt="Trang học thuật Giáo dục và Đào tạo" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/75 to-navy/50" />
          </div>
          <div className="absolute inset-0 opacity-70 pointer-events-none">
            <div className="absolute -top-24 -left-20 w-80 h-80 rounded-full bg-gold/20 blur-3xl" />
            <div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-sky-300/20 blur-3xl" />
            <div className="absolute -bottom-24 left-1/4 w-72 h-72 rounded-full bg-navy-light/25 blur-3xl" />
          </div>
          <div className="relative container mx-auto px-6 lg:px-12 py-16 lg:py-24 text-primary-foreground">
            <div className="max-w-5xl rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md p-6 md:p-8 shadow-2xl shadow-black/20">
              <p className="inline-flex items-center rounded-full border border-gold/35 bg-gold/15 px-3 py-1 text-gold font-body text-xs tracking-[0.2em] uppercase mb-4">
                Education Hub
              </p>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-4xl">
                  <h1 className="font-heading text-3xl md:text-5xl font-bold leading-tight">
                    Trang Học thuật Giáo dục & Đào tạo
                  </h1>
                  <p className="mt-4 font-body text-lg text-primary-foreground/90 leading-relaxed">
                    Thiết kế theo cấu trúc khoa học: <strong>Lĩnh vực</strong> - <strong>Chương trình đào tạo</strong> -
                    <strong> Đăng ký học</strong>. Khi bạn gửi danh mục chính thức, đội ngũ có thể cập nhật nhanh theo đúng
                    khung này.
                  </p>
                </div>
                <div className="grid w-full sm:w-auto sm:grid-cols-2 gap-3">
                  <Button
                    variant="heroSolid"
                    size="lg"
                    asChild
                    className="w-full sm:min-w-[260px] shadow-lg shadow-gold/25 hover:-translate-y-0.5 transition-transform"
                  >
                    <Link to="/dat-lich-hen">Đặt lịch tư vấn học thuật</Link>
                  </Button>
                  <Button
                    size="lg"
                    asChild
                    className="w-full sm:min-w-[260px] bg-white text-navy-dark border border-white/90 hover:bg-gold hover:text-navy-dark hover:border-gold shadow-lg shadow-black/20 hover:-translate-y-0.5 transition-all"
                  >
                    <a href={consultingHref}>Nhận brochure chương trình</a>
                  </Button>
                </div>
              </div>
              <div className="mt-8 grid sm:grid-cols-3 gap-4">
                {[
                  { label: "Lĩnh vực đào tạo", value: String(trainingDomains.length) },
                  { label: "Chương trình", value: String(trainingDomains.reduce((acc, item) => acc + item.programs.length, 0)) },
                  { label: "Mô hình", value: "Academic-first" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-4 rounded-xl bg-white/10 border border-white/25 backdrop-blur-sm hover:bg-white/15 hover:-translate-y-0.5 transition-all"
                  >
                    <p className="font-heading text-2xl font-semibold">{item.value}</p>
                    <p className="font-body text-sm text-primary-foreground/80">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20 bg-secondary/45 border-y border-border relative">
          <div className="container mx-auto px-6 lg:px-12">
            <p className="text-gold font-body text-sm tracking-[0.18em] uppercase mb-3">Academic Framework</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Nguyên tắc thiết kế chương trình</h2>
            <div className="mt-8 grid md:grid-cols-3 gap-4">
              {academicFramework.map((item) => (
                <article
                  key={item.title}
                  className="p-5 rounded-2xl border border-border bg-card shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-navy/15 to-gold/25 flex items-center justify-center mb-3">
                    <item.icon className="w-5 h-5 text-navy" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="font-body text-sm text-muted-foreground mt-2 leading-relaxed">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-6 lg:px-12">
            <p className="text-gold font-body text-sm tracking-[0.18em] uppercase mb-3">Program Catalog</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Danh mục chương trình theo lĩnh vực</h2>

            <div className="mt-8 space-y-6">
              {trainingDomains.map((domain) => (
                <article
                  key={domain.id}
                  className="rounded-2xl border border-border/80 bg-card shadow-soft overflow-hidden hover:shadow-elevated transition-shadow"
                >
                  <div className="p-6 border-b border-border bg-gradient-to-r from-secondary/45 via-card to-card">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-navy/15 to-gold/25 flex items-center justify-center">
                            <domain.icon className="w-5 h-5 text-navy" />
                          </div>
                          <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground">{domain.title}</h3>
                        </div>
                        <p className="font-body text-muted-foreground leading-relaxed">{domain.summary}</p>
                        <p className="font-body text-sm text-muted-foreground mt-2">
                          <span className="font-semibold text-foreground">Đối tượng:</span> {domain.audience}
                        </p>
                      </div>
                      <div className="lg:max-w-[290px] w-full space-y-3">
                        <div className="rounded-xl overflow-hidden border border-border bg-background/70">
                          <img src={domain.coverImage} alt={domain.title} className="w-full h-36 object-cover" loading="lazy" />
                        </div>
                        <Button asChild variant="outline" className="w-full hover:-translate-y-0.5 transition-transform">
                          <Link to={`/dat-lich-hen?linh-vuc=${encodeURIComponent(domain.title)}`}>Tư vấn lĩnh vực này</Link>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 grid md:grid-cols-3 gap-4">
                    {domain.programs.map((program) => (
                      <div
                        key={program.id}
                        className="group h-full p-4 rounded-xl border border-border bg-background/60 hover:bg-background hover:border-gold/35 hover:-translate-y-1 transition-all"
                      >
                        <div className="rounded-lg overflow-hidden border border-border/70 bg-secondary/50 mb-3">
                          <img src={program.image} alt={program.name} className="w-full h-32 object-cover" loading="lazy" />
                        </div>
                        <p className="font-heading text-base font-semibold text-foreground leading-snug">{program.name}</p>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs">
                          <span className="px-2.5 py-1 rounded-full bg-secondary text-muted-foreground border border-border/50">{program.level}</span>
                          <span className="px-2.5 py-1 rounded-full bg-secondary text-muted-foreground border border-border/50">{program.duration}</span>
                          <span className="px-2.5 py-1 rounded-full bg-secondary text-muted-foreground border border-border/50">{program.format}</span>
                        </div>
                        <p className="font-body text-sm text-muted-foreground mt-3 leading-relaxed">{program.outcome}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <Button asChild variant="outline" className="flex-1 min-w-[160px]">
                            <Link to={`/dich-vu/giao-duc-dao-tao/linh-vuc/${domain.id}/chuong-trinh/${program.id}`}>Xem chi tiết</Link>
                          </Button>
                          <Button asChild className="flex-1 min-w-[160px] shadow-md shadow-navy/10">
                            <Link
                              to={`/dat-lich-hen?linh-vuc=${encodeURIComponent(domain.title)}&chuong-trinh=${encodeURIComponent(program.name)}`}
                            >
                              Đăng ký học
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EducationPage;
