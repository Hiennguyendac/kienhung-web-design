import { motion } from "framer-motion";
import { ShoppingCart, Monitor, Megaphone, Truck, GraduationCap, ArrowRight } from "lucide-react";

const services = [
  {
    icon: ShoppingCart,
    title: "Thương mại & Phân phối",
    description: "Phân phối hàng hóa, thương mại xuất nhập khẩu, cung ứng sản phẩm cho doanh nghiệp.",
  },
  {
    icon: Monitor,
    title: "Công nghệ thông tin & Phần mềm",
    description: "Cung cấp giải pháp CNTT, phát triển phần mềm, tư vấn chuyển đổi số cho doanh nghiệp.",
  },
  {
    icon: Megaphone,
    title: "Quảng cáo & Nghiên cứu thị trường",
    description: "Dịch vụ quảng cáo, marketing, nghiên cứu và phân tích thị trường chuyên sâu.",
  },
  {
    icon: Truck,
    title: "Vận tải - Logistics - Cho thuê xe",
    description: "Dịch vụ vận chuyển, logistics, cho thuê xe doanh nghiệp với đội xe hiện đại.",
  },
  {
    icon: GraduationCap,
    title: "Giáo dục & Đào tạo",
    description: "Đào tạo kỹ năng, phát triển nguồn nhân lực cho doanh nghiệp và tổ chức.",
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="py-20 lg:py-28 bg-secondary/50">
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
            Dịch vụ của chúng tôi
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground font-bold mb-6">
            Lĩnh vực hoạt động
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            Kiến Hưng Investment hoạt động đa ngành nghề, cung cấp giải pháp 
            toàn diện đáp ứng nhu cầu đa dạng của khách hàng doanh nghiệp.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 rounded-xl bg-card border border-border hover:border-gold/30 hover:shadow-elevated transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-navy/10 flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors">
                <service.icon className="w-7 h-7 text-navy group-hover:text-gold transition-colors" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3 group-hover:text-navy transition-colors">
                {service.title}
              </h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-gold transition-colors group/link"
              >
                Tìm hiểu thêm
                <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
