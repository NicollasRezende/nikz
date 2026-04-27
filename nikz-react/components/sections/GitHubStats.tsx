"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { GitHubRepo, ContributionDay } from "@/lib/github";
import { LANG_COLORS } from "@/lib/content";

interface GitHubStatsProps {
  repos: GitHubRepo[];
  contributions: ContributionDay[];
}

function levelFor(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

function Counter({
  to,
  duration = 1500,
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

export default function GitHubStats({ repos, contributions }: GitHubStatsProps) {
  const cells = useMemo(() => {
    if (!contributions.length) return [] as { lvl: 0 | 1 | 2 | 3 | 4; date: string; count: number }[];

    const firstDow = new Date(contributions[0].date).getDay();
    const padded: (ContributionDay | null)[] = [
      ...Array(firstDow).fill(null),
      ...contributions,
    ];
    while (padded.length < 53 * 7) padded.push(null);
    padded.length = 53 * 7;

    const byCol: { lvl: 0 | 1 | 2 | 3 | 4; date: string; count: number }[] = [];
    for (let day = 0; day < 7; day++) {
      for (let week = 0; week < 53; week++) {
        const idx = week * 7 + day;
        const d = padded[idx];
        if (d) {
          byCol.push({ lvl: levelFor(d.count), date: d.date, count: d.count });
        } else {
          byCol.push({ lvl: 0, date: "", count: 0 });
        }
      }
    }
    return byCol;
  }, [contributions]);

  const totalContributions = useMemo(
    () => contributions.reduce((a, d) => a + d.count, 0),
    [contributions]
  );

  const langs = useMemo(() => {
    const counts: Record<string, number> = {};
    repos.forEach((r) => {
      if (r.language) counts[r.language] = (counts[r.language] || 0) + 1;
    });
    const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
    const top = Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({
        name,
        pct: Math.round((count / total) * 100),
        color: LANG_COLORS[name] ?? LANG_COLORS.Other,
      }));
    const used = top.reduce((a, l) => a + l.pct, 0);
    if (used < 100 && top.length) {
      top.push({ name: "Other", pct: 100 - used, color: LANG_COLORS.Other });
    }
    return top;
  }, [repos]);

  const topRepos = useMemo(
    () => repos.filter((r) => !r.fork).slice(0, 3),
    [repos]
  );

  useEffect(() => {
    const t = setTimeout(() => {
      document.querySelectorAll<HTMLElement>(".gh-lang").forEach((el) => {
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
  }, []);

  return (
    <section
      className="section-pad gh-section"
      id="github"
      style={{ paddingTop: 120, paddingBottom: 120 }}
    >
      <div className="section-num reveal">OPEN SOURCE / 03</div>
      <h2 className="section-title reveal" style={{ marginBottom: 60 }}>
        github.com/
        <br />
        NicollasRezende
      </h2>

      <div className="gh-grid reveal">
        <div className="gh-card">
          <div className="gh-label">
            <span>CONTRIBUTIONS / LAST 12 MONTHS</span>
            <span className="live">LIVE</span>
          </div>
          <div className="gh-heatmap">
            {cells.map((c, i) => (
              <div
                key={i}
                className={`cell ${c.lvl > 0 ? "l" + c.lvl : ""}`}
                style={{ transitionDelay: (i % 60) * 8 + "ms" }}
                title={c.date ? `${c.date}: ${c.count} commit${c.count !== 1 ? "s" : ""}` : ""}
              />
            ))}
          </div>
          <div className="gh-heatmap-legend">
            <span>
              <Counter to={totalContributions} /> contributions
            </span>
            <span style={{ marginLeft: 16 }}>less</span>
            <div className="lg">
              <span style={{ background: "var(--bg-3)" }} />
              <span style={{ background: "rgba(125, 207, 255, 0.15)" }} />
              <span style={{ background: "rgba(125, 207, 255, 0.35)" }} />
              <span style={{ background: "rgba(125, 207, 255, 0.6)" }} />
              <span style={{ background: "var(--accent)" }} />
            </div>
            <span>more</span>
          </div>
        </div>

        <div className="gh-card">
          <div className="gh-label">
            <span>TOP LANGUAGES</span>
            <span style={{ color: "var(--fg-2)" }}>BY USAGE</span>
          </div>
          <div className="gh-langs">
            {langs.map((l, i) => (
              <div
                key={i}
                className="gh-lang"
                style={{ ["--w" as never]: l.pct + "%" }}
              >
                <span className="lname">{l.name}</span>
                <div className="lbar">
                  <i
                    style={{
                      background: l.color,
                      ["--w" as never]: l.pct + "%",
                    }}
                  />
                </div>
                <span className="lpct">{l.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="gh-repos reveal-stagger">
        {topRepos.map((r) => {
          const color = r.language
            ? LANG_COLORS[r.language] ?? LANG_COLORS.Other
            : LANG_COLORS.Other;
          return (
            <a
              key={r.id}
              className="gh-repo"
              href={r.html_url}
              target="_blank"
              rel="noreferrer"
              data-cursor
            >
              <div className="rh">
                <div className="rname">{r.name}</div>
                <span className="arr">↗</span>
              </div>
              <div className="rdesc">
                {r.description ?? "No description available"}
              </div>
              <div className="rmeta">
                {r.language ? (
                  <span
                    className="lang"
                    style={{ ["--lc" as never]: color }}
                  >
                    {r.language}
                  </span>
                ) : (
                  <span className="lang">—</span>
                )}
                <span>★ {r.stargazers_count}</span>
                <span>{new Date(r.pushed_at).getFullYear()}</span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
