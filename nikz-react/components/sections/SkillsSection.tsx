// components/sections/SkillsSection.tsx
"use client";

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScaleIn } from "@/components/animations/ScaleIn";
import { SKILLS } from "@/lib/constants";

const SKILL_CATEGORIES = [
  {
    key: "frontend" as keyof typeof SKILLS,
    title: "Frontend",
    delay: 0,
  },
  {
    key: "backend" as keyof typeof SKILLS,
    title: "Backend",
    delay: 0.1,
  },
  {
    key: "database" as keyof typeof SKILLS,
    title: "Banco de Dados",
    delay: 0.2,
  },
  {
    key: "devops" as keyof typeof SKILLS,
    title: "DevOps & Ferramentas",
    delay: 0.3,
  },
  {
    key: "dataScience" as keyof typeof SKILLS,
    title: "Data Science",
    delay: 0.4,
  },
];

export function SkillsSection() {
  return (
    <Section id="skills" className="bg-white dark:bg-dark-card">
      <SectionHeader title="Habilidades & Tecnologias" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SKILL_CATEGORIES.map((category) => (
          <ScaleIn key={category.key} delay={category.delay}>
            <GlassCard className="h-full">
              <h3 className="text-xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
                {category.title}
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {SKILLS[category.key].map((skill) => (
                  <div
                    key={skill.name}
                    className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white/50 dark:bg-black/20 hover:bg-white/80 dark:hover:bg-black/40 transition-all group"
                    title={skill.name}
                  >
                    <i
                      className={`${skill.icon} text-4xl transition-transform group-hover:scale-110`}
                    />
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </ScaleIn>
        ))}
      </div>
    </Section>
  );
}
