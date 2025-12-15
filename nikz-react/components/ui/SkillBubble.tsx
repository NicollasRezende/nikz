// components/ui/SkillBubble.tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkillBubbleProps {
  icon: string;
  name: string;
  level?: number;
  delay?: number;
  size?: "small" | "medium" | "large";
}

export function SkillBubble({
  icon,
  name,
  level = 80,
  delay = 0,
  size = "medium",
}: SkillBubbleProps) {
  const sizeClasses = {
    small: "w-20 h-20 text-2xl",
    medium: "w-24 h-24 text-3xl",
    large: "w-32 h-32 text-4xl",
  };

  const circumference = 2 * Math.PI * 35;
  const strokeDashoffset = circumference - (level / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      className="relative group cursor-pointer"
    >
      {/* SVG Circle Progress */}
      <svg
        className={cn("absolute inset-0", sizeClasses[size])}
        viewBox="0 0 80 80"
      >
        {/* Background circle */}
        <circle
          cx="40"
          cy="40"
          r="35"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="4"
        />
        {/* Progress circle */}
        <motion.circle
          cx="40"
          cy="40"
          r="35"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: delay + 0.3 }}
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />
        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00c6ff" />
            <stop offset="50%" stopColor="#4d8cff" />
            <stop offset="100%" stopColor="#9d5cfc" />
          </linearGradient>
        </defs>
      </svg>

      {/* Icon and content */}
      <div
        className={cn(
          "relative flex flex-col items-center justify-center rounded-full",
          "bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl",
          "border border-white/20 transition-all duration-300",
          "group-hover:border-cyan-500/50 group-hover:shadow-[0_0_20px_rgba(0,198,255,0.4)]",
          sizeClasses[size]
        )}
      >
        <i className={cn(icon, "mb-1 transition-transform group-hover:scale-110")} />
        <span className="text-[10px] font-medium text-center px-1 leading-tight">
          {name}
        </span>
      </div>

      {/* Floating glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 blur-xl -z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Skill level tooltip */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
          {level}%
        </div>
      </div>
    </motion.div>
  );
}
