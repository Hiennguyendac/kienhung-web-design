import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Shield, Award } from "lucide-react";
import heroImage from "@/assets/kien-hung-hero.jpg";

const highlights = [
  { icon: Building2, text: "Doanh nghiệp uy tín" },
  { icon: Shield, text: "Hoạt động minh bạch" },
  { icon: Award, text: "Đối tác tin cậy" },
];

export const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Trụ sở Công ty Kiến Hưng Investment"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-hero opacity-85" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-20">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gold font-body text-sm tracking-widest uppercase mb-4"
          >
            Công ty TNHH Thương mại Dịch vụ Đầu tư
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary-foreground font-bold leading-tight mb-6"
          >
            KIẾN HƯNG
            <span className="block text-gold">INVESTMENT</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-body text-lg md:text-xl text-primary-foreground/85 max-w-2xl mb-8 leading-relaxed"
          >
            Đối tác đáng tin cậy trong lĩnh vực thương mại, công nghệ thông tin, 
            quảng cáo và dịch vụ logistics. Chúng tôi cam kết mang đến giá trị 
            bền vững cho khách hàng và đối tác.
          </motion.p>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-6 mb-10"
          >
            {highlights.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-primary-foreground/80">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-gold" />
                </div>
                <span className="font-body text-sm">{item.text}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button variant="heroSolid" size="xl" className="group">
              Tìm hiểu thêm
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="hero" size="xl">
              Liên hệ hợp tác
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
