import { Link, useLoaderData } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SEO } from "@/components/SEO";
import { SectionReveal } from "@/components/effects";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQGroup = {
  id: string;
  title: string;
  items: FAQItem[];
};

export const faqGroups: FAQGroup[] = [
  {
    id: "cau-hoi-chung",
    title: "Câu hỏi chung về công ty",
    items: [
      {
        question: "Kiến Hưng Investment hoạt động trong những lĩnh vực nào?",
        answer: "Kiến Hưng Investment cung cấp dịch vụ trong 5 lĩnh vực: thương mại & phân phối, công nghệ thông tin, quảng cáo & marketing, logistics, và giáo dục & đào tạo. Doanh nghiệp có thể sử dụng riêng lẻ từng dịch vụ hoặc kết hợp nhiều lĩnh vực theo nhu cầu.",
      },
      {
        question: "Làm sao để bắt đầu hợp tác với Kiến Hưng?",
        answer: "Bạn có thể gọi hotline 0903 103 198, điền form \"Liên hệ tư vấn\" trên website, hoặc đặt lịch hẹn trực tiếp tại văn phòng (MP2-3.11 Mizuki Park, Bình Hưng, TP.HCM). Đội ngũ sẽ liên hệ lại sớm nhất để trao đổi nhu cầu cụ thể.",
      },
      {
        question: "Kiến Hưng có nhận dự án quy mô nhỏ/khách hàng mới không?",
        answer: "Có. Kiến Hưng phục vụ cả doanh nghiệp vừa và nhỏ lẫn dự án lớn, tuỳ chỉnh mô hình hợp tác theo ngân sách và quy mô thực tế của khách hàng.",
      },
      {
        question: "Chi phí dịch vụ được tính như thế nào?",
        answer: "Chi phí phụ thuộc vào phạm vi công việc cụ thể của từng lĩnh vực. Sau khi trao đổi nhu cầu, Kiến Hưng sẽ gửi báo giá chi tiết, minh bạch, không phát sinh phí ẩn.",
      },
    ],
  },
  {
    id: "thuong-mai-phan-phoi",
    title: "Thương mại & Phân phối",
    items: [
      {
        question: "Kiến Hưng hỗ trợ những hình thức phân phối nào?",
        answer: "Kết nối nguồn cung, xây dựng kênh bán hàng B2B, hỗ trợ doanh nghiệp mở rộng thị trường phân phối hàng hoá trong nước.",
      },
      {
        question: "Doanh nghiệp mới thành lập có thể sử dụng dịch vụ phân phối không?",
        answer: "Có. Kiến Hưng hỗ trợ cả doanh nghiệp mới lẫn doanh nghiệp đang mở rộng quy mô, tư vấn kênh phân phối phù hợp với từng giai đoạn phát triển.",
      },
      {
        question: "Thời gian triển khai một kênh phân phối mới mất bao lâu?",
        answer: "Tuỳ độ phức tạp của ngành hàng và thị trường mục tiêu, đội ngũ sẽ trao đổi mốc thời gian cụ thể ngay từ buổi tư vấn đầu tiên.",
      },
    ],
  },
  {
    id: "cong-nghe-thong-tin",
    title: "Công nghệ thông tin",
    items: [
      {
        question: "Kiến Hưng cung cấp những dịch vụ CNTT nào?",
        answer: "Giải pháp phần mềm theo yêu cầu, tự động hoá quy trình vận hành, tư vấn chuyển đổi số cho doanh nghiệp vừa và nhỏ.",
      },
      {
        question: "Doanh nghiệp chưa có bộ phận IT có sử dụng được dịch vụ không?",
        answer: "Có, đây là nhóm khách hàng phù hợp nhất - Kiến Hưng đóng vai trò như bộ phận IT thuê ngoài, không cần doanh nghiệp tự tuyển dụng đội ngũ kỹ thuật riêng.",
      },
      {
        question: "Chuyển đổi số có phù hợp với doanh nghiệp truyền thống không?",
        answer: "Có. Kiến Hưng tư vấn lộ trình chuyển đổi số theo từng giai đoạn, phù hợp với cả doanh nghiệp đang vận hành theo mô hình truyền thống, không yêu cầu thay đổi toàn bộ hệ thống ngay lập tức.",
      },
      {
        question: "Có hỗ trợ bảo trì sau khi triển khai không?",
        answer: "Có, Kiến Hưng hỗ trợ vận hành và bảo trì sau triển khai, đảm bảo hệ thống hoạt động ổn định lâu dài.",
      },
    ],
  },
  {
    id: "quang-cao-marketing",
    title: "Quảng cáo & Marketing",
    items: [
      {
        question: "Kiến Hưng có nhận chạy quảng cáo cho ngành hàng đặc thù không?",
        answer: "Có, đội ngũ nghiên cứu thị trường trước khi lên kế hoạch, đảm bảo phù hợp với đặc thù từng ngành hàng của khách hàng.",
      },
      {
        question: "Báo cáo hiệu quả chiến dịch được cập nhật thế nào?",
        answer: "Kiến Hưng cung cấp báo cáo định kỳ theo giai đoạn, minh bạch số liệu và chỉ số đo lường cụ thể, không chỉ báo cáo tổng kết cuối chiến dịch.",
      },
      {
        question: "Ngân sách tối thiểu để triển khai một chiến dịch là bao nhiêu?",
        answer: "Ngân sách linh hoạt theo mục tiêu và kênh triển khai - Kiến Hưng tư vấn phương án phù hợp với ngân sách thực tế của từng doanh nghiệp, không áp đặt mức tối thiểu cứng.",
      },
    ],
  },
  {
    id: "logistics",
    title: "Logistics",
    items: [
      {
        question: "Kiến Hưng hỗ trợ tối ưu vận chuyển cho những loại hàng hoá nào?",
        answer: "Tối ưu vận chuyển, vận hành đội xe và hỗ trợ tuyến giao hàng cho đa dạng loại hàng hoá, tuỳ theo nhu cầu vận hành của doanh nghiệp.",
      },
      {
        question: "Có hỗ trợ cho thuê xe/đội xe không?",
        answer: "Có, đây là một trong những dịch vụ chính của mảng Logistics & Cho thuê xe.",
      },
      {
        question: "Làm sao để biết chi phí logistics tiết kiệm được bao nhiêu?",
        answer: "Kiến Hưng khảo sát hiện trạng vận hành của doanh nghiệp trước, từ đó đề xuất phương án tối ưu và ước tính mức tiết kiệm cụ thể trước khi triển khai.",
      },
    ],
  },
  {
    id: "giao-duc-dao-tao",
    title: "Giáo dục & Đào tạo",
    items: [
      {
        question: "Kiến Hưng đào tạo những kỹ năng nào?",
        answer: "Đào tạo kỹ năng nghề nghiệp, phát triển nhân lực, xây dựng lộ trình học thực tế theo nhu cầu doanh nghiệp hoặc cá nhân.",
      },
      {
        question: "Doanh nghiệp có thể đặt chương trình đào tạo riêng cho nhân viên không?",
        answer: "Có, Kiến Hưng thiết kế chương trình đào tạo theo yêu cầu riêng của từng doanh nghiệp, không chỉ có khoá học cố định.",
      },
      {
        question: "Kiến Hưng có đào tạo kỹ năng AI cho doanh nghiệp không?",
        answer: "Có. Kiến Hưng xây dựng chương trình đào tạo kỹ năng ứng dụng AI vào công việc thực tế - từ sử dụng công cụ AI phổ biến đến tích hợp AI vào quy trình vận hành doanh nghiệp, phù hợp cho cả nhân sự chưa có nền tảng kỹ thuật.",
      },
    ],
  },
];

