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

        <div className="relative mt-10">
          {/* línea con degradado 1.5px */}
          <span
            aria-hidden
            className="absolute left-0 right-0 hidden h-[1.5px] md:block"
            style={{
              top: '14px',
              background: 'linear-gradient(90deg, transparent, rgba(182,229,55,0.35) 12%, rgba(182,229,55,0.35) 88%, transparent)',
            }}
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 md:gap-5 lg:gap-5">
            {MILESTONES.map((m) => (
              <article
                key={m.id}
                className="group relative flex flex-col rounded-xl border border-transparent p-4 -m-4 transition-all duration-300 hover:-translate-y-1.5 hover:border-volt/20 hover:bg-white/[0.03] hover:shadow-[0_12px_32px_rgba(0,0,0,0.35),0_0_0_1px_rgba(182,229,55,0.08)] cursor-default"
              >
                {/* nodo con glow + pulse + hover scale */}
                <span
                  aria-hidden
                  className="timeline-node relative z-10 mb-5 block size-3.5 rotate-45 border-[1.5px] border-volt bg-coal shadow-[0_0_0_6px_rgba(182,229,55,0.10),0_0_14px_rgba(182,229,55,0.35)] animate-pulse transition-all duration-300 group-hover:scale-110 group-hover:rotate-[45deg] group-hover:border-volt group-hover:shadow-[0_0_0_8px_rgba(182,229,55,0.18),0_0_22px_rgba(182,229,55,0.6)] group-hover:bg-volt"
                  style={{ animationDuration: '3s' }}
                />

                <p className="timeline-year mb-2 font-code text-xs tracking-[3px] text-volt transition-colors duration-300 group-hover:text-volt-light group-hover:tracking-[3.5px]">
                  {m.year}
                </p>

                <h3 className="mb-2 font-display text-[1.05rem] leading-tight tracking-wide text-white uppercase transition-colors duration-300 group-hover:text-volt">
                  {m.title}
                </h3>

                {/* barra sutil que crece en hover */}
                <span className="mb-3 block h-px w-8 bg-volt/30 transition-all duration-300 group-hover:w-12 group-hover:bg-volt/60" aria-hidden />

                <p className="text-[0.84rem] leading-[1.65] text-mist/90 transition-colors duration-300 group-hover:text-mist line-clamp-6">
                  {m.text}
                </p>

                {/* brillo inferior en hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-4 bottom-0 h-px bg-gradient-to-r from-transparent via-volt/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:via-volt/20"
                />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}