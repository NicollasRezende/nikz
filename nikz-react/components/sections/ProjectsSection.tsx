// components/sections/ProjectsSection.tsx
"use client";

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectFilter } from "@/components/features/ProjectFilter";
import { FadeUp } from "@/components/animations/FadeUp";
import { useGitHubProjects } from "@/hooks/useGitHubProjects";
import { useProjectStore } from "@/store/useProjectStore";

export function ProjectsSection() {
  const { isLoading } = useGitHubProjects();
  const filteredProjects = useProjectStore((state) => state.filteredProjects());

  return (
    <Section
      id="projects"
      className="bg-gradient-to-b from-gray-50 to-white dark:from-dark-bg dark:to-dark-card"
    >
      <SectionHeader title="Projetos em Destaque" />

      {/* Filter */}
      <FadeUp>
        <ProjectFilter />
      </FadeUp>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Buscando projetos do GitHub...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <FadeUp key={project.id} delay={index * 0.1}>
              <ProjectCard project={project} />
            </FadeUp>
          ))}
        </div>
      )}

      {/* GitHub Link */}
      {!isLoading && filteredProjects.length > 0 && (
        <FadeUp delay={0.4}>
          <div className="mt-12 text-center">
            <a
              href="https://github.com/NicollasRezende"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-primary text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="relative">
                <i className="fab fa-github text-2xl" />
                <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
              </div>
              <div className="text-left">
                <div className="text-sm opacity-90">
                  Explore Meu Universo de Código
                </div>
                <div className="text-xs opacity-75">
                  Descubra todos os projetos no GitHub
                </div>
              </div>
              <i className="fas fa-arrow-right transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </FadeUp>
      )}

      {/* Empty State */}
      {!isLoading && filteredProjects.length === 0 && (
        <FadeUp>
          <div className="text-center py-12">
            <i className="fas fa-folder-open text-6xl text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Nenhum projeto encontrado com este filtro
            </p>
          </div>
        </FadeUp>
      )}
    </Section>
  );
}
