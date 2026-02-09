import { useMemo } from "react";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  BriefcaseBusiness,
  Building2,
  ClipboardCheck,
  GraduationCap,
  Users,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";
import heroImage from "@/assets/kien-hung-hero.jpg";

type TrainingProgram = {
  name: string;
  level: string;
  duration: string;
  format: string;
  outcome: string;
};

type TrainingDomain = {
  id: string;
  title: string;
  summary: string;
  audience: string;
  icon: LucideIcon;
  programs: TrainingProgram[];
};

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

const trainingDomains: TrainingDomain[] = [
  {
    id: "ai-data",
    title: "AI & Khoa học dữ liệu",
    summary: "Đào tạo năng lực xây dựng, đánh giá và ứng dụng mô hình AI trong bài toán doanh nghiệp.",
    audience: "Kỹ sư, nhân sự phân tích dữ liệu, đội vận hành chuyển đổi số",
    icon: BrainCircuit,
    programs: [
      {
        name: "Nền tảng AI ứng dụng cho doanh nghiệp",
        level: "Cơ bản",
        duration: "06 tuần",
        format: "Hybrid",
        outcome: "Hiểu kiến trúc AI hiện đại và xây dựng được quy trình ứng dụng trong phòng ban.",
      },
      {
        name: "Computer Vision với YOLO và bài toán giám sát",
        level: "Trung cấp",
        duration: "08 tuần",
        format: "Offline + Lab",
        outcome: "Triển khai pipeline nhận diện vật thể và đánh giá hiệu năng theo ngữ cảnh vận hành thực tế.",
      },
      {
        name: "MLOps và vận hành mô hình trong sản xuất",
        level: "Chuyên sâu",
        duration: "08 tuần",
        format: "Workshop chuyên đề",
        outcome: "Thiết lập vòng đời mô hình từ huấn luyện đến theo dõi drift và tối ưu liên tục.",
      },
    ],
  },
  {
    id: "digital-transformation",
    title: "Chuyển đổi số & Tự động hóa",
    summary: "Thiết kế quy trình số, tự động hóa tác vụ và nâng cao năng suất vận hành doanh nghiệp.",
    audience: "Quản lý vận hành, PM, đội CNTT nội bộ",
    icon: Building2,
    programs: [
      {
        name: "Kiến trúc chuyển đổi số theo phòng ban",
        level: "Cơ bản",
        duration: "05 tuần",
        format: "Online Live",
        outcome: "Xây được bản đồ quy trình số và lộ trình triển khai theo ưu tiên kinh doanh.",
      },
      {
        name: "Tự động hóa quy trình với công cụ no-code",
        level: "Trung cấp",
        duration: "06 tuần",
        format: "Hybrid",
        outcome: "Thiết kế được workflow tự động cho tác vụ báo cáo, CRM và vận hành nội bộ.",
      },
      {
        name: "Quản trị dữ liệu cho doanh nghiệp số",
        level: "Chuyên sâu",
        duration: "06 tuần",
        format: "Offline + Case Study",
        outcome: "Chuẩn hóa dữ liệu và xây dashboard phục vụ ra quyết định quản trị.",
      },
    ],
  },
  {
    id: "business-finance",
    title: "Tài chính, Đầu tư & Phân tích kinh doanh",
    summary: "Nâng cao năng lực phân tích tài chính và ra quyết định đầu tư dựa trên dữ liệu.",
    audience: "Chuyên viên tài chính, nhà quản lý, chủ doanh nghiệp",
    icon: BriefcaseBusiness,
    programs: [
      {
        name: "Phân tích tài chính doanh nghiệp thực chiến",
        level: "Cơ bản",
        duration: "06 tuần",
        format: "Offline",
        outcome: "Đọc và phân tích báo cáo tài chính để đánh giá hiệu quả hoạt động doanh nghiệp.",
      },
      {
        name: "Quản trị danh mục đầu tư theo chu kỳ thị trường",
        level: "Trung cấp",
        duration: "06 tuần",
        format: "Hybrid",
        outcome: "Xây khung phân bổ tài sản và quản trị rủi ro theo mục tiêu lợi nhuận.",
      },
      {
        name: "Business Analytics cho lãnh đạo",
        level: "Chuyên sâu",
        duration: "05 tuần",
        format: "Workshop",
        outcome: "Ứng dụng mô hình phân tích để tối ưu doanh thu, chi phí và dòng tiền.",
      },
    ],
  },
  {
    id: "management-people",
    title: "Quản trị điều hành & Phát triển đội ngũ",
    summary: "Tập trung kỹ năng lãnh đạo, quản trị hiệu suất và xây hệ thống học tập cho tổ chức.",
    audience: "Trưởng nhóm, quản lý trung cấp, lãnh đạo đơn vị",
    icon: Users,
    programs: [
      {
        name: "Năng lực quản trị dành cho quản lý cấp trung",
        level: "Cơ bản",
        duration: "05 tuần",
        format: "Offline",
        outcome: "Nâng năng lực lập kế hoạch, giao việc, theo dõi KPI và phản hồi hiệu quả.",
      },
      {
        name: "Coaching nội bộ và phát triển nhân sự kế thừa",
        level: "Trung cấp",
        duration: "06 tuần",
        format: "Hybrid",
        outcome: "Thiết kế chương trình coaching để phát triển đội ngũ và giữ chân nhân sự chủ chốt.",
      },
      {
        name: "Văn hóa hiệu suất và quản trị thay đổi",
        level: "Chuyên sâu",
        duration: "06 tuần",
        format: "Workshop + Mentoring",
        outcome: "Xây cơ chế vận hành thay đổi phù hợp quy mô doanh nghiệp và mục tiêu tăng trưởng.",
      },
    ],
  },
];

