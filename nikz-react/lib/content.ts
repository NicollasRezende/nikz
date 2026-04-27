export const PERSONAL_INFO = {
  name: "Nicollas Rezende",
  fullName: "Nicollas Pereira Rezende",
  role: "Full Stack Developer",
  tagline: "Transformando desafios em soluções reais",
  bio: "Desenvolvedor full stack focado em portais governamentais, automação de processos e soluções escaláveis. Campeão em 4 hackathons. Expertise em Java (Spring/Liferay), Python (Flask/FastAPI) e React/Next.js.",
  philosophy: "Cada obstáculo é uma oportunidade de crescer.",
  location: "Brasília, DF",
  availability: "Aberto a oportunidades",
  links: {
    email: "nicollaspereirarezende@outlook.com.br",
    github: "https://github.com/NicollasRezende",
    linkedin: "https://linkedin.com/in/nicollas-rezende",
    whatsapp: "https://wa.me/5561991769500",
    portfolio: "https://nikz.vercel.app",
  },
};

export type StackCategory = "frontend" | "backend" | "tools";
export type StackTileSize =
  | "t-2x1"
  | "t-3x1"
  | "t-3x2"
  | "t-4x2"
  | "t-2x2"
  | "t-4x1"
  | "t-6x1";

export interface StackTile {
  cat: StackCategory;
  name: string;
  lvl: number;
  glyph: string;
  years: string;
  proj: string;
  size: StackTileSize;
  featured?: boolean;
}

