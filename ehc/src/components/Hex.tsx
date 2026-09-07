import logo from '../assets/logo.png'

interface HexProps {
  className?: string
}

export function Hex({ className = '' }: HexProps) {
  return (
    <img
      src={logo}
      alt="EHC Group"
      className={`object-contain ${className}`}
    />
  )
}

export function HexCheck({ className = '' }: HexProps) {
  return (
    <img
      src={logo}
      alt="EHC Group"
      className={`object-contain ${className}`}
    />
  )
}