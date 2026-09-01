import { useEffect, useRef, useCallback } from 'react'

interface DelicateAsciiDotsProps {
  className?: string
  backgroundColor?: string
  textColor?: string
  gridSize?: number
}

interface Wave {
  x: number
  y: number
  frequency: number
  amplitude: number
  phase: number
  speed: number
}

interface GridCell {
  char: string
  opacity: number
}

export default function AsciiDots({
  className = '',
  backgroundColor = 'transparent',
  textColor = '182, 229, 55',
  gridSize = 80,
}: DelicateAsciiDotsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const wavesRef = useRef<Wave[]>([])
  const gridRef = useRef<GridCell[][]>([])

  const initGrid = useCallback((cols: number, rows: number) => {
    const grid: GridCell[][] = []
    const chars = ['·', '*', '+', '○', '●', '°']
    for (let y = 0; y < rows; y++) {
      const row: GridCell[] = []
      for (let x = 0; x < cols; x++) {
        row.push({
          char: chars[Math.floor(Math.random() * chars.length)],
          opacity: 0.15 + Math.random() * 0.35,
        })
      }
      grid.push(row)
    }
    gridRef.current = grid
  }, [])

  const initWaves = useCallback((cols: number, rows: number) => {
    const waves: Wave[] = []
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (Math.random() < 0.03) {
          waves.push({
            x: x * gridSize,
            y: y * gridSize,
            frequency: 0.02 + Math.random() * 0.04,
            amplitude: 0.3 + Math.random() * 0.5,
            phase: Math.random() * Math.PI * 2,
            speed: 0.005 + Math.random() * 0.01,
          })
        }
      }
    }
    wavesRef.current = waves
  }, [gridSize])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.scale(dpr, dpr)

      const cols = Math.ceil(rect.width / gridSize) + 2
      const rows = Math.ceil(rect.height / gridSize) + 2
      initGrid(cols, rows)
      initWaves(cols, rows)
    }

    resize()
    window.addEventListener('resize', resize)

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const handleLeave = () => { mouseRef.current = { x: -1000, y: -1000 } }

    canvas.addEventListener('mousemove', handleMouse)
    canvas.addEventListener('mouseleave', handleLeave)

    let time = 0
    const animate = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (!rect) { animRef.current = requestAnimationFrame(animate); return }

      ctx.clearRect(0, 0, rect.width, rect.height)
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, rect.width, rect.height)

      time += 1

      const cols = gridRef.current[0]?.length ?? 0
      const rows = gridRef.current.length
      const mouse = mouseRef.current

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const cell = gridRef.current[y]?.[x]
          if (!cell) continue

          const px = x * gridSize
          const py = y * gridSize

          const dx = mouse.x - px
          const dy = mouse.y - py
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = 150

          let dynamicOpacity = cell.opacity
          let char = cell.char

          if (dist < maxDist) {
            const proximity = 1 - dist / maxDist
            dynamicOpacity = Math.min(1, cell.opacity + proximity * 0.7)
            const charIndex = Math.min(
              Math.floor(proximity * 5),
              ['·', '*', '+', '○', '●', '●'].length - 1,
            )
            char = ['·', '*', '+', '○', '●', '●'][charIndex]
          }

          for (const wave of wavesRef.current) {
            const wDx = px - wave.x
            const wDy = py - wave.y
            const wDist = Math.sqrt(wDx * wDx + wDy * wDy)
            if (wDist < 200) {
              const waveInfluence = Math.sin(wave.frequency * wDist + wave.phase + time * wave.speed)
              dynamicOpacity += waveInfluence * wave.amplitude * (1 - wDist / 200) * 0.3
            }
          }

          dynamicOpacity = Math.max(0, Math.min(1, dynamicOpacity))

          if (dynamicOpacity > 0.02) {
            ctx.fillStyle = `rgba(${textColor}, ${dynamicOpacity})`
            ctx.font = '12px "IBM Plex Mono", monospace'
            ctx.fillText(char, px, py)
          }
        }
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouse)
      canvas.removeEventListener('mouseleave', handleLeave)
    }
  }, [backgroundColor, textColor, gridSize, initGrid, initWaves])

  return (
    <div className={`pointer-events-auto absolute inset-0 ${className}`}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
