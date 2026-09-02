import Reveal from './Reveal'

const MILESTONES = [
  {
    year: '2001',
    title: 'Nace EHC Group',
    text: 'con el objetivo de gestionar proyectos integrales de seguridad de la información, abarcando desde el análisis de sistemas hasta la implementación de soluciones que integran tecnología, procesos y personal.',
  },
  {
    year: '2016',
    title: 'Expansión regional',
    text: 'EHC Group se consolida como holding internacional de empresas de alta seguridad tecnológica con presencia en Estados Unidos y siete países de Latinoamérica.',
  },
  {
    year: 'HOY',
    title: 'Especialidades de EHC Group',
    text: 'penetración (pentesting) para aplicaciones e infraestructuras críticas, junto con un fuerte enfoque en seguridad bancaria y de cajeros automáticos (ATMs). A nivel estratégico operan bajo la normativa ISO 27001 y protegen infraestructuras de gobierno, complementando su oferta con servicios de defensa y respuesta de alta complejidad, como los Centros de Operaciones de Seguridad (Cyber SOC), la informática forense y la inteligencia informática.',
  },
]

export default function About() {
  return (
    <section id="nosotros" className="scroll-mt-24 border-t border-edge bg-coal py-24 md:py-32">
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-5 md:grid-cols-[1fr_1.2fr] md:gap-20 md:px-8">
        <Reveal>
          <p className="font-code text-xs tracking-[3px] text-volt-light">// NOSOTROS</p>
          <h2 className="mt-3 font-display text-[clamp(30px,4.5vw,54px)] leading-[1.02] tracking-wide text-white uppercase">
            25+ años de experiencia
            <br />
            <span className="text-volt">como atacantes</span>
          </h2>
          <p className="mt-5 font-josef text-lg leading-relaxed font-light text-mist">
            Somos consultores certificados, investigadores y ex-bug hunters. Nuestra metodología combina frameworks
            reconocidos con tácticas reales de adversarios para entregarte hallazgos accionables, no reportes de
            estantería.
          </p>
        </Reveal>

        <ol className="relative m-0 flex list-none flex-col gap-10 p-0 before:absolute before:top-2 before:bottom-2 before:left-[9px] before:w-px before:bg-edge">
          {MILESTONES.map(milestone => (
            <li key={milestone.year} className="relative pl-12">
              <span aria-hidden="true" className="absolute top-0 left-0 size-5 rotate-45 border-2 border-volt bg-coal" />
              <p className="font-code text-sm tracking-[3px] text-volt">{milestone.year}</p>
              <h3 className="mt-1.5 mb-2 font-display text-2xl tracking-wide text-white uppercase">{milestone.title}</h3>
              <p className="max-w-[52ch] leading-relaxed">{milestone.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
