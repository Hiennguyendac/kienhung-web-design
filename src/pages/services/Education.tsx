import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, ClipboardCheck, GraduationCap, Search, SlidersHorizontal } from "lucide-react";
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
  const [query, setQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);

  const consultingHref = useMemo(
    () => "mailto:contact@kienhunginvest.com?subject=Tu%20van%20chuong%20trinh%20dao%20tao",
    [],
  );
  const allPrograms = useMemo(
    () =>
      trainingDomains.flatMap((domain) =>
        domain.programs.map((program) => ({
          domainId: domain.id,
          domainTitle: domain.title,
          domainAudience: domain.audience,
          domainCoverImage: domain.coverImage,
          ...program,
        })),
      ),
    [],
  );
  const levels = useMemo(() => {
    const values = Array.from(new Set(allPrograms.map((item) => item.level)));
    return values.sort((a, b) => a.localeCompare(b, "vi"));
  }, [allPrograms]);
  const filteredPrograms = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return allPrograms.filter((program) => {
      const matchDomain = selectedDomain === "all" || program.domainId === selectedDomain;
      const matchLevel = selectedLevel === "all" || program.level === selectedLevel;
      const haystack =
        `${program.name} ${program.outcome} ${program.domainTitle} ${program.tagline || ""}`.toLowerCase();
      const matchKeyword = !keyword || haystack.includes(keyword);
      return matchDomain && matchLevel && matchKeyword;
    });
  }, [allPrograms, query, selectedDomain, selectedLevel]);
  const visiblePrograms = filteredPrograms.slice(0, visibleCount);
  const hasMore = visiblePrograms.length < filteredPrograms.length;

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
                <div className="flex w-full flex-col sm:flex-row gap-3">
                  <Button
                    variant="heroSolid"
                    size="lg"
                    asChild
                    className="w-full sm:w-[280px] shadow-lg shadow-gold/25 hover:-translate-y-0.5 transition-transform"
                  >
                    <Link to="/dat-lich-hen">Đặt lịch tư vấn học thuật</Link>
                  </Button>
                  <Button
                    size="lg"
                    asChild
                    className="w-full sm:w-[280px] bg-white text-navy-dark border border-white/90 hover:bg-gold hover:text-navy-dark hover:border-gold shadow-lg shadow-black/20 hover:-translate-y-0.5 transition-all"
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
            <p className="text-gold font-body text-sm tracking-[0.18em] uppercase mb-3">Program Finder</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Tìm chương trình đào tạo nhanh</h2>
            <p className="font-body text-muted-foreground mt-3 max-w-3xl">
              Dùng thanh tìm kiếm và bộ lọc để chọn đúng chương trình theo nhu cầu. Cách này giúp trang vẫn gọn khi số chương
              trình tăng lên.
            </p>

            <div className="mt-6 rounded-2xl border border-border bg-card p-4 md:p-5 shadow-soft space-y-4">
              <div className="relative">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setVisibleCount(6);
                  }}
                  placeholder="Tìm theo tên chương trình, lĩnh vực, nội dung..."
                  className="w-full h-11 rounded-lg border border-border bg-background pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-navy/35"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-3 md:items-center">
                <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <SlidersHorizontal className="w-4 h-4" />
                  Bộ lọc
                </div>
                <div className="grid sm:grid-cols-2 gap-3 w-full md:w-auto">
                  <select
                    value={selectedDomain}
                    onChange={(e) => {
                      setSelectedDomain(e.target.value);
                      setVisibleCount(6);
                    }}
                    className="h-10 rounded-lg border border-border bg-background px-3 text-sm"
                  >
                    <option value="all">Tất cả lĩnh vực</option>
                    {trainingDomains.map((domain) => (
                      <option key={domain.id} value={domain.id}>
                        {domain.title}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedLevel}
                    onChange={(e) => {
                      setSelectedLevel(e.target.value);
                      setVisibleCount(6);
                    }}
                    className="h-10 rounded-lg border border-border bg-background px-3 text-sm"
                  >
                    <option value="all">Tất cả cấp độ</option>
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
              <p>
                Hiển thị <strong className="text-foreground">{visiblePrograms.length}</strong> /{" "}
                <strong className="text-foreground">{filteredPrograms.length}</strong> chương trình
              </p>
              <p>{trainingDomains.length} lĩnh vực đào tạo</p>
            </div>

            {visiblePrograms.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-border bg-card p-8 text-center">
                <p className="font-heading text-lg text-foreground">Không tìm thấy chương trình phù hợp</p>
                <p className="font-body text-sm text-muted-foreground mt-2">
                  Hãy thử đổi từ khóa hoặc bộ lọc để xem thêm chương trình.
                </p>
              </div>
            ) : (
              <div className="mt-6 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {visiblePrograms.map((program) => (
                  <article
                    key={program.id}
                    className="group h-full rounded-xl border border-border bg-card overflow-hidden shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-all"
                  >
                    <div className="h-32 overflow-hidden border-b border-border">
                      <img src={program.image} alt={program.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-navy font-semibold mb-1">{program.domainTitle}</p>
                      <h3 className="font-heading text-base font-semibold text-foreground leading-snug">{program.name}</h3>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs">
                        <span className="px-2.5 py-1 rounded-full bg-secondary text-muted-foreground border border-border/50">
                          {program.level}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-secondary text-muted-foreground border border-border/50">
                          {program.duration}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-secondary text-muted-foreground border border-border/50">
                          {program.format}
                        </span>
                      </div>
                      <p className="font-body text-sm text-muted-foreground mt-3 leading-relaxed">{program.outcome}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Button asChild variant="outline" className="flex-1 min-w-[150px]">
                          <Link
                            to={`/dich-vu/giao-duc-dao-tao/linh-vuc/${program.domainId}/chuong-trinh/${program.id}`}
                          >
                            Xem chi tiết
                          </Link>
                        </Button>
                        <Button asChild className="flex-1 min-w-[150px] shadow-md shadow-navy/10">
                          <Link
                            to={`/dat-lich-hen?linh-vuc=${encodeURIComponent(program.domainTitle)}&chuong-trinh=${encodeURIComponent(program.name)}`}
                          >
                            Đăng ký học
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {hasMore ? (
              <div className="mt-6 text-center">
                <Button
                  variant="outline"
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="min-w-[220px]"
                >
                  Xem thêm chương trình
                </Button>
              </div>
            ) : null}

            <div className="mt-10 rounded-2xl border border-border bg-card p-5 shadow-soft">
              <h3 className="font-heading text-lg font-semibold text-foreground">Cấu trúc lĩnh vực đào tạo</h3>
              <div className="mt-4 grid md:grid-cols-2 gap-3">
                {trainingDomains.map((domain) => (
                  <div key={domain.id} className="rounded-lg border border-border bg-background/60 p-4">
                    <p className="font-heading text-base font-semibold text-foreground">{domain.title}</p>
                    <p className="font-body text-sm text-muted-foreground mt-1">{domain.summary}</p>
                    <p className="font-body text-xs text-muted-foreground mt-2">
                      {domain.programs.length} chương trình | Đối tượng: {domain.audience}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EducationPage;
