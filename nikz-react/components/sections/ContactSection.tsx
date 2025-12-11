// components/sections/ContactSection.tsx
"use client";

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { ContactForm } from "@/components/features/ContactForm";
import { FadeUp } from "@/components/animations/FadeUp";
import { CONTACT_INFO } from "@/lib/constants";

export function ContactSection() {
  return (
    <Section
      id="contact"
      className="bg-gradient-to-b from-gray-50 to-white dark:from-dark-bg dark:to-dark-card"
    >
      <SectionHeader title="Entre em Contato" />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Contact Info */}
        <FadeUp className="lg:col-span-2">
          <div className="space-y-4">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                Vamos Conversar?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Estou sempre aberto a novas oportunidades e colaborações. Entre
                em contato através de qualquer um dos canais abaixo.
              </p>
            </div>

            {CONTACT_INFO.map((contact) => (
              <GlassCard
                key={contact.label}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <i className={`${contact.icon} text-white text-xl`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {contact.label}
                  </h5>
                  <a
                    href={contact.href}
                    target={
                      contact.label !== "Email" ? "_blank" : undefined
                    }
                    rel={
                      contact.label !== "Email"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors break-all"
                  >
                    {contact.value}
                  </a>
                </div>
              </GlassCard>
            ))}
          </div>
        </FadeUp>

        {/* Contact Form */}
        <FadeUp delay={0.2} className="lg:col-span-3">
          <GlassCard hover={false}>
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Envie uma mensagem
            </h3>
            <ContactForm />
          </GlassCard>
        </FadeUp>
      </div>
    </Section>
  );
}
