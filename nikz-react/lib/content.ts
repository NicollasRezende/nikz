export const PERSONAL_INFO = {
  name: "Nicollas Rezende",
  fullName: "Nicollas Pereira Rezende",
  role: "Desenvolvedor Full Stack",
  tagline: "Transformando desafios em soluções reais",
  bio: "Desenvolvedor Full Stack especializado em portais governamentais, automação de processos e soluções escaláveis. Campeão em 4 hackathons. Expertise em Java (Spring/Liferay), Python (Flask/FastAPI) e React/Next.js.",
  philosophy: "Cada obstáculo é uma oportunidade de crescer",
  location: "Brasília, DF",
  availability: "Aberto a novas oportunidades",
  links: {
    email: "nicollaspereirarezende@outlook.com.br",
    github: "https://github.com/NicollasRezende",
    linkedin: "https://linkedin.com/in/nicollas-rezende",
    whatsapp: "https://wa.me/5561991769500",
    portfolio: "https://nikz.vercel.app",
  },
};

export const SKILLS = {
  frontend: [
    { name: "React", level: 95 },
    { name: "Next.js", level: 95 },
    { name: "TypeScript", level: 90 },
    { name: "Tailwind CSS", level: 95 },
    { name: "JavaScript", level: 95 },
    { name: "Sass", level: 85 },
  ],
  backend: [
    { name: "Java", level: 95 },
    { name: "Spring", level: 95 },
    { name: "Python", level: 95 },
    { name: "Flask", level: 90 },
    { name: "FastAPI", level: 90 },
    { name: "Node.js", level: 85 },
    { name: "Liferay", level: 95 },
  ],
  tools: [
    { name: "Git", level: 95 },
    { name: "Docker", level: 90 },
    { name: "PostgreSQL", level: 90 },
    { name: "Keycloak", level: 85 },
    { name: "Selenium", level: 90 },
    { name: "CI/CD", level: 85 },
  ],
};

export const PROJECTS = [
  {
    id: "nikz-portfolio",
    title: "Portfolio Profissional",
    description: "Portfólio moderno e interativo com Next.js 16, TypeScript e animações avançadas",
    longDescription:
      "Portfólio completo com 8 seções interativas, GitHub Activity Heatmap, página de trajetória com parallax scrolling, design glassmorphism e performance otimizada (Lighthouse 95+).",
    tech: ["Next.js 16", "TypeScript", "Tailwind v4", "Framer Motion", "Zustand"],
    image: "/projects/portfolio.png",
    github: "https://github.com/NicollasRezende/nikz",
    demo: "https://nikz.vercel.app",
    featured: true,
    status: "production",
    year: 2025,
  },
  {
    id: "government-portal",
    title: "Portal Governamental",
    description: "Portal governamental de alta complexidade usando Liferay DXP",
    longDescription:
      "Desenvolvimento de portal governamental completo com autenticação gov.br, integração Keycloak, Service Builder, temas customizados em React e automação de processos.",
    tech: ["Java", "Spring", "Liferay", "React", "Keycloak", "PostgreSQL"],
    image: "/projects/gov-portal.png",
    github: undefined,
    demo: undefined,
    featured: true,
    status: "production",
    year: 2025,
  },
  {
    id: "automation-suite",
    title: "Suite de Automação",
    description: "Sistema completo de automação de vendas e processos internos",
    longDescription:
      "Ferramenta de automação massiva com scraping, pipelines assíncronos, geração de orçamentos, integração com múltiplas APIs e microserviços escaláveis.",
    tech: ["Python", "Flask", "Selenium", "Asyncio", "Docker", "Microservices"],
    image: "/projects/automation.png",
    github: undefined,
    demo: undefined,
    featured: false,
    status: "production",
    year: 2024,
  },
];

export const EXPERIENCE = [
  {
    id: "sea-tecnologia",
    company: "SEA Tecnologia",
    role: "Desenvolvedor Full Stack",
    period: "Jan 2025 - Presente",
    location: "Brasília, DF · Híbrido",
    description: "Desenvolvimento e manutenção de portais governamentais utilizando Liferay",
    achievements: [
      "Desenvolvimento de serviços REST e aplicações Java",
      "Criação e customização de temas com React, Freemarker e Sass",
      "Integração de autenticação gov.br com CKPE e Keycloak",
      "Ferramentas de automação e scraping massivo",
      "Múltiplos reconhecimentos e premiações",
    ],
    tech: ["Java", "Spring", "Liferay", "React", "Python", "Keycloak"],
  },
  {
    id: "teletron",
    company: "Teletron",
    role: "Engenheiro Chefe de Automação",
    period: "Fev 2023 - Mar 2024",
    location: "Brasília, DF · Presencial",
    description: "Liderança no desenvolvimento de soluções de automação escaláveis",
    achievements: [
      "Automações avançadas em Python (Flask) com integração de APIs",
      "Microserviços escaláveis para operações internas",
      "Scraping massivo usando Selenium e asyncio",
      "Automação de vendas e geração de orçamentos",
      "Redução de custos operacionais",
    ],
    tech: ["Python", "Flask", "Selenium", "Microserviços", "Docker", "APIs"],
  },
];

export const HACKATHONS = [
  {
    id: "crea-mutua-2025",
    title: "1º Lugar Hackathon Crea Jr x Mútua Jr",
    position: "🥇 Campeão",
    year: 2025,
    location: "Brasília, DF",
    description: "Solução inovadora para gestão de empresas juniores",
    achievements: [
      "Desenvolvimento rápido e colaborativo",
      "Aplicação de tecnologias modernas",
      "Reconhecimento pela qualidade técnica",
      "Networking com profissionais do ecossistema júnior",
    ],
  },
  {
    id: "ideathon-2025",
    title: "3º Lugar Ideathon de Brasília",
    position: "🥉 Bronze",
    year: 2025,
    location: "Brasília, DF",
    description: "Conceito inovador para desafios urbanos",
    achievements: [
      "Prototipagem rápida e validação de ideias",
      "Apresentação impactante",
      "Networking com empreendedores e investidores",
      "Metodologias ágeis e design thinking",
    ],
  },
  {
    id: "agrohack-2025",
    title: "1º Lugar AgroHack Brasília",
    position: "🏆 Campeão",
    year: 2025,
    location: "Brasília, DF",
    description: "Soluções inovadoras para o agronegócio brasileiro",
    achievements: [
      "Trabalho em equipe excepcional",
      "Aplicação prática de IA",
      "Impacto real no setor agrícola",
      "Dedicação e criatividade premiadas",
    ],
  },
  {
    id: "hackathon-bsb-2025",
    title: "1º Lugar 2ª Hackathon de Brasília",
    position: "🥇 Campeão",
    year: 2025,
    location: "Brasília, DF",
    description: "Solução inovadora desenvolvida em tempo recorde",
    achievements: [
      "Colaboração multidisciplinar",
      "Transformação de ideias em realidade",
      "Excelência técnica e criatividade",
      "Apresentação impactante",
    ],
  },
];
