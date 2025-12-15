// components/layout/Navbar.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/constants";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { scrollToElement } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const activeSection = useScrollSpy(NAV_ITEMS.map((item) => item.id));

  // Otimizado com useCallback
  const handleNavClick = useCallback((id: string) => {
    // Se não estiver na home, redireciona para home primeiro
    if (!isHomePage) {
      window.location.href = `/#${id}`;
    } else {
      scrollToElement(id);
    }
    setIsMobileMenuOpen(false);
  }, [isHomePage]);

  // Detect scroll para adicionar sombra no header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fecha menu mobile ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMobileMenuOpen) {
        const target = e.target as HTMLElement;
        if (!target.closest("nav")) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 backdrop-blur-lg transition-all duration-300",
        isScrolled
          ? "bg-light-bg-primary/95 dark:bg-dark-bg/95 border-b border-light-card-border dark:border-gray-800 shadow-lg"
          : "bg-light-bg-primary/80 dark:bg-dark-bg/80 border-b border-light-card-border/50 dark:border-gray-800/50"
      )}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold hover:opacity-80 transition-opacity"
          >
            <span className="text-primary">N</span>
            <span className="text-light-text-primary dark:text-white">icollas</span>
            <span className="text-primary">.dev</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  "text-sm font-medium transition-all duration-200 hover:scale-105",
                  isHomePage && activeSection === item.id
                    ? "text-primary font-bold"
                    : "text-light-text-secondary dark:text-gray-300 hover:text-primary"
                )}
              >
                {item.label}
              </button>
            ))}

            {/* Link para Minha Trajetória */}
            <Link
              href="/minha-trajetoria"
              className={cn(
                "text-sm font-medium transition-all duration-200 hover:scale-105",
                pathname === "/minha-trajetoria"
                  ? "text-primary font-bold"
                  : "text-light-text-secondary dark:text-gray-300 hover:text-primary"
              )}
            >
              Minha Trajetória
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center text-light-text-primary dark:text-white"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <i
                className={cn(
                  "fas text-xl transition-all duration-300",
                  isMobileMenuOpen ? "fa-times rotate-90" : "fa-bars"
                )}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-light-card-border dark:border-gray-800 animate-in slide-in-from-top duration-200">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  "block w-full text-left px-4 py-3 text-sm font-medium transition-colors",
                  isHomePage && activeSection === item.id
                    ? "text-primary bg-primary/10 dark:bg-primary/10"
                    : "text-light-text-secondary dark:text-gray-300 hover:text-primary hover:bg-light-bg-secondary dark:hover:bg-primary/5"
                )}
              >
                {item.label}
              </button>
            ))}

            {/* Link para Minha Trajetória no mobile */}
            <Link
              href="/minha-trajetoria"
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "block w-full text-left px-4 py-3 text-sm font-medium transition-colors",
                pathname === "/minha-trajetoria"
                  ? "text-primary bg-primary/10 dark:bg-primary/10"
                  : "text-light-text-secondary dark:text-gray-300 hover:text-primary hover:bg-light-bg-secondary dark:hover:bg-primary/5"
              )}
            >
              Minha Trajetória
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
