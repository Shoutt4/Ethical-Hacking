import type { CSSProperties } from 'react'
import { SERVICES } from '../lib/data'
import Reveal from './Reveal'

const SERVICE_THEMES = [
  { color: '#ef5d61', icon: '⌁', label: 'Ofensiva' },
  { color: '#e8efef', icon: '</>', label: 'BANCARIA' },
  { color: '#4d8fff', icon: '◉', label: 'RESPUESTA' },
  { color: '#69d99a', icon: '⌁', label: 'LEGAL' },
  { color: '#ffb020', icon: '✓', label: 'GOBERNANZA' },
  { color: '#c7844b', icon: '◇', label: 'INTELIGENCIA' },
]

export default function Services() {
  return (
    <section
      id="servicios"
      className="relative scroll-mt-24 bg-[linear-gradient(180deg,#102129_0%,#071117_30%)] py-28 md:py-40"
    >

      <div className="relative mx-auto w-full max-w-[98rem] px-4 sm:px-6 md:px-8">
        <Reveal>
          <p className="section-eyebrow">/ 02 · Servicios</p>
          <div className="mt-7 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h2 className="section-title">La evidencia antes que la intuición.</h2>
              <p className="mt-6 max-w-[57ch] text-lg leading-8 text-mist">
                Una capa de seguridad por cada superficie expuesta. Selecciona un módulo para explorar cómo trabajamos.
              </p>
            </div>
          </div>
        </Reveal>

  
        <Reveal delay={0.12}>
          <div className="service-tabs sticky top-6 z-50 mt-12 bg-[#071117]/80 backdrop-blur-md py-3 rounded-xl border border-white/10" role="tablist">
            {SERVICES.map((service, index) => {
              const theme = SERVICE_THEMES[index] || SERVICE_THEMES[0]
              return (
                <a
                  key={service.id}
                  href={`#service-card-${service.id}`}
                  className="service-tab inline-flex items-center gap-2 px-4 py-2 text-sm text-mist hover:text-white transition-colors"
                  style={{ '--service-color': theme.color } as CSSProperties}
                >
                  <span className="service-tab__icon" aria-hidden="true">{theme.icon}</span>
                  <span className="service-tab__label">{service.tab}</span>
                </a>
              )
            })}
          </div>
        </Reveal>


        <div className="mt-12 flex flex-col gap-12 pb-24">
          {SERVICES.map((service, index) => {
            const theme = SERVICE_THEMES[index] || SERVICE_THEMES[0]
            
           
            const stickyTopSpace = 100 + index * 42

            return (
              <article
                key={service.id}
                id={`service-card-${service.id}`}
                className="sticky rounded-2xl border border-white/10 bg-[#0b171d] shadow-2xl overflow-hidden transition-all duration-300"
                style={{
                  top: `${stickyTopSpace}px`,
                  zIndex: index + 10,
                  '--service-color': theme.color,
                } as CSSProperties}
              >
              
                <div 
                  className="flex items-center justify-between px-8 py-3 border-b border-white/10 bg-white/[0.02]"
                  style={{ borderTop: `3px solid ${theme.color}` }}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-code text-xs text-white/60 uppercase">
                      {service.num} · {theme.label}
                    </span>
                    <span className="text-sm font-semibold text-white tracking-wide">
                      {service.tab}
                    </span>
                  </div>
                  <span style={{ color: theme.color }}>{theme.icon}</span>
                </div>

             
                <div className="relative z-10 flex flex-col justify-between p-7 sm:p-10 md:p-14 min-h-[420px]">
                  <div className="flex items-start justify-between gap-8">
                    <div>
                      <h3 className="max-w-[28ch] font-display text-[clamp(1.75rem,3.5vw,3.5rem)] leading-[.95] tracking-[-.05em] text-white">
                        {service.title}
                      </h3>
                    </div>
                    <span
                      className="grid size-12 shrink-0 place-items-center rounded-lg border border-current text-xl shadow-lg"
                      style={{ color: theme.color, borderColor: `${theme.color}40` }}
                      aria-hidden="true"
                    >
                      {theme.icon}
                    </span>
                  </div>

                  <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                    <p className="max-w-[85ch] text-base leading-7 text-mist md:text-lg">{service.desc}</p>
                    <a 
                      href="#contacto" 
                      className="cta-primary w-fit transition-transform hover:scale-105" 
                      style={{ backgroundColor: theme.color }}
                    >
                      Solicitar evaluación <span className="cta-primary__arrow">↗</span>
                    </a>
                  </div>

                  <ul className="mt-8 flex list-none flex-wrap gap-2 p-0">
                    {service.meta.map((tag) => (
                      <li 
                        key={tag} 
                        className="rounded border border-white/10 bg-white/5 px-3 py-1.5 font-code text-[10px] tracking-[.12em] text-mist uppercase"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}