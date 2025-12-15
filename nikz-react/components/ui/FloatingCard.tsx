// components/ui/FloatingCard.tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  tiltEffect?: boolean;
  glowColor?: "cyan" | "blue" | "purple";
}

export function FloatingCard({
  children,
  className,
  delay = 0,
  tiltEffect = true,
  glowColor = "cyan",
}: FloatingCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltEffect) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotateX(rotateX);
    setRotateY(rotateY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const glowClasses = {
    cyan: "hover:shadow-[0_0_40px_rgba(0,198,255,0.4),0_0_60px_rgba(0,198,255,0.2)]",
    blue: "hover:shadow-[0_0_40px_rgba(77,140,255,0.4),0_0_60px_rgba(77,140,255,0.2)]",
    purple:
      "hover:shadow-[0_0_40px_rgba(157,92,252,0.4),0_0_60px_rgba(157,92,252,0.2)]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      className={cn(
        "relative overflow-hidden rounded-2xl",
        "bg-white/5 backdrop-blur-xl border border-white/10",
        "transition-all duration-300",
        glowClasses[glowColor],
        className
      )}
    >
      <div
        style={{ transform: "translateZ(50px)" }}
        className="relative z-10 p-6"
      >
        {children}
      </div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}
