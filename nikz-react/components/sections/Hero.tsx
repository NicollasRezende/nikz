import HeroAscii from "@/components/effects/HeroAscii";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-orb a" data-mouse="0.6" />
      <div className="hero-orb b" data-mouse="0.8" />
      <HeroAscii />
      <div className="hero-bg-word" data-mouse="0.2">
        NIKZ
      </div>
      <div className="hero-corner tl">
        <div>NICOLLAS REZENDE</div>
        <div>
          <span>/</span> portfolio v2
        </div>
      </div>
      <div className="hero-corner tr">
        <div>
          BRASÍLIA <span>/</span> BR
        </div>
        <div>LAT -15.79 / LNG -47.88</div>
      </div>
      <div className="hero-corner bl">
        <div>
          STATUS <span>/</span> AVAILABLE
        </div>
        <div>
          2026 <span>/</span> Q2
        </div>
      </div>
      <div className="hero-overlay">
        <div className="hero-eyebrow">
          FULL STACK DEVELOPER
          <span className="blink" />
        </div>
        <h1 className="hero-name">
          <span className="word">
            <span style={{ animationDelay: "0.4s" }}>Nicollas</span>
          </span>
          <br />
          <span className="word">
            <span style={{ animationDelay: "0.6s" }}>Rezende</span>
          </span>
        </h1>
        <div className="hero-tag">
          <span className="arr">→</span> Java · Spring · Liferay · React ·
          Python · Automação
        </div>
      </div>
      <div className="hero-scroll">
        <span>SCROLL</span>
        <div className="line" />
      </div>
    </section>
  );
}
