// components/layout/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_ITEMS } from "@/lib/constants";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { scrollToElement } from "@/lib/utils";
import { ThemeToggle } from "@/components/features/ThemeToggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useScrollSpy(NAV_ITEMS.map((item) => item.id));

  const handleNavClick = (id: string) => {
    scrollToElement(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-dark-bg/80 border-b border-gray-200 dark:border-gray-800">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("home")}
            className="text-xl font-bold"
          >
            <span className="text-primary">N</span>
            <span className="text-gray-900 dark:text-white">icollas</span>
            <span className="text-primary">.dev</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  "text-sm font-medium transition-colors",
                  activeSection === item.id
                    ? "text-primary"
                    : "text-gray-600 dark:text-gray-300 hover:text-primary"
                )}
              >
                {item.label}
              </button>
            ))}

            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <i
                className={cn(
                  "fas text-xl transition-transform",
                  isMobileMenuOpen ? "fa-times rotate-90" : "fa-bars"
                )}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  "block w-full text-left px-4 py-3 text-sm font-medium transition-colors",
                  activeSection === item.id
                    ? "text-primary bg-primary/10"
                    : "text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-primary/5"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
