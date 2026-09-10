import type { CSSProperties } from 'react'
import { Shield, CreditCard, Search, Scale, ClipboardCheck, Eye, GraduationCap, Database } from 'lucide-react'
import { SERVICES } from '../lib/data'
import Reveal from './Reveal'

const SERVICE_THEMES = [
  { color: '#ef5d61', icon: '⌁', label: 'Ofensiva' },
  { color: '#ccb9ff', icon: '</>', label: 'BANCARIA' },
  { color: '#4d8fff', icon: '◉', label: 'RESPUESTA' },
  { color: '#69d99a', icon: '⌁', label: 'LEGAL' },
  { color: '#ffb020', icon: '✓', label: 'GOBERNANZA' },
  { color: '#c7844b', icon: '◇', label: 'INTELIGENCIA' },
  { color: '#F2A900', icon: '🎓', label: 'FORMACIÓN' },
  { color: '#1FA2D8', icon: '⬢', label: 'DATA' },
]

const SERVICE_ICONS = [Shield, CreditCard, Search, Scale, ClipboardCheck, Eye, GraduationCap, Database] as const

function ServiceIcon({ index, color }: { index: number; color: string }) {
  const Icon = SERVICE_ICONS[index] ?? Shield
  return <Icon size={22} strokeWidth={1.75} style={{ color }} className="transition-transform duration-300" />
}

export default function Services() {
  return (
    <section
  id="servicios"
  className="relative z-10 -mt-[36px] scroll-mt-24 bg-[linear-gradient(135deg,#ffffff_0%,#eef3f4_55%,#dce8ec_100%)] py-28 md:py-40 [clip-path:polygon(0_36px,100%_0,100%_100%,0_100%)]"
  style={{ clipPath: 'polygon(0 36px, 100% 0, 100% 100%, 0 100%)' }}
>
      <div className="relative mx-auto w-full max-w-[74rem] px-2 sm:px-2 md:px-8">
        <Reveal>
          <p className="section-eyebrow">/ 02 · Servicios</p>
          <div className="mt-7 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h2 className="section-title">
                La evidencia antes que la intuición.
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 flex flex-col gap-[50px]">
          {SERVICES.map((service, index) => {
            const theme = SERVICE_THEMES[index] || SERVICE_THEMES[0]
            const stickyTopSpace = 80 + index * 20

            return (
              <article
  key={service.id}
  id={`service-card-${service.id}`}
  className="sticky min-h-[220px] sm:h-[260px] md:h-[330px] rounded-2xl border border-[#cbd5d8] bg-[#eef2ef] shadow-2xl overflow-hidden transition-all duration-300"
  style={
    {
      top: `${stickyTopSpace}px`,
      zIndex: index + 10,
      '--service-color': theme.color,
    } as CSSProperties
  }
>
  <div
    className="flex items-center px-8 py-3 border-b border-[#cbd5d8] bg-white/[0.25]"
    style={{ borderTop: `3px solid ${theme.color}` }}
  >
    <span className="text-sm font-semibold text-[#52656b] tracking-wide">
      {service.tab}
    </span>
  </div>

  <div className="relative z-10 flex flex-col justify-between p-7 sm:p-10 md:p-8">
    <div>
      <h3 className="max-w-[28ch] font-display text-[clamp(1.6rem,3vw,3rem)] leading-[.95] tracking-[-.05em] text-[#071117]">
        {service.title}
      </h3>
    </div>

    {/* 3 columnas fijas: Icono | Alcance | Objetivo - altura de tarjeta intacta */}
<div className="mt-6 grid border-y border-[#cbd5d8] lg:grid-cols-[180px_minmax(0,1.2fr)_minmax(0,1fr)]">
  {/* 01 · ICONO */}
  <div className="flex h-full flex-col py-5 lg:pr-6">
    
    <div className="mt-5 flex flex-1 flex-col items-center justify-center text-center">
      <div
        className="mx-auto flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 bg-white/60 shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.04] hover:shadow-xl"
        style={{ borderColor: `${theme.color}44` }}
      >
        <ServiceIcon index={index} color={theme.color} />
      </div>
      
    </div>
  </div>

  {/* 02 · ALCANCE */}
  <div className="border-[#cbd5d8] py-5 lg:border-l lg:px-6 flex flex-col min-w-0">
    <span className="font-code text-[10px] tracking-[.15em] uppercase" style={{ color: theme.color }}>
      · ALCANCE
    </span>
    <div className="mt-4 min-w-0" title={service.alcance}>
      <p className="max-w-[38ch] text-sm leading-6 text-[#52656b] line-clamp-4 overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4]">
        {service.alcance}
      </p>
    </div>
  </div>

  {/* 03 · OBJETIVO */}
  <div className="border-[#cbd5d8] py-5 lg:border-l lg:pl-6 flex flex-col min-w-0">
    <span className="font-code text-[10px] tracking-[.15em] uppercase" style={{ color: theme.color }}>
      · OBJETIVO
    </span>
    <div className="mt-4 min-w-0" title={service.objetivo}>
      <p className="max-w-[38ch] text-sm leading-6 text-[#52656b] line-clamp-4 overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4]">
        {service.objetivo}
      </p>
    </div>
  </div>
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