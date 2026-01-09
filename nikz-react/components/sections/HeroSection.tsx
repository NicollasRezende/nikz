// components/sections/HeroSection.tsx
"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { TypeWriter } from "@/components/features/TypeWriter";
import { OrbitingIcons } from "@/components/features/OrbitingIcons";
import { SOCIAL_LINKS, TYPEWRITER_TEXTS } from "@/lib/constants";
import { scrollToElement } from "@/lib/utils";

// Tipo para as partículas
type Particle = {
  id: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
};

export function HeroSection() {
  // Gerar partículas apenas no cliente para evitar hydration mismatch
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 3 + Math.random() * 3,
        delay: Math.random() * 2,
      }))
    );
  }, []);
  return (
    <Section
      id="home"
      className="relative min-h-screen flex items-center pt-20 pb-20 overflow-hidden"
    >
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top-left gradient orb */}
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(0,198,255,0.4) 0%, rgba(77,140,255,0.2) 50%, transparent 100%)",
            filter: "blur(60px)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Top-right gradient orb */}
        <motion.div
          className="absolute -top-20 -right-40 w-[500px] h-[500px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(157,92,252,0.4) 0%, rgba(255,86,177,0.2) 50%, transparent 100%)",
            filter: "blur(60px)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Bottom gradient orb */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(ellipse, rgba(0,198,255,0.3) 0%, rgba(77,140,255,0.15) 40%, transparent 100%)",
            filter: "blur(80px)",
          }}
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Floating particles - reduzido de 15 para 10 e otimizado */}
        {particles.map((particle) => (
          <motion.div
            key={`particle-${particle.id}`}
            className="absolute w-1 h-1 rounded-full bg-cyan-400"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              boxShadow: "0 0 10px rgba(0,198,255,0.8)",
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Text Content - Left Side */}
        <motion.div
          className="space-y-8 order-2 lg:order-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Greeting */}
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Olá, eu sou{" "}
            <motion.span
              className="inline-block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              Nicollas Rezende
            </motion.span>
          </motion.h1>

          {/* TypeWriter */}
          <motion.div
            className="h-12 sm:h-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-light-text-secondary dark:text-gray-300">
              <TypeWriter texts={TYPEWRITER_TEXTS} />
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-lg sm:text-xl text-light-text-secondary dark:text-gray-400 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Transformando ideias em soluções digitais com código limpo,
            arquitetura eficiente e experiências de usuário{" "}
            <span className="text-cyan-500 font-semibold">excepcionais</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => scrollToElement("projects")}
                className="relative overflow-hidden group px-8 py-4 text-base sm:text-lg"
                style={{
                  background: "linear-gradient(120deg, #00c6ff, #4d8cff)",
                  boxShadow: "0 4px 20px rgba(0,198,255,0.4)",
                }}
              >
                <span className="relative z-10">Ver Projetos</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                onClick={() => scrollToElement("contact")}
                className="px-8 py-4 text-base sm:text-lg border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500/10"
              >
                Contato
              </Button>
            </motion.div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            {SOCIAL_LINKS.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target={link.name !== "Email" ? "_blank" : undefined}
                rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center overflow-hidden group"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
                aria-label={link.ariaLabel}
                title={link.name}
                whileHover={{ scale: 1.15, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
              >
                <i className={`${link.icon} text-xl relative z-10`} />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Orbiting Icons - Right Side */}
        <motion.div
          className="flex items-center justify-center order-1 lg:order-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <OrbitingIcons
            imageUrl="/imgs/55924678.png"
            imageAlt="Foto de Nicollas Rezende - Desenvolvedor Full Stack"
          />
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.button
        onClick={() => scrollToElement("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group cursor-pointer"
        aria-label="Rolar para a seção Sobre"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { duration: 0.6, delay: 1.2 },
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        whileHover={{ scale: 1.1 }}
      >
        <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-cyan-500 transition-colors">
          Role para baixo
        </span>
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-cyan-500 flex items-start justify-center p-2"
          whileHover={{
            boxShadow: "0 0 20px rgba(0,198,255,0.6)",
          }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-cyan-500"
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.button>
    </Section>
  );
}
