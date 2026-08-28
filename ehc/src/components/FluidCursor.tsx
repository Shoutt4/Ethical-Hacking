import { useEffect, useRef } from 'react'
import initFluidCursor from '../hooks/use-FluidCursor'

export default function FluidCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    initFluidCursor(canvas)
  }, [])

  return (
    <canvas
      id="fluid"
      ref={canvasRef}
      aria-hidden="true"
      className="fluid-canvas pointer-events-none fixed inset-0 z-[999] block h-full w-full"
    />
  )
}
