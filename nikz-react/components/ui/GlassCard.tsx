// components/ui/GlassCard.tsx
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({
  children,
  className,
  hover = true,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "backdrop-blur-lg rounded-2xl p-6",
        "bg-white/10 dark:bg-black/20",
        "border border-white/20 dark:border-white/10",
        "shadow-xl",
        hover &&
          "transition-all duration-300 hover:shadow-2xl hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  );
}
