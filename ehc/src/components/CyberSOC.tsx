import { Reveal } from './Reveal'
import cybersocSoftware from '../assets/pentest365/cybersoc/cybersoc-1.png'
import cybersocInstall from '../assets/pentest365/cybersoc/cybersoc-2.png'

export function CyberSOC() {
  return (
    <section
      id="cybersoc"
      className="relative overflow-hidden bg-white py-24 md:py-32"
    >
      {/* Fondo tecnológico muy sutil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 80% 25%, rgba(14,165,233,0.07), transparent 32%), radial-gradient(circle at 10% 80%, rgba(14,165,233,0.04), transparent 30%)',
        }}
      />

      <div className="relative mx-auto max-w-[1240px] px-6 md:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">

          {/* =====================================================
              CONTENIDO
          ====================================================== */}

          <div className="max-w-[620px]">
            <Reveal>
              {/* Eyebrow */}
              <div className="mb-7 flex items-center gap-3">
                <span className="h-px w-8 bg-sky-500" />

                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-sky-600">
                  CYBERSOC
                </span>

                <span className="h-px w-8 bg-sky-500" />
              </div>

              {/* Título */}
              <h2 className="text-[clamp(2.8rem,5vw,4.8rem)] font-black leading-[0.95] tracking-[-0.055em] text-slate-950">
                Soporte de nuestro{' '}
                <em className="not-italic text-sky-600">
                  Cyber-SOC
                </em>
              </h2>

              {/* Lead */}
              <p className="mt-7 text-lg font-semibold leading-7 text-sky-600 md:text-xl">
                Protección que continúa después del análisis.
              </p>

              {/* Texto */}
              <div className="mt-7 space-y-5 text-[15px] leading-7 text-slate-600">
                <p>
                  Los escáneres de vulnerabilidades a menudo producen una
                  larga lista de factores de riesgo, y los administradores
                  rara vez pueden resolver todos los riesgos identificados
                  de forma inmediata y efectiva; simplemente requiere
                  demasiados recursos para evaluar y abordar cada elemento.
                </p>

                <p>
                  La licencia de P365 trae una licencia gratuita de Cyber-SOC
                  donde un equipo de profesionales en Seguridad te apoyarán
                  en la remediación de tus riesgos y vulnerabilidades.
                </p>
              </div>

              {/* CTA */}
              <div className="mt-9">
                <a
                  href="#cotizacion"
                  aria-label="PRUEBA GRATIS"
                  className="group inline-flex items-center gap-4 rounded-lg bg-sky-600 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-700 hover:shadow-[0_12px_30px_rgba(14,165,233,0.25)]"
                >
                  PRUEBA GRATIS

                  <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* =====================================================
              VISUAL CYBERSOC
          ====================================================== */}

          <div className="relative min-h-[560px] lg:min-h-[620px]">
  <Reveal delay={0.12}>
    {/* Software principal */}
    <div className="absolute right-0 top-0 z-20 w-[92%] md:w-[88%]">
      <img
        src={cybersocSoftware}
        alt="CyberSOC Software"
        width={1200}
        height={956}
        draggable={false}
        className="block h-auto w-full object-contain"
      />
    </div>
  </Reveal>

  <Reveal delay={0.22}>
    {/* Instalaciones */}
    <div className="absolute bottom-0 left-0 z-30 w-[52%] md:w-[48%]">
      <img
        src={cybersocInstall}
        alt="Instalaciones de CyberSOC"
        width={982}
        height={665}
        draggable={false}
        className="block h-auto w-full object-contain"
      />
    </div>
  </Reveal>
</div>
        </div>

        {/* =====================================================
            PROCESO
        ====================================================== */}

        <Reveal className="mt-20">
          
        </Reveal>
      </div>
    </section>
  )
}