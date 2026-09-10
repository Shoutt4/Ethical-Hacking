import Reveal from "./Reveal";
import AsciiDots from "./AsciiDots";

export default function Hero() {
  return (
    <section
      id="top"
      className="hero-bg relative grid min-h-[100dvh] items-center overflow-hidden pt-6"
    >
      <AsciiDots
        className="ascii-section-bg"
        gridSize={60}
        textColor="182, 229, 55"
      />
      <div className="hero-line" aria-hidden="true" />

      <div className="relative z-[1] mx-auto flex min-h-[100dvh] w-full max-w-4xl flex-col items-center justify-center px-5 py-32 text-center md:px-8 md:py-48">
        <Reveal>
          <p className="section-eyebrow !justify-center">
            Consultoría de ciberseguridad · LATAM
          </p>
        </Reveal>

        <Reveal className="reveal-delay-1">
          <h1 className="mt-10 font-display text-[clamp(2.8rem,6.2vw,5.75rem)] font-medium leading-[0.88] tracking-[-0.04em] text-white text-balance">
            Probamos tus defensas antes que un <span className="text-volt">atacante.</span>
          </h1>
        </Reveal>

        <Reveal className="reveal-delay-2">
          <p className="mx-auto mt-10 max-w-[48ch] text-pretty text-[1.05rem] leading-8 text-mist md:text-[1.15rem] md:leading-8">
            Evaluamos, explotamos de forma controlada y priorizamos cada brecha para que decidas y actúes con evidencia.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a href="#contacto" className="cta-primary">
              Solicitar evaluación <span className="cta-primary__arrow">↗</span>
            </a>
            <a href="#servicios" className="cta-secondary">
              Explorar servicios
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}