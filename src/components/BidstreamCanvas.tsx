"use client";

import { useEffect, useRef } from "react";

type Stream = {
  y: number;
  amplitude: number;
  wavelength: number;
  phase: number;
  speed: number;
  hue: "cyan" | "violet";
  pulses: { t: number; speed: number }[];
};

type Particle = { x: number; y: number; r: number; vx: number; vy: number; a: number };

const CYAN = "34, 211, 238";
const VIOLET = "167, 139, 250";

/**
 * Lightweight canvas background: faint horizontal "bidstream" waves with
 * pulses travelling along them, over a field of drifting data particles.
 * Renders a single static frame when the user prefers reduced motion, and
 * pauses entirely while off-screen or when the tab is hidden.
 */
export default function BidstreamCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let streams: Stream[] = [];
    let particles: Particle[] = [];
    let raf = 0;
    let running = false;
    let time = 0;

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const streamCount = width < 768 ? 5 : 8;
      streams = Array.from({ length: streamCount }, (_, i) => ({
        y: height * (0.18 + (0.72 * i) / (streamCount - 1)) + (Math.random() - 0.5) * 30,
        amplitude: 14 + Math.random() * 26,
        wavelength: 380 + Math.random() * 420,
        phase: Math.random() * Math.PI * 2,
        speed: 0.12 + Math.random() * 0.2,
        hue: Math.random() > 0.65 ? "violet" : "cyan",
        pulses: Array.from({ length: 1 + Math.round(Math.random()) }, () => ({
          t: Math.random(),
          speed: 0.0012 + Math.random() * 0.0022,
        })),
      }));

      const particleCount = width < 768 ? 34 : 70;
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.6 + Math.random() * 1.4,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.08,
        a: 0.05 + Math.random() * 0.22,
      }));
    };

    const streamY = (s: Stream, x: number, t: number) =>
      s.y + Math.sin((x / s.wavelength) * Math.PI * 2 + s.phase + t * s.speed) * s.amplitude;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -4) p.x = width + 4;
        if (p.x > width + 4) p.x = -4;
        if (p.y < -4) p.y = height + 4;
        if (p.y > height + 4) p.y = -4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${CYAN}, ${p.a * 0.5})`;
        ctx.fill();
      }

      for (const s of streams) {
        const rgb = s.hue === "cyan" ? CYAN : VIOLET;

        ctx.beginPath();
        for (let x = 0; x <= width; x += 14) {
          const y = streamY(s, x, t);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${rgb}, 0.07)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        for (const pulse of s.pulses) {
          pulse.t += pulse.speed;
          if (pulse.t > 1.1) pulse.t = -0.1;
          const px = pulse.t * width;
          const py = streamY(s, px, t);

          const grad = ctx.createLinearGradient(px - 70, py, px, py);
          grad.addColorStop(0, `rgba(${rgb}, 0)`);
          grad.addColorStop(1, `rgba(${rgb}, 0.5)`);
          ctx.beginPath();
          for (let x = Math.max(0, px - 70); x <= Math.min(width, px); x += 6) {
            const y = streamY(s, x, t);
            if (x === Math.max(0, px - 70)) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.4;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(px, py, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgb}, 0.85)`;
          ctx.fill();
        }
      }
    };

    const loop = () => {
      if (!running) return;
      time += 0.016;
      draw(time);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    build();
    if (reduceMotion) {
      draw(0);
    } else {
      start();
    }

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    observer.observe(canvas);

    const onVisibility = () =>
      document.hidden ? stop() : start();
    document.addEventListener("visibilitychange", onVisibility);

    const onResize = () => {
      build();
      if (reduceMotion) draw(0);
    };
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  );
}
