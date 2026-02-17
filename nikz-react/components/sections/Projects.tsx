"use client";

import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { GitHubRepo } from "@/lib/github";
import SectionHeading from "@/components/ui/SectionHeading";
import { ExternalLink, Github, Star, GitFork } from "lucide-react";

interface ProjectsProps {
  repos: GitHubRepo[];
}

export default function Projects({ repos }: ProjectsProps) {
  const [filter, setFilter] = useState<string>("all");

  // Get unique languages with useMemo to avoid recalculation
  const languages = useMemo(() => {
    return Array.from(
      new Set(repos.map((repo) => repo.language).filter(Boolean))
    ).slice(0, 6); // Limit to 6 languages
  }, [repos]);

  // Filter repos with useMemo
  const filteredRepos = useMemo(() => {
    const filtered = filter === "all"
      ? repos
      : repos.filter((repo) => repo.language === filter);

    return filtered.slice(0, 9); // Show top 9 repos
  }, [repos, filter]);

  return (
    <section
      id="projects"
      className="py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading number="03" title="projects" />

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-full font-code text-sm transition-all duration-200 ${
              filter === "all"
                ? "bg-accent-cyan text-bg-primary"
                : "bg-bg-secondary text-fg-secondary hover:bg-bg-secondary/70"
            }`}
          >
            todos
          </button>
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setFilter(lang || "all")}
              className={`px-4 py-2 rounded-full font-code text-sm transition-all duration-200 ${
                filter === lang
                  ? "bg-accent-cyan text-bg-primary"
                  : "bg-bg-secondary text-fg-secondary hover:bg-bg-secondary/70"
              }`}
            >
              {lang?.toLowerCase()}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepos.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group"
              >
                <div className="relative bg-bg-primary border border-fg-primary/10 rounded-lg p-6 hover:border-accent-cyan/50 transition-colors duration-200 h-full flex flex-col">
                  {/* Language Badge */}
                  {repo.language && (
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 bg-accent-purple/20 border border-accent-purple/30 rounded text-xs font-code text-accent-purple">
                        {repo.language}
                      </span>
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="font-display font-bold text-lg text-fg-primary mb-2 pr-20">
                        {repo.name}
                      </h3>
                      <p className="text-fg-secondary text-sm line-clamp-2">
                        {repo.description || "No description available"}
                      </p>
                    </div>

                    {/* Topics */}
                    {repo.topics && repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {repo.topics.slice(0, 3).map((topic) => (
                          <span
                            key={topic}
                            className="px-2 py-1 bg-bg-secondary border border-fg-primary/10 rounded text-xs font-code text-fg-muted"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Stats & Links */}
                  <div className="flex items-center justify-between pt-4 border-t border-fg-primary/10 mt-4">
                    <div className="flex items-center gap-4 text-xs text-fg-muted">
                      <span className="flex items-center gap-1">
                        <Star size={14} />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork size={14} />
                        {repo.forks_count}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-fg-secondary hover:text-accent-cyan transition-colors"
                        title="View on GitHub"
                      >
                        <Github size={18} />
                      </a>
                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-fg-secondary hover:text-accent-pink transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {/* GitHub Link */}
        {repos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="mt-12 text-center"
          >
            <a
              href="https://github.com/NicollasRezende"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-accent-cyan/10 to-accent-purple/10 border border-accent-cyan/30 rounded-lg font-code text-sm text-accent-cyan hover:border-accent-cyan/60 transition-all"
            >
              <Github size={20} />
              <span>Ver mais no GitHub</span>
              <ExternalLink size={16} />
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
