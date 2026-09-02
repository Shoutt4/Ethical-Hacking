import Reveal from "./Reveal";
import AsciiDots from "./AsciiDots";
import logo from "../assets/logo.svg"; // Ajusta la ruta a tu carpeta assets

const STATS = [
  { label: "Fundados", value: "2001" },
  { label: "Alcance", value: "7 países" },
  { label: "Experiencia", value: "25+ años" },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="hero-bg relative grid min-h-[100dvh] items-center overflow-hidden pt-24"
    >
      <AsciiDots
        className="ascii-section-bg"
        gridSize={60}
        textColor="182, 229, 55"
      /> 
      <div className="hero-line" aria-hidden="true" />
      <div className="relative z-1 mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-20 md:px-8 lg:grid-cols-[.92fr_1.08fr] lg:gap-4">
        <div>
          <Reveal>
            <p className="section-eyebrow">
              Consultoría de ciberseguridad · LATAM
            </p>
          </Reveal>
          <Reveal className="reveal-delay-1">
            <h1 className="mt-7 font-display text-[clamp(3.5rem,7vw,7.2rem)] font-medium leading-[.87] tracking-[-.020em] text-white">
              Probamos tus defensas antes que un{" "}
              <span className="text-volt">atacante.</span>
            </h1>
          </Reveal>
          <Reveal className="reveal-delay-2">
            <p className="mt-7 max-w-[47ch] text-base leading-7 text-mist md:text-lg">
              Evaluamos, explotamos de forma controlada y priorizamos cada
              brecha para que puedas decidir y actuar con evidencia.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#contacto" className="cta-primary">
                Solicitar evaluación{" "}
                <span className="cta-primary__arrow">↗</span>
              </a>
              <a href="#servicios" className="cta-secondary">
                Explorar servicios
              </a>
            </div>
          </Reveal>
        </div>

        {/* Círculo con el logo superpuesto en el centro */}
        <Reveal className="relative hidden justify-self-end lg:block">
          <div className="relative flex items-center justify-center">
            <div
              className="perimeter"
              aria-label="Representación abstracta de un perímetro de seguridad"
            >
              <span className="perimeter-node" />
              <span className="perimeter-node" />
              <span className="perimeter-node" />
            </div>

            <img
              src={logo}
              alt="Logo"
              className="hero-logo pointer-events-none absolute inset-0 z-10 m-auto h-50 w-90 object-contain"
            />
          </div>
        </Reveal>
      </div>

      <dl className="relative z-1 mx-auto flex w-full max-w-7xl flex-wrap gap-x-12 gap-y-5 px-5 pb-9 md:px-8">
        {STATS.map((stat) => (
          <div key={stat.label} className="min-w-30 border-t border-edge pt-3">
            <dt className="font-code text-[10px] tracking-[.15em] text-fog uppercase">
              {stat.label}
            </dt>
            <dd className="mt-1 font-display text-2xl tracking-[-.05em] text-white">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
