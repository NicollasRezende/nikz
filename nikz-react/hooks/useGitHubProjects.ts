// hooks/useGitHubProjects.ts
"use client";

import { useEffect } from "react";
import { useProjectStore } from "@/store/useProjectStore";
import { fetchGitHubRepos } from "@/lib/github";

export function useGitHubProjects() {
  const { projects, setProjects, isLoading, setIsLoading } =
    useProjectStore();

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
  }, []); // Empty deps - only run once

  return { projects, isLoading };
}
