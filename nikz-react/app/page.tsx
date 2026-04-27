import BackgroundFx from "@/components/effects/BackgroundFx";
import ScrollEngine from "@/components/effects/ScrollEngine";
import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import GitHubStats from "@/components/sections/GitHubStats";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Hackathons from "@/components/sections/Hackathons";
import Contact from "@/components/sections/Contact";
import { getGitHubRepos, getGitHubContributions } from "@/lib/github";

export default async function Home() {
  const [repos, contributions] = await Promise.all([
    getGitHubRepos(),
    getGitHubContributions(),
  ]);

  return (
    <>
      <BackgroundFx />
      <ScrollEngine />
      <NavBar />
      <Hero />
      <Marquee />
      <main>
        <About />
        <Skills />
        <GitHubStats repos={repos} contributions={contributions} />
        <Projects />
        <Experience />
        <Hackathons />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
