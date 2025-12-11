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

export const SKILLS = {
  frontend: [
    { name: "HTML5", icon: "devicon-html5-plain colored" },
    { name: "CSS3", icon: "devicon-css3-plain colored" },
    { name: "JavaScript", icon: "devicon-javascript-plain colored" },
    { name: "React", icon: "devicon-react-original colored" },
    { name: "TypeScript", icon: "devicon-typescript-plain colored" },
    { name: "Bootstrap", icon: "devicon-bootstrap-plain colored" },
  ],
  backend: [
    { name: "Python", icon: "devicon-python-plain colored" },
    { name: "Django", icon: "devicon-django-plain colored" },
    { name: "Flask", icon: "devicon-flask-original colored" },
    { name: "Node.js", icon: "devicon-nodejs-plain colored" },
    { name: "Express", icon: "devicon-express-original colored" },
    { name: "Java", icon: "devicon-java-plain colored" },
  ],
  database: [
    { name: "PostgreSQL", icon: "devicon-postgresql-plain colored" },
    { name: "MySQL", icon: "devicon-mysql-plain colored" },
    { name: "MongoDB", icon: "devicon-mongodb-plain colored" },
  ],
  devops: [
    { name: "Git", icon: "devicon-git-plain colored" },
    { name: "Docker", icon: "devicon-docker-plain colored" },
    { name: "Linux", icon: "devicon-linux-plain" },
    { name: "VS Code", icon: "devicon-vscode-plain colored" },
    { name: "GitHub", icon: "devicon-github-original" },
  ],
  dataScience: [
    { name: "NumPy", icon: "devicon-numpy-plain colored" },
    { name: "Pandas", icon: "devicon-pandas-plain colored" },
    { name: "Jupyter", icon: "devicon-jupyter-plain colored" },
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
    "Desenvolvedor Full Stack especializado em Python, JavaScript, React e automação. Transformando ideias em soluções digitais eficientes.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://nicollasrezende.dev",
  ogImage: "/imgs/og-image.jpg",
  email: "nicollaspereirarezende@outlook.com.br",
  github: "https://github.com/NicollasRezende",
  linkedin: "https://www.linkedin.com/in/nicollas-rezende/",
};
