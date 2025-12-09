// components/ui/StatCard.tsx
import { GlassCard } from "./GlassCard";

interface StatCardProps {
  value: string;
  label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <GlassCard className="text-center">
      <h3 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
        {value}
      </h3>
      <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
        {label}
      </p>
    </GlassCard>
  );
}
