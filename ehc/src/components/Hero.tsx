import Reveal from './Reveal'
import logo from '../assets/logo.svg'

const STATS = [
  { label: 'Fundados', value: '2001' },
  { label: 'Presencia', value: '7 países' },
  { label: 'Experiencia', value: '25+ años' },
]

export default function Hero() {
  return (
    <section id="top" className="hero-light scroll-mt-24">
      <div className="hero-orbit" aria-hidden="true" />
      <div className="hero-orbit hero-orbit--inner" aria-hidden="true" />
      <div className="hero-layout">
        <div className="hero-copy">
          <Reveal>
            <img src={logo} alt="Ethical Hacking Consultores" className="hero-brand" />
          </Reveal>
          <Reveal delay={0.08}>
            <p className="section-kicker">Ciberseguridad con evidencia</p>
            <h1>Probamos tus defensas antes que un atacante.</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="hero-description">
              Pentesting, inteligencia y consultoría para convertir el riesgo técnico en decisiones claras.
            </p>
            <div className="hero-actions">
              <a href="#contacto" className="button-primary">Solicitar evaluación <span aria-hidden="true">→</span></a>
              <a href="#servicios" className="button-text">Explorar servicios <span aria-hidden="true">→</span></a>
            </div>
          </Reveal>
        </div>
        <Reveal className="hero-proof" delay={0.18}>
          <p>Un enfoque técnico y ético para proteger infraestructura, aplicaciones y personas.</p>
          <span>Evaluar · Priorizar · Resolver</span>
        </Reveal>
      </div>
      <dl className="hero-stats">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <dt>{stat.label}</dt>
            <dd>{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
