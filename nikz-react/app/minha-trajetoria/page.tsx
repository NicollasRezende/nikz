// app/minha-trajetoria/page.tsx
"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Tipos para as partículas e estrelas
type Star = {
  id: number;
  left: number;
  top: number;
  opacity: number;
  duration: number;
  delay: number;
};

type ModalParticle = {
  id: number;
  left: number;
  top: number;
};

type ModalInnerParticle = {
  id: number;
  left: number;
  top: number;
  delay: number;
};

type CardParticle = {
  id: number;
  angle: number;
  left: number;
  top: number;
  xOffset: number;
  yOffset: number;
};

// Funções geradoras (serão chamadas apenas no cliente)
const generateStarsLayer1 = () =>
  Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    opacity: Math.random() * 0.7 + 0.3,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }));

const generateStarsLayer2 = () =>
  Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    opacity: Math.random() * 0.5 + 0.2,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 3,
  }));

const generateStarsLayer3 = () =>
  Array.from({ length: 10 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    opacity: Math.random() * 0.6 + 0.2,
    duration: Math.random() * 5 + 4,
    delay: Math.random() * 4,
  }));

const generateModalParticles = () =>
  Array.from({ length: 10 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
  }));

const generateModalInnerParticles = () =>
  Array.from({ length: 5 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: i * 0.6,
  }));

