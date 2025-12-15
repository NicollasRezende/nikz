// components/sections/AboutSection.tsx
"use client";

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { STAT_CARDS } from "@/lib/constants";
import { scrollToElement } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

export function AboutSection() {
  return (
    <Section id="about" className="bg-linear-to-b from-light-bg-secondary via-light-bg-primary to-light-bg-secondary dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Animated background elements - More dynamic */}
      <motion.div
        className="absolute top-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-purple-500/20 via-pink-500/10 to-transparent rounded-full blur-3xl"
        animate={{
          scale: [1.3, 1, 1.3],
          x: [0, -50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwYzZmZjEwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />

      <SectionHeader title="Sobre Mim" />

      {/* Creative Content Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Bio Card - Redesigned with image placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8"
          >
            <div className="relative h-full bg-linear-to-br from-white/90 to-light-bg-secondary/90 dark:from-slate-800/90 dark:to-slate-900/90 backdrop-blur-xl rounded-3xl p-8 border border-light-card-border dark:border-slate-700/50 overflow-hidden group hover:border-cyan-500/50 transition-all duration-500 shadow-light-lg dark:shadow-none">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-2xl" />

              {/* Code-like decoration */}
              <div className="absolute top-4 right-4 opacity-10 font-mono text-xs text-cyan-400">
                <div>&lt;developer&gt;</div>
                <div className="ml-4">passion: "code"</div>
                <div className="ml-4">mission: "innovate"</div>
                <div>&lt;/developer&gt;</div>
              </div>

              <div className="relative z-10 space-y-6">
                {/* Title with animated underline */}
                <div>
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold mb-2"
                  >
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                      Desenvolvedor Full Stack
                    </span>
                  </motion.h3>
                  <motion.div
                    className="h-1 bg-gradient-to-r from-cyan-500 to-transparent rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "60%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </div>

                {/* Bio paragraphs with icons */}
                <div className="space-y-4 text-light-text-secondary dark:text-slate-300 leading-relaxed">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex gap-4 items-start group/item"
                  >
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover/item:bg-cyan-500/20 transition-colors">
                      <i className="fas fa-briefcase text-cyan-400" />
                    </div>
                    <p>
                      Atuo como <span className="text-cyan-400 font-semibold">Desenvolvedor Full Stack na SEA Tecnologia</span>, desenvolvendo e mantendo
                      <span className="text-blue-400 font-semibold"> portais governamentais</span> utilizando o ecossistema{" "}
                      <span className="text-purple-400 font-semibold">Liferay</span>, entregando soluções completas em front-end, back-end e integrações corporativas.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex gap-4 items-start group/item"
                  >
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover/item:bg-purple-500/20 transition-colors">
                      <i className="fas fa-trophy text-purple-400" />
                    </div>
                    <p>
                      <span className="text-purple-400 font-semibold">Campeão em 2 Hackathons</span> (AgroHack Brasília e 2ª Hackathon de Brasília),
                      com experiência em desenvolvimento de{" "}
                      <span className="text-cyan-400 font-semibold">soluções escaláveis</span>,{" "}
                      <span className="text-blue-400 font-semibold">automação de processos</span> e{" "}
                      <span className="text-pink-400 font-semibold">integrações com IA</span>.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="flex gap-4 items-start group/item"
                  >
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover/item:bg-blue-500/20 transition-colors">
                      <i className="fas fa-rocket text-blue-400" />
                    </div>
                    <p>
                      Expertise em <span className="text-blue-400 font-semibold">Java (Spring/Liferay)</span>,{" "}
                      <span className="text-cyan-400 font-semibold">Python (Flask/FastAPI/Django)</span> e{" "}
                      <span className="text-purple-400 font-semibold">React/Next.js</span>, com foco em arquiteturas distribuídas,
                      microserviços, pipelines CI/CD e containers Docker.
                    </p>
                  </motion.div>
                </div>

                {/* Tech stack pills */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap gap-2 pt-4"
                >
                  {["Java", "Spring", "Liferay", "Python", "Flask", "FastAPI", "React", "Next.js", "TypeScript", "Docker", "CI/CD"].map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 + i * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-3 py-1.5 text-sm rounded-lg bg-light-bg-tertiary/70 dark:bg-slate-700/50 text-light-text-primary dark:text-slate-300 border border-light-card-border dark:border-slate-600/50 hover:border-cyan-500/50 hover:text-cyan-500 dark:hover:text-cyan-300 transition-all cursor-default"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Stats Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Stat 1 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-linear-to-br from-white/90 to-light-bg-secondary/90 dark:from-slate-800/90 dark:to-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-light-card-border dark:border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 group shadow-light-md dark:shadow-none"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-500/30"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <i className="fas fa-code text-2xl text-blue-400" />
                </motion.div>
                <div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    {STAT_CARDS[0].value}
                  </div>
                  <p className="text-sm text-slate-400">{STAT_CARDS[0].label}</p>
                </div>
              </div>
            </motion.div>

            {/* Stat 2 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-500 group"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/30"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <i className="fas fa-project-diagram text-2xl text-purple-400" />
                </motion.div>
                <div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {STAT_CARDS[1].value}
                  </div>
                  <p className="text-sm text-slate-400">{STAT_CARDS[1].label}</p>
                </div>
              </div>
            </motion.div>

            {/* Stat 3 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 group"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-500/30"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(0,198,255,0.2)",
                      "0 0 30px rgba(0,198,255,0.4)",
                      "0 0 20px rgba(0,198,255,0.2)",
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <i className="fas fa-graduation-cap text-2xl text-cyan-400" />
                </motion.div>
                <div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {STAT_CARDS[2].value}
                  </div>
                  <p className="text-sm text-slate-400">{STAT_CARDS[2].label}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Philosophy Quote - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-12"
          >
            <div className="relative bg-gradient-to-r from-purple-900/30 via-slate-800/90 to-pink-900/30 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-purple-500/30 overflow-hidden group hover:border-purple-500/50 transition-all duration-500">
              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: "200% 200%" }}
              />

              {/* Quote marks decoration */}
              <div className="absolute top-8 left-8 text-8xl text-purple-500/10 font-serif">"</div>
              <div className="absolute bottom-8 right-8 text-8xl text-pink-500/10 font-serif rotate-180">"</div>

              <div className="relative z-10 text-center max-w-3xl mx-auto">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="text-2xl md:text-3xl font-bold mb-4"
                >
                  <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                    "Cada obstáculo é uma oportunidade de crescer"
                  </span>
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                  className="text-slate-300 text-lg"
                >
                  Transformo desafios em soluções reais através de código limpo, arquitetura robusta e
                  uma mentalidade de aprendizado contínuo. Aprendi isso vencendo hackathons e desenvolvendo
                  sistemas escaláveis que impactam milhares de pessoas.
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-12"
          >
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Button
                onClick={() => scrollToElement("contact")}
                className="group relative overflow-hidden px-8 py-4 text-lg"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Vamos Trabalhar Juntos
                  <i className="fas fa-rocket transition-transform group-hover:translate-x-1" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
              <Link href="/minha-trajetoria" className="flex-1 sm:flex-initial">
                <Button variant="outline" className="w-full group relative overflow-hidden px-8 py-4 text-lg">
                  <span className="relative z-10 flex items-center gap-2">
                    Minha Trajetória
                    <i className="fas fa-long-arrow-alt-right transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
