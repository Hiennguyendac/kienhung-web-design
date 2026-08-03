import * as React from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  strength?: number;
  disabled?: boolean;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href">;

export function MagneticButton({
  children,
  href,
  className,
  strength = 0.28,
  disabled,
  onMouseMove,
  onMouseLeave,
  ...props
}: MagneticButtonProps) {
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.4 });

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    onMouseMove?.(event as React.MouseEvent<HTMLButtonElement> & React.MouseEvent<HTMLAnchorElement>);

    if (shouldReduceMotion || disabled) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);

    x.set(offsetX * strength);
    y.set(offsetY * strength);
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    onMouseLeave?.(event as React.MouseEvent<HTMLButtonElement> & React.MouseEvent<HTMLAnchorElement>);
    x.set(0);
    y.set(0);
  };

  const sharedProps = {
    className: cn(
      "inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-navy-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      className,
    ),
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: shouldReduceMotion ? undefined : { x: springX, y: springY },
  };

  if (href) {
    return (
      <motion.a href={href} {...sharedProps} {...props}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type="button" disabled={disabled} {...sharedProps} {...props}>
      {children}
    </motion.button>
  );
}
