"use client";

import { motion } from "framer-motion";
import { SKILLS } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import { Code2, Server, Wrench } from "lucide-react";

export default function Skills() {
  const skillCategories = [
    {
      key: "frontend" as const,
      label: "Frontend",
      color: "from-accent-cyan to-blue-400",
      borderColor: "border-accent-cyan/30",
      Icon: Code2,
    },
    {
      key: "backend" as const,
      label: "Backend",
      color: "from-accent-purple to-pink-400",
      borderColor: "border-accent-purple/30",
      Icon: Server,
    },
    {
      key: "tools" as const,
      label: "Tools & DevOps",
      color: "from-accent-green to-teal-400",
      borderColor: "border-accent-green/30",
      Icon: Wrench,
    },
  ];

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 bg-bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <SectionHeading number="02" title="skills" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.3 }}
              className="group"
            >
              {/* Card */}
              <div className={`relative bg-bg-primary/50 border ${category.borderColor} rounded-xl p-6 transition-colors duration-200 h-full`}>
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-lg bg-linear-to-br ${category.color} flex items-center justify-center`}>
                      <category.Icon className="text-bg-primary" size={20} />
                    </div>
                    <h3 className={`font-display text-xl font-bold bg-linear-to-r ${category.color} bg-clip-text text-transparent`}>
                      {category.label}
                    </h3>
                  </div>
                  <div className={`h-1 w-16 bg-linear-to-r ${category.color} rounded-full`} />
                </div>

                {/* Skills */}
                <div className="space-y-4">
                  {SKILLS[category.key].map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      {/* Skill name and level */}
                      <div className="flex justify-between items-center">
                        <span className="font-code text-sm text-fg-primary">
                          {skill.name}
                        </span>
                        <span className="font-code text-xs text-fg-muted">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="h-1.5 bg-bg-secondary/50 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          className={`h-full bg-linear-to-r ${category.color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-6 px-6 sm:px-8 py-6 bg-bg-primary/50 border border-fg-primary/10 rounded-2xl">
            <div className="text-center">
              <div className="text-4xl font-bold bg-linear-to-r from-accent-cyan to-blue-400 bg-clip-text text-transparent">
                {SKILLS.frontend.length + SKILLS.backend.length + SKILLS.tools.length}
              </div>
              <div className="text-xs text-fg-muted font-code mt-1">tecnologias</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-fg-primary/10" />
            <div className="text-center">
              <div className="text-4xl font-bold bg-linear-to-r from-accent-purple to-pink-400 bg-clip-text text-transparent">
                2+
              </div>
              <div className="text-xs text-fg-muted font-code mt-1">anos</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-fg-primary/10" />
            <div className="text-center">
              <div className="text-4xl font-bold bg-linear-to-r from-accent-green to-teal-400 bg-clip-text text-transparent">
                4
              </div>
              <div className="text-xs text-fg-muted font-code mt-1">hackathons</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
