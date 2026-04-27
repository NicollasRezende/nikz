"use client";

import { useEffect, useRef } from "react";
import { EXPERIENCE } from "@/lib/content";

export default function Experience() {
  const railRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.style.setProperty("--rail", "100%");
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      className="section-pad exp-section"
      id="exp"
      style={{ paddingTop: 40 }}
    >
      <div className="exp-bigword" data-parallax="-0.04">
        JOURNEY
      </div>
      <div className="section-num reveal">EXPERIENCE / 05</div>
      <h2 className="section-title reveal">Trajetória.</h2>

      <div className="exp-rail" ref={railRef}>
        {EXPERIENCE.map((e, i) => (
          <div
            key={i}
            className={`exp-node reveal ${e.current ? "current" : ""}`}
            data-cursor
          >
            <div className="exp-side">
              <div className="exp-period">{e.period}</div>
              <div className="exp-year">{e.yearLabel}</div>
              <div className="exp-loc">{e.location}</div>
              <div className="exp-stack">
                {e.tech.map((t, j) => (
                  <span key={j}>
                    {t}
                    {j < e.tech.length - 1 ? " · " : ""}
                  </span>
                ))}
              </div>
            </div>
            <div className="exp-main">
              <div className="exp-co">
                <span>{e.company}</span>
                <span className="arr">↗</span>
              </div>
              <div className="exp-role">{e.role}</div>
              <p className="exp-desc">{e.description}</p>
              <div className="exp-wins">
                {e.achievements.map((a, j) => (
                  <div key={j} className="exp-win">
                    <span className="ix">{String(j + 1).padStart(2, "0")}</span>
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
