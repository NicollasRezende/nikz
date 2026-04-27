"use client";

import { useEffect, useRef, useState } from "react";
import { STACK_ALL, type StackCategory } from "@/lib/content";

type Tab = "all" | StackCategory;

function Counter({
  to,
  duration = 1800,
}: {
  to: number;
  duration?: number;
}) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(to * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);

  return <span ref={ref}>{n}</span>;
}

export default function Skills() {
  const [tab, setTab] = useState<Tab>("all");
  const visible =
    tab === "all" ? STACK_ALL : STACK_ALL.filter((s) => s.cat === tab);
  const counts = {
    all: STACK_ALL.length,
    frontend: STACK_ALL.filter((s) => s.cat === "frontend").length,
    backend: STACK_ALL.filter((s) => s.cat === "backend").length,
    tools: STACK_ALL.filter((s) => s.cat === "tools").length,
  };

  useEffect(() => {
    const t = setTimeout(() => {
      document.querySelectorAll<HTMLElement>(".tech-tile").forEach((el) => {
        if (el.classList.contains("in")) return;
        const obs = new IntersectionObserver(
          ([e]) => {
            if (e.isIntersecting) {
              el.classList.add("in");
              obs.disconnect();
            }
          },
          { threshold: 0.3 }
        );
        obs.observe(el);
      });
    }, 50);
    return () => clearTimeout(t);
  }, [tab]);

  return (
    <section
      className="section-pad skills-section"
      id="skills"
      style={{ paddingTop: 80 }}
    >
      <div className="skills-bigword" data-parallax="-0.05">
        STACK
      </div>
      <div className="section-num reveal">STACK / 02</div>
      <h2 className="section-title reveal">
        Ferramentas
        <br />
        do ofício.
      </h2>

      <div className="skills-meta reveal-stagger">
        <div className="stat">
          <div className="label">Languages</div>
          <div className="value">
            <Counter to={12} />
          </div>
          <div className="sub">production-ready</div>
        </div>
        <div className="stat">
          <div className="label">Years coding</div>
          <div className="value">
            <Counter to={5} />
            <span className="unit">+</span>
          </div>
          <div className="sub">since 2020</div>
        </div>
        <div className="stat">
          <div className="label">Production projects</div>
          <div className="value">
            <Counter to={30} />
            <span className="unit">+</span>
          </div>
          <div className="sub">shipped &amp; maintained</div>
        </div>
        <div className="stat">
          <div className="label">Hackathon wins</div>
          <div className="value">
            <Counter to={4} />
            <span className="unit">/4</span>
          </div>
          <div className="sub">all in 2025</div>
        </div>
      </div>

      <div className="stack-tabs">
        <button
          className={`stack-tab ${tab === "all" ? "active" : ""}`}
          onClick={() => setTab("all")}
          data-cursor
        >
          All <span className="count">[{counts.all}]</span>
        </button>
        <button
          className={`stack-tab ${tab === "frontend" ? "active" : ""}`}
          onClick={() => setTab("frontend")}
          data-cursor
        >
          Frontend <span className="count">[{counts.frontend}]</span>
        </button>
        <button
          className={`stack-tab ${tab === "backend" ? "active" : ""}`}
          onClick={() => setTab("backend")}
          data-cursor
        >
          Backend <span className="count">[{counts.backend}]</span>
        </button>
        <button
          className={`stack-tab ${tab === "tools" ? "active" : ""}`}
          onClick={() => setTab("tools")}
          data-cursor
        >
          Tools <span className="count">[{counts.tools}]</span>
        </button>
      </div>

      <div className="stack-matrix">
        {visible.map((s, i) => (
          <div
            key={`${tab}-${s.name}`}
            className={`tech-tile ${s.size || "t-3x1"} ${
              s.featured ? "featured" : ""
            }`}
            style={{ ["--p" as never]: s.lvl + "%" }}
            data-cursor
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty(
                "--mx",
                ((e.clientX - r.left) / r.width) * 100 + "%"
              );
              e.currentTarget.style.setProperty(
                "--my",
                ((e.clientY - r.top) / r.height) * 100 + "%"
              );
            }}
          >
            <span className="num">{String(i + 1).padStart(2, "0")}</span>
            <span className="glyph">{s.glyph}</span>
            <div className="name">{s.name}</div>
            <div className="lvl">
              <span>
                {s.years} · {s.proj}
              </span>
              <span className="pct">{s.lvl}</span>
            </div>
            <span className="bar" />
          </div>
        ))}
      </div>
    </section>
  );
}
