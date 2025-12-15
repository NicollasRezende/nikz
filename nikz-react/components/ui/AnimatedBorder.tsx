// components/ui/AnimatedBorder.tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedBorderProps {
  children: React.ReactNode;
  className?: string;
  borderWidth?: number;
  animationDuration?: number;
}

export function AnimatedBorder({
  children,
  className,
  borderWidth = 2,
  animationDuration = 3,
}: AnimatedBorderProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Animated border gradient */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background:
            "linear-gradient(120deg, #00c6ff, #4d8cff, #9d5cfc, #ff56b1, #00c6ff)",
          backgroundSize: "300% 300%",
          padding: `${borderWidth}px`,
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: animationDuration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="w-full h-full bg-dark-bg rounded-2xl" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

interface GlowingLineProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
  color?: "cyan" | "blue" | "purple";
}

export function GlowingLine({
  orientation = "horizontal",
  className,
  color = "cyan",
}: GlowingLineProps) {
  const colorClasses = {
    cyan: "from-transparent via-cyan-500 to-transparent",
    blue: "from-transparent via-blue-500 to-transparent",
    purple: "from-transparent via-purple-500 to-transparent",
  };

  const glowColors = {
    cyan: "shadow-[0_0_20px_rgba(0,198,255,0.6)]",
    blue: "shadow-[0_0_20px_rgba(77,140,255,0.6)]",
    purple: "shadow-[0_0_20px_rgba(157,92,252,0.6)]",
  };

  return (
    <motion.div
      initial={{ scaleX: orientation === "horizontal" ? 0 : 1, scaleY: orientation === "vertical" ? 0 : 1 }}
      whileInView={{ scaleX: 1, scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={cn(
        "bg-gradient-to-r",
        colorClasses[color],
        glowColors[color],
        orientation === "horizontal" ? "h-0.5 w-full" : "w-0.5 h-full",
        className
      )}
    />
  );
}
