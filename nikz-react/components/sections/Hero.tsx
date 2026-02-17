"use client";

import { motion } from "framer-motion";
import { PERSONAL_INFO } from "@/lib/content";
import { HERO_SEQUENCE } from "@/lib/animations";
import { ChevronDown } from "lucide-react";
import GameOfLife from "@/components/effects/GameOfLife";
import FloatingOrbs from "@/components/effects/FloatingOrbs";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Game of Life background */}
      <GameOfLife />
      <FloatingOrbs />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center space-y-8">
          {/* Name - Ultra bold, massive */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: HERO_SEQUENCE.title.delay,
              duration: HERO_SEQUENCE.title.duration,
            }}
            className="font-display font-black text-6xl sm:text-8xl lg:text-9xl text-fg-primary tracking-tight"
          >
            {PERSONAL_INFO.name}
          </motion.h1>

          {/* Role - Ultra light, creates contrast */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: HERO_SEQUENCE.subtitle.delay,
              duration: HERO_SEQUENCE.subtitle.duration,
            }}
            className="font-display font-extralight text-2xl sm:text-3xl text-accent-cyan"
          >
            {PERSONAL_INFO.role}
          </motion.p>

          {/* Code block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: HERO_SEQUENCE.codeBlock.delay,
              duration: HERO_SEQUENCE.codeBlock.duration,
            }}
            className="inline-block text-left font-code text-sm sm:text-base bg-bg-secondary/50 backdrop-blur-sm border border-fg-primary/10 rounded-lg p-6 sm:p-8"
          >
            <pre className="text-fg-secondary">
              <code>
                <span className="text-syntax-purple">const</span>{" "}
                <span className="text-syntax-cyan">developer</span>{" "}
                <span className="text-fg-primary">=</span>{" "}
                <span className="text-fg-primary">{"{"}</span>
                {"\n"}
                {"  "}
                <span className="text-syntax-blue">passion</span>
                <span className="text-fg-primary">:</span>{" "}
                <span className="text-syntax-green">
                  &quot;{PERSONAL_INFO.tagline}&quot;
                </span>
                ,{"\n"}
                {"  "}
                <span className="text-syntax-blue">location</span>
                <span className="text-fg-primary">:</span>{" "}
                <span className="text-syntax-green">
                  &quot;{PERSONAL_INFO.location}&quot;
                </span>
                ,{"\n"}
                {"  "}
                <span className="text-syntax-blue">status</span>
                <span className="text-fg-primary">:</span>{" "}
                <span className="text-syntax-green">
                  &quot;{PERSONAL_INFO.availability}&quot;
                </span>
                {"\n"}
                <span className="text-fg-primary">{"}"}</span>
              </code>
            </pre>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: HERO_SEQUENCE.cta.delay,
              duration: HERO_SEQUENCE.cta.duration,
            }}
          >
            <button
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group relative px-8 py-4 bg-accent-pink text-fg-primary font-code font-semibold rounded-lg overflow-hidden transition-all hover:scale-105 glow-pink"
            >
              <span className="relative z-10">Ver Projetos</span>
              <div className="absolute inset-0 bg-accent-cyan opacity-0 group-hover:opacity-20 transition-opacity" />
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-accent-cyan"
          >
            <ChevronDown size={32} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
