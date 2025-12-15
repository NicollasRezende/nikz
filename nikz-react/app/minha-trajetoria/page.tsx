// app/minha-trajetoria/page.tsx
"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const experiences = [
  {
    year: "2025",
    title: "Desenvolvedor Full Stack",
    company: "SEA Tecnologia",
    period: "Jan 2025 - Presente",
    location: "Brasília, DF · Híbrido",
    icon: "fas fa-briefcase",
    color: "from-cyan-500 to-blue-500",
    glowColor: "rgba(0,198,255,0.6)",
    particleColor: "#00c6ff",
    description: "Desenvolvimento e manutenção de portais governamentais utilizando o ecossistema Liferay, entregando soluções completas em front-end, back-end e integrações corporativas. Crescimento profissional acelerado com reconhecimentos constantes.",
    highlights: [
      "Desenvolvimento de serviços REST e aplicações Java",
      "Criação e customização de temas usando React, Freemarker e Sass",
      "Implementação com Service Builder, Service Wrapper e módulos REST",
      "Integração de autenticação gov.br com CKPE e Keycloak",
      "Ferramentas de automação, scraping massivo e migração de dados",
      "Soluções de produtividade interna e melhorias de processos",
      "Níveis de excelência com múltiplos reconhecimentos e premiações"
    ],
    tags: ["Java", "Spring", "Liferay", "React", "Python", "Keycloak"]
  },
  {
    year: "2025",
    title: "🥇 1º Lugar Hackathon Crea Jr x Mútua Jr",
    company: "Hackathon",
    period: "2025",
    location: "Brasília, DF",
    icon: "fas fa-trophy",
    color: "from-emerald-500 to-teal-500",
    glowColor: "rgba(16,185,129,0.6)",
    particleColor: "#10b981",
    description: "Mais uma vitória! Conquistamos o 1º lugar desenvolvendo soluções inovadoras para empresas juniores. Cada hackathon é uma oportunidade de aprender, crescer e transformar ideias em realidade.",
    highlights: [
      "Solução inovadora para gestão de empresas juniores",
      "Desenvolvimento rápido e colaborativo em equipe",
      "Aplicação de tecnologias modernas e boas práticas",
      "Reconhecimento pela qualidade técnica e apresentação",
      "Networking com profissionais e empresas do ecossistema júnior"
    ],
    tags: ["Hackathon", "Inovação", "Empreendedorismo", "Liderança"]
  },
  {
    year: "2025",
    title: "🥉 3º Lugar Ideathon de Brasília",
    company: "Ideathon",
    period: "2025",
    location: "Brasília, DF",
    icon: "fas fa-lightbulb",
    color: "from-amber-500 to-yellow-500",
    glowColor: "rgba(245,158,11,0.6)",
    particleColor: "#f59e0b",
    description: "Conquistamos o 3º lugar na Ideathon de Brasília! Foi uma maratona de ideias, criatividade e muito aprendizado. Transformar conceitos em protótipos funcionais em tempo limitado é sempre um desafio empolgante.",
    highlights: [
      "Desenvolvimento de conceito inovador para desafios urbanos",
      "Prototipagem rápida e validação de ideias",
      "Apresentação impactante para banca avaliadora",
      "Networking com empreendedores e investidores",
      "Aprendizado intenso sobre metodologias ágeis e design thinking"
    ],
    tags: ["Ideathon", "Inovação", "Criatividade", "Prototipagem"]
  },
  {
    year: "2024",
    title: "🏆 1º Lugar AgroHack Brasília",
    company: "Hackathon",
    period: "2024",
    location: "Brasília, DF",
    icon: "fas fa-trophy",
    color: "from-yellow-500 to-orange-500",
    glowColor: "rgba(255,165,0,0.6)",
    particleColor: "#ffa500",
    description: "Dias intensos de aprendizado, desafios e muita troca de conhecimento. Cada obstáculo se transformou em uma oportunidade de crescer e criar soluções reais para o agronegócio brasileiro.",
    highlights: [
      "Trabalho em equipe com profissionais excepcionais",
      "Criação de soluções inovadoras para o agronegócio",
      "Aplicação prática de conhecimentos técnicos e IA",
      "1º lugar conquistado com dedicação e criatividade",
      "Impacto real no setor agrícola brasileiro"
    ],
    tags: ["Hackathon", "Inovação", "Agro", "IA", "Trabalho em Equipe"]
  },
  {
    year: "2024",
    title: "🥇 1º Lugar Hackathon de Brasília",
    company: "2ª Hackathon de Brasília",
    period: "2024",
    location: "Brasília, DF",
    icon: "fas fa-medal",
    color: "from-purple-500 to-pink-500",
    glowColor: "rgba(157,92,252,0.6)",
    particleColor: "#9d5cfc",
    description: "Horas intensas de aprendizado, colaboração e inovação. Conquistar o 1º lugar foi resultado de dedicação, parceria e muita energia do time. Uma experiência transformadora!",
    highlights: [
      "Desenvolvimento de solução inovadora em tempo recorde",
      "Colaboração com equipe multidisciplinar talentosa",
      "Transformação de ideias em realidade funcional",
      "Reconhecimento por excelência técnica e criatividade",
      "Apresentação impactante e defesa do projeto"
    ],
    tags: ["Hackathon", "Colaboração", "Inovação", "Liderança"]
  },
  {
    year: "2023-2024",
    title: "Engenheiro Chefe de Automação",
    company: "Teletron",
    period: "Fev 2023 - Mar 2024 · 1 ano 2 meses",
    location: "Brasília, DF · Presencial",
    icon: "fas fa-robot",
    color: "from-blue-500 to-purple-500",
    glowColor: "rgba(77,140,255,0.6)",
    particleColor: "#4d8cff",
    description: "Liderança no desenvolvimento de soluções de automação de ponta, com foco em sistemas escaláveis, integrações complexas e otimização de processos.",
    highlights: [
      "Automações avançadas em Python (Flask) com integração a diversas APIs",
      "Desenvolvimento de microserviços escaláveis para operações internas",
      "Scraping de grandes volumes usando Selenium, asyncio e pipelines assíncronos",
      "Ferramenta completa de automação de vendas e geração de orçamentos",
      "Solução para projeto esportivo automatizando inscrições e atendimento",
      "Redução de custos operacionais e melhoria no relacionamento com clientes"
    ],
    tags: ["Python", "Flask", "Selenium", "Microserviços", "Automação", "APIs"]
  },
  {
    year: "2017",
    title: "🎮 Descoberta da Programação",
    company: "Autodidata",
    period: "17 anos",
    location: "Ensino Médio",
    icon: "fab fa-python",
    color: "from-green-500 to-cyan-500",
    glowColor: "rgba(34,197,94,0.6)",
    particleColor: "#22c55e",
    description: "Conheci o amor da minha vida: Python. Uma linguagem poderosa e simples que mudou minha trajetória.",
    highlights: [
      "Apaixonei-me por Python e sua simplicidade",
      "Criei primeiros projetos solo sem frameworks",
      "Estudei intensamente, desenvolvendo paixão verdadeira",
      "Primeiros passos no desenvolvimento profissional"
    ],
    tags: ["Python", "Autodidatismo", "Game Dev", "Lua Script"]
  },
  {
    year: "2008",
    title: "💻 Primeiros Contatos",
    company: "Início da Jornada",
    period: "8 anos",
    location: "Infância",
    icon: "fas fa-microchip",
    color: "from-pink-500 to-red-500",
    glowColor: "rgba(236,72,153,0.6)",
    particleColor: "#ec4899",
    description: "Enquanto outras crianças brincavam com carrinhos, eu usava um HD como brinquedo. O início de uma paixão.",
    highlights: [
      "Primeiro contato com hardware e tecnologia",
      "Curiosidade que me acompanha até hoje",
      "Desmontando periféricos para entender funcionamento",
      "Fundamentos que moldaram minha carreira"
    ],
    tags: ["Hardware", "Curiosidade", "Fundamentos"]
  }
];

