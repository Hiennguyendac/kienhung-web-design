import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Điện thoại",
    content: "0903 103 198",
    subContent: "Hotline 24/7",
  },
  {
    icon: Mail,
    title: "Email",
    content: "contact@kienhunginvest.vn",
    subContent: "Phản hồi trong 24h",
  },
  {
    icon: MapPin,
    title: "Trụ sở chính",
    content: "35/29/11 Cao Lỗ, P. Chánh Hưng",
    subContent: "TP. Hồ Chí Minh",
  },
  {
    icon: MapPin,
    title: "Văn phòng",
    content: "MP2-3.11 Mizuki Park, Bình Hưng",
    subContent: "TP. Hồ Chí Minh",
  },
];

export const ContactSection = () => {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-gold font-body text-sm tracking-widest uppercase mb-4">
              Liên hệ
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground font-bold mb-6">
              Kết nối với chúng tôi
            </h2>
            <p className="font-body text-muted-foreground text-lg mb-10">
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ quý khách hàng, đối tác. 
              Hãy liên hệ để được tư vấn chi tiết.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-navy/10 flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-5 h-5 text-navy" />
                  </div>
                  <div>
                    <p className="font-body text-sm text-muted-foreground mb-1">
                      {info.title}
                    </p>
                    <p className="font-body font-medium text-foreground">
                      {info.content}
                    </p>
                    <p className="font-body text-sm text-muted-foreground">
                      {info.subContent}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-card border border-border shadow-elevated"
          >
            <h3 className="font-heading text-xl font-semibold text-foreground mb-6">
              Gửi yêu cầu liên hệ
            </h3>
            <form className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-body text-sm font-medium text-foreground mb-2">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors"
                    placeholder="Nhập họ và tên"
                  />
                </div>
                <div>
                  <label className="block font-body text-sm font-medium text-foreground mb-2">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
              </div>
              <div>
                <label className="block font-body text-sm font-medium text-foreground mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors"
                  placeholder="Nhập địa chỉ email"
                />
              </div>
              <div>
                <label className="block font-body text-sm font-medium text-foreground mb-2">
                  Công ty/Tổ chức
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors"
                  placeholder="Nhập tên công ty (nếu có)"
                />
              </div>
              <div>
                <label className="block font-body text-sm font-medium text-foreground mb-2">
                  Nội dung yêu cầu *
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors resize-none"
                  placeholder="Mô tả yêu cầu của bạn..."
                />
              </div>
              <Button variant="default" size="lg" className="w-full">
                Gửi yêu cầu
              </Button>
              <p className="font-body text-xs text-muted-foreground text-center">
                Chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
