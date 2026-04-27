import { PERSONAL_INFO } from "@/lib/content";

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="eyebrow reveal">/ LET&apos;S TALK</div>
      <h2 className="reveal">
        Tem um projeto
        <br />
        em mente? <span className="accent">vamos.</span>
      </h2>
      <a
        className="cta"
        href={`mailto:${PERSONAL_INFO.links.email}`}
        data-magnetic="0.3"
        data-cursor
      >
        <span>{PERSONAL_INFO.links.email}</span>
        <span className="arr">↗</span>
      </a>
      <div className="contact-links reveal">
        <a href={PERSONAL_INFO.links.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={PERSONAL_INFO.links.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href={PERSONAL_INFO.links.whatsapp} target="_blank" rel="noreferrer">
          WhatsApp
        </a>
      </div>
    </section>
  );
}
