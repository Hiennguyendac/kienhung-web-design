import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BadgeCheck, BookOpen, CalendarClock, GraduationCap, LayoutGrid, UserRound } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";
import { findProgramByIds } from "@/lib/trainingPrograms";

const TrainingProgramDetailPage = () => {
  const { domainId, programId } = useParams();
  const navigate = useNavigate();
  const result = findProgramByIds(domainId, programId);

  if (!result) {
    return (
      <div className="min-h-screen bg-background">
        <Seo
          title="Không tìm thấy chương trình | Kiến Hưng Investment"
          description="Không tìm thấy chương trình đào tạo theo đường dẫn yêu cầu."
        />
        <Header />
        <main className="container mx-auto px-6 lg:px-12 py-12">
          <div className="max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h1 className="font-heading text-2xl font-semibold text-foreground">Không tìm thấy chương trình</h1>
            <p className="font-body text-muted-foreground mt-3">
              Đường dẫn chương trình không tồn tại hoặc dữ liệu đã được cập nhật.
            </p>
            <div className="mt-5">
              <Button asChild>
                <Link to="/dich-vu/giao-duc-dao-tao">Quay lại trang Giáo dục & Đào tạo</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { domain, program } = result;
  const enrollHref = `/dat-lich-hen?linh-vuc=${encodeURIComponent(domain.title)}&chuong-trinh=${encodeURIComponent(program.name)}`;

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={`${program.name} | Giáo dục & Đào tạo | Kiến Hưng Investment`}
        description={`${program.name} thuộc lĩnh vực ${domain.title}. ${program.outcome}`}
        keywords={`${domain.title}, ${program.name}, đào tạo, chương trình học`}
        canonical={`https://kienhunginvest.com/dich-vu/giao-duc-dao-tao/linh-vuc/${domain.id}/chuong-trinh/${program.id}`}
        image="https://kienhunginvest.com/favicon.jpg"
      />
      <Header />
      <main className="container mx-auto px-6 lg:px-12 py-10 lg:py-14 space-y-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-navy-light transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại danh mục chương trình
        </button>

        <section className="rounded-2xl border border-border bg-card p-6 lg:p-8 shadow-elevated">
          <p className="text-gold font-body text-sm tracking-[0.18em] uppercase mb-2">Chi tiết chương trình</p>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight">{program.name}</h1>
          {program.tagline ? <p className="font-heading text-lg text-navy mt-2">{program.tagline}</p> : null}
          <p className="font-body text-muted-foreground mt-4 leading-relaxed">{program.outcome}</p>

          <div className="mt-6 grid md:grid-cols-3 gap-3">
            <div className="rounded-xl border border-border bg-background/80 p-4">
              <p className="font-body text-xs uppercase tracking-wider text-muted-foreground">Lĩnh vực</p>
              <p className="font-heading text-base font-semibold text-foreground mt-1">{domain.title}</p>
            </div>
            <div className="rounded-xl border border-border bg-background/80 p-4">
              <p className="font-body text-xs uppercase tracking-wider text-muted-foreground">Cấp độ</p>
              <p className="font-heading text-base font-semibold text-foreground mt-1">{program.level}</p>
            </div>
            <div className="rounded-xl border border-border bg-background/80 p-4">
              <p className="font-body text-xs uppercase tracking-wider text-muted-foreground">Thời lượng</p>
              <p className="font-heading text-base font-semibold text-foreground mt-1">{program.duration}</p>
            </div>
          </div>
        </section>

        <section className="grid lg:grid-cols-3 gap-4">
          <article className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <div className="w-10 h-10 rounded-lg bg-navy/10 flex items-center justify-center mb-3">
              <LayoutGrid className="w-5 h-5 text-navy" />
            </div>
            <h2 className="font-heading text-lg font-semibold text-foreground">Hình thức đào tạo</h2>
            <p className="font-body text-muted-foreground mt-2">{program.format}</p>
          </article>

          <article className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <div className="w-10 h-10 rounded-lg bg-navy/10 flex items-center justify-center mb-3">
              <UserRound className="w-5 h-5 text-navy" />
            </div>
            <h2 className="font-heading text-lg font-semibold text-foreground">Đối tượng phù hợp</h2>
            <p className="font-body text-muted-foreground mt-2">{program.audience || domain.audience}</p>
          </article>

          <article className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <div className="w-10 h-10 rounded-lg bg-navy/10 flex items-center justify-center mb-3">
              <CalendarClock className="w-5 h-5 text-navy" />
            </div>
            <h2 className="font-heading text-lg font-semibold text-foreground">Lịch triển khai</h2>
            <p className="font-body text-muted-foreground mt-2">
              Khai giảng linh hoạt theo nhóm doanh nghiệp hoặc lớp mở định kỳ hàng tháng.
            </p>
          </article>
        </section>

        {program.roadmapPhases?.length ? (
          <section className="rounded-2xl border border-border bg-card p-6 lg:p-8 shadow-soft">
            <h3 className="font-heading text-xl font-semibold text-foreground">Lộ trình triển khai</h3>
            <div className="mt-5 grid md:grid-cols-5 gap-3">
              {program.roadmapPhases.map((phase, idx) => (
                <div
                  key={phase}
                  className="rounded-xl border border-border bg-background/70 p-4 hover:-translate-y-0.5 transition-transform"
                >
                  <p className="text-xs font-semibold text-navy mb-1">Giai đoạn {idx + 1}</p>
                  <p className="font-body text-sm text-foreground">{phase}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="grid lg:grid-cols-2 gap-4">
          <article className="rounded-xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-navy" />
              <h3 className="font-heading text-xl font-semibold text-foreground">Nội dung cốt lõi</h3>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {(program.coreContent?.length
                ? program.coreContent
                : [
                    "Nền tảng lý thuyết và khung tư duy theo chương trình.",
                    "Thực hành theo bài toán thực tế của phòng ban/doanh nghiệp.",
                    "Đánh giá đầu ra bằng sản phẩm hoặc đề án ứng dụng.",
                  ]
              ).map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-navy" />
              <h3 className="font-heading text-xl font-semibold text-foreground">Đầu ra và năng lực</h3>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {(program.objectives?.length
                ? program.objectives
                : [
                    "Hoàn thiện năng lực chuyên môn theo cấp độ của chương trình.",
                    "Có tài liệu và guideline để triển khai sau khóa học.",
                    "Được tư vấn lộ trình học tiếp theo sau khi kết thúc.",
                  ]
              ).map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
        </section>

        {program.deploymentFormat?.length ? (
          <section className="rounded-xl border border-border bg-card p-6 shadow-soft">
            <h3 className="font-heading text-xl font-semibold text-foreground">Format triển khai</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {program.deploymentFormat.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {program.pricingTiers?.length ? (
          <section className="rounded-2xl border border-border bg-card p-6 lg:p-8 shadow-soft">
            <h3 className="font-heading text-xl font-semibold text-foreground">Bảng giá theo quy mô</h3>
            {program.baseFeeIncludes?.length ? (
              <div className="mt-4 rounded-xl border border-border bg-background/70 p-4">
                <p className="font-heading text-base font-semibold text-foreground">Base fee bao gồm</p>
                <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                  {program.baseFeeIncludes.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div className="mt-4 overflow-x-auto rounded-xl border border-border">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-secondary/60">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-foreground">Quy mô</th>
                    <th className="px-4 py-3 font-semibold text-foreground">Giá</th>
                    <th className="px-4 py-3 font-semibold text-foreground">Ghi chú</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-background/80">
                  {program.pricingTiers.map((tier) => (
                    <tr key={`${tier.scale}-${tier.price}`}>
                      <td className="px-4 py-3 text-foreground">{tier.scale}</td>
                      <td className="px-4 py-3 text-foreground">{tier.price}</td>
                      <td className="px-4 py-3 text-muted-foreground">{tier.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {program.pricingFootnote ? (
              <p className="mt-4 text-sm font-semibold text-foreground">{program.pricingFootnote}</p>
            ) : null}
          </section>
        ) : null}

        <section className="rounded-2xl border border-gold/30 bg-gradient-to-r from-gold/10 via-transparent to-navy/10 p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <div>
              <h3 className="font-heading text-2xl font-semibold text-foreground">Đăng ký học chương trình này</h3>
              <p className="font-body text-muted-foreground mt-2">
                Chọn lịch phù hợp để nhận tư vấn chi tiết về lớp học, học phí và lộ trình triển khai.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link to={enrollHref}>Đăng ký học ngay</Link>
              </Button>
              <Button asChild variant="outline">
                <a href="mailto:contact@kienhunginvest.com?subject=Tu%20van%20chuong%20trinh%20dao%20tao">Liên hệ đào tạo</a>
              </Button>
            </div>
          </div>
          <div className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <BadgeCheck className="w-4 h-4 text-navy" />
            Chương trình chuẩn hóa theo mô hình học thuật của Kiến Hưng.
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TrainingProgramDetailPage;
