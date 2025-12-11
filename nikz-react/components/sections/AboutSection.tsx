// components/sections/AboutSection.tsx
"use client";

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatCard } from "@/components/ui/StatCard";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations/FadeUp";
import { ScaleIn } from "@/components/animations/ScaleIn";
import { STAT_CARDS } from "@/lib/constants";
import { scrollToElement } from "@/lib/utils";
import Link from "next/link";

export function AboutSection() {
  return (
    <Section id="about" className="bg-white dark:bg-dark-card">
      <SectionHeader title="Sobre Mim" />

      <FadeUp>
        <GlassCard className="space-y-6" hover={false}>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p className="text-lg leading-relaxed">
              Sou um desenvolvedor Full Stack com uma jornada única no mundo da
              tecnologia. Desde os 8 anos, quando usava HDs como brinquedo,
              minha curiosidade pelo universo digital só cresceu. Apaixonado por
              Python e JavaScript, transformo linhas de código em soluções que
              resolvem problemas reais e proporcionam experiências excepcionais.
            </p>
            <p className="text-lg leading-relaxed">
              Atualmente cursando Engenharia de Software, aplico conhecimentos
              teóricos em projetos práticos com foco em arquitetura robusta e
              interfaces intuitivas. Minha experiência com desenvolvimento de
              sistemas automatizados me ensinou que{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent font-semibold">
                nada é impossível
              </span>
              , e quando parece ser, sempre há um jeito de tornar possível.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            {STAT_CARDS.map((stat, index) => (
              <ScaleIn key={stat.label} delay={index * 0.1}>
                <StatCard value={stat.value} label={stat.label} />
              </ScaleIn>
            ))}
          </div>

          {/* CTA Buttons */}
          <FadeUp delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button onClick={() => scrollToElement("contact")}>
                Vamos Trabalhar Juntos
              </Button>
              <Link href="/minha-trajetoria" className="flex-1 sm:flex-initial">
                <Button variant="outline" className="w-full group">
                  <span>Minha Trajetória</span>
                  <i className="fas fa-long-arrow-alt-right ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </FadeUp>
        </GlassCard>
      </FadeUp>
    </Section>
  );
}
