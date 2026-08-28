import Reveal from './Reveal'

const STATS = [
  { label: 'Fundación', value: '2001' },
  { label: 'Cobertura', value: '7 países' },
  { label: 'Experiencia', value: '25+ años' },
]

export default function Hero() {
  return (
    <section id="top" className="hero-bg relative flex min-h-[calc(100svh-72px)] items-center overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-5 py-24 md:px-8 md:py-28">
        <Reveal>
          <p className="inline-flex items-center gap-2.5 border border-edge px-4 py-2 font-code text-xs tracking-[2px] text-mist uppercase">
            <span className="size-2 animate-pulse-dot bg-volt" />
            Desde 2001 · Holding en 7 países
          </p>
        </Reveal>

        <Reveal className="mt-7">
          <h1 className="font-display text-[clamp(44px,8.5vw,92px)] leading-[0.95] tracking-wide text-white uppercase">
            Ciberseguridad
            <br />
            <span className="text-volt">ofensiva</span> empresarial
          </h1>
        </Reveal>

        <Reveal className="mt-6">
          <p className="max-w-[560px] font-josef text-lg leading-relaxed font-light text-mist md:text-xl">
            Pensamos como atacantes para defender mejor a tu organización: evaluamos, explotamos controladamente y
            blindamos tu infraestructura, tus aplicaciones y tu gente.
          </p>
        </Reveal>

        <Reveal className="mt-8">
          <p className="font-code text-sm text-fog">
            $ whoami<span className="ml-1 inline-block h-4 w-2 animate-pulse-dot bg-volt" aria-hidden="true" />
            <span className="text-volt-light"> red-team-certified</span>
          </p>
        </Reveal>

        <Reveal className="mt-8">
          <div className="flex flex-wrap gap-4">
            <a href="#contacto" className="bg-volt px-6 py-[15px] text-[13px] font-bold tracking-[1.5px] text-ink uppercase no-underline transition-colors duration-150 hover:bg-volt-light active:translate-y-px">
              Solicitar evaluación
            </a>
            <a href="#servicios" className="px-2 py-[15px] text-[13px] font-bold tracking-[1.5px] text-volt-light uppercase no-underline transition-colors duration-150 hover:text-volt">
              Ver servicios →
            </a>
          </div>
        </Reveal>

        <Reveal className="mt-16 md:mt-20">
          <dl className="flex flex-wrap gap-x-12 gap-y-6 md:gap-x-16">
            {STATS.map(stat => (
              <div key={stat.label} className="min-w-[120px] border-t border-edge-strong pt-4">
                <dt className="font-code text-[11px] tracking-[2px] text-fog uppercase">{stat.label}</dt>
                <dd className="mt-1.5 font-display text-[clamp(30px,4vw,42px)] text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <p aria-hidden="true" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 font-code text-[11px] tracking-[4px] text-fog md:block">
        SCROLL ↓
      </p>
    </section>
  )
}