export const STACK_ALL: StackTile[] = [
  { cat: "frontend", name: "React", lvl: 95, glyph: "</>", years: "4y", proj: "20+ projects", size: "t-3x2", featured: true },
  { cat: "frontend", name: "Next.js", lvl: 95, glyph: "▲", years: "3y", proj: "12 projects", size: "t-3x1" },
  { cat: "frontend", name: "TypeScript", lvl: 90, glyph: "TS", years: "3y", proj: "Daily driver", size: "t-3x1" },
  { cat: "frontend", name: "Tailwind", lvl: 95, glyph: "~", years: "3y", proj: "Default styling", size: "t-3x1" },
  { cat: "frontend", name: "JavaScript", lvl: 95, glyph: "{ }", years: "5y", proj: "Daily", size: "t-3x1" },
  { cat: "frontend", name: "Sass", lvl: 85, glyph: "$", years: "3y", proj: "Theme work", size: "t-3x1" },

  { cat: "backend", name: "Java", lvl: 95, glyph: "☕", years: "3y", proj: "Liferay portals", size: "t-3x2", featured: true },
  { cat: "backend", name: "Spring", lvl: 95, glyph: "S", years: "3y", proj: "Production APIs", size: "t-3x1" },
  { cat: "backend", name: "Liferay", lvl: 95, glyph: "LR", years: "3y", proj: "Gov portals", size: "t-3x1" },
  { cat: "backend", name: "Python", lvl: 95, glyph: ">_", years: "5y", proj: "Automation", size: "t-3x1" },
  { cat: "backend", name: "Flask", lvl: 90, glyph: "Fl", years: "2y", proj: "Microservices", size: "t-3x1" },
  { cat: "backend", name: "FastAPI", lvl: 90, glyph: "→", years: "2y", proj: "Modern APIs", size: "t-3x1" },

  { cat: "tools", name: "Git", lvl: 95, glyph: "⎇", years: "5y", proj: "Daily", size: "t-3x2", featured: true },
  { cat: "tools", name: "Docker", lvl: 90, glyph: "⬢", years: "3y", proj: "Containerization", size: "t-3x1" },
  { cat: "tools", name: "PostgreSQL", lvl: 90, glyph: "DB", years: "3y", proj: "Production", size: "t-3x1" },
  { cat: "tools", name: "Keycloak", lvl: 85, glyph: "🔒", years: "2y", proj: "SSO gov.br", size: "t-3x1" },
  { cat: "tools", name: "Selenium", lvl: 90, glyph: "Se", years: "3y", proj: "Scraping", size: "t-3x1" },
  { cat: "tools", name: "CI/CD", lvl: 85, glyph: "⟳", years: "2y", proj: "Pipelines", size: "t-3x1" },
];

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  status: "production" | "shipped";
  year: string;
  visual: string;
  url?: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "01",
    title: "Portal Gov.br Federal",
    description:
      "Portal governamental enterprise em Liferay DXP 7.4 com SSO gov.br, Service Builder, REST APIs customizadas, multi-tenant e tema React + FreeMarker. Integração com Keycloak, CKPE e barramento de serviços federais.",
    tech: ["Liferay", "Java", "Spring", "React", "Keycloak", "PostgreSQL", "Docker"],
    status: "production",
    year: "2025",
    visual: "[gov]",
    url: "portal.gov.br",
  },
  {
    id: "02",
    title: "Sales Automation Engine",
    description:
      "Suite Python de automação de vendas: scraping concorrente em Selenium async, pipelines de processamento, geração inteligente de orçamentos, fila Redis e dashboards em tempo real. Reduziu o ciclo operacional em 70%.",
    tech: ["Python", "FastAPI", "Selenium", "Asyncio", "Redis", "Docker", "PostgreSQL"],
    status: "production",
    year: "2024",
    visual: "< >",
    url: "automation.internal",
  },
  {
    id: "03",
    title: "High-Conversion Landing System",
    description:
      "Sistema modular de landing pages para campanhas de marketing com A/B testing nativo, analytics integrado, edge rendering e templates reutilizáveis. Lighthouse 100 e CTR otimizado.",
    tech: ["Next.js 16", "TypeScript", "Tailwind v4", "Framer Motion", "Vercel Edge"],
    status: "shipped",
    year: "2025",
    visual: "/*/",
    url: "campaigns.brand",
  },
  {
    id: "04",
    title: "Microservices API Platform",
    description:
      "Plataforma de microserviços em Spring Boot com API gateway, rate limiting, circuit breaker, mensageria Kafka e observabilidade Prometheus/Grafana. CI/CD automatizado em Docker + Kubernetes.",
    tech: ["Java", "Spring Boot", "Kafka", "Docker", "Kubernetes", "Prometheus"],
    status: "production",
    year: "2025",
    visual: "{*}",
    url: "api.internal",
  },
  {
    id: "05",
    title: "Liferay Widget Library",
    description:
      "Biblioteca de Client Extensions React (Custom Elements) para múltiplos portais Liferay. Design tokens compartilhados, Storybook, build via Vite, versionamento semântico e deploy automatizado.",
    tech: ["React", "TypeScript", "Liferay CE", "Vite", "Storybook", "Sass"],
    status: "production",
    year: "2025",
    visual: "</>",
    url: "widgets.lib",
  },
  {
    id: "06",
    title: "Portfolio v2",
    description:
      "Este portfólio. Next.js 16 com design system custom, animações cinemáticas, GitHub Activity Heatmap em tempo real, custom cursor, parallax e bento grid. Performance Lighthouse 95+.",
    tech: ["Next.js 16", "TypeScript", "Tailwind v4", "Framer Motion"],
    github: "https://github.com/NicollasRezende/nikz",
    demo: "https://nikz.vercel.app",
    status: "production",
    year: "2026",
    visual: "{ }",
    url: "nikz.vercel.app",
  },
];

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  tech: string[];
  yearLabel: string;
  current: boolean;
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "SEA Tecnologia",
    role: "Full Stack Developer",
    period: "Jan 2025 — Presente",
    location: "Brasília, DF · Híbrido",
    description:
      "Desenvolvimento e manutenção de portais governamentais utilizando Liferay DXP, com foco em escalabilidade e segurança.",
    achievements: [
      "Serviços REST e aplicações Java",
      "Customização de temas em React, Freemarker e Sass",
      "Integração gov.br com CKPE e Keycloak",
      "Ferramentas de automação e scraping",
    ],
    tech: ["Java", "Spring", "Liferay", "React", "Python", "Keycloak"],
    yearLabel: "2025",
    current: true,
  },
  {
    company: "Teletron",
    role: "Engenheiro Chefe de Automação",
    period: "Fev 2023 — Mar 2024",
    location: "Brasília, DF · Presencial",
    description:
      "Liderança no desenvolvimento de soluções de automação escaláveis para operações de vendas e processos internos.",
    achievements: [
      "Automações Python (Flask) com integração de APIs",
      "Microserviços escaláveis para operações internas",
      "Scraping massivo com Selenium e asyncio",
      "Redução significativa de custos operacionais",
    ],
    tech: ["Python", "Flask", "Selenium", "Microserviços", "Docker"],
    yearLabel: "2023",
    current: false,
  },
];

export interface HackathonItem {
  pos: string;
  title: string;
  year: string;
  loc: string;
  note: string;
}

export const HACKATHONS: HackathonItem[] = [
  { pos: "01", title: "Hackathon Crea Jr × Mútua Jr", year: "2025", loc: "Brasília", note: "Campeão" },
  { pos: "01", title: "AgroHack Brasília", year: "2025", loc: "Brasília", note: "Campeão" },
  { pos: "01", title: "2ª Hackathon de Brasília", year: "2025", loc: "Brasília", note: "Campeão" },
  { pos: "03", title: "Ideathon de Brasília", year: "2025", loc: "Brasília", note: "Bronze" },
];

export const MARQUEE_ITEMS = [
  "JAVA",
  "SPRING",
  "LIFERAY",
  "REACT",
  "NEXT.JS",
  "PYTHON",
  "TYPESCRIPT",
  "DOCKER",
  "AUTOMATION",
  "FULL STACK",
];

export const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Java: "#f89820",
  Python: "#ffd43b",
  HTML: "#e34c26",
  CSS: "#bb9af7",
  SCSS: "#bb9af7",
  Sass: "#bb9af7",
  Shell: "#9ece6a",
  Vue: "#42b883",
  Go: "#00ADD8",
  Rust: "#dea584",
  Other: "#7dcfff",
};
