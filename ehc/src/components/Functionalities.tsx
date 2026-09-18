import { Reveal } from "./Reveal";
import { FeatureBento } from "./Capabilities/FeatureBento";

export function Functionalities() {
  return (
    <section
      id="funcionalidades"
      className="relative overflow-hidden bg-[#f7f9fc] py-20 md:py-28"
    >
      {/* luz sutil superior para cohesionar con la sección de Características */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(14,165,233,0.05),transparent_55%)]"
      />
      <div className="relative mx-auto w-full max-w-[1180px] px-5 md:px-8">
        <Reveal>
          <p className="eyebrow !text-sky-600">
            <span className="!bg-sky-500"></span> CAPACIDADES
          </p>
          <h2 className="!text-slate-900">
            Todo lo que necesitas para
            <br />
            <em className="!text-sky-600">anticiparte a las amenazas.</em>
          </h2>
        </Reveal>
        <FeatureBento />
      </div>
    </section>
  );
}