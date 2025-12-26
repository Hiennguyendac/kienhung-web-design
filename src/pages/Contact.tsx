import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { Button } from "@/components/ui/button";
import { MapPin, PhoneCall, Clock } from "lucide-react";

const quickContacts = [
  {
    icon: PhoneCall,
    title: "Hotline",
    content: "0903 103 198",
    note: "Hỗ trợ 24/7",
  },
  {
    icon: MapPin,
    title: "Văn phòng",
    content: "MP2-3.11 Mizuki Park, Bình Hưng, TP.HCM",
    note: "Tiếp khách theo lịch hẹn",
  },
  {
    icon: Clock,
    title: "Giờ làm việc",
    content: "Thứ 2 - Thứ 6: 8h00 - 17h30",
    note: "Thứ 7: 8h00 - 12h00",
  },
];

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="bg-secondary/50 border-b border-border">
          <div className="container mx-auto px-6 lg:px-12 py-14 lg:py-20">
            <div className="grid lg:grid-cols-[1.6fr,1fr] gap-10 items-center">
              <div>
                <p className="text-gold font-body text-sm tracking-widest uppercase mb-3">
                  Liên hệ
                </p>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Kết nối với Kiến Hưng Investment
                </h1>
                <p className="font-body text-lg text-muted-foreground leading-relaxed">
                  Cho dù bạn cần tư vấn giải pháp, hợp tác dự án hay hỗ trợ dịch vụ hiện có,
                  đội ngũ Kiến Hưng luôn sẵn sàng hỗ trợ.
                </p>
                <div className="mt-6 flex gap-4">
                  <Button variant="default" size="lg">
                    Gọi ngay
                  </Button>
                  <Button variant="outline" size="lg">
                    Đặt lịch hẹn
                  </Button>
                </div>
              </div>
              <div className="grid gap-4">
                {quickContacts.map((item) => (
                  <div
                    key={item.title}
                    className="p-5 rounded-xl bg-card border border-border shadow-soft flex gap-3"
                  >
                    <div className="w-11 h-11 rounded-lg bg-navy/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-navy" />
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-semibold text-foreground mb-1">
                        {item.title}
                      </h3>
                      <p className="font-body text-sm text-foreground">{item.content}</p>
                      <p className="font-body text-xs text-muted-foreground">{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
