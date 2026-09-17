import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CLIENT_CASES, COUNTRIES, getCountry } from '../data/clientCases'

const eyedInitial = { opacity: 0, scale: 0.94 }

const COUNTRY_FLAGS: Record<string, string> = {
  BO: '\u{1F1E7}\u{1F1F4}',
  CL: '\u{1F1E8}\u{1F1F1}',
  PA: '\u{1F1F5}\u{1F1E6}',
  BR: '\u{1F1E7}\u{1F1F7}',
  PR: '\u{1F1F5}\u{1F1F7}',
}

export function InteractiveClientExplorer() {
  const reduced = useReducedMotion()
  const [country, setCountry] = useState<string>(COUNTRIES[0].code)
  const [selectedId, setSelectedId] = useState<string>(
    CLIENT_CASES.find((c) => c.countryCode === COUNTRIES[0].code)?.id ??
      CLIENT_CASES[0].id,
  )
  const [hasOverflow, setHasOverflow] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const logosRef = useRef<HTMLDivElement | null>(null)
  const observerRef = useRef<ResizeObserver | null>(null)

  const updateArrows = useCallback(() => {
    const el = logosRef.current
    if (!el) return
    setHasOverflow(el.scrollWidth > el.clientWidth + 1)
    setCanScrollLeft(el.scrollLeft > 2)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2)
  }, [])

  const setLogosRef = useCallback(
    (node: HTMLDivElement | null) => {
      logosRef.current = node
      observerRef.current?.disconnect()
      observerRef.current = null
      if (!node) return
      updateArrows()
      const ro = new ResizeObserver(() => updateArrows())
      ro.observe(node)
      observerRef.current = ro
    },
    [updateArrows],
  )

  const filtered = CLIENT_CASES.filter((c) => c.countryCode === country)
  const selected = filtered.find((c) => c.id === selectedId) ?? filtered[0]!
  const activeCountry = getCountry(country)

  const handleCountryChange = (code: string) => {
    if (code === country) return
    setCountry(code)
    const firstClient = CLIENT_CASES.find((c) => c.countryCode === code)
    if (firstClient) setSelectedId(firstClient.id)
    setHasOverflow(false)
    setCanScrollLeft(false)
    setCanScrollRight(false)
  }

  const scrollStep = () => {
    const el = logosRef.current
    if (!el) return 320
    return Math.max(320, Math.round(el.clientWidth * 0.8))
  }

  const scrollPrev = () =>
    logosRef.current?.scrollBy({
      left: -scrollStep(),
      behavior: reduced ? 'auto' : 'smooth',
    })

  const scrollNext = () =>
    logosRef.current?.scrollBy({
      left: scrollStep(),
      behavior: reduced ? 'auto' : 'smooth',
    })

  return (
    <div className="client-explorer">
      <div
        className="explorer-filters"
        role="group"
        aria-label="Explorar clientes por país"
      >
        {COUNTRIES.map((c) => (
          <button
            key={c.code}
            type="button"
            className="explorer-pill"
            data-active={country === c.code}
            aria-pressed={country === c.code}
            onClick={() => handleCountryChange(c.code)}
          >
            <span className="explorer-flag" aria-hidden="true">
              {COUNTRY_FLAGS[c.code] ?? '\u{1F3F3}\u{FE0F}\u{200D}\u{1F308}'}
            </span>
            {c.name}
          </button>
        ))}
      </div>

      <div className="explorer-carousel">
        {hasOverflow && (
          <button
            type="button"
            className="explorer-arrow explorer-arrow-left"
            onClick={scrollPrev}
            disabled={!canScrollLeft}
            aria-label="Clientes anteriores"
          >
            <span aria-hidden="true">←</span>
          </button>
        )}

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={country}
            ref={setLogosRef}
            className="explorer-logos"
            role="group"
            aria-label={`Clientes de ${activeCountry?.name ?? ''}`}
            onScroll={updateArrows}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {filtered.map((c) => {
              const active = selected.id === c.id
              return (
                <motion.button
                  key={c.id}
                  type="button"
                  className="explorer-logo"
                  data-active={active}
                  aria-label={`Ver información de ${c.client}`}
                  aria-pressed={active}
                  onClick={() => setSelectedId(c.id)}
                  initial={reduced ? false : eyedInitial}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                >
                  <img src={c.logo} alt="" loading="lazy" draggable={false} />
                </motion.button>
              )
            })}
          </motion.div>
        </AnimatePresence>

        {hasOverflow && (
          <button
            type="button"
            className="explorer-arrow explorer-arrow-right"
            onClick={scrollNext}
            disabled={!canScrollRight}
            aria-label="Clientes siguientes"
          >
            <span aria-hidden="true">→</span>
          </button>
        )}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={selected.id}
          className="explorer-panel"
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div className="explorer-panel-inner">
            <div className="explorer-media">
              <img
                src={selected.logo}
                alt={`Logo de ${selected.client}`}
                draggable={false}
              />
            </div>
            <div className="explorer-body">
              <p className="explorer-kicker">
                <span aria-hidden="true" />
                <em className="explorer-flag" aria-hidden="true">
                  {COUNTRY_FLAGS[country] ?? '\u{1F3F3}\u{FE0F}\u{200D}\u{1F308}'}
                </em>
                <em>{selected.country}</em>
                <i aria-hidden="true">·</i>
                <em>{selected.industry}</em>
              </p>
              <h3>{selected.client}</h3>
              {selected.service ? (
                <div className="explorer-tags">
                  <span>{selected.service}</span>
                </div>
              ) : null}
              {selected.description ? (
                <p className="explorer-desc">{selected.description}</p>
              ) : null}
              <a
                className="explorer-cta"
                href={selected.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selected.description ? 'Ver caso de éxito' : 'Visitar sitio'}{' '}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}