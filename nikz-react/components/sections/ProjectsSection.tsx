// components/sections/ProjectsSection.tsx
"use client";

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectFilter } from "@/components/features/ProjectFilter";
import { Pagination } from "@/components/ui/Pagination";
import { FadeUp } from "@/components/animations/FadeUp";
import { useGitHubProjects } from "@/hooks/useGitHubProjects";
import { useProjectStore } from "@/store/useProjectStore";
import { motion } from "framer-motion";

export function ProjectsSection() {
  const { isLoading } = useGitHubProjects();
  const paginatedProjects = useProjectStore((state) => state.paginatedProjects);
  const filteredProjects = useProjectStore((state) => state.filteredProjects);

  // Get the actual data by calling the functions
  const projects = paginatedProjects();
  const allFiltered = filteredProjects();

  // Mark first project as featured
  const featuredProject = projects[0];
  const regularProjects = projects.slice(1);

  return (
    <Section
      id="projects"
      className="bg-linear-to-b from-light-bg-primary via-light-bg-secondary to-light-bg-primary dark:from-dark-bg dark:to-dark-card relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.3, 1, 1.3],
          x: [0, -50, 0],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <SectionHeader title="Projetos em Destaque" />

      {/* Filter - Enhanced pill buttons */}
      <FadeUp>
        <ProjectFilter />
      </FadeUp>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <motion.div
            className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p
            className="text-gray-600 dark:text-gray-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Buscando projetos do GitHub...
          </motion.p>
        </div>
      ) : (
        <div className="relative z-10">
          {/* Asymmetric Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {/* Featured Project - Takes 2 columns */}
            {featuredProject && (
              <ProjectCard
                project={featuredProject}
                featured
                index={0}
              />
            )}

            {/* Regular Projects - Asymmetric heights */}
            {regularProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index + 1}
              />
            ))}
          </div>
        </div>
      )}

      {/* Pagination */}
      {!isLoading && allFiltered.length > 0 && (
        <div className="relative z-10">
          <Pagination />
        </div>
      )}

      {/* GitHub Link - Enhanced with glow */}
      {!isLoading && allFiltered.length > 0 && (
        <FadeUp delay={0.4}>
          <div className="mt-8 text-center relative z-10">
            <motion.a
              href="https://github.com/NicollasRezende"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-[0_0_40px_rgba(0,198,255,0.4)] transition-all relative overflow-hidden"
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />

              <div className="relative z-10 flex items-center gap-3">
                <motion.div
                  className="relative"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <i className="fab fa-github text-2xl" />
                </motion.div>
                <div className="text-left">
                  <div className="text-sm opacity-90">
                    Explore Meu Universo de Código
                  </div>
                  <div className="text-xs opacity-75">
                    Descubra todos os projetos no GitHub
                  </div>
                </div>
                <motion.i
                  className="fas fa-arrow-right"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </motion.a>
          </div>
        </FadeUp>
      )}

      {/* Empty State - Enhanced */}
      {!isLoading && allFiltered.length === 0 && (
        <FadeUp>
          <div className="text-center py-12 relative z-10">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <i className="fas fa-folder-open text-6xl text-gray-300 dark:text-gray-600 mb-4" />
            </motion.div>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Nenhum projeto encontrado com este filtro
            </p>
          </div>
        </FadeUp>
      )}
    </Section>
  );
}
