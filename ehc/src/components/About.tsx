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
    <section id="nosotros" className="about-section section-space scroll-mt-24">
      <div className="site-container">
        <div className="about-header">
          <Reveal>
            <p className="section-kicker">Nosotros</p>
            <h2>Experiencia ofensiva para proteger lo esencial.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="about-intro">
              Somos consultores certificados, investigadores y ex-bug hunters.
              Nuestra metodología combina frameworks reconocidos con tácticas
              reales de adversarios para entregarte hallazgos accionables.
            </p>
          </Reveal>
        </div>

        <div className="about-controls" aria-label="Navegación de trayectoria">
          <button type="button" onClick={() => scrollBy(-1)} aria-label="Hito anterior"
            className="icon-button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" onClick={() => scrollBy(1)} aria-label="Hito siguiente"
            className="icon-button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="timeline-wrap">
          <div ref={trackRef} className="timeline-track">
            {MILESTONES.map((m) => (
              <article key={m.id} className="timeline-item">
                <p className="timeline-year">{m.year}</p>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
