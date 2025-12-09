// lib/constants.ts
import { NavItem, SocialLink, TechIcon, StatCard } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Início", href: "#home" },
  { id: "about", label: "Sobre", href: "#about" },
  { id: "projects", label: "Projetos", href: "#projects" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "contact", label: "Contato", href: "#contact" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/NicollasRezende",
    icon: "fab fa-github",
    ariaLabel: "GitHub - Confira meus projetos",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/nicollas-rezende/",
    icon: "fab fa-linkedin-in",
    ariaLabel: "LinkedIn - Vamos nos conectar",
  },
  {
    name: "Email",
    url: "mailto:nicollaspereirarezende@outlook.com.br",
    icon: "fas fa-envelope",
    ariaLabel: "Email - Entre em contato",
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/5561991769500",
    icon: "fab fa-whatsapp",
    ariaLabel: "WhatsApp - Vamos conversar",
  },
];

export const TECH_ICONS: TechIcon[] = [
  { name: "Python", icon: "devicon-python-plain", tooltip: "Python" },
  {
    name: "JavaScript",
    icon: "devicon-javascript-plain",
    tooltip: "JavaScript",
  },
  { name: "React", icon: "devicon-react-original", tooltip: "React" },
  { name: "Node.js", icon: "devicon-nodejs-plain", tooltip: "Node.js" },
];

export const STAT_CARDS: StatCard[] = [
  { value: "2+", label: "Anos de Experiência" },
  { value: "20+", label: "Projetos Completos" },
  { value: "10+", label: "Tecnologias Dominadas" },
];

export const TYPEWRITER_TEXTS = [
  "Desenvolvedor Full Stack",
  "Python Enthusiast",
  "JavaScript Developer",
  "React Specialist",
  "Problem Solver",
];

export const SITE_CONFIG = {
  name: "Nicollas Rezende",
  title: "Nicollas Rezende | Desenvolvedor Full Stack",
  description:
    "Desenvolvedor Full Stack especializado em Python, JavaScript, React e automação. Transformando ideias em soluções digitais eficientes.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://nicollasrezende.dev",
  ogImage: "/imgs/og-image.jpg",
  email: "nicollaspereirarezende@outlook.com.br",
  github: "https://github.com/NicollasRezende",
  linkedin: "https://www.linkedin.com/in/nicollas-rezende/",
};
