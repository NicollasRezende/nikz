"use client";

import { useEffect, useState } from "react";

export default function HeroAscii() {
  const [grid, setGrid] = useState("");

  useEffect(() => {
    const cols = 120;
    const rows = 30;
    const chars = "01<>/\\|*+=-:.{}[]()";
    let frame = 0;
    let raf = 0;
    let last = 0;

    const drops = Array.from({ length: cols }, () => ({
      y: Math.random() * rows,
      speed: 0.05 + Math.random() * 0.15,
      len: 3 + Math.floor(Math.random() * 8),
    }));

    function render(t: number) {
      raf = requestAnimationFrame(render);
      if (t - last < 80) return;
      last = t;
      frame++;

      const buf: string[][] = Array.from({ length: rows }, () =>
        Array(cols).fill(" ")
      );
      drops.forEach((d, x) => {
        d.y += d.speed;
        if (d.y > rows + d.len) {
          d.y = -d.len - Math.random() * 10;
          d.speed = 0.05 + Math.random() * 0.15;
        }
        for (let i = 0; i < d.len; i++) {
          const yy = Math.floor(d.y - i);
          if (yy >= 0 && yy < rows) {
            const seed = (x * 13 + yy * 7 + frame) % chars.length;
            buf[yy][x] = chars[seed];
          }
        }
      });

      let out = "";
      for (let y = 0; y < rows; y++) out += buf[y].join("") + "\n";
      setGrid(out);
    }
    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="hero-ascii" data-mouse="0.3">
      <pre>{grid}</pre>
    </div>
  );
}
