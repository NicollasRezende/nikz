# Next.js Portfolio Migration - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use @superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate Nicollas Rezende's portfolio from vanilla HTML/CSS/JS to modern Next.js 14 + TypeScript + Tailwind stack while maintaining 100% functionality

**Architecture:** Next.js App Router with hybrid routing (SPA home page + separate routes), atomic component design, Zustand state management, Framer Motion animations

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Zustand, Framer Motion, React Hook Form, EmailJS, Axios

**Estimated Time:** 40 hours across 10 phases

---

## Phase 1: Project Setup and Foundation

### Task 1: Create Next.js Project

**Files:**
- Create: New project directory `nikz-react/`

**Step 1: Initialize Next.js project with TypeScript**

```bash
cd /home/sea/nikz
npx create-next-app@latest nikz-react --typescript --tailwind --app --import-alias "@/*"
```

When prompted:
- ✅ TypeScript
- ✅ ESLint
- ✅ Tailwind CSS
- ✅ `src/` directory: No
- ✅ App Router
- ✅ Import alias: @/*

**Step 2: Verify project creation**

```bash
cd nikz-react
ls -la
```

Expected: Should see `app/`, `public/`, `package.json`, `tsconfig.json`, `tailwind.config.ts`

**Step 3: Install additional dependencies**

```bash
npm install zustand framer-motion react-hook-form axios @emailjs/browser next-themes clsx tailwind-merge @tailwindcss/forms
```

**Step 4: Install dev dependencies**

```bash
npm install -D prettier prettier-plugin-tailwindcss @types/node
```

**Step 5: Verify installation**

```bash
npm list --depth=0
```

Expected: All packages listed without errors

**Step 6: Commit**

```bash
git add .
git commit -m "feat: initialize Next.js project with TypeScript and Tailwind

- Create Next.js 14 app with App Router
- Add Zustand, Framer Motion, React Hook Form
- Add EmailJS and Axios for integrations
- Configure TypeScript and Tailwind CSS

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 2: Configure Project Structure

**Files:**
- Create: `nikz-react/components/` directory structure
- Create: `nikz-react/lib/` directory
- Create: `nikz-react/hooks/` directory
- Create: `nikz-react/store/` directory
- Create: `nikz-react/types/` directory

**Step 1: Create directory structure**

```bash
cd /home/sea/nikz/nikz-react
mkdir -p components/{layout,sections,ui,features,animations}
mkdir -p lib hooks store types
```

**Step 2: Verify structure**

```bash
tree -L 2 -d
```

Expected: Directory tree with all folders created

**Step 3: Commit**

```bash
git add .
git commit -m "chore: create project directory structure

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 3: Configure Tailwind v4 Custom Theme

**Note:** Project uses Tailwind CSS v4 which uses CSS-based configuration instead of `tailwind.config.ts`

**Files:**
- Modify: `nikz-react/app/globals.css`

**Step 1: Update globals.css with custom theme**

Replace the entire contents of `app/globals.css`:

```css
@import "tailwindcss";

/* Custom Theme Configuration for Tailwind v4 */
@theme {
  /* Primary Colors */
  --color-primary: #6366f1;
  --color-primary-light: #818cf8;
  --color-primary-dark: #4f46e5;

  /* Dark Theme Colors */
  --color-dark-bg: #0a1022;
  --color-dark-card: #1a1f3a;
  --color-dark-border: #2a2f4a;

  /* Light Theme Colors */
  --color-light-bg: #ffffff;
  --color-light-card: #f8f9fa;
  --color-light-border: #e9ecef;

  /* Animations */
  --animate-fade-up: fade-up 0.6s ease-out;
  --animate-scale-in: scale-in 0.6s ease-out;
  --animate-shake: shake 0.5s ease-in-out;
  --animate-blink: blink 1s infinite;

  /* Backdrop Blur */
  --backdrop-blur-xs: 2px;
}

/* Keyframe Animations */
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-5px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(5px);
  }
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

