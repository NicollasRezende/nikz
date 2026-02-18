"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { GitHubRepo, ContributionDay } from "@/lib/github";
import SectionHeading from "@/components/ui/SectionHeading";
import { GitBranch, Star, GitFork, Users } from "lucide-react";

interface GitHubStatsProps {
  repos: GitHubRepo[];
  contributions: ContributionDay[];
}

const MONTH_LABELS = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
const DAY_LABELS = ["Dom","Seg","Ter","Qua","Qui","Sex","Sab"];

function getIntensity(count: number): string {
  if (count === 0) return "bg-bg-secondary border border-fg-primary/10";
  if (count <= 2)  return "bg-accent-cyan/20 border border-accent-cyan/30";
  if (count <= 5)  return "bg-accent-cyan/45 border border-accent-cyan/50";
  if (count <= 9)  return "bg-accent-cyan/70 border border-accent-cyan/70";
  return               "bg-accent-cyan border border-accent-cyan";
}

export default function GitHubStats({ repos, contributions }: GitHubStatsProps) {
  const { totalStars, totalForks, publicRepos, topLanguages } = useMemo(() => {
    const stars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);
    const forks = repos.reduce((acc, r) => acc + r.forks_count, 0);
    const count = repos.length;
    const languages = repos.reduce((acc, r) => {
      if (r.language) acc[r.language] = (acc[r.language] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const topLangs = Object.entries(languages).sort(([,a],[,b]) => b - a).slice(0, 5);
    return { totalStars: stars, totalForks: forks, publicRepos: count, topLanguages: topLangs };
  }, [repos]);

  // Build the week columns for the heatmap
  const { weeks, monthMarkers, totalContributions } = useMemo(() => {
    const total = contributions.reduce((s, d) => s + d.count, 0);

    // Pad the start so the first day aligns with its weekday (0=Sun)
    const firstDow = new Date(contributions[0]?.date ?? Date.now()).getDay();
    const padded: (ContributionDay | null)[] = [
      ...Array(firstDow).fill(null),
      ...contributions,
    ];

    // Split into columns of 7 (one column = one week)
    const cols: (ContributionDay | null)[][] = [];
    for (let i = 0; i < padded.length; i += 7) cols.push(padded.slice(i, i + 7));

    // Month labels: track when the month changes across columns
    const markers: { col: number; label: string }[] = [];
    let lastMonth = -1;
    cols.forEach((week, ci) => {
      const firstReal = week.find(Boolean) as ContributionDay | undefined;
      if (!firstReal) return;
      const m = new Date(firstReal.date).getMonth();
      if (m !== lastMonth) { markers.push({ col: ci, label: MONTH_LABELS[m] }); lastMonth = m; }
    });

    return { weeks: cols, monthMarkers: markers, totalContributions: total };
  }, [contributions]);

  const stats = [
    { Icon: GitBranch, label: "Repositórios Públicos", value: publicRepos, color: "from-accent-cyan to-blue-400" },
    { Icon: Star,      label: "Total de Stars",         value: totalStars,  color: "from-accent-purple to-pink-400" },
    { Icon: GitFork,   label: "Total de Forks",          value: totalForks,  color: "from-accent-green to-teal-400" },
  ];

  return (
    <section id="github-stats" className="py-24 px-4 sm:px-6 lg:px-8 bg-bg-secondary/30">
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
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} mb-4`}>
                  <stat.Icon className="text-bg-primary" size={24} />
                </div>
                <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>
                <div className="text-sm text-fg-muted font-code">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contribution Heatmap */}
        {contributions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="bg-bg-primary/50 border border-fg-primary/10 rounded-xl p-6 sm:p-8 mb-8"
          >
            <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
              <h3 className="font-display text-xl font-bold text-fg-primary">
                Contribuições
              </h3>
              <span className="font-code text-sm text-fg-muted">
                <span className="text-accent-cyan font-bold">{totalContributions}</span> commits no último ano
              </span>
            </div>

            {/* Scrollable grid */}
            <div className="overflow-x-auto pb-1">
              <div className="min-w-[640px]">
                {/* Month labels row */}
                <div className="relative flex ml-8 h-4 mb-1">
                  {monthMarkers.map(({ col, label }) => (
                    <span
                      key={`${col}-${label}`}
                      className="absolute font-code text-[10px] text-fg-muted"
                      style={{ left: `${col * 13}px` }}
                    >
                      {label}
                    </span>
                  ))}
                </div>

                {/* Grid: day labels + week columns */}
                <div className="flex gap-0.5">
                  {/* Day-of-week labels */}
                  <div className="flex flex-col gap-0.5 mr-1.5 shrink-0">
                    {DAY_LABELS.map((d, i) => (
                      <div key={d} className="h-[10px] w-6 font-code text-[9px] text-fg-muted leading-none flex items-center">
                        {i % 2 === 1 ? d.slice(0, 3) : ""}
                      </div>
                    ))}
                  </div>

                  {/* Week columns */}
                  {weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-0.5">
                      {week.map((day, di) => (
                        <div
                          key={di}
                          title={day ? `${day.date}: ${day.count} commit${day.count !== 1 ? "s" : ""}` : ""}
                          className={`w-[10px] h-[10px] rounded-sm transition-transform hover:scale-125 cursor-default ${
                            day ? getIntensity(day.count) : "invisible"
                          }`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Legend — outside scroll, always visible */}
            <div className="flex items-center gap-2 mt-3 justify-end">
              <span className="font-code text-[10px] text-fg-muted">Menos</span>
              {[0, 2, 5, 9, 12].map((v) => (
                <div key={v} className={`w-[10px] h-[10px] rounded-sm ${getIntensity(v)}`} />
              ))}
              <span className="font-code text-[10px] text-fg-muted">Mais</span>
            </div>
          </motion.div>
        )}

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
                    <span className="font-code text-sm text-fg-primary">{language}</span>
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
