import { useCallback, useEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent, KeyboardEvent as ReactKeyboardEvent } from 'react'
import { MotionConfig } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { PRODUCTS } from '../lib/data'
import type { Product } from '../lib/data'
import Reveal from './Reveal'
const BUFFER = 2
const LERP_FACTOR = 0.09
const SNAP_EPS = 0.0015
const PARALLAX = 0.09
const mod = (i: number, n: number) => ((i % n) + n) % n
const pad = (i: number) => String(i + 1).padStart(2, '0')
type ProductVisual = Product & { image?: string }
function StatusPill({ status }: { status: Product['status'] }) {
  const live = status !== 'maintenance'
  return (
    <span
      className=""
    >
       
       
    </span>
  )
}

function ProductVisualPanel({ product, num }: { product: ProductVisual; num: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-night">
      {/* capa con parallax (más grande que el marco para no dejar bordes) */}
      <div
        data-parallax
        aria-hidden="true"
        className="absolute -inset-[10%]"
         
      />
      <div
        aria-hidden="true"
        className="scanlines pointer-events-none absolute inset-0"
      />
       

       
      <div className="absolute top-3 right-8">
        <StatusPill status={product.status} />
      </div>

      {/* logo real del producto sobre placa según `plate` */}
      <div className="absolute inset-0 grid place-items-center p-8">
        <div
          className="" 
        >
          <img
            src={product.logo}
            alt={product.logoAlt}
            className="max-h-full max-w-full object-contain"
            loading="lazy"
            draggable={false}
          />
        </div>
      </div>

       
       
    </div>
  )
}

