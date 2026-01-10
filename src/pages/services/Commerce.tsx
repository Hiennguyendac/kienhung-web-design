import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Building2, Box, Globe2, Handshake, ShieldCheck } from "lucide-react";
import heroBuilding from "@/assets/hero-building.jpg";
import { Seo } from "@/components/Seo";

const offerings = [
  "Phân phối hàng hóa B2B, xây dựng kênh đại lý và đối tác chiến lược.",
  "Thương mại xuất nhập khẩu với tư vấn thủ tục, chứng từ và logistics trọn gói.",
  "Đàm phán, mua hộ, đấu thầu, quản lý hợp đồng và kiểm soát chất lượng.",
  "Tối ưu chuỗi cung ứng: dự báo nhu cầu, kế hoạch tồn kho, kiểm soát chi phí.",
];

const strengths = [
  { icon: ShieldCheck, title: "Uy tín & minh bạch", desc: "Quy trình kiểm soát rủi ro, hợp đồng chặt chẽ và báo cáo rõ ràng." },
  { icon: Handshake, title: "Mạng lưới đối tác", desc: "Hệ thống nhà cung cấp, đại lý trong và ngoài nước, hỗ trợ mở rộng kênh." },
  { icon: Globe2, title: "Hiểu thị trường", desc: "Nắm bắt quy định xuất nhập khẩu, xu hướng hàng hóa và giá cả." },
];

const CommercePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Thương mại & Phân phối | Kiến Hưng Investment"
        description="Dịch vụ thương mại & phân phối: xây kênh đại lý, tối ưu chuỗi cung ứng, xuất nhập khẩu, cung ứng thiết bị và hàng hóa B2B."
        keywords="thiết bị, thương mại, phân phối, đầu tư, chuỗi cung ứng"
        canonical="https://kienhunginvest.com/dich-vu/thuong-mai-phan-phoi"
        image="https://kienhunginvest.com/favicon.jpg"
      />
      <Header />
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroBuilding} alt="Kiến Hưng commerce hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/75 to-transparent" />
          </div>
          <div className="relative container mx-auto px-6 lg:px-12 py-16 lg:py-24 text-primary-foreground">
            <p className="text-gold font-body text-sm tracking-widest uppercase mb-3">Lĩnh vực</p>
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <h1 className="font-heading text-3xl md:text-4xl font-bold leading-tight">
                Thương mại & Phân phối
              </h1>
              <Button variant="heroSolid" size="lg" asChild>
                <Link to="/yeu-cau-bao-gia">Liên hệ hợp tác</Link>
              </Button>
            </div>
            <p className="font-body text-lg text-primary-foreground/80 max-w-3xl mt-4 leading-relaxed">
              Xây dựng kênh phân phối, tối ưu chuỗi cung ứng và hỗ trợ xuất nhập khẩu trọn gói,
              đảm bảo chất lượng và tốc độ giao hàng cho doanh nghiệp.
            </p>
            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {[
                { label: "Đối tác nhà cung cấp", value: "50+" },
                { label: "Dự án phân phối", value: "30+" },
                { label: "Tỉnh/thành phủ sóng", value: "20+" },
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
              <p className="text-gold font-body text-sm tracking-widest uppercase mb-3">Dịch vụ</p>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                Giải pháp thương mại trọn gói
              </h2>
              <p className="font-body text-muted-foreground mb-6 leading-relaxed">
                Từ khảo sát nhu cầu đến đàm phán, nhập hàng và phân phối, Kiến Hưng cung cấp giải pháp end-to-end
                với đội ngũ nhiều kinh nghiệm và quy trình kiểm soát chất lượng.
              </p>
              <div className="space-y-4">
                {offerings.map((item) => (
                  <div
                    key={item}
                    className="p-4 rounded-lg border border-border bg-card shadow-soft hover:-translate-y-1 hover:border-gold/40 hover:shadow-elevated transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <Box className="w-5 h-5 text-navy mt-0.5" />
                      <p className="font-body text-foreground leading-relaxed">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-card/90 border border-border shadow-elevated">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-6 h-6 text-navy" />
                <h3 className="font-heading text-lg font-semibold">Lợi thế cạnh tranh</h3>
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

        <section className="py-14 lg:py-18 bg-gradient-to-r from-secondary/80 via-secondary/40 to-gold/10 border-y border-border">
          <div className="container mx-auto px-6 lg:px-12 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-3">Bắt đầu dự án phân phối của bạn</h3>
              <p className="font-body text-muted-foreground leading-relaxed max-w-2xl">
                Liên hệ Kiến Hưng để được tư vấn mô hình phân phối, tính toán chi phí, thiết kế hợp đồng
                và triển khai nhanh chóng.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="default" size="lg" asChild>
                <Link to="/yeu-cau-bao-gia">Nhận tư vấn</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/yeu-cau-bao-gia">Tải profile dịch vụ</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CommercePage;
