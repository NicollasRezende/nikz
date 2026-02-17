"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  image: string;
  github?: string;
  demo?: string;
  status: string;
  year: number;
}

export default function ProjectCard({
  title,
  description,
  tech,
  image,
  github,
  demo,
  status,
  year,
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group gpu-accelerated bg-bg-primary border border-fg-primary/10 rounded-lg overflow-hidden hover:border-accent-cyan/50 transition-colors duration-200"
    >
      {/* Project Image */}
      <div className="relative h-48 bg-bg-secondary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20" />
        {/* Placeholder - will be replaced with actual image */}
        <div className="absolute inset-0 flex items-center justify-center text-fg-muted">
          [Project Image]
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title & Meta */}
        <div>
          <h3 className="font-display font-bold text-xl text-fg-primary mb-2">
            {title}
          </h3>
          <p className="font-code text-xs text-fg-muted">
            <span className="text-syntax-comment">{"// "}</span>
            <span className="text-syntax-blue">status</span>:{" "}
            <span className="text-syntax-green">&quot;{status}&quot;</span>,{" "}
            <span className="text-syntax-blue">year</span>:{" "}
            <span className="text-syntax-purple">{year}</span>
          </p>
        </div>

        {/* Description */}
        <p className="text-fg-secondary text-sm leading-relaxed">
          {description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {tech.map((item) => (
            <span
              key={item}
              className="px-3 py-1 bg-bg-secondary border border-fg-primary/10 rounded text-xs font-code text-accent-cyan"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-4">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-fg-secondary hover:text-accent-cyan transition-colors text-sm font-code"
            >
              <Github size={18} />
              Code
            </a>
          )}
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-fg-secondary hover:text-accent-pink transition-colors text-sm font-code"
            >
              <ExternalLink size={18} />
              Demo
            </a>
          )}
        </div>
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 to-accent-purple/5" />
      </div>
    </motion.div>
  );
}
