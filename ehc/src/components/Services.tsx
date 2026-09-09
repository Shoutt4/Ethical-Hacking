import type { CSSProperties } from 'react'
import { SERVICES } from '../lib/data'
import Reveal from './Reveal'

const SERVICE_THEMES = [
  { color: '#ef5d61', icon: '⌁', label: 'Ofensiva' },
  { color: '#ccb9ff', icon: '</>', label: 'BANCARIA' },
  { color: '#4d8fff', icon: '◉', label: 'RESPUESTA' },
  { color: '#69d99a', icon: '⌁', label: 'LEGAL' },
  { color: '#ffb020', icon: '✓', label: 'GOBERNANZA' },
  { color: '#c7844b', icon: '◇', label: 'INTELIGENCIA' },
]

export default function Services() {
  return (
    <section
      id="servicios"
      className="relative scroll-mt-24 bg-[linear-gradient(135deg,#ffffff_0%,#eef3f4_55%,#dce8ec_100%)] py-28 md:py-40"
    >

      <div className="relative mx-auto w-full max-w-[74rem] px-2 sm:px-2 md:px-8">
        <Reveal>
          <p className="section-eyebrow">/ 02 · Servicios</p>
          <div className="mt-7 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h2 className="section-title">La evidencia antes que la intuición.</h2>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 flex flex-col gap-12 pb-0">
          {SERVICES.map((service, index) => {
            const theme = SERVICE_THEMES[index] || SERVICE_THEMES[0]
            
            const stickyTopSpace = 80 + index * 20

            return (
              <article
                key={service.id}
                id={`service-card-${service.id}`}
                className="sticky min-h-[220px] sm:h-[260px] md:h-[330px] rounded-2xl border border-[#cbd5d8] bg-[#eef2ef] shadow-2xl overflow-hidden transition-all duration-300"
                style={{
                  top: `${stickyTopSpace}px`,
                  zIndex: index + 10,
                  '--service-color': theme.color,
                } as CSSProperties}
              >
              
                <div 
                  className="flex items-center justify-between px-8 py-3 border-b border-[#cbd5d8] bg-white/[0.25]"
                  style={{ borderTop: `3px solid ${theme.color}` }}
                >
                  <div className="flex items-center gap-4">
                     
                    <span className="text-sm font-semibold text-[#52656b] tracking-wide">
                      {service.tab}
                    </span>
                  </div>
                  <span style={{ color: theme.color }}>{theme.icon}</span>
                </div>

             
                <div className="relative z-10 flex flex-col justify-between p-7 sm:p-10 md:p-8">
                  <div className="flex items-start justify-between gap-8">
                    <div>
                      <h3 className="max-w-[28ch] font-display text-[clamp(1.6rem,3vw,3rem)] leading-[.95] tracking-[-.05em] text-[#071117]">
  {service.title}
</h3>
                    </div>
                    <span
                      className="grid size-11 shrink-0 place-items-center rounded-lg border bg-white/50 text-lg shadow-sm"
                      style={{
  color: theme.color,
  borderColor: `${theme.color}55`,
}}
                      aria-hidden="true"
                    >
                      {theme.icon}
                    </span>
                  </div>

                  <div className="mt-6 grid border-y border-[#cbd5d8] lg:grid-cols-3">

  {/* BLOQUE 1 */}
  <div className="py-5 lg:pr-6">
    <span
      className="font-code text-[10px] tracking-[.15em] uppercase"
      style={{ color: theme.color }}
    >
      01 · ENFOQUE
    </span>

    <h4 className="mt-2 font-display text-lg text-[#102129]">
  Análisis especializado
</h4>

    <p className="mt-2 text-xs leading-5 text-[#52656b]">
      Evaluamos el entorno, identificamos riesgos y determinamos los puntos
      que requieren mayor atención.
    </p>
  </div>

  {/* BLOQUE 2 */}
  <div className="border-[#9fb1b6]/40 py-5 lg:border-l lg:px-6">
    <span
      className="font-code text-[10px] tracking-[.15em] uppercase"
      style={{ color: theme.color }}
    >
      02 · CAPACIDAD
    </span>

    <h4 className="mt-2 font-display text-lg text-[#52656b]">
      Inteligencia y evidencia
    </h4>

    <p className="mt-2 text-xs leading-5 text-[#52656b]">
      Combinamos metodología, tecnología y experiencia para obtener
      información accionable.
    </p>
  </div>

  {/* BLOQUE 3 */}
  <div className=" border-[#9fb1b6]/40 py-5 lg:border-l lg:pl-6">
    <span
      className="font-code text-[10px] tracking-[.15em] uppercase"
      style={{ color: theme.color }}
    >
      03 · RESULTADO
    </span>

    <h4 className="mt-2 font-display text-lg text-[#52656b]">
      Decisiones con evidencia
    </h4>

   <p className="mt-2 text-xs leading-5 text-[#52656b]">
      Priorizamos los hallazgos para que puedas actuar sobre los riesgos
      realmente importantes.
    </p>
  </div>

</div>

                 {/* <ul className="mt-8 flex list-none flex-wrap gap-2 p-0">
                    {service.meta.map((tag) => (
                      <li 
                        key={tag} 
                        className="rounded border border-white/10 bg-white/5 px-3 py-1.5 font-code text-[10px] tracking-[.12em] text-mist uppercase"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul> */}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}