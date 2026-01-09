// components/sections/GitHubStatsSection.tsx
"use client";

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface GitHubStats {
  totalRepos: number;
  followers: number;
  following: number;
  accountAge: number;
  languageStats: { name: string; percentage: number; color: string }[];
}

type Contribution = { week: number; day: number; count: number };

// Mover dados estáticos para fora do componente
const GITHUB_STATS: GitHubStats = {
  totalRepos: 67,
  followers: 17,
  following: 11,
  accountAge: 6,
  languageStats: [
    { name: "Python", percentage: 35, color: "#3776ab" },
    { name: "TypeScript", percentage: 25, color: "#3178c6" },
    { name: "JavaScript", percentage: 20, color: "#f7df1e" },
    { name: "Java", percentage: 15, color: "#007396" },
    { name: "CSS", percentage: 5, color: "#1572b6" },
  ],
};

// Função geradora de contribuições
const generateContributions = () => {
  const weeks = 52;
  const data: Contribution[] = [];

  for (let week = 0; week < weeks; week++) {
    for (let day = 0; day < 7; day++) {
      const count = Math.random() > 0.3 ? Math.floor(Math.random() * 10) : 0;
      data.push({ week, day, count });
    }
  }

  return data;
};

// Mover função pura para fora do componente
const getContributionColor = (count: number) => {
  if (count === 0) return "bg-slate-800/50";
  if (count <= 2) return "bg-emerald-900/60";
  if (count <= 4) return "bg-emerald-700/70";
  if (count <= 6) return "bg-emerald-500/80";
  return "bg-emerald-400";
};

export function GitHubStatsSection() {
  const stats = GITHUB_STATS;

  // Gerar dados apenas no cliente para evitar hydration mismatch
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);

  useEffect(() => {
    const data = generateContributions();
    setContributions(data);
    setTotalContributions(data.reduce((sum, c) => sum + c.count, 0));
    setCurrentStreak(Math.floor(Math.random() * 30) + 15);
  }, []);

  return (
    <Section
      id="github-stats"
      className="bg-linear-to-b from-light-bg-secondary via-light-bg-primary to-light-bg-secondary dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden"
    >
      {/* Animated background */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-emerald-500/15 via-green-500/10 to-transparent rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 60, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <SectionHeader title="Atividade GitHub" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 space-y-8">
        {/* Top Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Contribuições (2024)", value: totalContributions, icon: "fas fa-code-branch", color: "emerald" },
            { label: "Repositórios", value: stats.totalRepos, icon: "fas fa-folder", color: "blue" },
            { label: "Sequência Atual", value: `${currentStreak} dias`, icon: "fas fa-fire", color: "orange" },
            { label: "Seguidores", value: stats.followers, icon: "fas fa-users", color: "purple" },
          ].map((stat, index) => {
            const colorClasses = {
              emerald: { bg: "from-emerald-500/20 to-green-500/20", text: "text-emerald-400", border: "border-emerald-500/30" },
              blue: { bg: "from-blue-500/20 to-cyan-500/20", text: "text-blue-400", border: "border-blue-500/30" },
              orange: { bg: "from-orange-500/20 to-red-500/20", text: "text-orange-400", border: "border-orange-500/30" },
              purple: { bg: "from-purple-500/20 to-pink-500/20", text: "text-purple-400", border: "border-purple-500/30" },
            };

            const colors = colorClasses[stat.color as keyof typeof colorClasses];

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`bg-linear-to-br ${colors.bg} backdrop-blur-xl rounded-xl p-4 border ${colors.border} hover:shadow-xl transition-all duration-300`}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colors.bg} flex items-center justify-center border ${colors.border}`}
                  >
                    <i className={`${stat.icon} ${colors.text}`} />
                  </motion.div>
                  <div>
                    <p className={`text-2xl font-bold ${colors.text}`}>{stat.value}</p>
                    <p className="text-xs text-slate-400">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Contribution Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bg-linear-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 overflow-x-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Contribuições do Último Ano</h3>
              <p className="text-sm text-slate-400">
                {totalContributions} contribuições nos últimos 12 meses
              </p>
            </div>
            <motion.a
              href="https://github.com/NicollasRezende"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg border border-slate-600 transition-colors flex items-center gap-2"
            >
              <i className="fab fa-github text-white" />
              <span className="text-sm text-white">Ver no GitHub</span>
            </motion.a>
          </div>

          {/* Heatmap Grid */}
          <div className="min-w-max">
            <div className="flex gap-1">
              {/* Days labels */}
              <div className="flex flex-col gap-1 text-xs text-slate-500 pr-2 justify-around">
                <span>Dom</span>
                <span>Seg</span>
                <span>Ter</span>
                <span>Qua</span>
                <span>Qui</span>
                <span>Sex</span>
                <span>Sáb</span>
              </div>

              {/* Contribution boxes */}
              <div className="flex gap-1">
                {Array.from({ length: 52 }).map((_, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {Array.from({ length: 7 }).map((_, dayIndex) => {
                      const contribution = contributions.find(
                        c => c.week === weekIndex && c.day === dayIndex
                      );
                      const count = contribution?.count || 0;

                      return (
                        <motion.div
                          key={`${weekIndex}-${dayIndex}`}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: (weekIndex * 7 + dayIndex) * 0.001 }}
                          whileHover={{ scale: 1.5, zIndex: 10 }}
                          className={`w-3 h-3 rounded-sm ${getContributionColor(count)} relative group cursor-pointer transition-all duration-200`}
                          title={`${count} contribuições`}
                        >
                          {/* Tooltip on hover */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                            {count} contribuições
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-2 mt-4 text-xs text-slate-400">
              <span>Menos</span>
              <div className="flex gap-1">
                {[0, 1, 3, 5, 7].map((level) => (
                  <div
                    key={level}
                    className={`w-3 h-3 rounded-sm ${getContributionColor(level)}`}
                  />
                ))}
              </div>
              <span>Mais</span>
            </div>
          </div>
        </motion.div>

        {/* Language Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="bg-linear-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50"
        >
          <h3 className="text-xl font-bold text-white mb-6">Linguagens Mais Utilizadas</h3>

          <div className="space-y-4">
            {stats.languageStats.map((lang, index) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: lang.color }}
                    />
                    <span className="text-sm font-medium text-white">{lang.name}</span>
                  </div>
                  <span className="text-sm text-slate-400">{lang.percentage}%</span>
                </div>

                <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: lang.color,
                      boxShadow: `0 0 10px ${lang.color}50`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
