"use client";

import { motion } from "framer-motion";
import { PERSONAL_INFO } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Mail, Github, Linkedin, MessageCircle } from "lucide-react";

export default function Contact() {
  const socialLinks = [
    { icon: Mail, label: "email", href: `mailto:${PERSONAL_INFO.links.email}`, value: PERSONAL_INFO.links.email },
    { icon: Github, label: "github", href: PERSONAL_INFO.links.github, value: "github.com/NicollasRezende" },
    { icon: Linkedin, label: "linkedin", href: PERSONAL_INFO.links.linkedin, value: "linkedin.com/in/nicollas-rezende" },
    { icon: MessageCircle, label: "whatsapp", href: PERSONAL_INFO.links.whatsapp, value: "+55 61 99176-9500" },
  ];

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto w-full">
        <SectionHeading number="05" title="contact" />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12"
        >
          <motion.p
            variants={fadeInUp}
            className="text-fg-secondary text-lg max-w-2xl"
          >
            {PERSONAL_INFO.availability}. Seja para uma nova oportunidade,
            projeto interessante ou apenas para trocar ideias sobre tecnologia,
            ficarei feliz em conversar!
          </motion.p>

          {/* Contact links as object properties */}
          <motion.div
            variants={fadeInUp}
            className="bg-bg-secondary/50 border border-fg-primary/10 rounded-lg p-8 font-code"
          >
            <div className="space-y-4">
              <div className="text-syntax-purple">
                <span className="text-syntax-purple">const</span>{" "}
                <span className="text-syntax-cyan">contact</span>{" "}
                <span className="text-fg-primary">=</span>{" "}
                <span className="text-fg-primary">{"{"}</span>
              </div>

              {socialLinks.map((link, index) => (
                <div key={link.label} className="pl-4 flex flex-wrap items-baseline gap-x-1 gap-y-1 min-w-0">
                  <span className="text-syntax-blue shrink-0">.{link.label}</span>
                  <span className="text-fg-primary shrink-0">: </span>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-syntax-green hover:text-accent-cyan transition-colors inline-flex items-center gap-1.5 group min-w-0 break-all"
                  >
                    <link.icon size={14} className="inline shrink-0" />
                    <span className="break-all">&quot;{link.value}&quot;</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      →
                    </span>
                  </a>
                  {index < socialLinks.length - 1 && (
                    <span className="text-fg-primary shrink-0">,</span>
                  )}
                </div>
              ))}

              <div className="text-fg-primary">{"}"}</div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={fadeInUp} className="flex justify-center">
            <a
              href={`mailto:${PERSONAL_INFO.links.email}`}
              className="group relative px-8 py-4 bg-accent-cyan text-bg-primary font-code font-semibold rounded-lg overflow-hidden transition-all hover:scale-105 glow-cyan"
            >
              <span className="relative z-10">Entre em Contato</span>
              <div className="absolute inset-0 bg-accent-pink opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </motion.div>

          {/* Footer */}
          <motion.div
            variants={fadeInUp}
            className="pt-12 border-t border-fg-primary/10 text-center"
          >
            <p className="font-code text-sm text-fg-muted">
              <span className="text-syntax-comment">{"// "}</span>
              Built with Next.js, TypeScript, Tailwind CSS & Framer Motion
            </p>
            <p className="font-code text-xs text-fg-muted mt-2">
              © {new Date().getFullYear()} {PERSONAL_INFO.name}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
