import { SECTIONS } from "@/lib/constants";

export default function NavBar() {
  return (
    <nav className="nav">
      <div className="nav-logo">
        <span className="dot" />
        <span>NIKZ / 2026</span>
      </div>
      <div className="nav-links">
        {SECTIONS.map((s) => (
          <a key={s.id} href={`#${s.id}`}>
            {s.label}
          </a>
        ))}
      </div>
      <div className="nav-counter">
        <span data-progress>000%</span>
      </div>
    </nav>
  );
}
