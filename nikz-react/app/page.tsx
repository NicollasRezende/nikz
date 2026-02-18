import NavBar from "@/components/ui/NavBar";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Hackathons from "@/components/sections/Hackathons";
import GitHubStats from "@/components/sections/GitHubStats";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import { getGitHubRepos, getGitHubContributions } from "@/lib/github";

export default async function Home() {
  const [repos, contributions] = await Promise.all([
    getGitHubRepos(),
    getGitHubContributions(),
  ]);

  return (
    <main className="relative">
      <ScrollProgress />
      <NavBar />
      <Hero />
      <About />
      <Skills />
      <Projects repos={repos} />
      <Hackathons />
      <GitHubStats repos={repos} contributions={contributions} />
      <Experience />
      <Contact />
    </main>
  );
}