/* Custom Utility Classes */
@layer utilities {
  .bg-gradient-primary {
    background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  .bg-gradient-secondary {
    background-image: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  }

  .text-gradient-primary {
    background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

/* Base Styles */
@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-white dark:bg-dark-bg text-gray-900 dark:text-white;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
}
```

**Step 2: Verify Tailwind v4 is working**

```bash
cd /home/sea/nikz/nikz-react
npm run dev
```

Expected: Dev server starts without errors, custom theme loaded

**Step 3: Commit**

```bash
git add app/globals.css
git commit -m "config: customize Tailwind v4 theme with colors and animations

- Add custom color palette (primary, dark, light) via CSS variables
- Add gradient backgrounds as utility classes
- Add custom animations (fade-up, scale-in, shake, blink)
- Configure dark mode theme colors
- Add keyframe definitions for all animations

Note: Uses Tailwind v4 CSS-based configuration

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 4: Configure Environment Variables

**Files:**
- Create: `nikz-react/.env.local`
- Create: `nikz-react/.env.example`

**Step 1: Create .env.local**

```bash
cat > .env.local << 'EOF'
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=fbuS5hV8q8lXF8dMP
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_ziq2y93
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_avhebkn
NEXT_PUBLIC_GITHUB_USERNAME=NicollasRezende
NEXT_PUBLIC_SITE_URL=https://nicollasrezende.dev
EOF
```

**Step 2: Create .env.example**

```bash
cat > .env.example << 'EOF'
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_GITHUB_USERNAME=your_github_username
NEXT_PUBLIC_SITE_URL=https://your-site.com
EOF
```

**Step 3: Update .gitignore**

```bash
echo ".env.local" >> .gitignore
```

**Step 4: Commit**

```bash
git add .env.example .gitignore
git commit -m "config: add environment variables template

- Add .env.example with required variables
- Ignore .env.local in git

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 5: Copy Static Assets

**Files:**
- Copy: `../public/imgs/` → `nikz-react/public/imgs/`
- Copy: `../public/favicon/` → `nikz-react/public/favicon/`

**Step 1: Copy images**

```bash
cd /home/sea/nikz/nikz-react
cp -r ../imgs public/
cp -r ../favicon public/
```

**Step 2: Verify copy**

```bash
ls public/imgs/
ls public/favicon/
```

Expected: Files should be present

**Step 3: Commit**

```bash
git add public/
git commit -m "assets: copy images and favicons from original site

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Phase 2: Core Utilities and Types

### Task 6: Create TypeScript Types

**Files:**
- Create: `nikz-react/types/index.ts`

**Step 1: Create types file**

```typescript
// types/index.ts

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  ariaLabel: string;
}

export interface StatCard {
  value: string;
  label: string;
}

export interface TechIcon {
  name: string;
  icon: string;
  tooltip: string;
}

export type Theme = "light" | "dark";

export type ProjectFilter = "all" | string; // language name
```

**Step 2: Commit**

```bash
git add types/
git commit -m "types: add TypeScript type definitions

- Add GitHub repository types
- Add form and UI component types
- Add navigation and social link types

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 7: Create Utility Functions

**Files:**
- Create: `nikz-react/lib/utils.ts`

**Step 1: Create utils file**

```typescript
// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format date to readable string
 */
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Smooth scroll to element
 */
export function scrollToElement(elementId: string) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/**
 * Check if element is in viewport
 */
export function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}
```

**Step 2: Commit**

```bash
git add lib/utils.ts
git commit -m "utils: add utility functions

- Add cn() for Tailwind class merging
- Add date formatting and scroll utilities
- Add viewport detection and debounce

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 8: Create Constants File

**Files:**
- Create: `nikz-react/lib/constants.ts`

**Step 1: Create constants file**

```typescript
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
```

**Step 2: Commit**

```bash
git add lib/constants.ts
git commit -m "config: add application constants

- Add navigation items and social links
- Add tech icons and stats configuration
- Add site metadata configuration

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Phase 3: State Management (Zustand Stores)

### Task 9: Create Theme Store

**Files:**
- Create: `nikz-react/store/useThemeStore.ts`

**Step 1: Create theme store**

```typescript
// store/useThemeStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Theme } from "@/types";

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "dark",
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "dark" ? "light" : "dark",
        })),
    }),
    {
      name: "theme-storage",
    }
  )
);
```

**Step 2: Commit**

```bash
git add store/useThemeStore.ts
git commit -m "feat: add theme store with Zustand

- Create theme store with dark/light mode
- Add localStorage persistence
- Add toggle functionality

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 10: Create Project Store