const EducationPage = () => {
  const consultingHref = useMemo(
    () => "mailto:contact@kienhunginvest.com?subject=Tu%20van%20chuong%20trinh%20dao%20tao",
    [],
  );

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Giáo dục & Đào tạo | Kiến Hưng Investment"
        description="Trang học thuật theo lĩnh vực với danh mục chương trình đào tạo, lộ trình học rõ ràng và đăng ký học sau mỗi chương trình."
        keywords="giáo dục, đào tạo, chương trình học, AI, chuyển đổi số, tài chính, quản trị"
        canonical="https://kienhunginvest.com/dich-vu/giao-duc-dao-tao"
        image="https://kienhunginvest.com/favicon.jpg"
      />
      <Header />
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImage} alt="Trang học thuật Giáo dục và Đào tạo" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/75 to-navy/45" />
          </div>
          <div className="relative container mx-auto px-6 lg:px-12 py-16 lg:py-24 text-primary-foreground">
            <p className="text-gold font-body text-sm tracking-[0.18em] uppercase mb-3">Education Hub</p>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-4xl">
                <h1 className="font-heading text-3xl md:text-5xl font-bold leading-tight">
                  Trang Học thuật Giáo dục & Đào tạo
                </h1>
                <p className="mt-4 font-body text-lg text-primary-foreground/85 leading-relaxed">
                  Thiết kế theo cấu trúc khoa học: <strong>Lĩnh vực</strong> - <strong>Chương trình đào tạo</strong> -
                  <strong> Đăng ký học</strong>. Khi bạn gửi danh mục chính thức, đội ngũ có thể cập nhật nhanh theo đúng
                  khung này.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="heroSolid" size="lg" asChild>
                  <Link to="/dat-lich-hen">Đặt lịch tư vấn học thuật</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href={consultingHref}>Nhận brochure chương trình</a>
                </Button>
              </div>
            </div>
            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {[
                { label: "Lĩnh vực đào tạo", value: String(trainingDomains.length) },
                { label: "Chương trình mẫu", value: String(trainingDomains.reduce((acc, item) => acc + item.programs.length, 0)) },
                { label: "Mô hình", value: "Academic-first" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-4 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 backdrop-blur-sm"
                >
                  <p className="font-heading text-2xl font-semibold">{item.value}</p>
                  <p className="font-body text-sm text-primary-foreground/70">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20 bg-secondary/35 border-y border-border">
          <div className="container mx-auto px-6 lg:px-12">
            <p className="text-gold font-body text-sm tracking-[0.18em] uppercase mb-3">Academic Framework</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Nguyên tắc thiết kế chương trình</h2>
            <div className="mt-8 grid md:grid-cols-3 gap-4">
              {academicFramework.map((item) => (
                <article key={item.title} className="p-5 rounded-2xl border border-border bg-card shadow-soft">
                  <div className="w-10 h-10 rounded-lg bg-navy/10 flex items-center justify-center mb-3">
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
            <p className="font-body text-muted-foreground mt-3 max-w-4xl leading-relaxed">
              Mỗi lĩnh vực bao gồm các chương trình với cấp độ, thời lượng và đầu ra cụ thể. Cấu trúc này giúp bạn mở rộng
              nhiều ngành học mà vẫn nhất quán về chất lượng học thuật và trải nghiệm đăng ký.
            </p>

            <div className="mt-8 space-y-6">
              {trainingDomains.map((domain) => (
                <article key={domain.id} className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
                  <div className="p-6 border-b border-border bg-gradient-to-r from-secondary/35 to-card">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-navy/10 flex items-center justify-center">
                            <domain.icon className="w-5 h-5 text-navy" />
                          </div>
                          <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground">{domain.title}</h3>
                        </div>
                        <p className="font-body text-muted-foreground leading-relaxed">{domain.summary}</p>
                        <p className="font-body text-sm text-muted-foreground mt-2">
                          <span className="font-semibold text-foreground">Đối tượng:</span> {domain.audience}
                        </p>
                      </div>
                      <Button asChild variant="outline">
                        <Link to={`/dat-lich-hen?linh-vuc=${encodeURIComponent(domain.title)}`}>
                          Tư vấn lĩnh vực này
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="p-6 grid md:grid-cols-3 gap-4">
                    {domain.programs.map((program) => (
                      <div key={program.name} className="h-full p-4 rounded-xl border border-border bg-background/60">
                        <p className="font-heading text-base font-semibold text-foreground leading-snug">{program.name}</p>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs">
                          <span className="px-2.5 py-1 rounded-full bg-secondary text-muted-foreground">{program.level}</span>
                          <span className="px-2.5 py-1 rounded-full bg-secondary text-muted-foreground">{program.duration}</span>
                          <span className="px-2.5 py-1 rounded-full bg-secondary text-muted-foreground">{program.format}</span>
                        </div>
                        <p className="font-body text-sm text-muted-foreground mt-3 leading-relaxed">{program.outcome}</p>
                        <div className="mt-4">
                          <Button asChild className="w-full">
                            <Link
                              to={`/dat-lich-hen?linh-vuc=${encodeURIComponent(domain.title)}&chuong-trinh=${encodeURIComponent(program.name)}`}
                            >
                              Đăng ký học chương trình này
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

        <section className="pb-16 lg:pb-20">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="p-6 lg:p-8 rounded-2xl border border-gold/30 bg-gradient-to-r from-gold/10 via-transparent to-navy/10">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                  <h3 className="font-heading text-2xl font-bold text-foreground">Sẵn sàng cập nhật danh mục chính thức</h3>
                  <p className="font-body text-muted-foreground mt-2 leading-relaxed">
                    Bạn chỉ cần gửi danh sách lĩnh vực và các chương trình đào tạo chi tiết. Mình sẽ thay dữ liệu mẫu hiện tại
                    bằng dữ liệu chính thức và tối ưu lại nội dung học thuật cho từng ngành.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button asChild>
                    <Link to="/yeu-cau-bao-gia">Gửi danh mục chương trình</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={consultingHref}>Liên hệ bộ phận đào tạo</a>
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

export default EducationPage;
