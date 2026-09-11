"use client";
import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
};

type Props = {
  starCount?: number;
  starColor?: { r: number; g: number; b: number };
  maxOpacity?: number; // 0-255 or 0-1
  rotationSpeed?: number;
  waveSpeed?: number;
  waveFrequency?: number;
  starEscapeWidth?: number;
  voidWidth?: number;
  className?: string;
};

export function Starfield({
  starCount = 6000,
  starColor = { r: 255, g: 255, b: 255 },
  maxOpacity = 0.85,
  rotationSpeed = 0.00012,
  waveSpeed = 0.002,
  waveFrequency = 12,
  starEscapeWidth = 340,
  voidWidth = 80,
  className = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let stars: Star[] = [];
    let tick = 0;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const normalizedMaxOpacity = maxOpacity > 1 ? maxOpacity / 255 : maxOpacity;

    const init = () => {
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      stars = Array.from({ length: starCount }, () => ({
        x: (Math.random() - 0.5) * width * 1.4,
        y: (Math.random() - 0.5) * height * 1.4,
        z: Math.random() * 1.2 + 0.2,
        size: Math.random() * 1.15 + 0.15,
        opacity: Math.random() * normalizedMaxOpacity,
        twinkleSpeed: Math.random() * 0.015 + 0.004,
        twinkleOffset: Math.random() * Math.PI * 2,
      }));
    };

    const render = () => {
      tick += prefersReduced ? 0 : 1;
      ctx.clearRect(0, 0, width, height);

      // subtle vignette for depth
      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // gentle rotation around center
        if (!prefersReduced && rotationSpeed) {
          const cos = Math.cos(rotationSpeed);
          const sin = Math.sin(rotationSpeed);
          const dx = s.x;
          const dy = s.y;
          s.x = dx * cos - dy * sin;
          s.y = dx * sin + dy * cos;
        }

        // wave drift
        if (!prefersReduced && waveSpeed && waveFrequency) {
          s.x += Math.sin(tick * waveSpeed + s.y / waveFrequency) * 0.15;
          s.y += Math.cos(tick * waveSpeed + s.x / waveFrequency) * 0.12;
        }

        // void in center (avoid crowding)
        const dist = Math.hypot(s.x, s.y);
        if (dist < voidWidth) continue;
        if (dist > starEscapeWidth * 1.6) continue;

        // twinkle
        const tw = prefersReduced ? 1 : 0.55 + 0.45 * Math.sin(tick * s.twinkleSpeed + s.twinkleOffset);
        const alpha = Math.max(0, Math.min(1, s.opacity * tw * (1 - dist / (starEscapeWidth * 2.2))));

        if (alpha <= 0.02) continue;

        const px = cx + s.x;
        const py = cy + s.y;
        if (px < -10 || px > width + 10 || py < -10 || py > height + 10) continue;

        ctx.beginPath();
        ctx.fillStyle = `rgba(${starColor.r}, ${starColor.g}, ${starColor.b}, ${alpha})`;
        // glow for brighter stars
        if (s.size > 0.9 && alpha > 0.5) {
          ctx.shadowColor = `rgba(${starColor.r}, ${starColor.g}, ${starColor.b}, ${alpha * 0.9})`;
          ctx.shadowBlur = 6;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.arc(px, py, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationRef.current = requestAnimationFrame(render);
    };

    init();
    render();

    const onResize = () => {
      init();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [starCount, starColor.r, starColor.g, starColor.b, maxOpacity, rotationSpeed, waveSpeed, waveFrequency, starEscapeWidth, voidWidth]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
