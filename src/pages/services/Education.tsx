import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock3, FileText, GraduationCap, Lightbulb, Microscope, Presentation } from "lucide-react";
import heroImage from "@/assets/kien-hung-hero.jpg";
import { Seo } from "@/components/Seo";
import { getAllPosts, type Post } from "@/lib/posts";

const offerings = [
  "Đào tạo kỹ năng mềm, kỹ năng kinh doanh và chăm sóc khách hàng cho đội ngũ sale/service.",
  "Chương trình nâng cao năng lực quản lý, lãnh đạo, lập kế hoạch và quản trị rủi ro.",
  "Workshop chuyên đề theo nhu cầu doanh nghiệp (marketing, vận hành, chuyển đổi số).",
  "Đánh giá đầu vào, thiết kế lộ trình học và kiểm tra đầu ra rõ ràng.",
];

const strengths = [
  { icon: Lightbulb, title: "Thực tiễn", desc: "Nội dung gắn với tình huống thực tế, dễ áp dụng vào công việc." },
  { icon: Presentation, title: "Huấn luyện tương tác", desc: "Coaching, thực hành tại lớp, phản hồi 1-1 để cải thiện nhanh." },
  { icon: GraduationCap, title: "Lộ trình rõ ràng", desc: "Thiết kế theo mục tiêu doanh nghiệp, đánh giá kết quả sau khóa học." },
];

const aiOfficeModules = [
  { code: "MĐ 01", name: "SMART AI OFFICE TOOLS", time: "21", theory: "8", practice: "12", exam: "1" },
  { code: "MĐ 02", name: "AI FOR COMMUNICATION & COLLABORATION", time: "21", theory: "8.2", practice: "11.8", exam: "1" },
  { code: "MĐ 03", name: "AI FOR REPORTING & DATA VISUALIZATION", time: "21", theory: "8", practice: "12", exam: "1" },
  { code: "MĐ 04", name: "AI WORKFLOW & AUTOMATION", time: "21", theory: "7.8", practice: "12.2", exam: "1" },
  { code: "MĐ 05", name: "AI FOR OFFICE MANAGEMENT & LEADERSHIP", time: "21", theory: "7.8", practice: "12.2", exam: "1" },
];

const academicPillars = [
  {
    title: "Chuẩn học thuật",
    desc: "Mỗi chuyên đề đều có mục tiêu học tập, khung kiến thức, ví dụ thực hành và tiêu chí đánh giá rõ ràng.",
  },
  {
    title: "Liên ngành",
    desc: "Không chỉ AI, trang đào tạo có thể mở rộng sang dữ liệu, công nghệ, tài chính, vận hành và quản trị.",
  },
  {
    title: "Học xong có lộ trình",
    desc: "Sau mỗi chuyên đề, người học có thể đăng ký khóa học chuyên sâu hoặc lộ trình coaching theo nhu cầu.",
  },
];

const academicKeywords = [
  "ai",
  "trí tuệ nhân tạo",
  "machine learning",
  "deep learning",
  "data",
  "thuật toán",
  "học thuật",
  "nghiên cứu",
  "khoa học",
  "phân tích",
  "mô hình",
  "đào tạo",
  "công nghệ",
];

const topicRules = [
  { label: "AI ứng dụng", keywords: ["ai", "yolo", "machine learning", "deep learning", "mô hình"] },
  { label: "Dữ liệu & phân tích", keywords: ["data", "bayes", "thống kê", "phân tích", "report", "visualization"] },
  { label: "Công nghệ & chuyển đổi số", keywords: ["công nghệ", "chuyển đổi số", "hạ tầng", "tự động hóa"] },
  { label: "Tài chính & quản trị", keywords: ["tài chính", "đầu tư", "quản trị", "kinh tế", "doanh nghiệp"] },
];

const normalizeText = (value: string) => value.toLowerCase();

const isAcademicPost = (post: Post) => {
  const text = normalizeText(`${post.title} ${post.description || ""} ${post.excerpt}`);
  return academicKeywords.some((keyword) => text.includes(keyword));
};

