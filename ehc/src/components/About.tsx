import { useRef } from 'react'
import { MILESTONES } from '../lib/data'
import Reveal from './Reveal'

export default function About() {
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: 'smooth' })
  }

  return (
    <section id="nosotros" className="scroll-mt-24 border-t border-edge bg-coal py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        {/* CABECERA */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="font-code text-xs tracking-[3px] text-volt-light">// NOSOTROS</p>
            <h2 className="mt-3 font-display text-[clamp(30px,4.5vw,54px)] leading-[1.02] tracking-wide text-white uppercase">
              25+ años de experiencia<br />
              <span className="text-volt">como atacantes</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-lg leading-relaxed font-light text-mist">
              Somos consultores certificados, investigadores y ex-bug hunters.
              Nuestra metodología combina frameworks reconocidos con tácticas
              reales de adversarios para entregarte hallazgos accionables.
            </p>
          </Reveal>
        </div>

        {/* Controles (solo desktop) */}
        <div className="mt-10 hidden items-center gap-2 md:flex md:justify-end">
          <button type="button" onClick={() => scrollBy(-1)} aria-label="Hito anterior"
            className="grid size-11 place-items-center border border-edge text-fog transition-colors hover:border-volt hover:text-volt">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" onClick={() => scrollBy(1)} aria-label="Hito siguiente"
            className="grid size-11 place-items-center border border-edge text-fog transition-colors hover:border-volt hover:text-volt">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Desktop: línea de tiempo horizontal (años + texto, sin fotos) */}
        <div className="relative mt-8 hidden md:block">
          <span aria-hidden="true" className="absolute top-[calc(50%+0.5rem)] right-0 left-0 h-px bg-edge" />
          <div ref={trackRef} className="timeline-track relative flex gap-6 overflow-x-auto pb-4">
            {MILESTONES.map((m) => (
              <article key={m.id} className="timeline-item relative w-[min(22rem,80vw)] shrink-0">
                <span aria-hidden="true" className="timeline-node mx-4 mb-6 block size-4 rotate-45 border-2 border-volt bg-coal" />
                <p className="timeline-year mb-3 font-code text-sm tracking-[3px] text-volt">{m.year}</p>
                <h3 className="mb-2 font-display text-xl tracking-wide text-white uppercase">{m.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-mist">{m.text}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Mobile: línea de tiempo vertical (años + texto, sin fotos) */}
        <ol className="relative mt-10 m-0 flex list-none flex-col gap-8 p-0 before:absolute before:top-2 before:bottom-2 before:left-[9px] before:w-px before:bg-edge md:hidden">
          {MILESTONES.map((m) => (
            <li key={m.id} className="relative pl-12">
              <span aria-hidden="true" className="absolute top-0 left-0 size-5 rotate-45 border-2 border-volt bg-coal" />
              <p className="font-code text-sm tracking-[3px] text-volt">{m.year}</p>
              <h3 className="mt-1 font-display text-xl tracking-wide text-white uppercase">{m.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-mist">{m.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}