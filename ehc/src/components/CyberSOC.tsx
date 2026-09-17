import { Reveal } from './Reveal'
import cybersocSoftware from '../assets/pentest365/cybersoc/cybersoc-1.png'
import cybersocInstall from '../assets/pentest365/cybersoc/cybersoc-2.png'

export function CyberSOC() {
  return (
    <section id="cybersoc" className="cybersoc">
      <div className="cybersoc-inner">
        <div className="cybersoc-grid">
          <div className="cybersoc-copy">
            <Reveal>
              <p className="eyebrow">
                <span aria-hidden="true"></span> CYBERSOC <span aria-hidden="true"></span>
              </p>
              <h2>
                Soporte de nuestro <em>Cyber-SOC</em>
              </h2>
              <p className="cybersoc-lead">Protección que continúa después del análisis.</p>
              <p className="cybersoc-p">
                Los escáneres de vulnerabilidades a menudo producen una larga lista de factores de
                riesgo, y los administradores rara vez pueden resolver todos los riesgos
                identificados de forma inmediata y efectiva; simplemente requiere demasiados
                recursos para evaluar y abordar cada elemento.
              </p>
              <p className="cybersoc-p">
                La licencia de P365 trae una licencia gratuita de Cyber-SOC donde un equipo de
                profesionales en Seguridad te apoyarán en la remediación de tus riesgos y
                vulnerabilidades.
              </p>
              <a href="#cotizacion" className="button" aria-label="PRUEBA GRATIS">
                PRUEBA GRATIS <b>→</b>
              </a>
            </Reveal>
          </div>

          <div className="cybersoc-media">
            <Reveal delay={0.12}>
              <figure className="soc-shot">
                <div className="soc-shot-bar" aria-hidden="true">
                  <span className="soc-dot r"></span>
                  <span className="soc-dot y"></span>
                  <span className="soc-dot g"></span>
                  <em>Cybersoc Software</em>
                  <b>Sec Ops</b>
                </div>
                <img
                  src={cybersocSoftware}
                  alt="Cybersoc Software"
                  width={1200}
                  height={956}
                  draggable={false}
                />
              </figure>
            </Reveal>
            <Reveal delay={0.22}>
              <figure className="soc-photo">
                <img
                  src={cybersocInstall}
                  alt="instalaciones de Cybersoc"
                  width={982}
                  height={665}
                  draggable={false}
                />
                <figcaption className="soc-photo-label">instalaciones de Cybersoc</figcaption>
              </figure>
            </Reveal>
          </div>
        </div>

        <Reveal className="cybersoc-values">
          <div className="cv-item">
            <span className="cv-num">01</span>
            <h4>Identificación</h4>
            <p>Los escáneres detectan los factores de riesgo.</p>
          </div>
          <div className="cv-item">
            <span className="cv-num">02</span>
            <h4>Priorización</h4>
            <p>Ayuda a evaluar los riesgos identificados.</p>
          </div>
          <div className="cv-item">
            <span className="cv-num">03</span>
            <h4>Remediación</h4>
            <p>Apoyo profesional para abordar vulnerabilidades.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}