**Files:**
- Create: `nikz-react/store/useProjectStore.ts`

**Step 1: Create project store**

```typescript
// store/useProjectStore.ts
import { create } from "zustand";
import { GitHubRepo, ProjectFilter } from "@/types";

interface ProjectStore {
  projects: GitHubRepo[];
  setProjects: (projects: GitHubRepo[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  filter: ProjectFilter;
  setFilter: (filter: ProjectFilter) => void;
  filteredProjects: () => GitHubRepo[];
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  setProjects: (projects) => set({ projects }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  filter: "all",
  setFilter: (filter) => set({ filter }),
  filteredProjects: () => {
    const { projects, filter } = get();
    if (filter === "all") return projects;
    return projects.filter(
      (p) => p.language?.toLowerCase() === filter.toLowerCase()
    );
  },
}));
```

**Step 2: Commit**

```bash
git add store/useProjectStore.ts
git commit -m "feat: add project store with filtering

- Create store for GitHub projects
- Add loading state management
- Add language filter functionality

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Phase 4: External Integrations

### Task 11: Create GitHub API Client

**Files:**
- Create: `nikz-react/lib/github.ts`

**Step 1: Create GitHub client**

```typescript
// lib/github.ts
import axios from "axios";
import { GitHubRepo } from "@/types";

const GITHUB_API_BASE = "https://api.github.com";
const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "NicollasRezende";

/**
 * Fetch user repositories from GitHub API
 */
export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await axios.get<GitHubRepo[]>(
      `${GITHUB_API_BASE}/users/${USERNAME}/repos`,
      {
        params: {
          sort: "updated",
          per_page: 30,
          type: "owner",
        },
      }
    );

    // Filter out forks and repos without descriptions
    const filtered = response.data.filter(
      (repo) => !repo.fork && repo.description
    );

    return filtered;
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return [];
  }
}

/**
 * Get unique languages from repos
 */
export function getUniqueLanguages(repos: GitHubRepo[]): string[] {
  const languages = repos
    .map((repo) => repo.language)
    .filter((lang): lang is string => lang !== null);

  return Array.from(new Set(languages)).sort();
}
```

**Step 2: Commit**

```bash
git add lib/github.ts
git commit -m "feat: add GitHub API client

- Create axios client for GitHub API
- Add repo fetching with filters
- Add language extraction utility

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 12: Create EmailJS Integration

**Files:**
- Create: `nikz-react/lib/emailjs.ts`

**Step 1: Create EmailJS client**

```typescript
// lib/emailjs.ts
import emailjs from "@emailjs/browser";
import { ContactFormData } from "@/types";

// Initialize EmailJS
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";

if (typeof window !== "undefined" && PUBLIC_KEY) {
  emailjs.init(PUBLIC_KEY);
}

/**
 * Send email using EmailJS
 */
export async function sendEmail(
  data: ContactFormData
): Promise<{ success: boolean; error?: string }> {
  try {
    const templateParams = {
      name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.message,
      time: new Date().toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams
    );

    if (response.status === 200) {
      return { success: true };
    } else {
      return { success: false, error: "Failed to send email" };
    }
  } catch (error) {
    console.error("EmailJS Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
```

**Step 2: Commit**

```bash
git add lib/emailjs.ts
git commit -m "feat: add EmailJS integration

- Create EmailJS client with initialization
- Add sendEmail function with error handling
- Add timestamp to email template

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Phase 5: Custom Hooks

### Task 13: Create useScrollSpy Hook

**Files:**
- Create: `nikz-react/hooks/useScrollSpy.ts`

**Step 1: Create scroll spy hook**

```typescript
// hooks/useScrollSpy.ts
"use client";

import { useState, useEffect } from "react";

export function useScrollSpy(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActiveSection(id);
          }
        },
        {
          threshold: 0.5,
          rootMargin: "-100px 0px -50% 0px",
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sectionIds]);

  return activeSection;
}
```

**Step 2: Commit**

```bash
git add hooks/useScrollSpy.ts
git commit -m "feat: add useScrollSpy hook

- Create IntersectionObserver-based scroll spy
- Auto-detect active section with threshold
- Clean up observers on unmount

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 14: Create useGitHubProjects Hook

**Files:**
- Create: `nikz-react/hooks/useGitHubProjects.ts`

