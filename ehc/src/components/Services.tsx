import { useState } from 'react'
import { SERVICES } from '../lib/data'
import Reveal from './Reveal'

export default function Services() {
  const [selected, setSelected] = useState(0)
  const service = SERVICES[selected]

  return <section id="servicios" className="services-light section-space scroll-mt-24">
    <div className="site-container grid gap-14 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
      <Reveal>
        <p className="section-kicker">Servicios</p>
        <h2 className="light-title">Seguridad que se entiende y se puede ejecutar.</h2>
        <p className="light-copy">Evaluaciones técnicas, consultoría y respuesta con un alcance claro, evidencia concreta y recomendaciones accionables.</p>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="service-selector" role="tablist" aria-label="Servicios EHC">
          {SERVICES.map((item, index) => (
            <button
              key={item.id}
              id={`service-tab-${item.id}`}
              type="button"
              role="tab"
              aria-controls="service-panel"
              aria-selected={selected === index}
              onClick={() => setSelected(index)}
              className="service-selector__item"
            >
              <span>{item.num}</span>{item.tab}<i aria-hidden="true">→</i>
            </button>
          ))}
        </div>
        <article id="service-panel" role="tabpanel" aria-labelledby={`service-tab-${service.id}`} className="service-focus" aria-live="polite">
          <div className="service-focus__copy">
            <p className="service-focus__number">{service.num}</p>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
            <a href="#contacto" className="button-text">Solicitar una evaluación <span aria-hidden="true">→</span></a>
          </div>
          <ul aria-label={`Alcance de ${service.title}`}>
            {service.meta.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>)}
          </ul>
        </article>
      </Reveal>
    </div>
  </section>
}
