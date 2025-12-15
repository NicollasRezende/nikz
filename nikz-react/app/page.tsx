// app/page.tsx
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { MetricsSection } from "@/components/sections/MetricsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { GitHubStatsSection } from "@/components/sections/GitHubStatsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <MetricsSection />
      <ProjectsSection />
      <SkillsSection />
      <GitHubStatsSection />
      <ContactSection />
    </>
  );
}
