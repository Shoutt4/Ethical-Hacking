import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

type CardSlideshowProps = {
  images: string[];
  alt: string;
  intervalMs?: number;
  className?: string;
};

export function CardSlideshow({
  images,
  alt,
  intervalMs = 3500,
  className = "",
}: CardSlideshowProps) {
  const validImages = images.filter(Boolean);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (validImages.length <= 1 || paused) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      return;
    }

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % validImages.length);
    }, intervalMs);

    return () => {
      window.clearInterval(id);
    };
  }, [validImages.length, intervalMs, paused]);

  useEffect(() => {
    if (index >= validImages.length && validImages.length > 0) {
      setIndex(0);
    }
  }, [index, validImages.length]);

  if (validImages.length === 0) {
    return (
      <div
        className={cn(
          "flex w-full items-center justify-center",
          "rounded-xl bg-slate-50",
          className,
        )}
      >
        <span className="text-xs text-slate-400">
          Imagen no disponible
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden",
        className,
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative flex h-full w-full items-center justify-center">
        {validImages.map((src, imageIndex) => (
          <img
            key={`${src}-${imageIndex}`}
            src={src}
            alt={imageIndex === index ? alt : ""}
            loading={imageIndex === 0 ? "eager" : "lazy"}
            decoding="async"
            aria-hidden={imageIndex !== index}
            className={cn(
              "absolute inset-0 m-auto",
              "max-h-full max-w-full",
              "object-contain",
              "transition-all duration-700 ease-out",
              imageIndex === index
                ? "scale-100 opacity-100"
                : "pointer-events-none scale-[0.98] opacity-0",
            )}
          />
        ))}
      </div>

      {validImages.length > 1 && (
        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/90 px-2.5 py-1.5 shadow-sm backdrop-blur-sm">
          {validImages.map((_, dotIndex) => (
            <button
              key={dotIndex}
              type="button"
              aria-label={`Ver imagen ${dotIndex + 1}`}
              onClick={() => setIndex(dotIndex)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                dotIndex === index
                  ? "w-5 bg-sky-500"
                  : "w-1.5 bg-slate-300 hover:bg-slate-400",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}