**Step 1: Create GitHub projects hook**

```typescript
// hooks/useGitHubProjects.ts
"use client";

import { useEffect } from "react";
import { useProjectStore } from "@/store/useProjectStore";
import { fetchGitHubRepos } from "@/lib/github";

export function useGitHubProjects() {
  const { projects, setProjects, isLoading, setIsLoading } =
    useProjectStore();

  useEffect(() => {
    async function loadProjects() {
      // Only fetch if we don't have projects yet
      if (projects.length > 0) return;

      setIsLoading(true);
      try {
        const repos = await fetchGitHubRepos();
        setProjects(repos);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadProjects();
  }, []); // Empty deps - only run once

  return { projects, isLoading };
}
```

**Step 2: Commit**

```bash
git add hooks/useGitHubProjects.ts
git commit -m "feat: add useGitHubProjects hook

- Create hook for fetching GitHub repos
- Integrate with project store
- Add loading state management

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 15: Create useTypewriter Hook

**Files:**
- Create: `nikz-react/hooks/useTypewriter.ts`

**Step 1: Create typewriter hook**

```typescript
// hooks/useTypewriter.ts
"use client";

import { useState, useEffect, useRef } from "react";

interface UseTypewriterOptions {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  delayBetween?: number;
}

export function useTypewriter({
  texts,
  speed = 100,
  deleteSpeed = 50,
  delayBetween = 2000,
}: UseTypewriterOptions): string {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (texts.length === 0) return;

    const currentText = texts[currentIndex];

    const typeNextChar = () => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
          timeoutRef.current = setTimeout(typeNextChar, speed);
        } else {
          // Finished typing, wait then start deleting
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true);
          }, delayBetween);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
          timeoutRef.current = setTimeout(typeNextChar, deleteSpeed);
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    };

    timeoutRef.current = setTimeout(typeNextChar, speed);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    displayText,
    currentIndex,
    isDeleting,
    texts,
    speed,
    deleteSpeed,
    delayBetween,
  ]);

  return displayText;
}
```

**Step 2: Commit**

```bash
git add hooks/useTypewriter.ts
git commit -m "feat: add useTypewriter hook

- Create typewriter effect with typing/deleting
- Add configurable speed and delays
- Clean up timeouts on unmount

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Phase 6: UI Components (Atomic)

### Task 16: Create Section Component

**Files:**
- Create: `nikz-react/components/ui/Section.tsx`

**Step 1: Create Section component**

```typescript
// components/ui/Section.tsx
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  className?: string;
  children: ReactNode;
}

export function Section({ id, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 px-4 md:py-28 scroll-mt-20",
        className
      )}
    >
      <div className="container mx-auto max-w-6xl">
        {children}
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add components/ui/Section.tsx
git commit -m "feat: add Section UI component

- Create reusable section wrapper
- Add container and responsive padding
- Add scroll margin for smooth navigation

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 17: Create SectionHeader Component

**Files:**
- Create: `nikz-react/components/ui/SectionHeader.tsx`

**Step 1: Create SectionHeader component**

```typescript
// components/ui/SectionHeader.tsx
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  className?: string;
}

