import type { CSSProperties } from 'react'

export interface MarqueeItem {
  src: string
  name: string
}

interface LogoMarqueeProps {
  items: MarqueeItem[]
  ariaLabel: string
  /** dirección del scroll; izquierda (default) o derecha */
  direction?: 'left' | 'right'
  /** duración de un ciclo completo en segundos */
  speed?: number
  imgClassName?: string
}

export function LogoMarquee({
  items,
  ariaLabel,
  direction = 'left',
  speed = 40,
  imgClassName = '',
}: LogoMarqueeProps) {
  const style = { '--marquee-speed': `${speed}s` } as CSSProperties & Record<string, string>
  return (
    <div className="marquee" role="group" aria-label={ariaLabel}>
      <div className="marquee-track" data-direction={direction} style={style}>
        <div className="marquee-group">
          {items.map((it) => (
            <img
              key={it.name}
              src={it.src}
              alt={it.name}
              className={`marquee-img ${imgClassName}`}
              loading="lazy"
              draggable={false}
            />
          ))}
        </div>
        <div className="marquee-group" data-duplicate="true" aria-hidden="true">
          {items.map((it) => (
            <img
              key={it.name}
              src={it.src}
              alt=""
              className={`marquee-img ${imgClassName}`}
              loading="lazy"
              draggable={false}
            />
          ))}
        </div>
      </div>
    </div>
  )
}