// components/features/ProjectFilter.tsx
"use client";

import { useProjectStore } from "@/store/useProjectStore";
import { getUniqueLanguages } from "@/lib/github";
import { cn } from "@/lib/utils";

export function ProjectFilter() {
  const { projects, filter, setFilter } = useProjectStore();
  const languages = getUniqueLanguages(projects);

  return (
    <div className="flex justify-center flex-wrap gap-3 mb-8">
      <button
        onClick={() => setFilter("all")}
        className={cn(
          "px-6 py-3 rounded-xl font-semibold transition-all duration-300 relative z-10",
          filter === "all"
            ? "bg-linear-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50"
            : "bg-light-bg-tertiary/90 dark:bg-slate-800/90 text-light-text-primary dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 border border-light-card-border dark:border-slate-700/50 hover:border-cyan-500/50"
        )}
      >
        Todos
      </button>

      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => setFilter(lang)}
          className={cn(
            "px-6 py-3 rounded-xl font-semibold transition-all duration-300 relative z-10",
            filter === lang
              ? "bg-linear-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50"
              : "bg-light-bg-tertiary/90 dark:bg-slate-800/90 text-light-text-primary dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 border border-light-card-border dark:border-slate-700/50 hover:border-cyan-500/50"
          )}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}
