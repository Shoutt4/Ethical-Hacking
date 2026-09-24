"use client";
import { useEffect, useRef, useCallback } from "react";

/* ─── types ────────────────────────────────────────────────── */
type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  /** individual twinkle phase offset */
  phase: number;
};

type Props = {
  particleCount?: number;
  linkDistance?: number;
  mouseRadius?: number;
  /** 0-1 */
  baseOpacity?: number;
  color?: string;
  className?: string;
};

/* ─── component ────────────────────────────────────────────── */
export function ConstellationBg({
  particleCount = 220,
  linkDistance = 170,
  mouseRadius = 240,
  baseOpacity = 0.85,
  color = "56,189,248", // sky-400 RGB
  className = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const particles = useRef<Particle[]>([]);
  const raf = useRef(0);
  const dpr = useRef(1);
  const time = useRef(0);

  /* ---- initialise particles ---- */
  const init = useCallback(
    (w: number, h: number) => {
      const arr: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        /* Vary star sizes more dramatically: some tiny, some large */
        const sizeTier = Math.random();
        let radius: number;
        if (sizeTier < 0.45) {
          radius = Math.random() * 1.0 + 0.4; // small stars (45%)
        } else if (sizeTier < 0.82) {
          radius = Math.random() * 1.8 + 1.2; // medium stars (37%)
        } else {
          radius = Math.random() * 2.4 + 2.0; // bright large stars (18%)
        }

        arr.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          radius,
          opacity: Math.random() * 0.45 + 0.55, // 0.55-1.0 — much brighter
          phase: Math.random() * Math.PI * 2,
        });
      }
      particles.current = arr;
    },
    [particleCount],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    /* ---- sizing ---- */
    const resize = () => {
      dpr.current = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr.current;
      canvas.height = rect.height * dpr.current;
      ctx.setTransform(dpr.current, 0, 0, dpr.current, 0, 0);
      if (particles.current.length === 0) init(rect.width, rect.height);
    };
    resize();
    window.addEventListener("resize", resize);

    /* ---- mouse ---- */
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    /* ---- draw loop ---- */
    const draw = () => {
      time.current += 0.012;
      const t = time.current;
      const w = canvas.width / dpr.current;
      const h = canvas.height / dpr.current;
      ctx.clearRect(0, 0, w, h);
      const pts = particles.current;
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const linkDist2 = linkDistance * linkDistance;
      const mouseR2 = mouseRadius * mouseRadius;

      /* ═══ draw particles (stars) ═══ */
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        /* mouse attraction (soft) */
        const dmx = mx - p.x;
        const dmy = my - p.y;
        const md2 = dmx * dmx + dmy * dmy;
        if (md2 < mouseR2 && md2 > 1) {
          const f = 0.00022;
          p.vx += dmx * f;
          p.vy += dmy * f;
        }

        /* clamp velocity */
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 0.65) {
          p.vx *= 0.65 / speed;
          p.vy *= 0.65 / speed;
        }

        /* twinkle effect */
        const twinkle = 0.7 + 0.3 * Math.sin(t * 1.8 + p.phase);
        const alpha = p.opacity * baseOpacity * twinkle;

        /* outer glow for larger stars */
        if (p.radius > 1.5) {
          const glowR = p.radius * 4;
          const grad = ctx.createRadialGradient(
            p.x, p.y, 0,
            p.x, p.y, glowR,
          );
          grad.addColorStop(0, `rgba(${color},${alpha * 0.35})`);
          grad.addColorStop(0.5, `rgba(${color},${alpha * 0.08})`);
          grad.addColorStop(1, `rgba(${color},0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        /* star core */
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${alpha})`;
        ctx.fill();
      }

      /* ═══ constellation links between particles ═══ */
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkDist2) {
            const dist = Math.sqrt(d2);
            const alpha = (1 - dist / linkDistance) * 0.45;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(${color},${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();

            /* draw a glow line on top for close particles */
            if (dist < linkDistance * 0.5) {
              ctx.beginPath();
              ctx.moveTo(pts[i].x, pts[i].y);
              ctx.lineTo(pts[j].x, pts[j].y);
              ctx.strokeStyle = `rgba(${color},${alpha * 0.3})`;
              ctx.lineWidth = 2.5;
              ctx.stroke();
            }
          }
        }
      }

      /* ═══ links from mouse ═══ */
      if (mx > -1000) {
        for (const p of pts) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < mouseR2) {
            const dist = Math.sqrt(d2);
            const alpha = (1 - dist / mouseRadius) * 0.6;

            /* glow line (wide) */
            ctx.beginPath();
            ctx.moveTo(mx, my);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `rgba(${color},${alpha * 0.2})`;
            ctx.lineWidth = 3.5;
            ctx.stroke();

            /* crisp line */
            ctx.beginPath();
            ctx.moveTo(mx, my);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `rgba(${color},${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }

        /* mouse glow */
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 90);
        grad.addColorStop(0, `rgba(${color},0.28)`);
        grad.addColorStop(0.4, `rgba(${color},0.08)`);
        grad.addColorStop(1, `rgba(${color},0)`);
        ctx.beginPath();
        ctx.arc(mx, my, 90, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        /* mouse core dot */
        ctx.beginPath();
        ctx.arc(mx, my, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},0.7)`;
        ctx.fill();
      }

      raf.current = requestAnimationFrame(draw);
    };
    raf.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [particleCount, linkDistance, mouseRadius, baseOpacity, color, init]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-auto absolute inset-0 h-full w-full ${className}`}
      style={{ display: "block" }}
    />
  );
}
