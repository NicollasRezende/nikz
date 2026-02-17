"use client";

import { useEffect, useRef, useState } from "react";
import { GameOfLife as GameOfLifeEngine } from "@/lib/gameOfLife";

export default function GameOfLife() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<GameOfLifeEngine | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Only render on desktop (1024px+)
    const checkViewport = () => {
      setShouldRender(window.innerWidth >= 1024);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);

    return () => {
      window.removeEventListener("resize", checkViewport);
    };
  }, []);

  useEffect(() => {
    if (!shouldRender) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
      // Performance optimizations
      desynchronized: true,
    });
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      if (gameRef.current) {
        gameRef.current.resize(canvas.width, canvas.height);
      } else {
        gameRef.current = new GameOfLifeEngine(canvas.width, canvas.height, 50);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    // Animation loop with predefined pattern updates
    const animate = () => {
      if (!gameRef.current) return;

      // Clear canvas with low opacity for trail effect
      ctx.fillStyle = "rgba(26, 27, 38, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update frame counter (lightweight, no calculations)
      gameRef.current.update();

      // Draw the animated patterns
      gameRef.current.draw(ctx);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener("resize", resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-10"
      style={{ zIndex: 0 }}
    />
  );
}