export function SectionHeader({ title, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-12 text-center", className)}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        {title}
      </h2>
      <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full" />
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add components/ui/SectionHeader.tsx
git commit -m "feat: add SectionHeader UI component

- Create section title with decorative line
- Add responsive typography
- Add gradient accent line

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 18: Create GlassCard Component

**Files:**
- Create: `nikz-react/components/ui/GlassCard.tsx`

**Step 1: Create GlassCard component**

```typescript
// components/ui/GlassCard.tsx
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({
  children,
  className,
  hover = true,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "backdrop-blur-lg rounded-2xl p-6",
        "bg-white/10 dark:bg-black/20",
        "border border-white/20 dark:border-white/10",
        "shadow-xl",
        hover &&
          "transition-all duration-300 hover:shadow-2xl hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add components/ui/GlassCard.tsx
git commit -m "feat: add GlassCard UI component

- Create glassmorphism card effect
- Add backdrop blur and transparency
- Add hover animation option

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 19: Create StatCard Component

**Files:**
- Create: `nikz-react/components/ui/StatCard.tsx`

**Step 1: Create StatCard component**

```typescript
// components/ui/StatCard.tsx
import { GlassCard } from "./GlassCard";

interface StatCardProps {
  value: string;
  label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <GlassCard className="text-center">
      <h3 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
        {value}
      </h3>
      <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
        {label}
      </p>
    </GlassCard>
  );
}
```

**Step 2: Commit**

```bash
git add components/ui/StatCard.tsx
git commit -m "feat: add StatCard UI component

- Create card for displaying statistics
- Use GlassCard as base
- Add gradient text for value

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 20: Create Button Component

**Files:**
- Create: `nikz-react/components/ui/Button.tsx`

**Step 1: Create Button component**

```typescript
// components/ui/Button.tsx
import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-gradient-primary text-white hover:shadow-lg hover:shadow-primary/50",
    outline:
      "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "text-primary hover:bg-primary/10",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
```

**Step 2: Commit**

```bash
git add components/ui/Button.tsx
git commit -m "feat: add Button UI component

- Create button with multiple variants
- Add size options
- Add hover and disabled states

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 21: Create ProjectCard Component

**Files:**
- Create: `nikz-react/components/ui/ProjectCard.tsx`

**Step 1: Create ProjectCard component**

```typescript
// components/ui/ProjectCard.tsx
import { GitHubRepo } from "@/types";
import { GlassCard } from "./GlassCard";

interface ProjectCardProps {
  project: GitHubRepo;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <GlassCard className="h-full flex flex-col">
      <div className="flex-1">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {project.name}
          </h3>
          {project.language && (
            <span className="px-3 py-1 text-xs rounded-full bg-primary/20 text-primary">
              {project.language}
            </span>
          )}
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {project.description || "No description available"}
        </p>

        {project.topics && project.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="px-2 py-1 text-xs rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                {topic}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <i className="fas fa-star" />
            {project.stargazers_count}
          </span>
          <span className="flex items-center gap-1">
            <i className="fas fa-code-branch" />
            {project.forks_count}
          </span>
        </div>

        <a
          href={project.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary-light transition-colors"
        >
          <i className="fas fa-external-link-alt" />
        </a>
      </div>
    </GlassCard>
  );
}
```

**Step 2: Commit**

```bash
git add components/ui/ProjectCard.tsx
git commit -m "feat: add ProjectCard UI component

- Create card for GitHub projects
- Display name, description, language
- Show stars, forks, topics
- Add external link

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Phase 7: Animation Components

### Task 22: Create FadeUp Animation Component

**Files:**
- Create: `nikz-react/components/animations/FadeUp.tsx`

**Step 1: Create FadeUp component**

```typescript
// components/animations/FadeUp.tsx
"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function FadeUp({
  children,
  delay = 0,
  duration = 0.6,
  className,
}: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

**Step 2: Commit**

```bash
git add components/animations/FadeUp.tsx
git commit -m "feat: add FadeUp animation component

- Create fade-in with slide-up effect
- Use Framer Motion for smooth animations
- Add configurable delay and duration

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 23: Create ScaleIn Animation Component

**Files:**
- Create: `nikz-react/components/animations/ScaleIn.tsx`

**Step 1: Create ScaleIn component**

```typescript
// components/animations/ScaleIn.tsx
"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ScaleInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function ScaleIn({
  children,
  delay = 0,
  duration = 0.6,
  className,
}: ScaleInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

**Step 2: Commit**

```bash
git add components/animations/ScaleIn.tsx
git commit -m "feat: add ScaleIn animation component

- Create scale and fade-in effect
- Use Framer Motion viewport detection
- Add configurable timing

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Phase 8: Feature Components

### Task 24: Create TypeWriter Component

**Files:**
- Create: `nikz-react/components/features/TypeWriter.tsx`

**Step 1: Create TypeWriter component**

```typescript
// components/features/TypeWriter.tsx
"use client";

import { useTypewriter } from "@/hooks/useTypewriter";

interface TypeWriterProps {
  texts: string[];
  className?: string;
}

export function TypeWriter({ texts, className }: TypeWriterProps) {
  const displayText = useTypewriter({ texts });

  return (
    <span className={className}>
      {displayText}
      <span className="animate-blink">|</span>
    </span>
  );
}
```

**Step 2: Commit**

```bash
git add components/features/TypeWriter.tsx
git commit -m "feat: add TypeWriter feature component

- Create typewriter effect component
- Use useTypewriter hook
- Add blinking cursor

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 25: Create ThemeToggle Component

**Files:**
- Create: `nikz-react/components/features/ThemeToggle.tsx`

**Step 1: Create ThemeToggle component**

```typescript
// components/features/ThemeToggle.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-200 dark:bg-gray-700">
        <i className="fas fa-moon text-gray-600 dark:text-gray-300" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <i className="fas fa-sun text-yellow-400" />
      ) : (
        <i className="fas fa-moon text-gray-700" />
      )}
    </button>
  );
}
```

**Step 2: Commit**

```bash
git add components/features/ThemeToggle.tsx
git commit -m "feat: add ThemeToggle feature component