export type FAQLoaderData = {
  groups: FAQGroup[];
};

export async function loader(): Promise<FAQLoaderData> {
  return { groups: faqGroups };
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqGroups.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  ),
};

export default function FAQ() {
  const loaderData = useLoaderData() as FAQLoaderData | null | undefined;
  const groups = loaderData?.groups ?? faqGroups;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Câu hỏi thường gặp - Kiến Hưng Investment"
        description="Giải đáp câu hỏi về thương mại, CNTT, quảng cáo, logistics, giáo dục và cách hợp tác cùng Kiến Hưng Investment."
        canonicalPath="/hoi-dap"
        ogImage="/logo-512.png"
      />
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <section className="border-b border-border bg-navy text-primary-foreground">
          <div className="container mx-auto px-6 py-16 lg:px-12 lg:py-24">
            <p className="mb-3 font-body text-sm uppercase tracking-[0.18em] text-gold">Trung tâm tri thức</p>
            <h1 className="max-w-3xl font-heading text-3xl font-bold leading-tight md:text-5xl">Câu hỏi thường gặp</h1>
            <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-primary-foreground/75">
              Tìm câu trả lời nhanh về 5 lĩnh vực hoạt động, cách bắt đầu hợp tác và các giải pháp Kiến Hưng cung cấp cho doanh nghiệp.
            </p>
          </div>
        </section>

        <section className="py-14 lg:py-20">
          <div className="container mx-auto space-y-10 px-6 lg:px-12">
            {groups.map((group) => (
              <SectionReveal key={group.id}>
                <section id={group.id} className="scroll-mt-28 rounded-2xl border border-border bg-card p-5 shadow-soft md:p-7">
                  <h2 className="font-heading text-2xl font-bold text-foreground">{group.title}</h2>
                  <Accordion type="single" collapsible className="mt-4">
                    {group.items.map((item, index) => (
                      <AccordionItem key={item.question} value={`${group.id}-${index}`}>
                        <AccordionTrigger className="text-left font-heading text-base text-foreground hover:no-underline">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="font-body leading-relaxed text-muted-foreground">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </section>
              </SectionReveal>
            ))}
          </div>
        </section>

        <section className="border-y border-border bg-secondary/50 py-12">
          <div className="container mx-auto flex flex-col items-start justify-between gap-5 px-6 md:flex-row md:items-center lg:px-12">
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground">Bạn chưa tìm thấy câu trả lời?</h2>
              <p className="mt-2 font-body text-muted-foreground">Đội ngũ Kiến Hưng sẵn sàng trao đổi theo nhu cầu cụ thể của doanh nghiệp.</p>
            </div>
            <Link to="/lien-he" className="btn-link whitespace-nowrap">Liên hệ tư vấn →</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
