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
  fork: boolean;
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
