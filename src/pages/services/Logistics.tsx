import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Clock4, Navigation, Route, Truck, Warehouse } from "lucide-react";
import heroImage from "@/assets/hero-building.jpg";

const offerings = [
  "Vận tải hàng hóa nội địa, giao nhận nhanh, tối ưu chi phí tuyến cố định.",
  "Quản lý kho bãi, kiểm kê và đóng gói tiêu chuẩn, dán nhãn, vận hành an toàn.",
  "Cho thuê xe doanh nghiệp, tài xế chuyên nghiệp, lịch trình linh hoạt.",
  "Giải pháp logistics trọn gói: lập kế hoạch, theo dõi, báo cáo và cảnh báo sớm.",
];

const strengths = [
  { icon: Truck, title: "Đội xe đa dạng", desc: "Nhiều chủng loại xe, phù hợp nhu cầu chở hàng và di chuyển doanh nghiệp." },
  { icon: Clock4, title: "Đúng hẹn", desc: "Theo dõi hành trình thời gian thực, cam kết thời gian giao nhận." },
  { icon: Route, title: "Tối ưu lộ trình", desc: "Quy hoạch tuyến đường, giảm chi phí nhiên liệu và thời gian chờ." },
];

const LogisticsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImage} alt="Logistics & Vận tải" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/75 to-transparent" />
          </div>
          <div className="relative container mx-auto px-6 lg:px-12 py-16 lg:py-24 text-primary-foreground">
            <p className="text-gold font-body text-sm tracking-widest uppercase mb-3">Lĩnh vực</p>
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <h1 className="font-heading text-3xl md:text-4xl font-bold leading-tight">Vận tải - Logistics - Cho thuê xe</h1>
              <Button variant="heroSolid" size="lg">Nhận bảng giá</Button>
            </div>
            <p className="font-body text-lg text-primary-foreground/80 max-w-3xl mt-4 leading-relaxed">
              Giải pháp logistics và vận tải tin cậy, đáp ứng yêu cầu tốc độ, an toàn và tối ưu chi phí cho doanh nghiệp.
            </p>
            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {[
                { label: "Tuyến vận hành", value: "30+" },
                { label: "Tỷ lệ đúng hẹn", value: "98%" },
                { label: "Khách hàng doanh nghiệp", value: "50+" },
              ].map((item) => (
                <div key={item.label} className="p-4 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20">
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
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">Vận hành linh hoạt, an toàn</h2>
              <p className="font-body text-muted-foreground mb-6 leading-relaxed">
                Kiến Hưng cung cấp dịch vụ vận tải và logistics từ kho đến cửa, kiểm soát chặt chẽ chất lượng và thời gian, phù hợp nhiều ngành hàng.
              </p>
              <div className="space-y-4">
                {offerings.map((item) => (
                  <div key={item} className="p-4 rounded-lg border border-border bg-card shadow-soft">
                    <div className="flex items-start gap-3">
                      <Navigation className="w-5 h-5 text-navy mt-0.5" />
                      <p className="font-body text-foreground leading-relaxed">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-secondary/50 border border-border shadow-elevated">
              <div className="flex items-center gap-3 mb-4">
                <Warehouse className="w-6 h-6 text-navy" />
                <h3 className="font-heading text-lg font-semibold">Điểm mạnh vận hành</h3>
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

        <section className="py-14 lg:py-18 bg-secondary/60 border-y border-border">
          <div className="container mx-auto px-6 lg:px-12 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-3">Đặt lịch vận chuyển</h3>
              <p className="font-body text-muted-foreground leading-relaxed max-w-2xl">
                Cho thuê xe và dịch vụ logistics theo nhu cầu cụ thể, lịch trình linh hoạt cho doanh nghiệp.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="default" size="lg">Liên hệ ngay</Button>
              <Button variant="outline" size="lg">Nhận báo giá</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LogisticsPage;
