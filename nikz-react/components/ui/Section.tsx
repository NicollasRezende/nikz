// components/ui/Section.tsx
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  className?: string;
  children: ReactNode;
}

export function Section({ id, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 px-4 md:py-28 scroll-mt-20",
        className
      )}
    >
      <div className="container mx-auto max-w-6xl">
        {children}
      </div>
    </section>
  );
}
