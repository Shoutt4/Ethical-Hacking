import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { COURSES } from '../lib/data'
import Reveal from './Reveal'

export default function Training() {
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  const updateNav = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setCanPrev(el.scrollLeft > 8)
    setCanNext(el.scrollLeft < max - 8)
  }, [])

  useEffect(() => {
    updateNav()
    window.addEventListener('resize', updateNav)
    return () => window.removeEventListener('resize', updateNav)
  }, [updateNav])

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const first = el.querySelector<HTMLElement>('[data-slide]')
    const step = first ? first.offsetWidth + 24 : el.clientWidth * 0.8
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: dir * step, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <section id="training" className="scroll-mt-24 border-t border-edge py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-code text-xs tracking-[3px] text-volt-light">// TRAINING</p>
              <h2 className="mt-3 font-display text-[clamp(30px,4.5vw,54px)] leading-[1.02] tracking-wide text-white uppercase">
                Capacitate con nosotros
              </h2>
              <p className="mt-4 max-w-xl font-josef text-lg font-light text-mist">
                Cursos oficiales y certificaciones propias, por profesionales capacitados.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scroll(-1)}
                disabled={!canPrev}
                aria-label="Curso anterior"
                className="flex size-10 items-center justify-center border border-edge-strong text-white transition-all duration-300 hover:border-volt hover:text-volt-light disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-edge-strong disabled:hover:text-white"
              >
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scroll(1)}
                disabled={!canNext}
                aria-label="Curso siguiente"
                className="flex size-10 items-center justify-center border border-edge-strong text-white transition-all duration-300 hover:border-volt hover:text-volt-light disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-edge-strong disabled:hover:text-white"
              >
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </Reveal>

        <div className="mt-10">
          <div
            ref={trackRef}
            onScroll={updateNav}
            role="region"
            aria-roledescription="carrusel"
            aria-label="Cursos y certificaciones disponibles"
            className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pt-2 pb-4 md:-mx-8 md:px-8"
          >
            {COURSES.map((course, i) => (
              <article
                key={`${course.code}-${i}`}
                data-slide
                className={`training-card group relative flex w-[85%] shrink-0 snap-start flex-col overflow-hidden border border-edge p-7 sm:w-auto sm:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)] ${
                  i === COURSES.length - 1 ? 'md:border-dashed' : ''
                }`}
              >
                <div className="relative -mx-7 -mt-7 mb-6 h-48 w-[calc(100%+3.5rem)] overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{
                      maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]/80 pointer-events-none" />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="mb-6 flex items-baseline gap-3 font-code">
                      <span className="text-[44px] leading-none font-medium text-white transition-colors duration-300 group-hover:text-volt">
                        {course.day}
                      </span>
                      <span className="text-sm tracking-[3px] text-volt">{course.month}</span>
                    </div>
                    <h3 className="mb-2 font-display text-xl leading-snug tracking-wide text-white uppercase transition-colors duration-300 group-hover:text-volt-light">
                      {course.title}
                    </h3>
                    <p className="mb-1 font-code text-xs tracking-wide text-fog">{course.modality}</p>
                    <p className="font-code text-xs tracking-wide text-fog">Duración: {course.hours}</p>
                  </div>

                  <a
                    href="#contacto"
                    className="mt-6 inline-flex items-center justify-center gap-2.5 border border-edge-strong px-4 py-3 text-xs font-bold tracking-[1.5px] text-white uppercase no-underline transition-all duration-300 hover:border-volt hover:text-volt-light hover:shadow-[0_0_15px_rgba(182,229,55,.08)]"
                  >
                    Inscribirme · {course.code}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
