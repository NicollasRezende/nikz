import { PROJECTS } from "@/lib/content";

export default function Projects() {
  return (
    <section
      className="section-pad projects-section"
      id="work"
      style={{ paddingTop: 80, paddingBottom: 20 }}
    >
      <div className="projects-bigword" data-parallax="-0.04">
        BUILT
      </div>
      <div className="section-num reveal">SELECTED WORK / 04</div>
      <h2 className="section-title reveal">
        Coisas que
        <br />
        construí.
      </h2>

      <div className="projects-list">
        {PROJECTS.map((p, i) => (
          <article key={p.id} className="project-row reveal" data-cursor>
            <div className="pr-num">
              <span>
                {String(i + 1).padStart(2, "0")} /{" "}
                {String(PROJECTS.length).padStart(2, "0")}
              </span>
              <span className="yr">{p.year}</span>
            </div>
            <div className="pr-body">
              <div className="pr-main">
                <div
                  className={`pr-status ${
                    p.status === "shipped" ? "shipped" : ""
                  }`}
                >
                  {p.status === "production" ? "● in production" : "● shipped"}
                </div>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <div className="pr-tech">
                  {p.tech.map((t, j) => (
                    <span key={j}>{t}</span>
                  ))}
                </div>
                <div className="pr-actions">
                  {p.demo ? (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="primary"
                      data-magnetic="0.2"
                    >
                      View Live <span>↗</span>
                    </a>
                  ) : (
                    <a className="disabled">Private</a>
                  )}
                  {p.github ? (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      data-magnetic="0.2"
                    >
                      Source <span>↗</span>
                    </a>
                  ) : (
                    <a className="disabled">NDA</a>
                  )}
                </div>
              </div>
              <div className="pr-preview">
                <div className="pr-chrome">
                  <i />
                  <i />
                  <i />
                  <span className="url">{p.url || "—"}</span>
                </div>
                <div className="pr-canvas">
                  <span className="pr-glyph">{p.visual}</span>
                  <div className="pr-meta">
                    <span className="ok">●</span>{" "}
                    {p.status === "production" ? "RUNNING" : "DEPLOYED"} ·{" "}
                    {p.year}
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
