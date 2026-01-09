// hooks/useScrollSpy.ts
"use client";

import { useState, useEffect, useRef } from "react";

export function useScrollSpy(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Usar um único observer para todas as seções
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Encontrar a seção mais visível
        const visibleEntries = entries.filter(
          (entry) => entry.isIntersecting && entry.intersectionRatio >= 0.5
        );

        if (visibleEntries.length > 0) {
          // Pegar a primeira seção visível na ordem do array
          const firstVisibleId = visibleEntries[0].target.id;
          setActiveSection(firstVisibleId);
        }
      },
      {
        threshold: 0.5,
        rootMargin: "-100px 0px -50% 0px",
      }
    );

    // Observar todas as seções com o mesmo observer
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    elements.forEach((element) => {
      observerRef.current?.observe(element);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [sectionIds]);

  return activeSection;
}
