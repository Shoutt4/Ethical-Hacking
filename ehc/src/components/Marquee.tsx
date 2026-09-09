import { STANDARDS } from '../lib/data'

export default function Marquee() {
  const items = [...STANDARDS, ...STANDARDS]
  return (
    <div
      aria-hidden="true"
      className="group overflow-hidden border-y border-edge py-4 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
    >
      <div className="animate-marquee flex w-max group-hover:[animation-play-state:paused]">
        {items.map((label, i) => (
          <span key={`${label}-${i}`} className="flex items-center whitespace-nowrap">
            <span className="pr-7 text-sm font-bold tracking-[2.5px] text-fog uppercase">{label}</span>
            <span className="pr-7 text-sm text-edge">//</span>
          </span>
        ))}
      </div>
    </div>
  )
}
