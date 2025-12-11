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
