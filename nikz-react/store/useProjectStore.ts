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
  currentPage: number;
  setCurrentPage: (page: number) => void;
  projectsPerPage: number;
  filteredProjects: () => GitHubRepo[];
  paginatedProjects: () => GitHubRepo[];
  totalPages: () => number;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  setProjects: (projects) => set({ projects }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  filter: "all",
  setFilter: (filter) => set({ filter, currentPage: 1 }), // Reset to page 1 when filtering
  currentPage: 1,
  setCurrentPage: (currentPage) => set({ currentPage }),
  projectsPerPage: 9, // 9 projects per page (3x3 grid)
  filteredProjects: () => {
    const { projects, filter } = get();
    if (filter === "all") return projects;
    return projects.filter(
      (p) => p.language?.toLowerCase() === filter.toLowerCase()
    );
  },
  paginatedProjects: () => {
    const { filteredProjects, currentPage, projectsPerPage } = get();
    const filtered = filteredProjects();
    const startIndex = (currentPage - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    return filtered.slice(startIndex, endIndex);
  },
  totalPages: () => {
    const { filteredProjects, projectsPerPage } = get();
    const filtered = filteredProjects();
    return Math.ceil(filtered.length / projectsPerPage);
  },
}));
