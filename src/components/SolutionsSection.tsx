import { motion } from "framer-motion";
import { ArrowRight, Building2, Users, LineChart, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const solutions = [
  {
    icon: Building2,
    title: "Institutional",
    description: "Custom solutions for pension funds, endowments, foundations, and other institutional investors.",
    link: "#",
  },
  {
    icon: Users,
    title: "Intermediary",
    description: "Partner with us to deliver outcome-oriented strategies for your clients.",
    link: "#",
  },
  {
    icon: LineChart,
    title: "Individual Investors",
    description: "Access institutional-quality investments through our funds and managed accounts.",
    link: "#",
  },
  {
    icon: Shield,
    title: "Retirement",
    description: "Comprehensive retirement solutions designed to help participants achieve their goals.",
    link: "#",
  },
];

export const SolutionsSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column - Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-32"
          >
            <p className="text-gold font-body text-sm tracking-widest uppercase mb-4">
              What We Offer
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-6">
              Investment solutions for every{" "}
              <span className="italic text-gold">journey</span>
            </h2>
            <p className="font-body text-muted-foreground text-lg mb-8 max-w-md">
              Whether you're an institution, advisor, or individual investor, we have 
              the expertise and solutions to help you reach your financial objectives.
            </p>
            <Button variant="default" size="lg" className="group">
              View All Solutions
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          {/* Right Column - Solutions Grid */}
          <div className="grid gap-6">
            {solutions.map((solution, index) => (
              <motion.a
                key={solution.title}
                href={solution.link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-6 lg:p-8 rounded-xl border border-border bg-card hover:border-gold/30 hover:shadow-elevated transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                    <solution.icon className="w-6 h-6 text-navy group-hover:text-gold transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-xl text-foreground mb-2 group-hover:text-gold transition-colors">
                      {solution.title}
                    </h3>
                    <p className="font-body text-muted-foreground text-sm leading-relaxed">
                      {solution.description}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-gold group-hover:translate-x-1 transition-all" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
