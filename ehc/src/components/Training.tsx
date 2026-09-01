import { CERTS, COURSES } from '../lib/data'
import Reveal from './Reveal'

export default function Training() {
  return (
    <section id="training" className="scroll-mt-24 border-t border-edge py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="font-code text-xs tracking-[3px] text-volt-light">// TRAINING</p>
          <h2 className="mt-3 font-display text-[clamp(30px,4.5vw,54px)] leading-[1.02] tracking-wide text-white uppercase">
            Formamos a los buenos
          </h2>
          <p className="mt-4 max-w-xl font-josef text-lg font-light text-mist">
            Cursos oficiales y certificaciones propias, dictados por los mismos consultores que atacan sistemas
            productivos todos los días.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {COURSES.map((course, i) => (
            <Reveal key={course.code} className={i > 0 ? 'reveal-delay-1' : ''}>
              <article
                className={`training-card group flex h-full flex-col border border-edge p-7 ${
                  i === COURSES.length - 1 ? 'md:border-dashed' : ''
                }`}
              >
                <div className="mb-6 flex items-baseline gap-3 font-code">
                  <span className="text-[44px] leading-none font-medium text-white transition-colors duration-300 group-hover:text-volt">{course.day}</span>
                  <span className="text-sm tracking-[3px] text-volt">{course.month}</span>
                </div>
                <h3 className="mb-2 font-display text-xl leading-snug tracking-wide text-white uppercase transition-colors duration-300 group-hover:text-volt-light">
                  {course.title}
                </h3>
                <p className="mb-1 font-code text-xs tracking-wide text-fog">{course.modality}</p>
                <p className="font-code text-xs tracking-wide text-fog">Duración: {course.hours}</p>
                <a
                  href="#contacto"
                  className="mt-6 inline-flex items-center justify-center gap-2.5 border border-edge-strong px-4 py-3 text-xs font-bold tracking-[1.5px] text-white uppercase no-underline transition-all duration-300 hover:border-volt hover:text-volt-light hover:shadow-[0_0_15px_rgba(182,229,55,.08)]"
                >
                  Inscribirme · {course.code}
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <div className="border-l-2 border-volt bg-coal px-6 py-5">
            <p className="mb-3 font-code text-[11px] tracking-[3px] text-fog uppercase">Certificaciones disponibles</p>
            <ul className="m-0 flex list-none flex-wrap gap-x-7 gap-y-2 p-0">
              {CERTS.map(cert => (
                <li key={cert} className="text-sm font-bold tracking-wide text-mist uppercase">
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