const generateCardParticles = () =>
  Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 360) / 12;
    const radius = 45;
    return {
      id: i,
      angle,
      left: 50 + Math.cos((angle * Math.PI) / 180) * radius,
      top: 50 + Math.sin((angle * Math.PI) / 180) * radius,
      xOffset: Math.cos((angle * Math.PI) / 180) * 10,
      yOffset: Math.sin((angle * Math.PI) / 180) * 10,
    };
  });

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

  // Estados para partículas e estrelas (geradas apenas no cliente)
  const [starsLayer1, setStarsLayer1] = useState<Star[]>([]);
  const [starsLayer2, setStarsLayer2] = useState<Star[]>([]);
  const [starsLayer3, setStarsLayer3] = useState<Star[]>([]);
  const [modalParticles, setModalParticles] = useState<ModalParticle[]>([]);
  const [modalInnerParticles, setModalInnerParticles] = useState<ModalInnerParticle[]>([]);
  const [cardParticles, setCardParticles] = useState<CardParticle[]>([]);

  // Gerar todas as partículas apenas no cliente para evitar hydration mismatch
  useEffect(() => {
    setStarsLayer1(generateStarsLayer1());
    setStarsLayer2(generateStarsLayer2());
    setStarsLayer3(generateStarsLayer3());
    setModalParticles(generateModalParticles());
    setModalInnerParticles(generateModalInnerParticles());
    setCardParticles(generateCardParticles());
  }, []);

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
        {/* Stars Layer 1 - Fastest (Otimizado: 50→40 estrelas) */}
        <motion.div
          className="absolute inset-0"
          style={{ y: y1, opacity }}
        >
          {starsLayer1.map((star) => (
            <motion.div
              key={`star1-${star.id}`}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                opacity: star.opacity,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                delay: star.delay,
              }}
            />
          ))}
        </motion.div>

        {/* Stars Layer 2 - Medium (Otimizado: 25→15 estrelas) */}
        <motion.div
          className="absolute inset-0"
          style={{ y: y2 }}
        >
          {starsLayer2.map((star) => (
            <motion.div
              key={`star2-${star.id}`}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                opacity: star.opacity,
                boxShadow: "0 0 10px rgba(0,198,255,0.5)",
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                delay: star.delay,
              }}
            />
          ))}
        </motion.div>

        {/* Stars Layer 3 - Slowest (Otimizado: 15→10 estrelas) */}
        <motion.div
          className="absolute inset-0"
          style={{ y: y3 }}
        >
          {starsLayer3.map((star) => (
            <motion.div
              key={`star3-${star.id}`}
              className="absolute w-1.5 h-1.5 bg-purple-400 rounded-full"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                opacity: star.opacity,
                boxShadow: "0 0 15px rgba(157,92,252,0.6)",
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 2, 1],
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                delay: star.delay,
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
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent px-4"
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
              className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-12 px-4"
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
            {/* Galaxy Cards - Masonry Layout Otimizado */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  className="relative group"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Galaxy Card - Animações otimizadas */}
                  <motion.div
                    className="relative cursor-pointer h-full"
                    onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Outer Glow Ring - Otimizado */}
                    <div
                      className="absolute -inset-2 md:-inset-4 rounded-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle at center, ${exp.glowColor} 0%, transparent 70%)`,
                        filter: "blur(15px)",
                      }}
                    />

                    {/* Main Card Container */}
                    <div className="relative rounded-3xl overflow-hidden bg-slate-900/80 backdrop-blur-xl border-2 border-slate-700/50 group-hover:border-cyan-500/80 transition-all duration-500 shadow-2xl group-hover:shadow-[0_0_50px_rgba(0,198,255,0.3)]">
                      {/* Animated Galaxy Background - Otimizado */}
                      <div className="absolute inset-0 overflow-hidden">
                        {/* Static gradient background */}
                        <div
                          className={`absolute inset-0 bg-linear-to-br ${exp.color} opacity-15`}
                          style={{
                            backgroundImage: `radial-gradient(circle at 30% 50%, ${exp.glowColor} 0%, transparent 50%), radial-gradient(circle at 70% 50%, ${exp.glowColor} 0%, transparent 50%)`,
                          }}
                        />

                        {/* Subtle pulsing core - apenas no hover */}
                        {hoveredCard === index && (
                          <motion.div
                            className="absolute inset-0"
                            style={{
                              background: `radial-gradient(circle at center, ${exp.glowColor} 0%, transparent 60%)`,
                              filter: "blur(40px)",
                            }}
                            animate={{
                              opacity: [0.1, 0.3, 0.1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                        )}

                        {/* Orbiting particles - Otimizado com pré-cálculo */}
                        {cardParticles.map((particle) => (
                          <motion.div
                            key={particle.id}
                            className="absolute w-1 h-1 rounded-full"
                            style={{
                              left: `${particle.left}%`,
                              top: `${particle.top}%`,
                              backgroundColor: exp.particleColor,
                              boxShadow: `0 0 10px ${exp.particleColor}`,
                            }}
                            animate={{
                              opacity: [0, 1, 0],
                              scale: [0, 2, 0],
                              x: [0, particle.xOffset, 0],
                              y: [0, particle.yOffset, 0],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              delay: particle.id * 0.15,
                              ease: "easeOut",
                            }}
                          />
                        ))}

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
              {modalParticles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: experiences[expandedCard].particleColor,
                    left: `${particle.left}%`,
                    top: `${particle.top}%`,
                  }}
                  animate={{
                    opacity: [0, 0.6, 0],
                    scale: [0, 1.2, 0],
                    y: [0, -40, -80],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: particle.id * 0.2,
                  }}
                />
              ))}

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto mx-4 md:mx-0"
                onClick={(e) => e.stopPropagation()}
              >
                <div className={`relative bg-linear-to-br from-slate-800/98 to-slate-900/98 backdrop-blur-xl rounded-2xl md:rounded-3xl border-2 border-slate-700/50 p-6 md:p-12 overflow-hidden shadow-2xl`}>
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

                  {/* Floating particles - Otimizado (8→5) */}
                  {modalInnerParticles.map((particle) => (
                    <motion.div
                      key={particle.id}
                      className="absolute w-1 h-1 rounded-full bg-white/30"
                      style={{
                        left: `${particle.left}%`,
                        top: `${particle.top}%`,
                      }}
                      animate={{
                        y: [0, -30, 0],
                        opacity: [0, 0.8, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: particle.delay,
                      }}
                    />
                  ))}

                  {/* Close button - Melhorado para mobile */}
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedCard(null);
                    }}
                    className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 md:w-14 md:h-14 rounded-full bg-red-500/90 border-2 border-red-600 flex items-center justify-center text-white hover:bg-red-600 transition-all z-50 shadow-2xl backdrop-blur-sm"
                    whileHover={{ scale: 1.15, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Fechar modal"
                  >
                    <i className="fas fa-times text-xl md:text-2xl" />
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
