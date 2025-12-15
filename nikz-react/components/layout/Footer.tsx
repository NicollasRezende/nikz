// components/layout/Footer.tsx
"use client";

import { memo } from "react";
import Link from "next/link";
import { SOCIAL_LINKS, SITE_CONFIG } from "@/lib/constants";

const FooterComponent = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light-footer dark:bg-dark-card border-t border-light-card-border dark:border-gray-800 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Brand & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link
              href="/"
              className="text-lg font-bold hover:opacity-80 transition-opacity"
            >
              <span className="text-primary">N</span>
              <span className="text-light-text-primary dark:text-white">icollas</span>
              <span className="text-primary">.dev</span>
            </Link>
            <p className="text-sm text-light-text-secondary dark:text-gray-400">
              © {currentYear} {SITE_CONFIG.name}. Todos os direitos reservados.
            </p>
          </div>

          {/* Center: Quick Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/"
              className="text-light-text-secondary dark:text-gray-400 hover:text-primary transition-colors"
            >
              Início
            </Link>
            <Link
              href="/minha-trajetoria"
              className="text-light-text-secondary dark:text-gray-400 hover:text-primary transition-colors"
            >
              Trajetória
            </Link>
            <a
              href="/#contact"
              className="text-light-text-secondary dark:text-gray-400 hover:text-primary transition-colors"
            >
              Contato
            </a>
          </div>

          {/* Right: Social Links */}
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target={link.name !== "Email" ? "_blank" : undefined}
                rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                className="group relative w-10 h-10 rounded-full flex items-center justify-center bg-light-bg-tertiary dark:bg-gray-700 text-light-text-primary dark:text-white hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300"
                aria-label={link.ariaLabel}
                title={link.name}
              >
                <i className={`${link.icon} transition-transform group-hover:scale-110`} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom: Additional Info */}
        <div className="mt-6 pt-6 border-t border-light-card-border dark:border-gray-800">
          <p className="text-xs text-center text-light-text-secondary dark:text-gray-500">
            Desenvolvido com ❤️ usando{" "}
            <span className="text-primary font-semibold">Next.js 16</span>,{" "}
            <span className="text-primary font-semibold">TypeScript</span> e{" "}
            <span className="text-primary font-semibold">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

// Memo para evitar re-renders desnecessários
export const Footer = memo(FooterComponent);
