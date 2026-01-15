import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { LegalSection } from "@/components/LegalSection";
import { ContactSection } from "@/components/ContactSection";
import { LeadCaptureSection } from "@/components/LeadCaptureSection";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { BookingSection } from "@/components/BookingSection";
import { SocialHighlightsSection } from "@/components/SocialHighlightsSection";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";

const faqItems = [
  {
    question: "Kiến Hưng Invest là doanh nghiệp hoạt động trong lĩnh vực nào?",
    answer:
      "Kiến Hưng Invest là doanh nghiệp hoạt động trong các lĩnh vực đầu tư, thương mại và cung cấp dịch vụ. Chúng tôi tập trung vào việc hợp tác, phát triển dự án và cung ứng giải pháp phù hợp với nhu cầu của đối tác và thị trường tại Việt Nam.",
  },
  {
    question: "Kiến Hưng Invest có cung cấp dịch vụ đầu tư cho cá nhân và doanh nghiệp không?",
    answer:
      "Kiến Hưng Invest hợp tác với cả cá nhân và doanh nghiệp có nhu cầu đầu tư, phát triển dự án hoặc mở rộng hoạt động kinh doanh. Hình thức hợp tác và phạm vi tham gia sẽ được trao đổi cụ thể dựa trên từng dự án và điều kiện thực tế.",
  },
  {
    question: "Lĩnh vực thương mại của Kiến Hưng Invest bao gồm những gì?",
    answer:
      "Trong lĩnh vực thương mại, Kiến Hưng Invest tham gia hoạt động phân phối, mua bán và kết nối hàng hóa, thiết bị và sản phẩm phù hợp với định hướng kinh doanh của công ty, tuân thủ đầy đủ các quy định pháp luật hiện hành.",
  },
  {
    question: "Kiến Hưng Invest có hỗ trợ tư vấn và triển khai dự án không?",
    answer:
      "Có. Kiến Hưng Invest cung cấp dịch vụ tư vấn, hỗ trợ triển khai và phối hợp thực hiện dự án theo nhu cầu của đối tác, bao gồm các nội dung liên quan đến kế hoạch đầu tư, phương án kinh doanh và tổ chức thực hiện.",
  },
  {
    question: "Làm thế nào để liên hệ hoặc đề xuất hợp tác với Kiến Hưng Invest?",
    answer:
      "Quý khách và đối tác có thể liên hệ với Kiến Hưng Invest thông qua thông tin liên hệ trên website chính thức hoặc gửi yêu cầu qua email. Đội ngũ của chúng tôi sẽ phản hồi và trao đổi trong thời gian sớm nhất.",
  },
  {
    question: "Kiến Hưng Invest có hoạt động trên phạm vi toàn quốc không?",
    answer:
      "Kiến Hưng Invest triển khai hoạt động và hợp tác với đối tác tại nhiều khu vực trên toàn quốc, tùy theo tính chất và yêu cầu của từng dự án cụ thể.",
  },
  {
    question: "Thông tin trên website của Kiến Hưng Invest có được cập nhật thường xuyên không?",
    answer:
      "Các thông tin trên website được cập nhật định kỳ nhằm phản ánh đúng định hướng hoạt động, lĩnh vực kinh doanh và các nội dung liên quan đến Kiến Hưng Invest.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Kiến Hưng Investment | Đầu tư, thương mại, dịch vụ tại Việt Nam"
        description="Kiến Hưng Investment cung cấp giải pháp đầu tư, thương mại, logistics, CNTT, marketing và đào tạo nghề. Hợp tác linh hoạt, tập trung hiệu quả."
        keywords="đầu tư, thương mại, dịch vụ, logistics, CNTT, marketing, đào tạo nghề, học AI, học lái xe, thiết bị"
        canonical="https://kienhunginvest.com/"
        image="https://kienhunginvest.com/favicon.jpg"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqItems.map((item) => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer,
            },
          })),
        }}
      />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <LeadCaptureSection />
        <CaseStudiesSection />
        <NewsletterSection />
        <BookingSection />
        <SocialHighlightsSection />
        <section className="py-16 lg:py-20 bg-secondary/30">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-3xl">
              <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">Hỏi đáp</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Câu hỏi thường gặp về Kiến Hưng Investment
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Tổng hợp các câu hỏi phổ biến về lĩnh vực hoạt động, hình thức hợp tác và cách liên hệ với Kiến Hưng Investment.
              </p>
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              {faqItems.map((item) => (
                <div key={item.question} className="rounded-xl border border-border bg-card p-6 shadow-soft">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-3">{item.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <LegalSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
