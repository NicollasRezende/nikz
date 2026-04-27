import { HACKATHONS } from "@/lib/content";

export default function Hackathons() {
  return (
    <section className="section-pad hack-section" id="hacks">
      <div className="hack-bigtxt" data-parallax="-0.1">
        CHAMPION
      </div>
      <div className="section-num reveal">RECOGNITION / 06</div>
      <h2 className="section-title reveal">
        4 hackathons.
        <br />
        4 wins.
      </h2>
      <div className="hack-grid reveal-stagger">
        {HACKATHONS.map((h, i) => (
          <div key={i} className="hack-card" data-cursor>
            <div>
              <div className="pos">
                {h.pos}
                <span className="small">/{h.note}</span>
              </div>
              <h4>{h.title}</h4>
            </div>
            <div className="info">
              <span className="yr">{h.year}</span> · {h.loc}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
