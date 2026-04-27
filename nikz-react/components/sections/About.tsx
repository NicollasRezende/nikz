import { Fragment } from "react";
import { PERSONAL_INFO } from "@/lib/content";

export default function About() {
  const bioParts = PERSONAL_INFO.bio.split("Java");
  return (
    <section className="section-pad" id="about">
      <div className="section-num reveal">SOBRE / 01</div>
      <h2 className="section-title reveal">
        Construindo
        <br />
        com propósito.
      </h2>
      <div className="about-grid">
        <div className="about-left reveal">
          <div className="about-meta">
            <div className="row">
              <span className="k">NAME</span>
              <span className="v">{PERSONAL_INFO.fullName}</span>
            </div>
            <div className="row">
              <span className="k">ROLE</span>
              <span className="v">{PERSONAL_INFO.role}</span>
            </div>
            <div className="row">
              <span className="k">LOCATION</span>
              <span className="v">{PERSONAL_INFO.location}</span>
            </div>
            <div className="row">
              <span className="k">STATUS</span>
              <span className="v live">{PERSONAL_INFO.availability}</span>
            </div>
            <div className="row">
              <span className="k">HACKATHONS</span>
              <span className="v">04 wins</span>
            </div>
            <div className="row">
              <span className="k">YEARS</span>
              <span className="v">3+ in production</span>
            </div>
          </div>
        </div>
        <div className="about-right">
          <p className="about-bio reveal">
            {bioParts.map((part, i, arr) =>
              i < arr.length - 1 ? (
                <Fragment key={i}>
                  {part}
                  <em>Java</em>
                </Fragment>
              ) : (
                <Fragment key={i}>{part}</Fragment>
              )
            )}
          </p>
          <div className="about-philosophy reveal">
            → &ldquo;{PERSONAL_INFO.philosophy}&rdquo;
          </div>
        </div>
      </div>
    </section>
  );
}
