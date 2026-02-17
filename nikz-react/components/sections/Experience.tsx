"use client";

import { motion } from "framer-motion";
import { EXPERIENCE } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 bg-bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <SectionHeading number="04" title="experience" />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="relative space-y-12"
        >
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-accent-cyan via-accent-purple to-transparent" />

          {EXPERIENCE.map((job, index) => (
            <motion.div
              key={job.id}
              variants={fadeInUp}
              className="relative pl-8 space-y-4"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-accent-cyan glow-cyan" />

              {/* Content */}
              <div>
                <div className="font-code text-xs text-fg-muted mb-2">
                  {job.period} · {job.location}
                </div>
                <h3 className="font-display font-bold text-xl text-fg-primary">
                  {job.role}
                </h3>
                <p className="font-code text-sm text-accent-cyan">{job.company}</p>
              </div>

              <p className="text-fg-secondary leading-relaxed">
                {job.description}
              </p>

              {/* Achievements */}
              <ul className="space-y-2">
                {job.achievements.map((achievement, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-fg-secondary text-sm"
                  >
                    <span className="text-accent-green mt-1">▹</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2">
                {job.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-bg-primary border border-fg-primary/10 rounded text-xs font-code text-fg-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
