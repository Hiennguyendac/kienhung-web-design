import { motion } from "framer-motion";
import { FileText, MapPin, Phone, Mail, Globe, Building } from "lucide-react";

const legalInfo = [
  {
    icon: Building,
    label: "Tên công ty",
    value: "CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ ĐẦU TƯ KIẾN HƯNG",
  },
  {
    icon: FileText,
    label: "Mã số thuế",
    value: "0317197517",
  },
  {
    icon: MapPin,
    label: "Trụ sở chính",
    value: "35/29/11 Cao Lỗ, P. Chánh Hưng, TP. Hồ Chí Minh",
  },
  {
    icon: MapPin,
    label: "Văn phòng",
    value: "MP2-3.11 Mizuki Park, Bình Hưng, TP. Hồ Chí Minh",
  },
  {
    icon: Phone,
    label: "Điện thoại",
    value: "0903 103 198",
  },
  {
    icon: Mail,
    label: "Email",
    value: "contact@kienhunginvest.vn",
  },
  {
    icon: Globe,
    label: "Website",
    value: "www.kienhunginvest.vn",
  },
];

export const LegalSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-navy">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold font-body text-sm tracking-widest uppercase mb-4">
            Thông tin doanh nghiệp
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-primary-foreground font-bold mb-6">
            Thông tin pháp lý
          </h2>
          <p className="font-body text-primary-foreground/70 text-lg max-w-2xl mx-auto">
            Kiến Hưng Investment cam kết hoạt động minh bạch, tuân thủ đầy đủ 
            các quy định pháp luật Việt Nam.
          </p>
        </motion.div>

        {/* Legal Info Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {legalInfo.map((info, index) => (
            <motion.div
              key={info.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-body text-sm text-primary-foreground/60 mb-1">
                    {info.label}
                  </p>
                  <p className="font-body font-medium text-primary-foreground">
                    {info.value}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certificate Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="font-body text-sm text-primary-foreground/60">
            * Giấy chứng nhận đăng ký doanh nghiệp do Sở Kế hoạch và Đầu tư cấp
          </p>
        </motion.div>
      </div>
    </section>
  );
};
