import { Link } from "react-router-dom";
import { CalendarCheck, ShieldCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const points = [
  {
    title: "Tư vấn chuyên sâu",
    desc: "Đặt lịch 30-60 phút với chuyên gia theo ngành.",
    icon: ShieldCheck,
  },
  {
    title: "Lịch linh hoạt",
    desc: "Chọn khung giờ phù hợp trong 3 ngày làm việc gần nhất.",
    icon: Clock,
  },
  {
    title: "Xác nhận nhanh",
    desc: "Nhận email xác nhận và checklist chuẩn bị.",
    icon: CalendarCheck,
  },
];

export const BookingSection = () => {
  return (
    <section className="py-16 lg:py-20 bg-secondary/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="rounded-3xl border border-border bg-card p-8 lg:p-12 shadow-elevated">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <div>
              <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">Lịch hẹn online</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Đặt lịch tư vấn chiến lược ngay hôm nay
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Lựa chọn khung giờ phù hợp, đội ngũ Kiến Hưng sẽ chuẩn bị phương án tư vấn theo ngành.
              </p>
              <div className="mt-8 grid gap-4">
                {points.map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-navy/10 flex items-center justify-center text-navy">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-base text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6">
              <h3 className="font-heading text-xl text-foreground mb-3">Bạn đã sẵn sàng?</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Chọn lịch trực tuyến hoặc gửi yêu cầu để chúng tôi chủ động liên hệ.
              </p>
              <div className="flex flex-col gap-3">
                <Link to="/dat-lich-hen">
                  <Button size="lg" className="w-full">Đặt lịch hẹn</Button>
                </Link>
                <Link to="/yeu-cau-bao-gia">
                  <Button size="lg" variant="outline" className="w-full">Gửi yêu cầu tư vấn</Button>
                </Link>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Thời gian làm việc: Thứ 2 - Thứ 6 (8:00 - 17:30)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
