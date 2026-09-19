import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

export type RotatingSlide = { src: string; alt: string };

export function RotatingImage({
  images,
  className = "",
  intervalMs = 4200,
}: {
  images: RotatingSlide[];
  className?: string;
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (images.length < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [images.length, intervalMs, paused]);

  const first = images[0];
  if (!first) return null;
  if (images.length === 1) {
    return (
      <img
        src={first.src}
        alt={first.alt}
        loading="lazy"
        decoding="async"
        className={className}
      />
    );
  }
  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((img, i) => (
        <img
          key={img.src}
          src={img.src}
          alt={i === index ? img.alt : ""}
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
          aria-hidden={i !== index}
          className={cn(
            className,
            "absolute inset-0 transition-opacity duration-700",
            i === index ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        />
      ))}
    </div>
  );
}
