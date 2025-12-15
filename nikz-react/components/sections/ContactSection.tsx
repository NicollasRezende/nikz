// components/sections/ContactSection.tsx
"use client";

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FloatingCard } from "@/components/ui/FloatingCard";
import { ContactForm } from "@/components/features/ContactForm";
import { FadeUp } from "@/components/animations/FadeUp";
import { CONTACT_INFO } from "@/lib/constants";
import { motion } from "framer-motion";

export function ContactSection() {
  return (
    <Section
      id="contact"
      className="bg-linear-to-b from-light-bg-secondary to-light-bg-primary dark:from-dark-bg dark:to-dark-card relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute top-1/3 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -30, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-1/3 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, 30, 0],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <SectionHeader title="Entre em Contato" />

      {/* Asymmetric Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Contact Info - Left Side (Asymmetric) */}
        <FadeUp className="lg:col-span-5 space-y-6">
          {/* Intro Card */}
          <FloatingCard delay={0} glowColor="cyan" className="border-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center"
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <i className="fas fa-comments text-2xl text-cyan-400" />
                </motion.div>
                <h3 className="text-2xl font-bold text-light-text-primary dark:text-white">
                  Vamos Conversar?
                </h3>
              </div>
              <p className="text-light-text-secondary dark:text-gray-400 leading-relaxed">
                Estou sempre aberto a novas oportunidades e colaborações. Entre
                em contato através de qualquer um dos canais abaixo.
              </p>
            </motion.div>
          </FloatingCard>

          {/* Contact Cards - Staggered */}
          {CONTACT_INFO.map((contact, index) => (
            <motion.div
              key={contact.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <FloatingCard
                delay={0.1 + index * 0.05}
                glowColor={
                  index % 3 === 0
                    ? "cyan"
                    : index % 3 === 1
                    ? "blue"
                    : "purple"
                }
                className="border-0"
              >
                <a
                  href={contact.href}
                  target={contact.label !== "Email" ? "_blank" : undefined}
                  rel={
                    contact.label !== "Email" ? "noopener noreferrer" : undefined
                  }
                  className="flex items-center gap-4 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${
                      index % 3 === 0
                        ? "from-cyan-500/20 to-blue-500/20"
                        : index % 3 === 1
                        ? "from-blue-500/20 to-purple-500/20"
                        : "from-purple-500/20 to-pink-500/20"
                    } flex items-center justify-center flex-shrink-0 transition-all`}
                  >
                    <i
                      className={`${contact.icon} ${
                        index % 3 === 0
                          ? "text-cyan-400"
                          : index % 3 === 1
                          ? "text-blue-400"
                          : "text-purple-400"
                      } text-xl`}
                    />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                      {contact.label}
                    </h5>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors break-all">
                      {contact.value}
                    </p>
                  </div>
                  <motion.i
                    className="fas fa-arrow-right text-gray-600 group-hover:text-cyan-400 transition-colors"
                    whileHover={{ x: 5 }}
                  />
                </a>
              </FloatingCard>
            </motion.div>
          ))}

          {/* Social CTA */}
          <FloatingCard delay={0.5} glowColor="purple" className="border-0">
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-3">Me siga nas redes</p>
              <div className="flex gap-4 justify-center">
                {["fab fa-github", "fab fa-linkedin-in", "fab fa-twitter"].map(
                  (icon, i) => (
                    <motion.button
                      key={icon}
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
                    >
                      <i className={`${icon} text-gray-400 hover:text-cyan-400`} />
                    </motion.button>
                  )
                )}
              </div>
            </div>
          </FloatingCard>
        </FadeUp>

        {/* Contact Form - Right Side (Larger) */}
        <FadeUp delay={0.2} className="lg:col-span-7">
          <FloatingCard
            delay={0.3}
            glowColor="blue"
            tiltEffect={false}
            className="border-0"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(77,140,255,0.3)",
                    "0 0 40px rgba(77,140,255,0.6)",
                    "0 0 20px rgba(77,140,255,0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <i className="fas fa-paper-plane text-2xl text-blue-400" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white">
                Envie uma mensagem
              </h3>
            </div>
            <ContactForm />
          </FloatingCard>
        </FadeUp>
      </div>
    </Section>
  );
}