const detectTopic = (post: Post) => {
  const text = normalizeText(`${post.title} ${post.description || ""} ${post.excerpt}`);
  const matched = topicRules.find((rule) => rule.keywords.some((keyword) => text.includes(keyword)));
  return matched?.label ?? "Chuyên đề tổng hợp";
};

const formatDate = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const EducationPage = () => {
  const subscribeHref = useMemo(
    () => "mailto:contact@kienhunginvest.com?subject=Tu%20van%20chuong%20trinh%20AI%20Office",
    [],
  );
  const academicPosts = useMemo(() => {
    return getAllPosts()
      .filter(isAcademicPost)
      .sort((a, b) => {
        const da = new Date(a.date || "1970-01-01").getTime();
        const db = new Date(b.date || "1970-01-01").getTime();
        return db - da;
      })
      .slice(0, 12);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Giáo dục & Đào tạo | Kiến Hưng Investment"
        description="Chương trình đào tạo nghề và học AI thực tiễn: AI Office, kỹ năng quản trị, vận hành, truyền thông nội bộ và tự động hóa."
        keywords="học AI, đào tạo nghề, AI Office, học lái xe, đầu tư"
        canonical="https://kienhunginvest.com/dich-vu/giao-duc-dao-tao"
        image="https://kienhunginvest.com/favicon.jpg"
      />
      <Header />
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImage} alt="Giáo dục & Đào tạo" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/75 to-transparent" />
          </div>
          <div className="relative container mx-auto px-6 lg:px-12 py-16 lg:py-24 text-primary-foreground">
            <p className="text-gold font-body text-sm tracking-widest uppercase mb-3">Lĩnh vực</p>
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <h1 className="font-heading text-3xl md:text-4xl font-bold leading-tight">Giáo dục & Đào tạo</h1>
              <Button variant="heroSolid" size="lg" asChild>
                <Link to="/yeu-cau-bao-gia">Đặt lịch tư vấn</Link>
              </Button>
            </div>
            <p className="font-body text-lg text-primary-foreground/80 max-w-3xl mt-4 leading-relaxed">
              Chương trình đào tạo thực tế giúp nâng cao năng lực đội ngũ, gắn với mục tiêu kinh doanh.
            </p>
            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {[
                { label: "Khóa đào tạo", value: "50+" },
                { label: "Học viên doanh nghiệp", value: "1,000+" },
                { label: "Mức độ hài lòng", value: "4.8/5" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-4 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 backdrop-blur-sm shadow-lg shadow-black/10"
                >
                  <p className="font-heading text-2xl font-semibold">{item.value}</p>
                  <p className="font-body text-sm text-primary-foreground/70">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-[1.3fr,1fr] gap-10">
            <div>
              <p className="text-gold font-body text-sm tracking-widest uppercase mb-3">Chương trình</p>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">Thiết kế cho doanh nghiệp</h2>
              <p className="font-body text-muted-foreground mb-6 leading-relaxed">
                Kiến Hưng đồng hành cùng doanh nghiệp xác định nhu cầu, thiết kế lộ trình và đánh giá kết quả sau đào tạo.
              </p>
              <div className="space-y-4">
                {offerings.map((item) => (
                  <div
                    key={item}
                    className="p-4 rounded-lg border border-border bg-card shadow-soft hover:-translate-y-1 hover:border-gold/40 hover:shadow-elevated transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <BookOpen className="w-5 h-5 text-navy mt-0.5" />
                      <p className="font-body text-foreground leading-relaxed">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-card/90 border border-border shadow-elevated">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="w-6 h-6 text-navy" />
                <h3 className="font-heading text-lg font-semibold">Giá trị mang lại</h3>
              </div>
              <div className="space-y-4">
                {strengths.map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg bg-navy/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-navy" />
                    </div>
                    <div>
                      <p className="font-heading text-base font-semibold text-foreground">{item.title}</p>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20 bg-secondary/40 border-y border-border">
          <div className="container mx-auto px-6 lg:px-12 space-y-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-gold font-body text-sm tracking-widest uppercase mb-2">Chương trình mô đun</p>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">AI Office</h3>
                <p className="font-body text-muted-foreground max-w-3xl">
                  Đào tạo thường xuyên, 5 mô đun, chứng chỉ sau khi hoàn thành. Đối tượng: tốt nghiệp 9/12, đủ sức khỏe học tập & làm việc.
                </p>
              </div>
              <div className="flex gap-3">
                <Button asChild variant="default">
                  <a href={subscribeHref}>Đăng ký tư vấn</a>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/yeu-cau-bao-gia">Nhận báo giá</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 rounded-xl bg-card border border-border shadow-soft flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-navy mt-1" />
                <div>
                  <p className="font-heading font-semibold text-foreground">Mục tiêu</p>
                  <p className="font-body text-sm text-muted-foreground">
                    Hiểu & ứng dụng công cụ AI văn phòng (ChatGPT, Copilot, Notion AI...), thiết kế workflow, phân tích báo cáo, vận hành AI-Driven Office.
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border shadow-soft flex items-start gap-3">
                <FileText className="w-5 h-5 text-navy mt-1" />
                <div>
                  <p className="font-heading font-semibold text-foreground">Chứng chỉ</p>
                  <p className="font-body text-sm text-muted-foreground">Hoàn thành 5 mô đun, kiểm tra kết thúc, nhận chứng chỉ Đào tạo thường xuyên.</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border shadow-soft flex items-start gap-3">
                <Clock3 className="w-5 h-5 text-navy mt-1" />
                <div>
                  <p className="font-heading font-semibold text-foreground">Thời lượng</p>
                  <p className="font-body text-sm text-muted-foreground">
                    50 buổi (≥100 giờ thực học), lý thuyết 39,8 giờ, thực hành 60,2 giờ, kiểm tra 5 giờ.
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-soft">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="bg-secondary/60 text-sm text-foreground">
                    <th className="px-4 py-3">Mã</th>
                    <th className="px-4 py-3">Mô đun</th>
                    <th className="px-4 py-3">Tổng giờ</th>
                    <th className="px-4 py-3">LT</th>
                    <th className="px-4 py-3">TH</th>
                    <th className="px-4 py-3">KT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {aiOfficeModules.map((item) => (
                    <tr key={item.code} className="text-sm">
                      <td className="px-4 py-3 font-semibold text-foreground">{item.code}</td>
                      <td className="px-4 py-3 text-foreground">{item.name}</td>
                      <td className="px-4 py-3">{item.time}</td>
                      <td className="px-4 py-3">{item.theory}</td>
                      <td className="px-4 py-3">{item.practice}</td>
                      <td className="px-4 py-3">{item.exam}</td>
                    </tr>
                  ))}
                  <tr className="text-sm font-semibold">
                    <td className="px-4 py-3">Tổng</td>
                    <td className="px-4 py-3 text-muted-foreground">5 mô đun</td>
                    <td className="px-4 py-3">105</td>
                    <td className="px-4 py-3">39,8</td>
                    <td className="px-4 py-3">60,2</td>
                    <td className="px-4 py-3">5</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-card border border-border shadow-soft space-y-2">
                <h4 className="font-heading text-lg font-semibold text-foreground">Đối tượng & đầu vào</h4>
                <p className="font-body text-sm text-muted-foreground">
                  Trình độ văn hóa 9/12, đủ sức khỏe, quan tâm ứng dụng AI trong hành chính – văn phòng.
                </p>
                <p className="font-body text-sm text-muted-foreground">
                  Phương pháp: Demo 40% – Thực hành 60% – PBL/Role-play; chấm theo rubric, đảm bảo chuẩn kiến thức – kỹ năng – thái độ.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-card border border-border shadow-soft space-y-2">
                <h4 className="font-heading text-lg font-semibold text-foreground">Đánh giá & chứng chỉ</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Đánh giá quá trình 50%: tham gia, thái độ, sản phẩm thực hành.</li>
                  <li>Đánh giá cuối mô đun 50%: Communication Handbook + thuyết trình nhóm.</li>
                  <li>Tiêu chí: chuẩn mực thông điệp (40%), áp dụng công cụ AI (40%), trình bày & phối hợp nhóm (20%).</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-6 lg:px-12 space-y-8">
            <div className="p-6 lg:p-8 rounded-2xl border border-border bg-gradient-to-br from-card via-card to-secondary/40 shadow-elevated">
              <p className="text-gold font-body text-sm tracking-widest uppercase mb-2">Thư viện chuyên đề</p>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">
                Không gian học thuật mở rộng cho AI và nhiều lĩnh vực khác
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                Mỗi chuyên đề gồm bài viết nền tảng, ứng dụng thực tế và nút đăng ký học ngay sau khi đọc để chuyển hóa
                kiến thức thành kỹ năng.
              </p>
              <div className="mt-6 grid md:grid-cols-3 gap-4">
                {academicPillars.map((item) => (
                  <div key={item.title} className="p-4 rounded-xl border border-border bg-background/70">
                    <p className="font-heading text-base font-semibold text-foreground">{item.title}</p>
                    <p className="font-body text-sm text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {academicPosts.length ? (
              <div className="grid lg:grid-cols-2 gap-5">
                {academicPosts.map((post) => {
                  const enrollHref = `mailto:contact@kienhunginvest.com?subject=${encodeURIComponent(
                    `Dang ky hoc chuyen de: ${post.title}`,
                  )}&body=${encodeURIComponent(
                    `Toi muon dang ky hoc sau khi doc chuyen de \"${post.title}\". Nho lien he tu van lo trinh phu hop.`,
                  )}`;
                  return (
                    <article
                      key={post.slug}
                      className="p-5 rounded-2xl border border-border bg-card shadow-soft hover:-translate-y-1 hover:shadow-elevated transition-all"
                    >
                      <div className="flex items-center gap-2 flex-wrap text-xs">
                        <span className="px-2.5 py-1 rounded-full bg-navy/10 text-navy font-semibold">
                          {detectTopic(post)}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-secondary text-muted-foreground">
                          {post.category || "Chuyên đề"}
                        </span>
                        <span className="text-muted-foreground">{formatDate(post.date)}</span>
                      </div>
                      <h4 className="font-heading text-xl font-semibold text-foreground mt-3 leading-snug">{post.title}</h4>
                      <p className="font-body text-sm text-muted-foreground mt-3 leading-relaxed">
                        {post.description?.trim() || post.excerpt}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-3">
                        <Button asChild>
                          <Link to={`/tin-tuc/${encodeURIComponent(post.slug)}`}>Đọc chuyên đề</Link>
                        </Button>
                        <Button asChild variant="outline">
                          <a href={enrollHref}>Đăng ký học ngay</a>
                        </Button>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="p-6 rounded-2xl border border-dashed border-border bg-card text-center">
                <Microscope className="w-6 h-6 text-navy mx-auto mb-3" />
                <h4 className="font-heading text-lg font-semibold text-foreground">Chưa có chuyên đề học thuật phù hợp</h4>
                <p className="font-body text-sm text-muted-foreground mt-2">
                  Khi bạn thêm bài viết mới vào thư viện nội dung, trang này sẽ tự hiển thị để người học truy cập và đăng ký học.
                </p>
                <div className="mt-4">
                  <Button asChild variant="outline">
                    <Link to="/yeu-cau-bao-gia">Yêu cầu mở chuyên đề mới</Link>
                  </Button>
                </div>
              </div>
            )}

            <div className="p-6 rounded-2xl border border-gold/30 bg-gradient-to-r from-gold/10 via-transparent to-navy/10">
              <h4 className="font-heading text-xl font-semibold text-foreground">Đăng ký học sau mỗi chuyên đề</h4>
              <p className="font-body text-muted-foreground mt-2 leading-relaxed">
                Kiến Hưng thiết kế lộ trình cá nhân hóa theo từng chủ đề bạn vừa đọc: từ lớp nền tảng, workshop thực
                hành đến coaching 1-1 cho đội ngũ.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button asChild>
                  <Link to="/dat-lich-hen">Đặt lịch tư vấn học tập</Link>
                </Button>
                <Button asChild variant="outline">
                  <a href="mailto:contact@kienhunginvest.com?subject=Dang%20ky%20lo%20trinh%20hoc%20sau%20chuyen%20de">
                    Gửi yêu cầu qua email
                  </a>
                </Button>
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