export default function MinhaTrajetoriaPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax transformations
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-dark-bg relative overflow-hidden">
      {/* Galactic Background with Parallax */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Stars Layer 1 - Fastest */}
        <motion.div
          className="absolute inset-0"
          style={{ y: y1, opacity }}
        >
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={`star1-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>

        {/* Stars Layer 2 - Medium */}
        <motion.div
          className="absolute inset-0"
          style={{ y: y2 }}
        >
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={`star2-${i}`}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.2,
                boxShadow: "0 0 10px rgba(0,198,255,0.5)",
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </motion.div>

        {/* Stars Layer 3 - Slowest */}
        <motion.div
          className="absolute inset-0"
          style={{ y: y3 }}
        >
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`star3-${i}`}
              className="absolute w-1.5 h-1.5 bg-purple-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.6 + 0.2,
                boxShadow: "0 0 15px rgba(157,92,252,0.6)",
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 2, 1],
              }}
              transition={{
                duration: Math.random() * 5 + 4,
                repeat: Infinity,
                delay: Math.random() * 4,
              }}
            />
          ))}
        </motion.div>

        {/* Nebula Effects */}
        <motion.div
          className="absolute top-20 right-0 w-[800px] h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,198,255,0.15) 0%, rgba(77,140,255,0.05) 40%, transparent 70%)",
            filter: "blur(100px)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(157,92,252,0.15) 0%, rgba(255,86,177,0.05) 40%, transparent 70%)",
            filter: "blur(100px)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center max-w-5xl"
          >
            <motion.div
              className="mb-8"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <i className="fas fa-meteor text-6xl text-cyan-400" style={{ textShadow: "0 0 30px rgba(0,198,255,0.8)" }} />
            </motion.div>

            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
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
              Minha Trajetória
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl lg:text-3xl text-slate-300 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Uma jornada pelo universo do código
            </motion.p>
            <motion.div
              className="flex items-center justify-center gap-4 text-cyan-400 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <motion.i
                className="fas fa-hand-pointer text-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />
              <span className="text-xl font-semibold">Clique nas galáxias para explorar</span>
            </motion.div>
            <motion.i
              className="fas fa-chevron-down text-3xl text-cyan-400"
              animate={{
                y: [0, 15, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </section>

        {/* Galaxy Timeline Section */}
        <section className="py-20 px-4 relative">
          <div className="max-w-7xl mx-auto">
            {/* Galaxy Cards - Masonry Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5, rotateY: -30 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="relative group"
                  style={{ perspective: "1000px" }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Galaxy Card */}
                  <motion.div
                    className="relative cursor-pointer h-full"
                    onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                    whileHover={{
                      scale: 1.05,
                      rotateY: 5,
                      z: 50
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {/* Outer Glow Ring */}
                    <motion.div
                      className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at center, ${exp.glowColor} 0%, transparent 70%)`,
                        filter: "blur(20px)",
                      }}
                      animate={hoveredCard === index ? {
                        scale: [1, 1.1, 1],
                      } : {}}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />

                    {/* Main Card Container */}
                    <div className="relative rounded-3xl overflow-hidden bg-slate-900/80 backdrop-blur-xl border-2 border-slate-700/50 group-hover:border-cyan-500/80 transition-all duration-500 shadow-2xl group-hover:shadow-[0_0_50px_rgba(0,198,255,0.3)]">
                      {/* Animated Galaxy Background */}
                      <div className="absolute inset-0 overflow-hidden">
                        {/* Rotating spiral galaxy */}
                        <motion.div
                          className={`absolute inset-0 bg-linear-to-br ${exp.color} opacity-20`}
                          animate={{
                            rotate: [0, 360],
                          }}
                          transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          style={{
                            backgroundImage: `radial-gradient(circle at 30% 50%, ${exp.glowColor} 0%, transparent 50%), radial-gradient(circle at 70% 50%, ${exp.glowColor} 0%, transparent 50%)`,
                          }}
                        />

                        {/* Pulsing core */}
                        <motion.div
                          className="absolute inset-0"
                          style={{
                            background: `radial-gradient(circle at center, ${exp.glowColor} 0%, transparent 60%)`,
                            filter: "blur(60px)",
                          }}
                          animate={{
                            opacity: [0.2, 0.5, 0.2],
                            scale: [0.8, 1.3, 0.8],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />

                        {/* Orbiting particles - Optimized */}
                        {[...Array(12)].map((_, i) => {
                          const angle = (i * 360) / 12;
                          const radius = 45;
                          return (
                            <motion.div
                              key={i}
                              className="absolute w-1 h-1 rounded-full"
                              style={{
                                left: `${50 + Math.cos(angle * Math.PI / 180) * radius}%`,
                                top: `${50 + Math.sin(angle * Math.PI / 180) * radius}%`,
                                backgroundColor: exp.particleColor,
                                boxShadow: `0 0 10px ${exp.particleColor}`,
                              }}
                              animate={{
                                opacity: [0, 1, 0],
                                scale: [0, 2, 0],
                                x: [0, Math.cos(angle * Math.PI / 180) * 10, 0],
                                y: [0, Math.sin(angle * Math.PI / 180) * 10, 0],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.15,
                                ease: "easeOut",
                              }}
                            />
                          );
                        })}

                        {/* Shooting stars on hover - Reduced for performance */}
                        {hoveredCard === index && [...Array(2)].map((_, i) => (
                          <motion.div
                            key={`shooting-${i}`}
                            className="absolute w-1 h-1 bg-white rounded-full"
                            initial={{
                              x: -20,
                              y: Math.random() * 100 + "%",
                              opacity: 0,
                            }}
                            animate={{
                              x: ["0%", "120%"],
                              y: [Math.random() * 100 + "%", (Math.random() * 100 + 20) + "%"],
                              opacity: [0, 1, 0],
                            }}
                            transition={{
                              duration: 1.5,
                              delay: i * 0.7,
                              repeat: Infinity,
                              repeatDelay: 3,
                            }}
                            style={{
                              boxShadow: "0 0 10px rgba(255,255,255,0.8)",
                            }}
                          />
                        ))}
                      </div>

                      {/* Card Content */}
                      <div className="relative p-8 flex flex-col items-center text-center min-h-[420px]">
                        {/* Animated Icon with 3D effect */}
                        <motion.div
                          className="relative mb-6"
                          animate={{
                            rotateY: hoveredCard === index ? [0, 360] : 0,
                          }}
                          transition={{
                            duration: 2,
                            ease: "easeInOut",
                          }}
                        >
                          <motion.div
                            className={`w-28 h-28 rounded-full bg-linear-to-br ${exp.color} flex items-center justify-center relative`}
                            animate={{
                              boxShadow: [
                                `0 0 30px ${exp.glowColor}`,
                                `0 0 60px ${exp.glowColor}`,
                                `0 0 30px ${exp.glowColor}`,
                              ],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            <i className={`${exp.icon} text-5xl text-white`} style={{ filter: "drop-shadow(0 0 10px rgba(255,255,255,0.5))" }} />

                            {/* Orbit rings - Reduced for performance */}
                            {[1, 1.5].map((scale, idx) => (
                              <motion.div
                                key={idx}
                                className="absolute inset-0 rounded-full border-2 border-white/20"
                                animate={{
                                  scale: [scale, scale + 0.3, scale],
                                  opacity: [0.5, 0, 0.5],
                                }}
                                transition={{
                                  duration: 3 + idx,
                                  repeat: Infinity,
                                  ease: "easeOut",
                                  delay: idx * 0.5,
                                }}
                              />
                            ))}
                          </motion.div>
                        </motion.div>

                        {/* Year Badge - Enhanced */}
                        <motion.div
                          className={`px-6 py-2 rounded-full bg-linear-to-r ${exp.color} text-white font-bold text-base mb-4 shadow-lg`}
                          whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                          transition={{ duration: 0.3 }}
                          style={{
                            boxShadow: `0 5px 20px ${exp.glowColor}`,
                          }}
                        >
                          {exp.year}
                        </motion.div>

                        {/* Title with gradient */}
                        <h3 className="text-2xl font-bold text-white mb-3 leading-tight px-2">
                          {exp.title}
                        </h3>

                        {/* Company with icon */}
                        <div className="flex items-center gap-2 text-cyan-400 mb-4">
                          <i className="fas fa-building text-sm" />
                          <p className="font-semibold text-base">{exp.company}</p>
                        </div>

                        {/* Period & Location */}
                        <div className="text-sm text-slate-400 mb-6 space-y-1">
                          <div className="flex items-center justify-center gap-2">
                            <i className="fas fa-calendar-alt text-xs" />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            <i className="fas fa-map-marker-alt text-xs" />
                            <span>{exp.location}</span>
                          </div>
                        </div>

                        {/* Click indicator with better animation */}
                        <motion.div
                          className="mt-auto flex items-center gap-2 text-slate-400 text-sm font-medium"
                          animate={{
                            y: [0, 8, 0],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        >
                          <motion.i
                            className="fas fa-hand-pointer"
                            animate={{
                              scale: [1, 1.3, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                            }}
                          />
                          <span className="bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-bold">
                            Explorar Galáxia
                          </span>
                        </motion.div>
                      </div>

                      {/* Bottom gradient line */}
                      <motion.div
                        className={`h-1 bg-linear-to-r ${exp.color}`}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Expanded Card Modal - Enhanced */}
        <AnimatePresence>
          {expandedCard !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
              onClick={() => setExpandedCard(null)}
            >
              {/* Animated particles in background - Optimized */}
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: experiences[expandedCard].particleColor,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0, 0.6, 0],
                    scale: [0, 1.2, 0],
                    y: [0, -40, -80],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}

              <motion.div
                initial={{ scale: 0.5, rotateX: -30, opacity: 0 }}
                animate={{ scale: 1, rotateX: 0, opacity: 1 }}
                exit={{ scale: 0.5, rotateX: 30, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
                style={{ perspective: "1000px" }}
              >
                <div className={`relative bg-linear-to-br from-slate-800/98 to-slate-900/98 backdrop-blur-xl rounded-3xl border-2 border-slate-700/50 p-8 md:p-12 overflow-hidden shadow-2xl`}>
                  {/* Animated background */}
                  <motion.div
                    className={`absolute inset-0 bg-linear-to-br ${experiences[expandedCard].color} opacity-10`}
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      backgroundSize: "200% 200%",
                    }}
                  />

                  {/* Floating particles - Optimized */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-white/30"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -30, 0],
                        opacity: [0, 0.8, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    />
                  ))}

                  {/* Close button */}
                  <motion.button
                    onClick={() => setExpandedCard(null)}
                    className="absolute top-6 right-6 w-14 h-14 rounded-full bg-slate-800/90 border-2 border-slate-700 flex items-center justify-center text-white hover:bg-red-500/30 hover:border-red-500/70 transition-all z-10 shadow-lg"
                    whileHover={{ scale: 1.15, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className="fas fa-times text-2xl" />
                  </motion.button>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Header with Icon and Year */}
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
                      <motion.div
                        className={`w-24 h-24 rounded-full bg-linear-to-br ${experiences[expandedCard].color} flex items-center justify-center shrink-0`}
                        animate={{
                          boxShadow: [
                            `0 0 30px ${experiences[expandedCard].glowColor}`,
                            `0 0 60px ${experiences[expandedCard].glowColor}`,
                            `0 0 30px ${experiences[expandedCard].glowColor}`,
                          ],
                          rotate: [0, 360],
                        }}
                        transition={{
                          boxShadow: { duration: 2, repeat: Infinity },
                          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        }}
                      >
                        <i className={`${experiences[expandedCard].icon} text-4xl text-white`} />
                      </motion.div>
                      <div className="flex-1 text-center md:text-left">
                        <div className={`inline-block px-6 py-2 rounded-full bg-linear-to-r ${experiences[expandedCard].color} text-white font-bold text-base mb-3 shadow-lg`}>
                          {experiences[expandedCard].year}
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
                          {experiences[expandedCard].title}
                        </h2>
                        <div className="flex flex-col md:flex-row md:items-center gap-2 text-cyan-400 mb-2">
                          <div className="flex items-center gap-2 justify-center md:justify-start">
                            <i className={experiences[expandedCard].icon} />
                            <span className="font-semibold text-lg">{experiences[expandedCard].company}</span>
                          </div>
                        </div>
                        <div className="text-sm text-slate-400 space-y-1">
                          <div className="flex items-center gap-2 justify-center md:justify-start">
                            <i className="fas fa-calendar-alt" />
                            <span>{experiences[expandedCard].period}</span>
                          </div>
                          <div className="flex items-center gap-2 justify-center md:justify-start">
                            <i className="fas fa-map-marker-alt" />
                            <span>{experiences[expandedCard].location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-slate-300 text-lg md:text-xl mb-10 leading-relaxed"
                    >
                      {experiences[expandedCard].description}
                    </motion.p>

                    {/* Highlights */}
                    <div className="mb-10">
                      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <motion.i
                          className="fas fa-star text-yellow-400 text-xl"
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />
                        Destaques
                      </h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {experiences[expandedCard].highlights.map((highlight, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="flex gap-3 text-slate-300 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all"
                          >
                            <motion.i
                              className="fas fa-check-circle text-cyan-400 mt-1 shrink-0 text-lg"
                              whileHover={{ scale: 1.3, rotate: 360 }}
                              transition={{ duration: 0.3 }}
                            />
                            <span className="leading-relaxed">{highlight}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Tags */}
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <i className="fas fa-tags text-purple-400 text-xl" />
                        Tecnologias
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {experiences[expandedCard].tags.map((tag, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + i * 0.05, type: "spring" }}
                            whileHover={{ scale: 1.15, y: -5 }}
                            className={`px-5 py-3 rounded-xl bg-linear-to-r ${experiences[expandedCard].color} text-white font-semibold border-2 border-white/20 hover:border-white/50 transition-all cursor-default shadow-lg text-base`}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quote Section */}
        <section className="py-32 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto text-center relative"
          >
            <div className="absolute inset-0 bg-linear-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 rounded-3xl blur-3xl" />
            <div className="relative bg-linear-to-r from-purple-900/30 via-slate-800/90 to-pink-900/30 backdrop-blur-xl rounded-3xl p-12 border border-purple-500/30">
              <div className="text-8xl text-purple-500/20 font-serif mb-4">"</div>
              <p className="text-3xl md:text-4xl font-bold bg-linear-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent mb-4">
                "De HDs como brinquedo aos portais governamentais"
              </p>
              <p className="text-slate-300 text-lg">
                Cada linha de código é uma oportunidade de transformar desafios em soluções reais.
                Com arquitetura robusta, código limpo e aprendizado contínuo, construo sistemas que impactam milhares de pessoas.
              </p>
              <div className="text-8xl text-pink-500/20 font-serif mt-4 rotate-180">"</div>
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
              Vamos construir algo incrível juntos?
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-cyan-500 text-cyan-400 rounded-full hover:bg-cyan-500/10 transition-all duration-300 flex items-center justify-center gap-3 text-lg font-semibold"
                >
                  <i className="fas fa-arrow-left" />
                  Voltar ao Portfólio
                </motion.button>
              </Link>
              <Link href="/#contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-linear-to-r from-cyan-500 to-blue-500 text-white rounded-full hover:shadow-[0_0_40px_rgba(0,198,255,0.6)] transition-all duration-300 flex items-center justify-center gap-3 text-lg font-semibold"
                >
                  Vamos Conversar
                  <i className="fas fa-rocket" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
