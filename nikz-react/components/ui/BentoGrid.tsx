// components/ui/BentoGrid.tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

interface BentoItemProps {
  children: React.ReactNode;
  className?: string;
  span?: "small" | "medium" | "large" | "full";
  glowColor?: "cyan" | "blue" | "purple";
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoItem({
  children,
  className,
  span = "medium",
  glowColor = "cyan",
}: BentoItemProps) {
  const spanClasses = {
    small: "md:col-span-1 md:row-span-1",
    medium: "md:col-span-2 md:row-span-1",
    large: "md:col-span-2 md:row-span-2",
    full: "md:col-span-4 md:row-span-1",
  };

  const glowClasses = {
    cyan: "hover:shadow-[0_0_30px_rgba(0,198,255,0.3)]",
    blue: "hover:shadow-[0_0_30px_rgba(77,140,255,0.3)]",
    purple: "hover:shadow-[0_0_30px_rgba(157,92,252,0.3)]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className={cn(
        "relative overflow-hidden rounded-2xl",
        "bg-white/5 backdrop-blur-lg border border-white/10",
        "transition-all duration-300",
        glowClasses[glowColor],
        spanClasses[span],
        className
      )}
    >
      {children}
    </motion.div>
  );
}
