"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { GitHubRepo } from "@/lib/github";
import SectionHeading from "@/components/ui/SectionHeading";
import { GitBranch, Star, GitFork, Users } from "lucide-react";

interface GitHubStatsProps {
  repos: GitHubRepo[];
}

export default function GitHubStats({ repos }: GitHubStatsProps) {

  // Calculate stats with useMemo for performance
  const { totalStars, totalForks, publicRepos, topLanguages } = useMemo(() => {
    const stars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
    const forks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);
    const count = repos.length;

    // Get language distribution
    const languages = repos.reduce((acc, repo) => {
      if (repo.language) {
        acc[repo.language] = (acc[repo.language] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const topLangs = Object.entries(languages)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    return {
      totalStars: stars,
      totalForks: forks,
      publicRepos: count,
      topLanguages: topLangs,
    };
  }, [repos]);

  const stats = [
    {
      Icon: GitBranch,
      label: "Repositórios Públicos",
      value: publicRepos,
      color: "from-accent-cyan to-blue-400",
    },
    {
      Icon: Star,
      label: "Total de Stars",
      value: totalStars,
      color: "from-accent-purple to-pink-400",
    },
    {
      Icon: GitFork,
      label: "Total de Forks",
      value: totalForks,
      color: "from-accent-green to-teal-400",
    },
  ];

  return (
    <section
      id="github-stats"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-bg-secondary/30"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading number="05" title="github stats" />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="bg-bg-primary/50 border border-fg-primary/10 rounded-xl p-6 hover:border-accent-cyan/30 transition-colors duration-200">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} mb-4`}>
                  <stat.Icon className="text-bg-primary" size={24} />
                </div>

                {/* Value */}
                <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>

                {/* Label */}
                <div className="text-sm text-fg-muted font-code">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Languages Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="bg-bg-primary/50 border border-fg-primary/10 rounded-xl p-8"
        >
          <h3 className="font-display text-xl font-bold text-fg-primary mb-6">
            Linguagens Mais Usadas
          </h3>

          <div className="space-y-4">
            {topLanguages.map(([language, count], index) => {
              const percentage = (count / publicRepos) * 100;
              const colors = [
                "from-accent-cyan to-blue-400",
                "from-accent-purple to-pink-400",
                "from-accent-green to-teal-400",
                "from-accent-pink to-red-400",
                "from-blue-400 to-accent-purple",
              ];

              return (
                <div key={language} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-code text-sm text-fg-primary">
                      {language}
                    </span>
                    <span className="font-code text-xs text-fg-muted">
                      {count} {count === 1 ? "repo" : "repos"} ({percentage.toFixed(0)}%)
                    </span>
                  </div>
                  <div className="h-1.5 bg-bg-secondary/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * index, ease: "easeOut" }}
                      className={`h-full bg-gradient-to-r ${colors[index % colors.length]} rounded-full`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* GitHub Profile Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/NicollasRezende"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-accent-cyan to-accent-purple text-white font-code rounded-lg hover:scale-105 transition-transform"
          >
            <Users size={20} />
            <span>Seguir no GitHub</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
