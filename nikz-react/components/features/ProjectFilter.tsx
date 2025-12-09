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
          "px-4 py-2 rounded-lg font-medium transition-all",
          filter === "all"
            ? "bg-gradient-primary text-white shadow-lg"
            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
        )}
      >
        Todos
      </button>

      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => setFilter(lang)}
          className={cn(
            "px-4 py-2 rounded-lg font-medium transition-all",
            filter === lang
              ? "bg-gradient-primary text-white shadow-lg"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          )}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}
