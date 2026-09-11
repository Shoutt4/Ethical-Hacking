import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Reveal from './Reveal'
import { BLOG_URL, fetchLatestPosts, type NewsArticle } from '../lib/wordpress'

type Status = 'loading' | 'ready' | 'error' | 'empty'

function NewsImage({ image, title }: { image: NewsArticle['image']; title: string }) {
  const [failed, setFailed] = useState(false)
  if (!image || failed) {
    return (
      <div
        aria-hidden="true"
        className="flex h-full w-full items-center justify-center bg-ash"
      >
        <span className="border border-volt/25 px-3 py-2 font-code text-[10px] tracking-[3px] text-volt/70 uppercase">
          EHC · NEWS
        </span>
      </div>
    )
  }
  return (
    <img
      src={image.src}
      alt={image.alt || title}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
    />
  )
}

function SkeletonCard() {
  return (
    <div
      aria-hidden="true"
      className="blog-card flex w-full shrink-0 snap-start flex-col sm:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)]"
    >
      <div className="aspect-video animate-pulse border-b border-edge bg-ash" />
      <div className="flex grow flex-col gap-3 p-6">
        <div className="h-3 w-24 animate-pulse bg-edge" />
        <div className="h-5 w-full animate-pulse bg-edge" />
        <div className="h-5 w-3/4 animate-pulse bg-edge" />
        <div className="mt-auto h-3 w-2/3 animate-pulse bg-edge" />
      </div>
    </div>
  )
}

export default function Blog() {
  const [status, setStatus] = useState<Status>('loading')
  const [posts, setPosts] = useState<NewsArticle[]>([])
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const controller = new AbortController()
    fetchLatestPosts(controller.signal)
      .then((items) => {
        setPosts(items)
        setStatus(items.length === 0 ? 'empty' : 'ready')
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return
        setStatus('error')
      })
    return () => controller.abort()
  }, [])

  const updateNav = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setCanPrev(el.scrollLeft > 8)
    setCanNext(el.scrollLeft < max - 8)
  }, [])

  useEffect(() => {
    updateNav()
    window.addEventListener('resize', updateNav)
    return () => window.removeEventListener('resize', updateNav)
  }, [updateNav, status, posts.length])

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const first = el.querySelector<HTMLElement>('[data-slide]')
    const step = first ? first.offsetWidth + 24 : el.clientWidth * 0.8
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: dir * step, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <section id="blog" aria-labelledby="blog-title" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-code text-xs tracking-[3px] text-volt-light">
                {'// EHC NEWS'}
              </p>
              <h2
                id="blog-title"
                className="mt-3 font-display text-[clamp(30px,4.5vw,54px)] leading-[1.02] tracking-wide text-white uppercase"
              >
                Tablón de noticias
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-fog">
                Últimas publicaciones del blog oficial de EHC Group.
              </p>
            </div>
            {status === 'ready' && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => scroll(-1)}
                  disabled={!canPrev}
                  aria-label="Noticia anterior"
                  className="flex size-10 items-center justify-center border border-edge-strong text-white transition-all duration-300 hover:border-volt hover:text-volt-light disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-edge-strong disabled:hover:text-white"
                >
                  <ChevronLeft size={18} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => scroll(1)}
                  disabled={!canNext}
                  aria-label="Siguiente noticia"
                  className="flex size-10 items-center justify-center border border-edge-strong text-white transition-all duration-300 hover:border-volt hover:text-volt-light disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-edge-strong disabled:hover:text-white"
                >
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </Reveal>

        {status === 'loading' && (
          <div className="mt-10 flex gap-6" aria-label="Cargando noticias">
            <SkeletonCard />
            <div className="hidden sm:block sm:contents">
              <SkeletonCard />
            </div>
            <div className="hidden lg:contents">
              <SkeletonCard />
            </div>
          </div>
        )}

        {(status === 'error' || status === 'empty') && (
          <div className="mt-10 border border-edge bg-coal/60 p-8 text-center md:p-12">
            <p className="font-code text-xs tracking-[2px] text-volt-light uppercase">
              {status === 'error' ? 'Conexión no disponible' : 'Sin publicaciones'}
            </p>
            <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-fog">
              {status === 'error'
                ? 'No fue posible cargar las noticias en este momento.'
                : 'Aún no hay publicaciones para mostrar.'}
            </p>
            <a
              href={BLOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 border border-edge-strong px-7 py-[15px] text-[13px] font-bold tracking-[1.5px] text-white uppercase no-underline transition-all duration-300 hover:border-volt hover:text-volt-light hover:shadow-[0_0_20px_rgba(182,229,55,.1)]"
            >
              Visitar blog EHC
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        )}

        {status === 'ready' && (
          <div className="mt-10">
            <div
              ref={trackRef}
              onScroll={updateNav}
              role="region"
              aria-roledescription="carrusel"
              aria-label="Últimas noticias del blog de EHC Group"
              className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pt-2 pb-4 md:-mx-8 md:px-8"
            >
              {posts.map((post) => (
                <a
                  key={post.id}
                  data-slide
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${post.title} (abre en pestaña nueva)`}
                  className="blog-card group flex w-[85%] shrink-0 snap-start flex-col no-underline sm:w-auto sm:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)]"
                >
                  <div className="relative aspect-video overflow-hidden border-b border-edge bg-ash">
                    <NewsImage image={post.image} title={post.title} />
                    <span className="absolute top-3 left-3 bg-night/80 px-2.5 py-1 font-code text-[10px] tracking-[2px] text-volt uppercase backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>
                  <div className="flex grow flex-col p-6">
                    {post.dateLabel && (
                      <p className="font-code text-[11px] tracking-[2px] text-fog uppercase">
                        {post.dateLabel}
                      </p>
                    )}
                    <h3 className="mt-2 line-clamp-3 font-display text-lg leading-snug tracking-wide text-white uppercase transition-colors duration-300 group-hover:text-volt-light">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-fog">
                        {post.excerpt}
                      </p>
                    )}
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-5 font-code text-xs tracking-[1.5px] text-volt-light uppercase transition-colors duration-300 group-hover:text-volt">
                      Leer artículo
                      <ArrowUpRight
                        size={14}
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </div>
                </a>
              ))}

              <a
                data-slide
                href={BLOG_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ver todas las noticias en el blog de EHC Group (abre en pestaña nueva)"
                className="group flex w-[85%] shrink-0 snap-start flex-col items-center justify-center gap-4 border border-dashed border-edge-strong bg-coal/40 p-8 text-center no-underline transition-all duration-300 hover:border-volt/60 hover:bg-coal/70 sm:w-auto sm:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)]"
              >
                <span className="flex size-12 items-center justify-center rounded-full border border-volt/40 text-volt-light transition-all duration-300 group-hover:bg-volt group-hover:text-ink">
                  <ArrowUpRight size={20} aria-hidden="true" />
                </span>
                <span className="font-display text-xl tracking-wide text-white uppercase">
                  Ver todas las noticias
                </span>
                <span className="font-code text-xs tracking-[2px] text-fog uppercase">
                  blog.ehcgroup.io
                </span>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
