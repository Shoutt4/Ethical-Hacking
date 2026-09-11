import { Reveal } from './Reveal';
import { StaggerTestimonials } from './ui/stagger-testimonials';

export function Features(){
  return (
    <section id="caracteristicas" className="relative overflow-hidden bg-white py-20 md:py-28">
      {/* fondo claro sutil para elevación sin competir con cards */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_20%_8%,rgba(14,165,233,0.06),transparent_55%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_90%_85%,rgba(14,165,233,0.04),transparent_55%)]" />

      <div className="relative mx-auto max-w-[1180px] px-5 md:px-8">
        <Reveal>
          <p className="eyebrow !text-sky-600"><span className="!bg-sky-500"></span> LA PLATAFORMA</p>
          <h2 className="!text-slate-900">Una plataforma diseñada<br/><em className="!text-sky-600">para reducir el riesgo.</em></h2>
          <p className="mt-4 max-w-[640px] text-[15px] leading-7 text-slate-600">
            De tarjetas estáticas a carrusel escalonado — misma información, experiencia moderna, táctil y memorable.
          </p>
        </Reveal>

        <div className="mt-10 md:mt-12">
          <StaggerTestimonials />
        </div>
      </div>
    </section>
  )
}
