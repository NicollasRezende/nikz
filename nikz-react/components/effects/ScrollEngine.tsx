"use client";

import { useEffect } from "react";

export default function ScrollEngine() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let raf1 = 0;
    let raf2 = 0;
    let mx = 0,
      my = 0,
      tmx = 0,
      tmy = 0;
    let cx = 0,
      cy = 0,
      rx = 0,
      ry = 0;

    function onScroll() {
      const sy = window.scrollY;
      const layers = document.querySelectorAll<HTMLElement>("[data-parallax]");
      layers.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "0") || 0;
        const rect = el.getBoundingClientRect();
        const offset =
          (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
        el.style.setProperty("--py", offset + "px");
        el.style.transform = `translate3d(var(--mxv, 0px), calc(${offset}px + var(--myv, 0px)), 0)`;
      });
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(100, Math.round((sy / max) * 100)) : 0;
      const counter = document.querySelector<HTMLElement>("[data-progress]");
      if (counter) counter.textContent = String(pct).padStart(3, "0") + "%";
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    function onMouseMove(e: MouseEvent) {
      tmx = (e.clientX / window.innerWidth - 0.5) * 2;
      tmy = (e.clientY / window.innerHeight - 0.5) * 2;
      cx = e.clientX;
      cy = e.clientY;
      if (dot) {
        dot.style.left = cx + "px";
        dot.style.top = cy + "px";
      }
    }
    window.addEventListener("mousemove", onMouseMove);

    function mouseRaf() {
      mx += (tmx - mx) * 0.08;
      my += (tmy - my) * 0.08;
      const els = document.querySelectorAll<HTMLElement>("[data-mouse]");
      els.forEach((el) => {
        const s = parseFloat(el.dataset.mouse || "1") || 1;
        const xv = mx * s * 30;
        const yv = my * s * 20;
        el.style.setProperty("--mxv", xv + "px");
        el.style.setProperty("--myv", yv + "px");
        const py = el.style.getPropertyValue("--py") || "0px";
        el.style.transform = `translate3d(${xv}px, calc(${py} + ${yv}px), 0)`;
      });
      raf1 = requestAnimationFrame(mouseRaf);
    }
    raf1 = requestAnimationFrame(mouseRaf);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    function attachReveals() {
      document
        .querySelectorAll<HTMLElement>(
          ".reveal:not([data-io]), .reveal-stagger:not([data-io]), .char-reveal:not([data-io])"
        )
        .forEach((el) => {
          el.dataset.io = "1";
          io.observe(el);
        });
    }
    attachReveals();
    const t1 = setTimeout(attachReveals, 200);
    const t2 = setTimeout(attachReveals, 800);

    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    const ring = document.createElement("div");
    ring.className = "cursor-ring";
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    function ringRaf() {
      rx += (cx - rx) * 0.18;
      ry += (cy - ry) * 0.18;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      raf2 = requestAnimationFrame(ringRaf);
    }
    raf2 = requestAnimationFrame(ringRaf);

    function bindHover() {
      document
        .querySelectorAll<HTMLElement>("a, button, [data-cursor]")
        .forEach((el) => {
          if (el.dataset.cursorBound) return;
          el.dataset.cursorBound = "1";
          el.addEventListener("mouseenter", () => {
            ring.classList.add("hover");
            dot.classList.add("hover");
          });
          el.addEventListener("mouseleave", () => {
            ring.classList.remove("hover");
            dot.classList.remove("hover");
          });
        });
    }
    bindHover();
    const t3 = setTimeout(bindHover, 300);
    const t4 = setTimeout(bindHover, 1000);

    function bindMagnetic() {
      document
        .querySelectorAll<HTMLElement>("[data-magnetic]")
        .forEach((el) => {
          if (el.dataset.magBound) return;
          el.dataset.magBound = "1";
          const strength = parseFloat(el.dataset.magnetic || "0.4") || 0.4;
          el.addEventListener("mousemove", (e) => {
            const r = el.getBoundingClientRect();
            const x = e.clientX - r.left - r.width / 2;
            const y = e.clientY - r.top - r.height / 2;
            el.style.transform = `translate(${x * strength}px, ${
              y * strength
            }px)`;
          });
          el.addEventListener("mouseleave", () => {
            el.style.transform = "";
          });
        });
    }
    bindMagnetic();
    const t5 = setTimeout(bindMagnetic, 300);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      io.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      dot.remove();
      ring.remove();
    };
  }, []);

  return null;
}
