// components/ui/ProjectCard.tsx
import { GitHubRepo } from "@/types";
import { GlassCard } from "./GlassCard";

interface ProjectCardProps {
  project: GitHubRepo;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <GlassCard className="h-full flex flex-col">
      <div className="flex-1">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {project.name}
          </h3>
          {project.language && (
            <span className="px-3 py-1 text-xs rounded-full bg-primary/20 text-primary">
              {project.language}
            </span>
          )}
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {project.description || "No description available"}
        </p>

        {project.topics && project.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="px-2 py-1 text-xs rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                {topic}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <i className="fas fa-star" />
            {project.stargazers_count}
          </span>
          <span className="flex items-center gap-1">
            <i className="fas fa-code-branch" />
            {project.forks_count}
          </span>
        </div>

        <a
          href={project.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary-light transition-colors"
        >
          <i className="fas fa-external-link-alt" />
        </a>
      </div>
    </GlassCard>
  );
}