function ProductCta({ product }: { product: Product }) {
  if (product.status === 'maintenance') {
    return (
      <div className="group/btn relative">
        <button
          type="button"
          disabled
          aria-label={`${product.title}: sitio temporalmente en mantenimiento`}
          className="inline-flex w-full cursor-not-allowed items-center justify-between gap-3 rounded-md border border-edge bg-ash/70 px-5 py-3.5 font-code text-xs tracking-[2px] text-fog uppercase opacity-70 sm:w-auto sm:min-w-64"
        >
          {product.urlLabel ?? 'IR AL SITIO'}
          <ArrowUpRight size={14} aria-hidden="true" />
        </button>
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-max max-w-64 -translate-x-1/2 border border-edge bg-night px-3 py-2 font-code text-[11px] leading-snug tracking-wide text-volt-light opacity-0 transition-opacity duration-200 group-hover/btn:opacity-100"
        >
          Sitio temporalmente en mantenimiento
        </span>
      </div>
    )
  }
  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${product.urlLabel ?? 'Ir al sitio'} de ${product.title} (abre en pestaña nueva)`}
      className="inline-flex w-full items-center justify-between gap-3 rounded-md border border-volt/70 bg-volt/10 px-5 py-3.5 font-code text-xs tracking-[2px] text-volt-light uppercase transition-colors duration-300 hover:border-volt hover:bg-volt hover:text-ink focus-visible:outline-2 focus-visible:outline-volt sm:w-auto sm:min-w-64"
    >
      {product.urlLabel ?? 'IR AL SITIO'}
      <ArrowUpRight size={14} aria-hidden="true" />
    </a>
  )
}

export default function Products() {
  const total = PRODUCTS.length
  const [index, setIndex] = useState(0)

  const targetRef = useRef(0)
  const posRef = useRef(0)
  const widthRef = useRef(1)
  const rafRef = useRef(0)
  const reducedRef = useRef(false)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const slidesRef = useRef(new Map<number, HTMLDivElement>())
  const draggingRef = useRef(false)
  const dragStartX = useRef(0)
  const dragStartPos = useRef(0)

  const setTarget = useCallback((v: number) => {
    targetRef.current = v
    setIndex(v)
  }, [])

  const go = useCallback(
    (dir: 1 | -1) => setTarget(targetRef.current + dir),
    [setTarget],
  )

  /* salto por el camino más corto del loop */
  const jumpTo = useCallback(
    (realIdx: number) => {
      const cur = mod(targetRef.current, total)
      let delta = (realIdx - cur + total) % total
      if (delta > total / 2) delta -= total
      setTarget(targetRef.current + delta)
    },
    [setTarget, total],
  )

  /* loop rAF: lerp + snap + parallax (sin re-renders, todo por refs) */
  useEffect(() => {
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const measure = () => {
      if (viewportRef.current) widthRef.current = viewportRef.current.clientWidth || 1
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (viewportRef.current) ro.observe(viewportRef.current)

    const tick = () => {
      const W = widthRef.current
      const t = targetRef.current
      let p = posRef.current
      if (!draggingRef.current) {
        if (reducedRef.current) {
          p = t
        } else {
          p += (t - p) * LERP_FACTOR
          if (Math.abs(t - p) < SNAP_EPS) p = t
        }
        posRef.current = p
      }
      const frac = p - t
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${-(BUFFER * W) - frac * W}px,0,0)`
      }
      if (!reducedRef.current) {
        slidesRef.current.forEach((el, k) => {
          const layer = el.querySelector<HTMLElement>('[data-parallax]')
          if (layer) {
            const disp = (k - frac) * W
            layer.style.transform = `translateX(${(-disp * PARALLAX).toFixed(1)}px) scale(1.12)`
          }
        })
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [])

  /* drag / touch (pan-y libre para no romper el scroll de página) */
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    draggingRef.current = true
    dragStartX.current = e.clientX
    dragStartPos.current = posRef.current
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return
    const W = widthRef.current
    posRef.current = dragStartPos.current - (e.clientX - dragStartX.current) / W
    const rounded = Math.round(posRef.current)
    if (rounded !== targetRef.current) setTarget(rounded)
  }
  const endDrag = () => {
    if (!draggingRef.current) return
    draggingRef.current = false
    setTarget(Math.round(posRef.current))
  }

  const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(-1)
    }
  }

  const offsets: number[] = []
  for (let k = -BUFFER; k <= BUFFER; k++) offsets.push(k)

  const realIndex = mod(index, total)
  const active = PRODUCTS[realIndex]

  return (
    <MotionConfig reducedMotion="user">
      <section id="productos" aria-labelledby="productos-title" className="relative isolate -mt-px bg-[#0a171d] py-24 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="font-code text-xs tracking-[3px] text-volt-light">
                  {'// PRODUCTOS'}
                </p>
                <h2
                  id="productos-title"
                  className="mt-3 font-display text-[clamp(30px,4.5vw,54px)] leading-[1.02] tracking-wide text-white uppercase"
                >
                  Nuestras <span className="text-volt">soluciones</span>
                </h2>
              </div>
             
            </div>
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_280px] xl:gap-12">
            {/* viewport del slider */}
            <div
              ref={viewportRef}
              role="region"
              aria-roledescription="carrusel"
              aria-label="Productos y soluciones EHC"
              tabIndex={0}
              onKeyDown={onKeyDown}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              className="cursor-grab overflow-hidden border border-edge/70 bg-coal/40 outline-none select-none focus-visible:outline-2 focus-visible:outline-volt active:cursor-grabbing"
              style={{ touchAction: 'pan-y' }}
            >
              <div ref={trackRef} className="flex will-change-transform">
                {offsets.map((k) => {
                  const p = PRODUCTS[mod(index + k, total)] as ProductVisual
                  const r = mod(index + k, total)
                  return (
                    <div
                      key={`${index}-${k}`}
                      ref={(el) => {
                        if (el) slidesRef.current.set(k, el)
                        else slidesRef.current.delete(k)
                      }}
                      className="w-full shrink-0"
                    >
                      <div className="grid md:grid-cols-2">
                        <div className="aspect-[4/3] md:aspect-auto md:min-h-[420px]">
                          <ProductVisualPanel product={p} num={pad(r)} />
                        </div>
                        <div className="flex flex-col justify-center gap-4 p-6 md:p-10">
                           
                          <h3 className="font-display text-3xl leading-tight tracking-wide text-white uppercase md:text-4xl">
                            {p.title}
                          </h3>
                          <p className="text-[0.95rem] leading-relaxed font-light tracking-wide text-volt-light">
                            {p.subtitle}
                          </p>
                          <ul className="mt-1 flex list-none flex-col gap-2.5 p-0">
                            {p.features.slice(0, 4).map((f) => (
                              <li key={f} className="flex items-start gap-3 text-[0.9rem] leading-snug text-mist">
                                <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rotate-45 bg-volt" />
                                {f}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4">
                            <ProductCta product={p} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* rail índice (análogo al minimap-info-list) */}
            <nav aria-label="Índice de productos" className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
              {PRODUCTS.map((p, i) => {
                const current = i === realIndex
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => jumpTo(i)}
                    aria-current={current ? 'true' : undefined}
                    aria-label={`Ver ${p.title}`}
                    className={`group flex min-w-44 flex-1 items-center gap-3 border px-4 py-3 text-left transition-all duration-300 lg:min-w-0 ${
                      current
                        ? 'border-volt/60 bg-volt/[0.07]'
                        : 'border-edge/60 bg-transparent hover:border-edge-strong hover:bg-white/[0.02]'
                    }`}
                  >
                     
                    <span className="min-w-0">
                      <span className={`block truncate font-display text-sm tracking-wide uppercase ${current ? 'text-white' : 'text-mist'}`}>
                        {p.title}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-fog">
                        {p.status === 'maintenance' ? 'MANTENIMIENTO' : p.subtitle}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={`ml-auto size-1.5 shrink-0 rounded-full ${p.status === 'maintenance' ? 'bg-fog' : 'bg-volt'}`}
                    />
                  </button>
                )
              })}
            </nav>
          </div>

          {/* anuncio del activo para lectores de pantalla */}
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {active.title}, {active.subtitle}
          </div>
        </div>
      </section>
    </MotionConfig>
  )
}
