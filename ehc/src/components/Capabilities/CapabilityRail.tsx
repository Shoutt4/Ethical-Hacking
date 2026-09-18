import { useCallback, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { Capability } from "../../data/pentest365";
import { TileCard } from "./TileCard";

export function CapabilityRail({ caps }: { caps: Capability[] }) {
  const reduced = useReducedMotion();
  const railRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setHasOverflow(el.scrollWidth > el.clientWidth + 1);
    setCanLeft(el.scrollLeft > 2);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);

  const setRailRef = useCallback(
    (node: HTMLDivElement | null) => {
      railRef.current = node;
      observerRef.current?.disconnect();
      observerRef.current = null;
      if (!node) return;
      updateArrows();
      const ro = new ResizeObserver(() => updateArrows());
      ro.observe(node);
      observerRef.current = ro;
    },
    [updateArrows],
  );

  const step = () => {
    const el = railRef.current;
    if (!el) return 340;
    return Math.max(340, Math.round(el.clientWidth * 0.8));
  };

  const scrollBy = (dir: 1 | -1) =>
    railRef.current?.scrollBy({
      left: dir * step(),
      behavior: reduced ? "auto" : "smooth",
    });

  const arrow =
    "absolute top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-lg border border-[#e2e8f0] bg-white text-[15px] leading-none text-[#526178] shadow-sm transition hover:border-sky-300 hover:text-sky-600 disabled:opacity-40";

  return (
    <div className="relative">
      {hasOverflow && (
        <button
          type="button"
          aria-label="Capacidades anteriores"
          onClick={() => scrollBy(-1)}
          disabled={!canLeft}
          className={`${arrow} left-2`}
        >
          <span aria-hidden="true">←</span>
        </button>
      )}
      <div
        ref={setRailRef}
        onScroll={updateArrows}
        className="flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {caps.map((c, i) => (
          <TileCard
            key={c.title}
            cap={c}
            delay={0.05 + (i % 3) * 0.05}
            span="w-[280px] shrink-0 snap-start sm:w-[320px]"
          />
        ))}
      </div>
      {hasOverflow && (
        <button
          type="button"
          aria-label="Capacidades siguientes"
          onClick={() => scrollBy(1)}
          disabled={!canRight}
          className={`${arrow} right-2`}
        >
          <span aria-hidden="true">→</span>
        </button>
      )}
    </div>
  );
}