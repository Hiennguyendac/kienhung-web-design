import * as React from "react";
import { useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type CursorGlowProps = React.HTMLAttributes<HTMLDivElement> & {
  glowClassName?: string;
};

export function CursorGlow({ children, className, glowClassName, onMouseMove, onMouseLeave, ...props }: CursorGlowProps) {
  const shouldReduceMotion = useReducedMotion();
  const [position, setPosition] = React.useState({ x: 50, y: 50 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    onMouseMove?.(event);

    if (shouldReduceMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    setPosition({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    onMouseLeave?.(event);

    if (!shouldReduceMotion) {
      setPosition({ x: 50, y: 50 });
    }
  };

  return (
    <div
      className={cn("relative overflow-hidden rounded-lg", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div
        aria-hidden="true"
        className={cn("pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-300", glowClassName)}
        style={{
          background: `radial-gradient(circle at ${position.x}% ${position.y}%, hsla(45 80% 55% / 0.28), transparent 34%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
