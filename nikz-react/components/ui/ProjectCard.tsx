// components/ui/ProjectCard.tsx
"use client";

import { GitHubRepo } from "@/types";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: GitHubRepo;
  featured?: boolean;
  index?: number;
}

export function ProjectCard({ project, featured = false, index = 0 }: ProjectCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setRotateX(rotateX);
    setRotateY(rotateY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      className={cn(
        "relative group cursor-pointer h-full",
        featured && "md:col-span-2 lg:col-span-2"
      )}
    >
      {/* Subtle animated border glow */}
      <motion.div
        className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-700"
        animate={isHovered ? {
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        } : {}}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ backgroundSize: "200% 200%" }}
      />

      {/* Card content - Dark solid background for better readability */}
      <div
        style={{ transform: "translateZ(20px)" }}
        className={cn(
          "relative h-full flex flex-col rounded-2xl overflow-hidden",
          "bg-linear-to-br from-white/98 via-light-bg-secondary/98 to-white/98 dark:from-slate-900/95 dark:via-slate-800/95 dark:to-slate-900/95",
          "backdrop-blur-xl border border-light-card-border dark:border-slate-700/50 shadow-light-lg dark:shadow-none",
          "transition-all duration-300",
          "group-hover:border-cyan-500/50 group-hover:shadow-xl group-hover:shadow-cyan-500/10"
        )}
      >
        {/* Subtle top accent gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-bl-[100px] opacity-50" />

        {/* Content */}
        <div className="relative z-10 p-6 flex-1 flex flex-col" style={{ transform: "translateZ(30px)" }}>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4 gap-3">
              <h3 className={cn(
                "font-bold transition-all duration-300",
                featured ? "text-2xl" : "text-xl",
                "text-light-text-primary dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-cyan-500 group-hover:to-blue-500"
              )}>
                {project.name}
              </h3>
              {project.language && (
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="shrink-0 px-3 py-1.5 text-xs rounded-lg bg-light-bg-tertiary/80 dark:bg-slate-800/80 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30 font-semibold backdrop-blur-sm"
                >
                  {project.language}
                </motion.span>
              )}
            </div>

            <p className={cn(
              "text-light-text-secondary dark:text-slate-300 mb-5 leading-relaxed",
              featured ? "text-base" : "text-sm"
            )}>
              {project.description || "No description available"}
            </p>

            {project.topics && project.topics.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {project.topics.slice(0, featured ? 5 : 3).map((topic, i) => (
                  <motion.span
                    key={topic}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-2.5 py-1 text-xs rounded-md bg-light-bg-tertiary/60 dark:bg-slate-800/60 border border-light-card-border dark:border-slate-600/40 text-light-text-secondary dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-300 hover:border-cyan-500/40 transition-all"
                  >
                    #{topic}
                  </motion.span>
                ))}
              </div>
            )}
          </div>

          {/* Footer with stats */}
          <div className="flex items-center justify-between pt-4 border-t border-light-card-border dark:border-slate-700/50">
            <div className="flex items-center gap-5 text-sm">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 text-light-text-secondary dark:text-slate-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
              >
                <i className="fas fa-star text-yellow-500/70" />
                <span className="font-medium">{project.stargazers_count}</span>
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 text-light-text-secondary dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              >
                <i className="fas fa-code-branch text-blue-500/70" />
                <span className="font-medium">{project.forks_count}</span>
              </motion.span>
            </div>

            <motion.a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, x: 2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-light-bg-tertiary dark:bg-slate-800/80 text-cyan-600 dark:text-cyan-300 text-sm font-semibold hover:bg-cyan-50 dark:hover:bg-slate-700/80 hover:text-cyan-700 dark:hover:text-cyan-200 transition-all border border-cyan-500/30 dark:border-slate-600/50 hover:border-cyan-500/50"
            >
              <span>Ver Projeto</span>
              <i className="fas fa-arrow-right text-xs" />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