- Create theme toggle button
- Use next-themes for theme management
- Add icon switching animation

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 26: Create ScrollProgress Component

**Files:**
- Create: `nikz-react/components/features/ScrollProgress.tsx`

**Step 1: Create ScrollProgress component**

```typescript
// components/features/ScrollProgress.tsx
"use client";

import { useScroll, motion, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-primary origin-left z-50"
      style={{ scaleX }}
    />
  );
}
```

**Step 2: Commit**

```bash
git add components/features/ScrollProgress.tsx
git commit -m "feat: add ScrollProgress feature component

- Create scroll progress bar
- Use Framer Motion scroll tracking
- Add spring animation for smoothness

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 27: Create ProjectFilter Component

**Files:**
- Create: `nikz-react/components/features/ProjectFilter.tsx`

**Step 1: Create ProjectFilter component**

```typescript
// components/features/ProjectFilter.tsx
"use client";

import { useProjectStore } from "@/store/useProjectStore";
import { getUniqueLanguages } from "@/lib/github";
import { cn } from "@/lib/utils";

export function ProjectFilter() {
  const { projects, filter, setFilter } = useProjectStore();
  const languages = getUniqueLanguages(projects);

  return (
    <div className="flex justify-center flex-wrap gap-3 mb-8">
      <button
        onClick={() => setFilter("all")}
        className={cn(
          "px-4 py-2 rounded-lg font-medium transition-all",
          filter === "all"
            ? "bg-gradient-primary text-white shadow-lg"
            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
        )}
      >
        Todos
      </button>

      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => setFilter(lang)}
          className={cn(
            "px-4 py-2 rounded-lg font-medium transition-all",
            filter === lang
              ? "bg-gradient-primary text-white shadow-lg"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          )}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add components/features/ProjectFilter.tsx
git commit -m "feat: add ProjectFilter feature component

- Create language filter buttons
- Connect to project store
- Add active state styling

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 28: Create ContactForm Component

**Files:**
- Create: `nikz-react/components/features/ContactForm.tsx`

**Step 1: Create ContactForm component**

```typescript
// components/features/ContactForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { ContactFormData } from "@/types";
import { sendEmail } from "@/lib/emailjs";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setStatus("submitting");

    const result = await sendEmail(data);

    if (result.success) {
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 5000);
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
        >
          Nome
        </label>
        <input
          id="name"
          type="text"
          {...register("name", { required: "Nome é obrigatório" })}
          className={cn(
            "w-full px-4 py-3 rounded-lg",
            "bg-white dark:bg-gray-800",
            "border-2",
            errors.name
              ? "border-red-500 animate-shake"
              : "border-gray-300 dark:border-gray-600",
            "focus:border-primary focus:ring-2 focus:ring-primary/20",
            "transition-colors"
          )}
          placeholder="Seu nome"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "Email é obrigatório",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email inválido",
            },
          })}
          className={cn(
            "w-full px-4 py-3 rounded-lg",
            "bg-white dark:bg-gray-800",
            "border-2",
            errors.email
              ? "border-red-500 animate-shake"
              : "border-gray-300 dark:border-gray-600",
            "focus:border-primary focus:ring-2 focus:ring-primary/20",
            "transition-colors"
          )}
          placeholder="seu@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Subject Field */}
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
        >
          Assunto
        </label>
        <input
          id="subject"
          type="text"
          {...register("subject", { required: "Assunto é obrigatório" })}
          className={cn(
            "w-full px-4 py-3 rounded-lg",
            "bg-white dark:bg-gray-800",
            "border-2",
            errors.subject
              ? "border-red-500 animate-shake"
              : "border-gray-300 dark:border-gray-600",
            "focus:border-primary focus:ring-2 focus:ring-primary/20",
            "transition-colors"
          )}
          placeholder="Assunto da mensagem"
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
        >
          Mensagem
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message", {
            required: "Mensagem é obrigatória",
            minLength: {
              value: 10,
              message: "Mensagem deve ter no mínimo 10 caracteres",
            },
          })}
          className={cn(
            "w-full px-4 py-3 rounded-lg",
            "bg-white dark:bg-gray-800",
            "border-2",
            errors.message
              ? "border-red-500 animate-shake"
              : "border-gray-300 dark:border-gray-600",
            "focus:border-primary focus:ring-2 focus:ring-primary/20",
            "transition-colors resize-none"
          )}
          placeholder="Sua mensagem..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={status === "submitting"}
        className="w-full"
      >
        {status === "submitting" ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            Enviando...
          </>
        ) : (
          "Enviar Mensagem"
        )}
      </Button>

      {/* Status Messages */}
      {status === "success" && (
        <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg">
          <i className="fas fa-check-circle mr-2" />
          Mensagem enviada com sucesso! Entrarei em contato em breve.
        </div>
      )}

      {status === "error" && (
        <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
          <i className="fas fa-exclamation-circle mr-2" />
          Erro ao enviar mensagem. Por favor, tente novamente.
        </div>
      )}
    </form>
  );
}
```

**Step 2: Commit**

```bash
git add components/features/ContactForm.tsx
git commit -m "feat: add ContactForm feature component

- Create form with React Hook Form
- Add validation and error messages
- Integrate EmailJS for sending
- Add loading and success/error states

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Phase 9: Layout Components

### Task 29: Create BackToTop Component

**Files:**
- Create: `nikz-react/components/layout/BackToTop.tsx`

**Step 1: Create BackToTop component**

```typescript
// components/layout/BackToTop.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-gradient-primary text-white shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
          aria-label="Voltar ao topo"
        >
          <i className="fas fa-arrow-up" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
```

**Step 2: Commit**

```bash
git add components/layout/BackToTop.tsx
git commit -m "feat: add BackToTop layout component

- Create floating back-to-top button
- Show/hide based on scroll position
- Add smooth scroll animation

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 30: Create Navbar Component

**Files:**
- Create: `nikz-react/components/layout/Navbar.tsx`

**Step 1: Create Navbar component**

```typescript
// components/layout/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_ITEMS } from "@/lib/constants";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { scrollToElement } from "@/lib/utils";
import { ThemeToggle } from "@/components/features/ThemeToggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useScrollSpy(NAV_ITEMS.map((item) => item.id));

  const handleNavClick = (id: string) => {
    scrollToElement(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-dark-bg/80 border-b border-gray-200 dark:border-gray-800">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("home")}
            className="text-xl font-bold"
          >
            <span className="text-primary">N</span>
            <span className="text-gray-900 dark:text-white">icollas</span>
            <span className="text-primary">.dev</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  "text-sm font-medium transition-colors",
                  activeSection === item.id
                    ? "text-primary"
                    : "text-gray-600 dark:text-gray-300 hover:text-primary"
                )}
              >
                {item.label}
              </button>
            ))}

            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <i
                className={cn(
                  "fas text-xl transition-transform",
                  isMobileMenuOpen ? "fa-times rotate-90" : "fa-bars"
                )}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  "block w-full text-left px-4 py-3 text-sm font-medium transition-colors",
                  activeSection === item.id
                    ? "text-primary bg-primary/10"
                    : "text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-primary/5"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
```

**Step 2: Commit**

```bash
git add components/layout/Navbar.tsx
git commit -m "feat: add Navbar layout component

- Create responsive navbar with scroll spy
- Add mobile menu with hamburger
- Integrate theme toggle
- Add smooth scroll navigation

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 31: Create Footer Component

**Files:**
- Create: `nikz-react/components/layout/Footer.tsx`

**Step 1: Create Footer component**

```typescript
// components/layout/Footer.tsx
import { SOCIAL_LINKS, SITE_CONFIG } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-dark-card border-t border-gray-200 dark:border-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} {SITE_CONFIG.name}. Todos os direitos reservados.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target={link.name !== "Email" ? "_blank" : undefined}
                rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 hover:bg-primary hover:text-white transition-colors"
                aria-label={link.ariaLabel}
              >
                <i className={link.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
```

**Step 2: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat: add Footer layout component

- Create footer with copyright
- Add social links with icons
- Add responsive layout

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Phase 10: Main Page Sections

### Task 32: Create HeroSection Component

**Files:**
- Create: `nikz-react/components/sections/HeroSection.tsx`

**Step 1: Create HeroSection component**

```typescript
// components/sections/HeroSection.tsx
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { TypeWriter } from "@/components/features/TypeWriter";
import { FadeUp } from "@/components/animations/FadeUp";
import { SOCIAL_LINKS, TECH_ICONS, TYPEWRITER_TEXTS } from "@/lib/constants";
import { scrollToElement } from "@/lib/utils";

export function HeroSection() {
  return (
    <Section
      id="home"
      className="min-h-screen flex items-center pt-16 bg-gradient-to-b from-gray-50 to-white dark:from-dark-bg dark:to-dark-card"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <FadeUp>
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Olá, eu sou{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Nicollas Rezende
              </span>
            </h1>

            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 h-12">
              <TypeWriter texts={TYPEWRITER_TEXTS} />
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-400">
              Transformando ideias em soluções digitais com código limpo,
              arquitetura eficiente e experiências de usuário excepcionais.
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-4">
              <Button onClick={() => scrollToElement("projects")}>
                Ver Projetos
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollToElement("contact")}
              >
                Contato
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target={link.name !== "Email" ? "_blank" : undefined}
                  rel={
                    link.name !== "Email" ? "noopener noreferrer" : undefined
                  }
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 hover:bg-primary hover:text-white transition-all hover:scale-110"
                  aria-label={link.ariaLabel}
                  title={link.name}
                >
                  <i className={link.icon} />
                </a>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Profile Image */}
        <FadeUp delay={0.2}>
          <div className="relative">
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gradient-primary rounded-full blur-3xl opacity-20 animate-pulse" />

            {/* Profile Container */}
            <div className="relative">
              <div className="w-full max-w-md mx-auto aspect-square rounded-full overflow-hidden border-4 border-primary shadow-2xl">
                <Image
                  src="/imgs/55924678.png"
                  alt="Foto de Nicollas Rezende - Desenvolvedor Full Stack"
                  width={400}
                  height={400}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Tech Icons */}
              <div className="absolute -right-4 top-1/4 space-y-4">
                {TECH_ICONS.map((tech, index) => (
                  <div
                    key={tech.name}
                    className="w-12 h-12 rounded-lg bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    title={tech.tooltip}
                  >
                    <i className={`${tech.icon} text-2xl`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
      </div>

      {/* Scroll Down Indicator */}
      <button
        onClick={() => scrollToElement("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        aria-label="Rolar para a seção Sobre"
      >
        <i className="fas fa-chevron-down text-2xl text-primary" />
      </button>
    </Section>
  );
}
```

**Step 2: Commit**

```bash
git add components/sections/HeroSection.tsx
git commit -m "feat: add HeroSection component

- Create hero with typewriter effect
- Add profile image with decorative elements
- Add CTA buttons and social links
- Add scroll down indicator

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

**Due to length constraints, I'll continue with the remaining tasks in a summary format. The pattern is established.**

---

## Remaining Tasks Summary

### Task 33-36: Create Other Section Components
- AboutSection.tsx (with stats)
- ProjectsSection.tsx (with GitHub integration)
- SkillsSection.tsx
- ContactSection.tsx (with form)

### Task 37-38: Create Root Layout and Metadata
- app/layout.tsx with ThemeProvider
- app/globals.css with Tailwind and custom CSS

### Task 39: Create Home Page
- app/page.tsx assembling all sections

### Task 40: Create Minha Trajetória Page
- app/minha-trajetoria/page.tsx

### Task 41-45: Testing and Optimization
- Test all functionalities
- Optimize images
- Run Lighthouse audit
- Fix any issues
- Final commit

---

**Each task follows the same pattern:**
1. Create/modify file with full code
2. Test functionality
3. Commit with descriptive message

**Total: 45 tasks across 10 phases**
