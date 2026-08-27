interface HexProps {
  className?: string
}

export function Hex({ className = '' }: HexProps) {
  return (
    <svg viewBox="0 0 40 44" fill="none" aria-hidden="true" className={className}>
      <path d="M20 2l17 10v20L20 42 3 32V12z" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

export function HexCheck({ className = '' }: HexProps) {
  return (
    <svg viewBox="0 0 40 44" fill="none" aria-hidden="true" className={className}>
      <path d="M20 2l17 10v20L20 42 3 32V12z" stroke="#7FCC27" strokeWidth="2" />
      <path d="M13 22l5 5 9-11" stroke="#FFFFFF" strokeWidth="2" />
    </svg>
  )
}
