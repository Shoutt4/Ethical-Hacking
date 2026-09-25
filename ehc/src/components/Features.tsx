import { Reveal } from './Reveal';
import { StaggerTestimonials } from './ui/stagger-testimonials';

export function Features(){
  return (
    <section id="caracteristicas" className="relative overflow-hidden bg-slate-50 py-20 md:py-28">
      {/* fondo claro sutil para elevación sin competir con cards */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_20%_8%,rgba(14,165,233,0.06),transparent_55%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_90%_85%,rgba(14,165,233,0.04),transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Una plataforma diseñada <br className="hidden sm:block" />
              <span className="text-sky-600">para reducir el riesgo.</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 md:mt-12">
          <StaggerTestimonials />
        </div>
      </div>
    </section>
  )
}
