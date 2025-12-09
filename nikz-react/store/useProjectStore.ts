// store/useProjectStore.ts
import { create } from "zustand";
import { GitHubRepo, ProjectFilter } from "@/types";

interface ProjectStore {
  projects: GitHubRepo[];
  setProjects: (projects: GitHubRepo[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  filter: ProjectFilter;
  setFilter: (filter: ProjectFilter) => void;
  filteredProjects: () => GitHubRepo[];
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  setProjects: (projects) => set({ projects }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  filter: "all",
  setFilter: (filter) => set({ filter }),
  filteredProjects: () => {
    const { projects, filter } = get();
    if (filter === "all") return projects;
    return projects.filter(
      (p) => p.language?.toLowerCase() === filter.toLowerCase()
    );
  },
}));
