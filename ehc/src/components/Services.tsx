import { useState, useRef, useEffect } from 'react'
import type { CSSProperties } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { SERVICES } from '../lib/data'
import Reveal from './Reveal'

const SERVICE_THEMES = [
  { color: '#ef5d61', icon: '⌁', label: 'Offensive' },
  { color: '#e8efef', icon: '</>', label: 'Application' },
  { color: '#4d8fff', icon: '◉', label: 'Wireless' },
  { color: '#69d99a', icon: '⌁', label: 'Human layer' },
  { color: '#ffb020', icon: '✓', label: 'Governance' },
  { color: '#c7844b', icon: '◇', label: 'Response' },
]

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0)
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLDivElement>(null)
  const isTargetingSection = useRef(false)
  const isCooldown = useRef(false)

  // Captura el evento del ratón para alternar la card activa
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isTargetingSection.current) return

      const isScrollingDown = e.deltaY > 0
      const isScrollingUp = e.deltaY < 0

      // Si estamos en la primera card y el usuario sube, permite el scroll normal de la web
      if (activeIndex === 0 && isScrollingUp) return
      // Si estamos en la última card y el usuario baja, permite el scroll normal de la web
      if (activeIndex === SERVICES.length - 1 && isScrollingDown) return

      e.preventDefault()

      if (isCooldown.current) return
      isCooldown.current = true

      if (isScrollingDown) {
        setActiveIndex((prev) => Math.min(prev + 1, SERVICES.length - 1))
      } else if (isScrollingUp) {
        setActiveIndex((prev) => Math.max(prev - 1, 0))
      }

      setTimeout(() => {
        isCooldown.current = false
      }, 300)
    }

    const node = sectionRef.current
    if (node) {
      node.addEventListener('wheel', handleWheel, { passive: false })
    }

    return () => {
      if (node) {
        node.removeEventListener('wheel', handleWheel)
      }
    }
  }, [activeIndex])

  return (
    <section
      ref={sectionRef}
      id="servicios"
      onMouseEnter={() => (isTargetingSection.current = true)}
      onMouseLeave={() => (isTargetingSection.current = false)}
      className="relative scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#102129_0%,#071117_30%)] py-28 md:py-40"
    >
       
      <div className="relative mx-auto w-full max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="section-eyebrow">/ 02 · Servicios</p>
          <div className="mt-7 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h2 className="section-title">La evidencia antes que la intuición.</h2>
              <p className="mt-6 max-w-[57ch] text-lg leading-8 text-mist">
                Una capa de seguridad por cada superficie expuesta. Selecciona un módulo para explorar cómo trabajamos.
              </p>
            </div>
            <p className="font-code text-[10px] tracking-[.16em] text-fog uppercase">
              {String(activeIndex + 1).padStart(2, '0')} / {String(SERVICES.length).padStart(2, '0')}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="service-tabs mt-12" role="tablist" aria-label="Módulos de servicio">
            {SERVICES.map((service, index) => {
              const theme = SERVICE_THEMES[index]
              const active = activeIndex === index
              return (
                <button
                  key={service.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls={`service-card-${service.id}`}
                  onClick={() => setActiveIndex(index)}
                  className="service-tab"
                  style={{ '--service-color': theme.color } as CSSProperties}
                >
                  <span className="service-tab__icon" aria-hidden="true">{theme.icon}</span>
                  <span className="service-tab__label">{service.tab}</span>
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Añadimos un margen superior alto (pt-16) para acomodar los bordes que asoman arriba */}
        <div className="service-deck relative mt-7 pt-16 min-h-[520px]" aria-live="polite">
          {SERVICES.map((service, index) => {
            const theme = SERVICE_THEMES[index]
            const active = activeIndex === index
            
            // Distancia con respecto a la card activa
            const isPassed = index < activeIndex
            const isFuture = index > activeIndex
            const depth = index - activeIndex

            let y = 0
            let scale = 1
            let opacity = 1

            if (isPassed) {
              // Cards pasadas: caen o se ocultan abajo
              y = 50
              opacity = 0
            } else if (isFuture) {
              // Cards siguientes: se desplazan HACIA ARRIBA (-y) para asomar por la parte superior
              y = -depth * 18 // Ajusta los píxeles según qué tanto espacio quieras ver arriba
              scale = Math.max(0.92, 1 - depth * 0.015)
              opacity = Math.max(0.35, 1 - depth * 0.12)
            }

            return (
              <motion.article
                key={service.id}
                id={`service-card-${service.id}`}
                role="tabpanel"
                aria-hidden={!active}
                className="service-deck__card absolute inset-x-0 bottom-0 origin-bottom"
                style={{
                  '--service-color': theme.color,
                  // Las cards siguientes se sitúan detrás en el orden de capas (zIndex)
                  zIndex: active ? 30 : SERVICES.length - depth,
                  pointerEvents: active ? 'auto' : 'none',
                } as CSSProperties}
                animate={{
                  y,
                  opacity,
                  scale,
                }}
                transition={{
                  type: 'spring',
                  stiffness: reduceMotion ? 1000 : 220,
                  damping: reduceMotion ? 100 : 24,
                  mass: 0.72,
                }}
              >
                <div className="relative z-10 flex h-full flex-col justify-between p-7 sm:p-10 md:p-12">
                  <div className="flex items-start justify-between gap-8">
                    <div>
                      <p className="font-code text-[10px] tracking-[.18em] text-fog uppercase">
                        {service.num} · {theme.label}
                      </p>
                      <h3 className="mt-5 max-w-[18ch] font-display text-[clamp(2rem,4vw,4.25rem)] leading-[.92] tracking-[-.065em] text-white">
                        {service.title}
                      </h3>
                    </div>
                    <span
                      className="grid size-12 shrink-0 place-items-center border border-current text-xl"
                      style={{ color: theme.color }}
                      aria-hidden="true"
                    >
                      {theme.icon}
                    </span>
                  </div>
                  <div className="mt-9 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                    <p className="max-w-[70ch] text-base leading-7 text-mist md:text-lg">{service.desc}</p>
                    <a href="#contacto" className="cta-primary w-fit" style={{ backgroundColor: theme.color }}>
                      Solicitar evaluación <span className="cta-primary__arrow">↗</span>
                    </a>
                  </div>
                  <ul className="mt-8 flex list-none flex-wrap gap-2 p-0">
                    {service.meta.map((tag) => (
                      <li key={tag} className="border border-white/12 px-3 py-1.5 font-code text-[10px] tracking-[.12em] text-mist uppercase">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}