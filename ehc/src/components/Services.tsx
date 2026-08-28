import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { ACCENTS, SERVICES } from '../lib/data'
import Reveal from './Reveal'
import { Hex } from './Hex'

export default function Services() {
  const [activeId, setActiveId] = useState(SERVICES[0].id)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const rafRef = useRef(0)

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
    )
    cardRefs.current.forEach(card => card && io.observe(card))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const update = () => {
      rafRef.current = 0
      if (window.innerWidth < 901) {
        cardRefs.current.forEach(card => {
          if (card) card.style.transform = ''
        })
        return
      }
      const anchor = window.innerHeight * 0.42
      const tops = cardRefs.current.map(card => card?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY)
      cardRefs.current.forEach((card, i) => {
        if (!card) return
        let depth = 0
        for (let j = i + 1; j < tops.length; j++) {
          if (tops[j] <= anchor) depth++
        }
        const scale = Math.max(0.88, 1 - depth * 0.03)
        card.style.transform = `translateY(${depth * -8}px) scale(${scale})`
      })
    }

    const onScroll = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
    }
  }, [])

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="servicios" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="font-code text-xs tracking-[3px] text-volt-light">// SERVICIOS</p>
          <h2 className="mt-3 font-display text-[clamp(30px,4.5vw,54px)] leading-[1.02] tracking-wide text-white uppercase">
            Atacamos primero.
            <br />
            Tú duermes tranquilo.
          </h2>
          <p className="mt-4 max-w-xl font-josef text-lg font-light text-mist">
            Seis líneas de servicio ofensivas y defensivas, ejecutadas por consultores certificados con metodologías
            reconocidas.
          </p>
        </Reveal>

        <Reveal className="mt-10">
          <div className="flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Ir a servicio">
            {SERVICES.map(service => {
              const hex = ACCENTS[service.accent].hex
              const isActive = activeId === service.id
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => goTo(service.id)}
                  style={isActive ? { background: hex, borderColor: hex, color: '#0B0B0B' } : undefined}
                  className={`inline-flex shrink-0 cursor-pointer items-center gap-2.5 border px-4 py-2.5 text-[13px] font-bold tracking-wide whitespace-nowrap uppercase transition-colors duration-150 ${
                    isActive ? '' : 'border-edge text-mist hover:border-edge-strong hover:text-white'
                  }`}
                >
                  <i
                    className="size-2 rotate-45"
                    style={{ background: hex, opacity: isActive ? 1 : 0.55 }}
                    aria-hidden="true"
                  />
                  {service.tab}
                </button>
              )
            })}
          </div>
        </Reveal>

        <div className="mt-10 flex flex-col gap-7">
          {SERVICES.map((service, i) => {
            const accent = ACCENTS[service.accent]
            const vars = { '--ac': accent.hex, '--acd': accent.dim } as CSSProperties
            return (
              <article
                key={service.id}
                id={service.id}
                ref={el => {
                  cardRefs.current[i] = el
                }}
                style={{ ...vars, top: `calc(86px + ${i * 14}px)` }}
                tabIndex={-1}
                className="group scroll-mt-28 md:sticky md:will-change-transform"
              >
                <div
                  className="relative border border-transparent p-[1px]"
                  style={{ backgroundImage: `linear-gradient(180deg, ${accent.dim}, #050505 72%)` }}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-px border opacity-0 transition-opacity duration-300 group-hover:opacity-60"
                    style={{ borderColor: accent.hex }}
                  />
                  <div className="relative bg-[linear-gradient(180deg,#171717,#0e0e0e)] p-7 md:p-11">
                    <div className="mb-5 flex items-start justify-between">
                      <span className="font-code text-sm tracking-[2px] text-fog transition-colors duration-300 group-hover:text-(--ac)">
                        {service.num}
                      </span>
                      <Hex className="size-8 text-edge-strong transition-all duration-1000 ease-out group-hover:rotate-180 group-hover:text-(--ac)" />
                    </div>
                    <h3 className="mb-3.5 font-display text-[clamp(24px,3vw,34px)] tracking-wide text-white uppercase">
                      {service.title}
                    </h3>
                    <p className="mb-5 max-w-[62ch] text-[17px] leading-relaxed">{service.desc}</p>
                    <ul className="mb-7 flex list-none flex-wrap gap-2 p-0">
                      {service.meta.map(tag => (
                        <li
                          key={tag}
                          className="border border-edge px-2.5 py-1 font-code text-[11px] tracking-[2px] text-fog uppercase"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#contacto"
                      className="inline-block pb-0.5 text-[13px] font-bold tracking-[2px] uppercase transition-transform duration-200 hover:translate-x-1.5"
                      style={{ color: accent.hex, borderBottom: `1px solid ${accent.hex}` }}
                    >
                      Solicitar propuesta →
                    </a>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
