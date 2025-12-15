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
  { name: "Java", icon: "devicon-java-plain", tooltip: "Java" },
  { name: "Spring", icon: "devicon-spring-plain", tooltip: "Spring Framework" },
  { name: "Python", icon: "devicon-python-plain", tooltip: "Python" },
  { name: "React", icon: "devicon-react-original", tooltip: "React" },
  { name: "Next.js", icon: "devicon-nextjs-plain", tooltip: "Next.js" },
  { name: "TypeScript", icon: "devicon-typescript-plain", tooltip: "TypeScript" },
  { name: "Docker", icon: "devicon-docker-plain", tooltip: "Docker" },
  { name: "PostgreSQL", icon: "devicon-postgresql-plain", tooltip: "PostgreSQL" },
];

export const STAT_CARDS: StatCard[] = [
  { value: "2+", label: "Anos de Experiência" },
  { value: "4x", label: "Hackathons Vencidos" },
  { value: "30+", label: "Tecnologias Dominadas" },
];

export const TYPEWRITER_TEXTS = [
  "Desenvolvedor Full Stack",
  "Java (Spring/Liferay) Developer",
  "Python (Flask/FastAPI) Expert",
  "React/Next.js Specialist",
  "APIs & Microservices Architect",
  "Automação & CI/CD Engineer",
];

export const SKILLS = {
  frontend: [
    { name: "React", icon: "devicon-react-original colored" },
    { name: "Next.js", icon: "devicon-nextjs-plain colored" },
    { name: "TypeScript", icon: "devicon-typescript-plain colored" },
    { name: "JavaScript", icon: "devicon-javascript-plain colored" },
    { name: "Tailwind", icon: "devicon-tailwindcss-plain colored" },
    { name: "Sass", icon: "devicon-sass-original colored" },
  ],
  backend: [
    { name: "Java", icon: "devicon-java-plain colored" },
    { name: "Spring", icon: "devicon-spring-plain colored" },
    { name: "Python", icon: "devicon-python-plain colored" },
    { name: "Flask", icon: "devicon-flask-original colored" },
    { name: "FastAPI", icon: "devicon-fastapi-plain colored" },
    { name: "Node.js", icon: "devicon-nodejs-plain colored" },
  ],
  database: [
    { name: "PostgreSQL", icon: "devicon-postgresql-plain colored" },
    { name: "MySQL", icon: "devicon-mysql-plain colored" },
    { name: "MongoDB", icon: "devicon-mongodb-plain colored" },
  ],
  devops: [
    { name: "Docker", icon: "devicon-docker-plain colored" },
    { name: "GitLab", icon: "devicon-gitlab-plain colored" },
    { name: "Git", icon: "devicon-git-plain colored" },
    { name: "Linux", icon: "devicon-linux-plain" },
    { name: "GitHub", icon: "devicon-github-original" },
  ],
  frameworks: [
    { name: "Liferay", icon: "fas fa-server" },
    { name: "Django", icon: "devicon-django-plain colored" },
    { name: "Keycloak", icon: "fas fa-lock" },
  ],
};

export const CONTACT_INFO = [
  {
    icon: "fas fa-envelope",
    label: "Email",
    value: "nicollaspereirarezende@outlook.com.br",
    href: "mailto:nicollaspereirarezende@outlook.com.br",
  },
  {
    icon: "fab fa-linkedin-in",
    label: "LinkedIn",
    value: "linkedin.com/in/nicollas-rezende",
    href: "https://www.linkedin.com/in/nicollas-rezende/",
  },
  {
    icon: "fab fa-github",
    label: "GitHub",
    value: "github.com/NicollasRezende",
    href: "https://github.com/NicollasRezende",
  },
  {
    icon: "fab fa-whatsapp",
    label: "WhatsApp",
    value: "+55 61 99176-9500",
    href: "https://wa.me/5561991769500",
  },
];

export const SITE_CONFIG = {
  name: "Nicollas Rezende",
  title: "Nicollas Rezende | Desenvolvedor Full Stack",
  description:
    "Desenvolvedor Full Stack | Java (Spring/Liferay), Python (Flask/FastAPI), React/Next.js | APIs, Automação e Microserviços | Docker, CI/CD | Especialista em portais governamentais e soluções escaláveis.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://nicollasrezende.dev",
  ogImage: "/imgs/og-image.jpg",
  email: "nicollaspereirarezende@outlook.com.br",
  github: "https://github.com/NicollasRezende",
  linkedin: "https://www.linkedin.com/in/nicollas-rezende/",
};
