// components/sections/SkillsSection.tsx
"use client";

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SKILLS } from "@/lib/constants";
import { motion } from "framer-motion";

const SKILL_CATEGORIES = [
  {
    key: "frontend" as keyof typeof SKILLS,
    title: "Frontend Development",
    icon: "fas fa-laptop-code",
    color: "cyan" as const,
    levels: [95, 92, 93, 90, 94, 88],
  },
  {
    key: "backend" as keyof typeof SKILLS,
    title: "Backend Development",
    icon: "fas fa-server",
    color: "blue" as const,
    levels: [95, 93, 98, 95, 92, 88],
  },
  {
    key: "frameworks" as keyof typeof SKILLS,
    title: "Frameworks & Platforms",
    icon: "fas fa-layer-group",
    color: "purple" as const,
    levels: [90, 88, 85],
  },
  {
    key: "database" as keyof typeof SKILLS,
    title: "Database",
    icon: "fas fa-database",
    color: "cyan" as const,
    levels: [90, 88, 85],
  },
  {
    key: "devops" as keyof typeof SKILLS,
    title: "DevOps & CI/CD",
    icon: "fas fa-tools",
    color: "blue" as const,
    levels: [92, 90, 88, 90, 95],
  },
];

export function SkillsSection() {
  return (
    <Section id="skills" className="bg-linear-to-b from-light-bg-secondary via-light-bg-primary to-light-bg-secondary dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Enhanced animated background */}
      <motion.div
        className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-transparent rounded-full blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          x: [0, 100, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-purple-500/15 via-pink-500/10 to-transparent rounded-full blur-3xl"
        animate={{
          scale: [1.4, 1, 1.4],
          x: [0, -100, 0],
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Hexagon pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iMTAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0yOCAwTDAgMTUgMCA0NSAyOCA2MCA1NiA0NSA1NiAxNXoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwYzZmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3N2Zz4=')] opacity-20" />
      </div>

      <SectionHeader title="Habilidades & Tecnologias" />

      {/* Modern Grid Layout for Skills */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {SKILL_CATEGORIES.map((category, categoryIndex) => {
            const colorClasses = {
              cyan: {
                gradient: "from-cyan-500/20 to-blue-500/20",
                text: "text-cyan-400",
                border: "border-cyan-500/30",
                hover: "hover:border-cyan-500/50",
                glow: "hover:shadow-cyan-500/20",
              },
              blue: {
                gradient: "from-blue-500/20 to-purple-500/20",
                text: "text-blue-400",
                border: "border-blue-500/30",
                hover: "hover:border-blue-500/50",
                glow: "hover:shadow-blue-500/20",
              },
              purple: {
                gradient: "from-purple-500/20 to-pink-500/20",
                text: "text-purple-400",
                border: "border-purple-500/30",
                hover: "hover:border-purple-500/50",
                glow: "hover:shadow-purple-500/20",
              },
            };

            const colors = colorClasses[category.color];

            return (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="group"
              >
                <div className={`relative h-full bg-linear-to-br from-white/95 to-light-bg-secondary/95 dark:from-slate-800/90 dark:to-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border ${colors.border} ${colors.hover} ${colors.glow} hover:shadow-xl transition-all duration-500 overflow-hidden shadow-light-md dark:shadow-none`}>
                  {/* Decorative corner */}
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${colors.gradient} rounded-bl-full opacity-30`} />

                  {/* Header */}
                  <div className="relative z-10 flex items-center gap-4 mb-6">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 200, delay: categoryIndex * 0.1 + 0.2 }}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center border ${colors.border}`}
                    >
                      <i className={`${category.icon} text-2xl ${colors.text}`} />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold ${colors.text} mb-1`}>
                        {category.title}
                      </h3>
                      <motion.div
                        className={`h-0.5 bg-gradient-to-r ${colors.gradient} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: categoryIndex * 0.1 + 0.3 }}
                      />
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="relative z-10 grid grid-cols-3 gap-3">
                    {SKILLS[category.key].map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: categoryIndex * 0.1 + index * 0.05 + 0.4 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="group/skill"
                      >
                        <div className={`relative bg-light-bg-tertiary/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-lg p-3 border border-light-card-border dark:border-slate-700/50 hover:border-${category.color}-500/50 transition-all duration-300 hover:shadow-lg`}>
                          {/* Skill Icon */}
                          <div className="flex flex-col items-center gap-2">
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colors.gradient} flex items-center justify-center transition-transform duration-300 group-hover/skill:scale-110`}>
                              <i className={`${skill.icon} text-xl ${colors.text}`} />
                            </div>
                            <div className="text-center">
                              <p className="text-xs font-semibold text-light-text-primary dark:text-slate-200 leading-tight">
                                {skill.name}
                              </p>
                              {/* Level indicator */}
                              <div className="mt-1.5 w-full bg-light-bg-tertiary dark:bg-slate-700/50 rounded-full h-1 overflow-hidden">
                                <motion.div
                                  className={`h-full bg-gradient-to-r ${colors.gradient}`}
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${category.levels[index]}%` }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 1, delay: categoryIndex * 0.1 + index * 0.05 + 0.6 }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Summary - Horizontal Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { label: "Linguagens", value: "10+", icon: "fas fa-code", color: "cyan" },
            { label: "Frameworks", value: "20+", icon: "fas fa-layer-group", color: "blue" },
            { label: "Ferramentas", value: "30+", icon: "fas fa-wrench", color: "purple" },
          ].map((stat, index) => {
            const colorClasses = {
              cyan: {
                gradient: "from-cyan-500/20 to-blue-500/20",
                textGradient: "from-cyan-400 to-blue-400",
                text: "text-cyan-400",
                border: "border-cyan-500/30",
                hover: "hover:border-cyan-500/50",
              },
              blue: {
                gradient: "from-blue-500/20 to-purple-500/20",
                textGradient: "from-blue-400 to-purple-400",
                text: "text-blue-400",
                border: "border-blue-500/30",
                hover: "hover:border-blue-500/50",
              },
              purple: {
                gradient: "from-purple-500/20 to-pink-500/20",
                textGradient: "from-purple-400 to-pink-400",
                text: "text-purple-400",
                border: "border-purple-500/30",
                hover: "hover:border-purple-500/50",
              },
            };

            const colors = colorClasses[stat.color as keyof typeof colorClasses];

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`bg-linear-to-br from-white/95 to-light-bg-secondary/95 dark:from-slate-800/90 dark:to-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border ${colors.border} ${colors.hover} hover:shadow-xl transition-all duration-500 shadow-light-md dark:shadow-none`}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.8 + index * 0.1 }}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center border ${colors.border}`}
                  >
                    <i className={`${stat.icon} text-2xl ${colors.text}`} />
                  </motion.div>
                  <div className="flex-1">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      className={`text-4xl font-bold bg-gradient-to-r ${colors.textGradient} bg-clip-text text-transparent`}
                    >
                      {stat.value}
                    </motion.div>
                    <p className="text-sm text-light-text-secondary dark:text-slate-400 mt-1">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </Section>
  );
}
