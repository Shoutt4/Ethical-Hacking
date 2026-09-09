import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties, TouchEvent } from 'react'
import { motion } from 'framer-motion'
import { PRODUCTS } from '../lib/data'
import type { Product } from '../lib/data'
import Reveal from './Reveal'

const GAP = 16

export default function Products() {
  const computePerView = () => {
    if (typeof window === 'undefined') return 1

    const w = window.innerWidth

    if (w >= 1280) return 3
    if (w >= 768) return 2

    return 1
  }

  const [perView, setPerView] = useState<number>(computePerView)
  const [index, setIndex] = useState(0)
  const touchX = useRef(0)

  useEffect(() => {
    const onResize = () => setPerView(computePerView())

    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
  }, [])

  const totalProducts = PRODUCTS.length

  // Movimiento circular
  const go = (dir: 1 | -1) => {
    setIndex((prev) => {
      if (dir === 1) {
        return (prev + 1) % totalProducts
      }

      return (prev - 1 + totalProducts) % totalProducts
    })
  }

  const jump = (n: number) => {
    setIndex(n)
  }

  // Reordena los productos de forma circular
  const circularProducts = useMemo(() => {
    return Array.from(
      { length: totalProducts },
      (_, i) => PRODUCTS[(index + i) % totalProducts]
    )
  }, [index, totalProducts])

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const dx = e.changedTouches[0].clientX - touchX.current

    if (Math.abs(dx) < 50) return

    go(dx < 0 ? 1 : -1)
  }

  const cardPct = 100 / perView

  return (
    <section
      id="productos"
      className="scroll-mt-24 border-t border-edge bg-coal py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">

        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">

            <div>
              <p className="font-code text-xs tracking-[3px] text-volt-light">
                // PRODUCTOS
              </p>

              <h2 className="mt-3 font-display text-[clamp(30px,4.5vw,54px)] leading-[1.02] tracking-wide text-white uppercase">
                Nuestras <span className="text-volt">soluciones</span>
              </h2>
            </div>

            {/* BOTONES */}
             
          </div>
        </Reveal>

        {/* CARRUSEL */}
        <div
          className="mt-12 overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.4,
              ease: 'easeOut',
            }}
            className="flex gap-4"
          >
            {circularProducts.slice(0, perView).map((product) => (
              <ProductCard
                key={`${index}-${product.id}`}
                product={product}
                style={{
                  flex: `0 0 calc(${cardPct}% - ${GAP}px)`,
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* INDICADORES */}
         

      </div>
    </section>
  )
}

function ProductCard({
  product,
  style,
}: {
  product: Product
  style: CSSProperties
}) {
  const isLive = product.status !== 'maintenance'

  return (
    <motion.article
      whileHover={{ y: -10 }}
      transition={{
        type: 'spring',
        stiffness: 240,
        damping: 22,
      }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-edge/70 bg-ash/40 p-8 backdrop-blur-sm shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-volt/60 hover:bg-ash/70 hover:shadow-[0_30px_70px_-18px_rgba(0,0,0,0.7),0_2px_0_-1px_rgba(182,229,55,0.25)]"
      style={style}
    >
      {/* Perfil superior */}
      <div className="flex items-center justify-between gap-4">
        {/* Logo del producto */}
        <div
          className={`grid h-20 w-32 shrink-0 place-items-center overflow-hidden rounded-lg border p-2.5 ${
            product.plate === 'dark'
              ? 'border-edge/80 bg-night shadow-[0_1px_0_rgba(255,255,255,0.08)]'
              : 'border-edge/60 bg-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]'
          }`}
        >
          <img
            //src={product.logo}
            alt={product.logoAlt}
            className="max-h-full max-w-full object-contain"
            loading="lazy"
          />
        </div>

         
      </div>

      <div className="mt-6 h-px w-full bg-gradient-to-r from-volt/40 to-transparent" />

      <h3 className="mt-5 font-display text-[1.7rem] leading-tight tracking-wide text-white uppercase">
        {product.title}
      </h3>

      <p className="mt-1.5 text-[0.95rem] font-light leading-relaxed tracking-wide text-volt-light">
        {product.subtitle}
      </p>

      <ul className="mt-6 flex list-none flex-col gap-3 p-0">
        {product.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-3 text-[0.9rem] leading-snug text-mist"
          >
            <span
              className="mt-1.5 size-1.5 shrink-0 rotate-45 bg-volt"
              aria-hidden="true"
            />

            {f}
          </li>
        ))}
      </ul>

      {/* Botón de acción */}
      <div className="relative mt-auto pt-7">
        {isLive ? (
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-between gap-3 rounded-md border border-volt/70 bg-volt/10 px-5 py-3.5 font-code text-xs tracking-[2px] text-volt-light uppercase transition-colors duration-300 hover:border-volt hover:bg-volt hover:text-ink"
          >
            Ir al sitio
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                d="M7 17L17 7M17 7H8M17 7v9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        ) : (
          <div className="group/btn relative">
            <button
              type="button"
              disabled
              aria-label="Sitio temporalmente en mantenimiento"
              className="inline-flex w-full cursor-not-allowed items-center justify-between gap-3 rounded-md border border-edge bg-ash/70 px-5 py-3.5 font-code text-xs tracking-[2px] text-fog uppercase opacity-70"
            >
              Ir al sitio
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  d="M7 17L17 7M17 7H8M17 7v9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Tooltip */}
            <span
              role="tooltip"
              className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-max max-w-[16rem] -translate-x-1/2 border border-edge bg-night px-3 py-2 font-code text-[11px] leading-snug tracking-wide text-volt-light opacity-0 transition-opacity duration-200 group-hover/btn:opacity-100"
            >
              Sitio temporalmente en mantenimiento
            </span>
          </div>
        )}
      </div>
    </motion.article>
  )
}