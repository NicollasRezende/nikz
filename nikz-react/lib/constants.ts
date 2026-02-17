export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const ANIMATION_DURATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 1.0,
} as const;

export const SECTIONS = [
  { id: "hero", label: "home" },
  { id: "about", label: "about" },
  { id: "skills", label: "skills" },
  { id: "projects", label: "projects" },
  { id: "experience", label: "experience" },
  { id: "contact", label: "contact" },
] as const;
