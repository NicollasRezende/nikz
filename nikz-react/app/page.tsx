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
import { getGitHubRepos } from "@/lib/github";

export default async function Home() {
  // Fetch GitHub repos on the server with ISR
  const repos = await getGitHubRepos();

  return (
    <main className="relative">
      <ScrollProgress />
      <NavBar />
      <Hero />
      <About />
      <Skills />
      <Projects repos={repos} />
      <Hackathons />
      <GitHubStats repos={repos} />
      <Experience />
      <Contact />
    </main>
  );
}
