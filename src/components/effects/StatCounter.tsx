import * as React from "react";
import { useInView, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type StatCounterProps = {
  value: number;
  suffix?: string;
  label: string;
  className?: string;
  duration?: number;
};

const formatValue = (value: number) => {
  const hasDecimal = !Number.isInteger(value);
  return new Intl.NumberFormat("vi-VN", {
    maximumFractionDigits: hasDecimal ? 1 : 0,
    minimumFractionDigits: hasDecimal ? 1 : 0,
  }).format(value);
};

export function StatCounter({ value, suffix = "", label, className, duration = 1200 }: StatCounterProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = React.useState(shouldReduceMotion ? value : 0);

  React.useEffect(() => {
    if (!isInView) return;

    if (shouldReduceMotion) {
      setDisplayValue(value);
      return;
    }

    let frameId = 0;
    const start = performance.now();

    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(value * eased);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [duration, isInView, shouldReduceMotion, value]);

  return (
    <div ref={ref} className={cn("space-y-2", className)}>
      <div className="font-mono text-4xl font-semibold tracking-normal text-foreground">
        {formatValue(displayValue)}
        {suffix}
      </div>
      <div className="font-mono text-xs font-medium uppercase tracking-normal text-muted-foreground">{label}</div>
    </div>
  );
}
