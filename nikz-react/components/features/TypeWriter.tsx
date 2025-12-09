// components/features/TypeWriter.tsx
"use client";

import { useTypewriter } from "@/hooks/useTypewriter";

interface TypeWriterProps {
  texts: string[];
  className?: string;
}

export function TypeWriter({ texts, className }: TypeWriterProps) {
  const displayText = useTypewriter({ texts });

  return (
    <span className={className}>
      {displayText}
      <span className="animate-blink">|</span>
    </span>
  );
}
