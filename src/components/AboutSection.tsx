import { motion } from "framer-motion";
import { Target, Eye, Heart, CheckCircle } from "lucide-react";

const values = [
  "Uy tín trong kinh doanh",
  "Minh bạch trong hoạt động",
  "Chuyên nghiệp trong dịch vụ",
  "Tận tâm với khách hàng",
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-gold font-body text-sm tracking-widest uppercase mb-4">
              Về chúng tôi
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground font-bold leading-tight mb-6">
              Giới thiệu doanh nghiệp
            </h2>
            <p className="font-body text-muted-foreground text-lg mb-6 leading-relaxed">
              <strong className="text-foreground">CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ ĐẦU TƯ KIẾN HƯNG</strong> là 
              doanh nghiệp hoạt động đa lĩnh vực, được thành lập với mục tiêu 
              cung cấp các giải pháp toàn diện cho khách hàng doanh nghiệp và đối tác.
            </p>
            <p className="font-body text-muted-foreground mb-8 leading-relaxed">
              Với định hướng phát triển bền vững, chúng tôi không ngừng nâng cao 
              năng lực và mở rộng hợp tác, đồng thời tuân thủ nghiêm ngặt các 
              quy định pháp luật Việt Nam.
            </p>

            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                  <span className="font-body text-foreground">{value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Vision, Mission, Values */}
          <div className="grid gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl border border-border bg-card shadow-soft"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-navy/10 flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-navy" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                    Tầm nhìn
                  </h3>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed">
                    Trở thành doanh nghiệp đa ngành uy tín, có vị thế vững chắc 
                    trên thị trường Việt Nam và khu vực.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl border border-border bg-card shadow-soft"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-navy/10 flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-navy" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                    Sứ mệnh
                  </h3>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed">
                    Cung cấp giải pháp chất lượng, tạo giá trị bền vững cho 
                    khách hàng, đối tác và cộng đồng.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl border border-border bg-card shadow-soft"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-navy/10 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-navy" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                    Giá trị cốt lõi
                  </h3>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed">
                    Uy tín - Minh bạch - Chuyên nghiệp - Đổi mới - Hợp tác cùng phát triển.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
