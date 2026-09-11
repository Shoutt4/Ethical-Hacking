import { MILESTONES } from '../lib/data'
import Reveal from './Reveal'

export default function About() {
  return (
    <section id="nosotros" className="relative scroll-mt-24 overflow-hidden border-t border-edge bg-coal py-20 md:py-24">
      {/* grid sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(182,229,55,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(182,229,55,0.5) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />
      <div aria-hidden className="pointer-events-none absolute -top-24 right-0 h-[420px] w-[600px] rounded-full bg-volt/5 blur-[90px]" />

      <div className="relative mx-auto w-full max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="font-code text-xs tracking-[3px] text-volt-light">// NOSOTROS</p>
            <h2 className="mt-3 font-display text-[clamp(30px,4.2vw,50px)] leading-[1.02] tracking-wide text-white uppercase">
              25+ años de experiencia<br />
              <span className="text-volt">como atacantes</span>
            </h2>
          </Reveal>
        </div>

        <ol className="relative mt-12 md:mt-16">
          {/* línea horizontal continua: del centro del 1er al centro del 3er marcador */}
          <span
            aria-hidden
            className="absolute top-[6px] right-[calc(33.333%-7px)] left-[7px] hidden h-[1.5px] md:block"
            style={{
              background: 'linear-gradient(90deg, rgba(182,229,55,0.35), rgba(182,229,55,0.35) 88%, transparent)',
            }}
          />
          {/* línea vertical continua en móvil */}
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-[6px] w-[1.5px] md:hidden"
            style={{
              background: 'linear-gradient(180deg, rgba(182,229,55,0.35), rgba(182,229,55,0.35) 88%, transparent)',
            }}
          />

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
            {MILESTONES.map((m, i) => (
              <li key={m.id} className="group relative cursor-default pl-10 md:pl-0">
                {/* marcador rombo sobre la línea */}
                <span
                  aria-hidden
                  className="timeline-node absolute top-[2px] left-0 z-10 block size-3.5 rotate-45 border-[1.5px] border-volt bg-coal shadow-[0_0_0_6px_rgba(182,229,55,0.10),0_0_14px_rgba(182,229,55,0.35)] animate-pulse transition-all duration-300 group-hover:scale-110 group-hover:border-volt group-hover:bg-volt group-hover:shadow-[0_0_0_8px_rgba(182,229,55,0.18),0_0_22px_rgba(182,229,55,0.6)] md:static md:mb-7"
                  style={{ animationDuration: '3s' }}
                />

                <Reveal delay={i * 0.12}>
                  <p className="timeline-year mb-2 font-code text-xs tracking-[3px] text-volt transition-colors duration-300 group-hover:text-volt-light">
                    {m.year}
                  </p>

                  <h3 className="mb-2 font-display text-[1.05rem] leading-tight tracking-wide text-white uppercase transition-colors duration-300 group-hover:text-volt">
                    {m.title}
                  </h3>

                  {/* línea decorativa que crece en hover */}
                  <span className="mb-3 block h-px w-8 bg-volt/30 transition-all duration-300 group-hover:w-12 group-hover:bg-volt/60" aria-hidden />

                  <p className="max-w-md text-[0.84rem] leading-[1.65] text-mist/90 transition-colors duration-300 group-hover:text-mist">
                    {m.text}
                  </p>
                </Reveal>
              </li>
            ))}
          </div>
        </ol>
      </div>
    </section>
  )
}