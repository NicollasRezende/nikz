"use client";

import { motion } from "framer-motion";
import { HACKATHONS } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import { Trophy, Award, Medal } from "lucide-react";

export default function Hackathons() {
  const getIcon = (position: string) => {
    if (position.includes("1º")) return Trophy;
    if (position.includes("3º")) return Medal;
    return Award;
  };

  return (
    <section id="hackathons" className="py-24 px-4 sm:px-6 lg:px-8 bg-bg-primary/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeading number="04" title="hackathons" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {HACKATHONS.map((hackathon, index) => {
            const Icon = getIcon(hackathon.position);

            return (
              <motion.div
                key={hackathon.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative bg-bg-primary border border-fg-primary/10 rounded-lg p-6 hover:border-accent-cyan/50 transition-colors duration-200 h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 shrink-0 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
                          <Icon className="text-accent-cyan" size={20} />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-display font-bold text-lg text-fg-primary wrap-break-word">
                            {hackathon.title}
                          </h3>
                          <p className="text-sm text-fg-muted truncate">{hackathon.location}</p>
                        </div>
                      </div>
                    </div>
                    <span className="shrink-0 px-3 py-1 bg-bg-secondary border border-accent-purple/30 rounded text-xs font-code text-accent-purple">
                      {hackathon.year}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-fg-secondary text-sm mb-4">
                    {hackathon.description}
                  </p>

                  {/* Achievements */}
                  <div className="space-y-2">
                    {hackathon.achievements.slice(0, 3).map((achievement, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-accent-cyan text-xs mt-1">▹</span>
                        <p className="text-xs text-fg-muted flex-1">{achievement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-wrap justify-center items-center gap-6 px-8 py-4 bg-bg-secondary/50 border border-accent-cyan/20 rounded-2xl">
            <div>
              <div className="text-3xl font-bold text-accent-cyan">4</div>
              <div className="text-xs text-fg-muted font-code">hackathons</div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-fg-primary/10" />
            <div>
              <div className="text-3xl font-bold text-accent-purple">3</div>
              <div className="text-xs text-fg-muted font-code">1º lugares</div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-fg-primary/10" />
            <div>
              <div className="text-3xl font-bold text-accent-pink">1</div>
              <div className="text-xs text-fg-muted font-code">3º lugar</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
