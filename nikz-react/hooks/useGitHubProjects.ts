// hooks/useGitHubProjects.ts
"use client";

import { useEffect } from "react";
import { useProjectStore } from "@/store/useProjectStore";
import { fetchGitHubRepos } from "@/lib/github";

export function useGitHubProjects() {
  const projects = useProjectStore((state) => state.projects);
  const setProjects = useProjectStore((state) => state.setProjects);
  const isLoading = useProjectStore((state) => state.isLoading);
  const setIsLoading = useProjectStore((state) => state.setIsLoading);

  useEffect(() => {
    async function loadProjects() {
      // Only fetch if we don't have projects yet
      if (projects.length > 0) return;

      setIsLoading(true);
      try {
        const repos = await fetchGitHubRepos();
        setProjects(repos);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Intencional: queremos executar apenas uma vez na montagem

  return { projects, isLoading };
}
