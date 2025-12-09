// components/ui/SectionHeader.tsx
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  className?: string;
}

export function SectionHeader({ title, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-12 text-center", className)}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        {title}
      </h2>
      <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full" />
    </div>
  );
}
