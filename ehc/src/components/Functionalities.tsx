import { Reveal } from "./Reveal";
import { FeatureBento } from "./Capabilities/FeatureBento";

export function Functionalities() {
  return (
    <section
      id="funcionalidades"
      className="relative overflow-hidden bg-[#f7f9fc] py-20 md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(14,165,233,0.05),transparent_55%)]"
      />
      <div className="relative mx-auto w-full max-w-[1180px] px-5 md:px-8">
        <Reveal>
          <h2 className="!text-slate-900">
            Capacidades para ver
            <br />
            <em className="!text-sky-600">el riesgo antes que otros.</em>
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-600">
            Una misma plataforma para reconocer activos, analizar exposición y convertir hallazgos en decisiones de seguridad accionables.
          </p>
        </Reveal>
        <FeatureBento />
      </div>
    </section>
  );
}
