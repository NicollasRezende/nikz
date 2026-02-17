"use client";

import { useState, useEffect } from "react";
import { SECTIONS } from "@/lib/constants";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = SECTIONS.map((section) =>
        document.getElementById(section.id)
      );

      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-md border-b border-fg-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="font-display font-black text-xl text-accent-cyan">
            {"<dev />"}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {SECTIONS.slice(1).map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`font-code text-sm transition-colors relative group ${
                  activeSection === section.id
                    ? "text-accent-cyan"
                    : "text-fg-secondary hover:text-fg-primary"
                }`}
              >
                <span className="text-syntax-comment">{"// "}</span>
                {section.label}
                {activeSection === section.id && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent-cyan" />
                )}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-fg-primary"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-bg-secondary border-t border-fg-primary/10">
          <div className="px-4 py-4 space-y-3">
            {SECTIONS.slice(1).map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`block w-full text-left font-code text-sm py-2 transition-colors ${
                  activeSection === section.id
                    ? "text-accent-cyan"
                    : "text-fg-secondary"
                }`}
              >
                <span className="text-syntax-comment">{"// "}</span>
                {section.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
