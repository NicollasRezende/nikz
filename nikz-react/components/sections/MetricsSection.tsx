// components/sections/MetricsSection.tsx
"use client";

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Metric {
  value: string;
  label: string;
  icon: string;
  color: "cyan" | "blue" | "purple" | "pink";
  description: string;
  prefix?: string;
  suffix?: string;
  countTo?: number;
}

const METRICS: Metric[] = [
  {
    value: "67",
    countTo: 67,
    label: "Repositórios Públicos",
    icon: "fab fa-github",
    color: "cyan",
    description: "Projetos open-source desenvolvidos",
    suffix: "+",
  },
  {
    value: "35",
    countTo: 35,
    label: "APIs REST Desenvolvidas",
    icon: "fas fa-network-wired",
    color: "blue",
    description: "Sistemas distribuídos e microserviços",
    suffix: "+",
  },
  {
    value: "500K",
    countTo: 500,
    label: "Linhas de Código",
    icon: "fas fa-code",
    color: "purple",
    description: "Em produção impactando milhares",
    suffix: "K+",
  },
  {
    value: "99.9",
    countTo: 99.9,
    label: "Uptime em Produção",
    icon: "fas fa-server",
    color: "pink",
    description: "Sistemas governamentais críticos",
    suffix: "%",
  },
  {
    value: "50",
    countTo: 50,
    label: "Portais Governamentais",
    icon: "fas fa-landmark",
    color: "cyan",
    description: "Desenvolvidos e mantidos com Liferay",
    suffix: "+",
  },
  {
    value: "4",
    countTo: 4,
    label: "Hackathons Vencidos",
    icon: "fas fa-trophy",
    color: "blue",
    description: "2x 1º lugar, 1x 2º lugar, 1x 3º lugar",
  },
  {
    value: "17",
    countTo: 17,
    label: "Seguidores GitHub",
    icon: "fas fa-users",
    color: "purple",
    description: "Desenvolvedor ativo na comunidade",
    suffix: "+",
  },
  {
    value: "6",
    countTo: 6,
    label: "Anos Codificando",
    icon: "fas fa-calendar-alt",
    color: "pink",
    description: "Desde 2019 transformando ideias em código",
    suffix: "+",
  },
];

function CountUpAnimation({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    if (latest >= 100) return Math.round(latest);
    if (latest >= 10) return Math.round(latest * 10) / 10;
    return Math.round(latest * 100) / 100;
  });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    const controls = animate(count, value, {
      duration,
      ease: "easeOut",
    });

    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayValue(latest.toString());
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [count, rounded, value, duration]);

  return (
    <span>
      {prefix}{displayValue}{suffix}
    </span>
  );
}

export function MetricsSection() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Section
      id="metrics"
      className="bg-linear-to-b from-light-bg-primary via-light-bg-secondary to-light-bg-primary dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden"
    >
      <div ref={sectionRef}>
        {/* Animated background */}
        <motion.div
          className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 80, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-purple-500/20 via-pink-500/10 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            x: [0, -80, 0],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <SectionHeader title="Impacto em Números" />

        {/* Metrics Grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
          {METRICS.map((metric, index) => {
            const colorClasses = {
              cyan: {
                gradient: "from-cyan-500/20 to-blue-500/20",
                textGradient: "from-cyan-400 to-blue-400",
                text: "text-cyan-400",
                border: "border-cyan-500/30",
                glow: "hover:shadow-cyan-500/20",
                iconBg: "bg-cyan-500/10",
              },
              blue: {
                gradient: "from-blue-500/20 to-purple-500/20",
                textGradient: "from-blue-400 to-purple-400",
                text: "text-blue-400",
                border: "border-blue-500/30",
                glow: "hover:shadow-blue-500/20",
                iconBg: "bg-blue-500/10",
              },
              purple: {
                gradient: "from-purple-500/20 to-pink-500/20",
                textGradient: "from-purple-400 to-pink-400",
                text: "text-purple-400",
                border: "border-purple-500/30",
                glow: "hover:shadow-purple-500/20",
                iconBg: "bg-purple-500/10",
              },
              pink: {
                gradient: "from-pink-500/20 to-purple-500/20",
                textGradient: "from-pink-400 to-purple-400",
                text: "text-pink-400",
                border: "border-pink-500/30",
                glow: "hover:shadow-pink-500/20",
                iconBg: "bg-pink-500/10",
              },
            };

            const colors = colorClasses[metric.color];

            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.2 },
                }}
                className={`relative group bg-linear-to-br from-white/95 to-light-bg-secondary/95 dark:from-slate-800/90 dark:to-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border ${colors.border} hover:border-${metric.color}-500/50 ${colors.glow} hover:shadow-2xl transition-all duration-500 overflow-hidden shadow-light-md dark:shadow-none`}
              >
                {/* Decorative corner */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${colors.gradient} rounded-bl-full opacity-30 group-hover:opacity-50 transition-opacity duration-500`} />

                {/* Glow effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-20 rounded-2xl`}
                  initial={false}
                  transition={{ duration: 0.5 }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    initial={{ rotate: 0, scale: 1 }}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className={`w-14 h-14 rounded-xl ${colors.iconBg} flex items-center justify-center mb-4 border ${colors.border}`}
                  >
                    <i className={`${metric.icon} text-2xl ${colors.text}`} />
                  </motion.div>

                  {/* Value */}
                  <motion.div
                    className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${colors.textGradient} bg-clip-text text-transparent mb-2`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    {inView && metric.countTo !== undefined ? (
                      <CountUpAnimation
                        value={metric.countTo}
                        suffix={metric.suffix}
                        prefix={metric.prefix}
                        duration={2 + index * 0.1}
                      />
                    ) : (
                      metric.value
                    )}
                  </motion.div>

                  {/* Label */}
                  <h3 className="text-base font-semibold text-light-text-primary dark:text-slate-200 mb-2">
                    {metric.label}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-light-text-secondary dark:text-slate-400 leading-relaxed">
                    {metric.description}
                  </p>
                </div>

                {/* Particle effects on hover */}
                <motion.div
                  className={`absolute -top-2 -right-2 w-2 h-2 rounded-full ${colors.iconBg} opacity-0 group-hover:opacity-100`}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="relative z-10 text-center mt-12"
        >
          <p className="text-lg text-light-text-secondary dark:text-slate-400 max-w-2xl mx-auto">
            Cada número representa <span className="text-cyan-400 font-semibold">dedicação</span>,
            <span className="text-blue-400 font-semibold"> aprendizado contínuo</span> e
            <span className="text-purple-400 font-semibold"> impacto real</span> em sistemas que servem milhares de pessoas.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
