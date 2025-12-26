import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const insights = [
  {
    category: "Market Outlook",
    title: "2024 Global Market Perspectives: Navigating uncertainty",
    excerpt: "Our investment strategists share their views on the key themes shaping markets in the year ahead.",
    readTime: "8 min read",
    date: "Dec 15, 2024",
  },
  {
    category: "Research",
    title: "The role of alternatives in a diversified portfolio",
    excerpt: "Exploring how alternative investments can enhance portfolio outcomes and manage risk.",
    readTime: "5 min read",
    date: "Dec 10, 2024",
  },
  {
    category: "ESG",
    title: "Sustainable investing: Beyond the headlines",
    excerpt: "A practical guide to integrating ESG factors into investment decision-making.",
    readTime: "6 min read",
    date: "Dec 5, 2024",
  },
];

export const InsightsSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-cream">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <p className="text-gold font-body text-sm tracking-widest uppercase mb-4">
              Latest Insights
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground">
              Expert perspectives
            </h2>
          </div>
          <Button variant="outline" size="lg" className="group w-fit">
            View All Insights
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>

        {/* Insights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <motion.article
              key={insight.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-background rounded-xl overflow-hidden shadow-soft hover:shadow-elevated transition-shadow duration-300"
            >
              {/* Card Image Placeholder */}
              <div className="aspect-[16/10] bg-gradient-to-br from-navy to-navy-light relative overflow-hidden">
                <div className="absolute inset-0 bg-gold/10 group-hover:bg-gold/20 transition-colors" />
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-gold text-navy-dark text-xs font-body font-medium rounded-full">
                    {insight.category}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="font-heading text-xl text-foreground mb-3 group-hover:text-gold transition-colors line-clamp-2">
                  {insight.title}
                </h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                  {insight.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground font-body">
                  <span>{insight.date}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {insight.readTime}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
