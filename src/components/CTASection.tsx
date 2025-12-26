import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-24 lg:py-32 bg-navy relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-gold font-body text-sm tracking-widest uppercase mb-6"
          >
            Let's Connect
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-6"
          >
            Ready to achieve your{" "}
            <span className="italic text-gold-light">investment goals</span>?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-body text-lg text-primary-foreground/70 mb-10 max-w-2xl mx-auto"
          >
            Our team of experts is here to help you navigate the complexities of investing 
            and build a portfolio tailored to your unique needs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="gold" size="xl" className="group">
              Schedule a Consultation
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="hero" size="xl" className="group">
              <Mail className="w-5 h-5" />
              Contact Our Team
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
