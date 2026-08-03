import * as React from "react";
import { motion, type HTMLMotionProps, useInView, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type SectionRevealProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: React.ReactNode;
  delay?: number;
};

export function SectionReveal({ children, className, delay = 0, ...props }: SectionRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
      animate={shouldReduceMotion || isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
