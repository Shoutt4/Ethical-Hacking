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

  const jumpTo = (nextIndex: number) => {
    setIndex(nextIndex)
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
      className="products-section section-space scroll-mt-24"
    >
      <div className="site-container">

        <Reveal>
          <div className="products-header">

            <div>
              <p className="section-kicker">Productos</p>
              <h2>Nuestras soluciones</h2>
            </div>
            <div className="carousel-controls" aria-label="Controles del carrusel de productos">
              <button type="button" className="icon-button" onClick={() => go(-1)} aria-label="Producto anterior">←</button>
              <button type="button" className="icon-button" onClick={() => go(1)} aria-label="Producto siguiente">→</button>
            </div>
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
            className="product-track"
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

        <div className="carousel-pagination" aria-label="Seleccionar producto">
          {PRODUCTS.map((product, productIndex) => (
            <button
              key={product.id}
              type="button"
              aria-label={`Ver ${product.title}`}
              aria-current={index === productIndex ? 'true' : undefined}
              className="carousel-dot"
              onClick={() => jumpTo(productIndex)}
            />
          ))}
        </div>

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
    <article
      className="product-card"
      style={style}
    >
      <div className="product-card__top">
        <div
          className={`product-logo ${
            product.plate === 'dark'
              ? 'product-logo--dark'
              : 'product-logo--light'
          }`}
        >
          <img
            src={product.logo}
            alt={product.logoAlt}
            className="product-logo__image"
            loading="lazy"
          />
        </div>
      </div>

      <h3>{product.title}</h3>

      <p className="product-subtitle">{product.subtitle}</p>

      <ul>
        {product.features.map((f) => (
          <li
            key={f}
            className="product-feature"
          >
            <span aria-hidden="true">↗</span>
            {f}
          </li>
        ))}
      </ul>

      <div className="product-card__action">
        {isLive ? (
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="product-link"
          >
            Ir al sitio <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <div className="group/btn relative">
            <button
              type="button"
              disabled
              aria-label="Sitio temporalmente en mantenimiento"
            className="product-link product-link--disabled"
            >
              Ir al sitio
              <span aria-hidden="true">↗</span>
            </button>

            {/* Tooltip */}
            <span
              role="tooltip"
              className="product-tooltip"
            >
              Sitio temporalmente en mantenimiento
            </span>
          </div>
        )}
      </div>
    </article>
  )
}
