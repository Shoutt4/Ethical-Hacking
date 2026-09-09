import { useMemo } from "react";
import Reveal from "./Reveal";

const logoModules = import.meta.glob("/src/assets/black/*.png", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export default function Partners() {
  const logos = useMemo(() => {
    return Object.entries(logoModules)
      .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
      .map(([, src]) => src);
  }, []);

  const track = useMemo(() => {
    return [...logos, ...logos].map((src, index) => ({
      src,
      key: `${src}-${index}`,
    }));
  }, [logos]);

  if (logos.length === 0) return null;

  return (
    <section
      aria-label="Empresas que confían en nosotros"
      className="trust-clip relative scroll-mt-24 bg-white py-12 md:py-10"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-0.5 h-px bg-edge/30"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 pt-2 pb-1 md:px-8">
        <Reveal>
          <p className="section-eyebrow !text-[#789d20]">
            / Confianza
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,3.6vw,3.2rem)] leading-[.96] tracking-[-.045em] text-[#071117]">
            Empresas que confían
            <br className="sm:hidden" />{" "}
            <span className="text-[#789d20]">en nosotros</span>
          </h2>
        </Reveal>
      </div>

      <div
        className="relative mx-auto mt-8 w-full max-w-7xl overflow-hidden md:mt-1"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        }}
      >
        <div className="trust-track animate-marquee-slow">
          {track.map((item) => (
            <div
              key={item.key}
              className="trust-logo"
              title="Cliente EHC Group"
            >
              <img
                src={item.src}
                alt="Logo de empresa cliente"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}