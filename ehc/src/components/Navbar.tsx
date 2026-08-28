
import { useEffect, useState } from 'react'
import { NAV_LINKS } from '../lib/data'
import { BTN_PRIMARY, BTN_SM } from '../lib/ui'
import logo from '../assets/logo.png'
interface NavbarProps {
  onSnack: (msg: string) => void
}

const SECTION_IDS = NAV_LINKS.map(l => l.href.slice(1))

export default function Navbar({ onSnack }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [langEs, setLangEs] = useState(true)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })

    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const toggleLang = () => {
    setLangEs(prev => {
      onSnack(!prev ? 'Prototype: EN content pending.' : 'Prototipo: contenido ES activo.')
      return !prev
    })

    document.documentElement.lang = langEs ? 'en' : 'es'
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-night/80 backdrop-blur-md transition-colors duration-200 ${
        scrolled ? 'border-edge' : 'border-transparent'
      }`}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between gap-6 px-5 md:px-8">

        {/* Logo */}
        <a
          href="#top"
          aria-label="EHC Group — inicio"
          className="inline-flex items-center no-underline"
        >
          <img
            src={logo}
            alt="EHC Group"
            className="h-[45px] w-auto object-contain"
          />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`border-b pb-1 text-[13px] font-bold uppercase tracking-[1.5px] transition-colors duration-150 ${
                active === link.href.slice(1)
                  ? 'border-volt text-volt-light'
                  : 'border-transparent text-mist hover:text-volt-light'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3.5">
          <button
            type="button"
            onClick={toggleLang}
            aria-label="Cambiar idioma (prototipo)"
            className="hidden cursor-pointer border-none bg-none px-1 py-2 font-code text-xs text-fog sm:block"
          >
            <span className={langEs ? 'text-volt-light' : 'opacity-50'}>
              ES
            </span>
            <i className="not-italic opacity-50">/</i>
            <span className={langEs ? 'opacity-50' : 'text-volt-light'}>
              EN
            </span>
          </button>

          <a
            href="#contacto"
            className={`${BTN_PRIMARY} ${BTN_SM} hidden md:inline-flex`}
          >
            Contáctanos
          </a>

          <button
            type="button"
            onClick={() => setOpen(prev => !prev)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            className="relative block h-[42px] w-[42px] cursor-pointer border border-edge bg-transparent lg:hidden"
          >
            <span
              className={`absolute right-[10px] left-[10px] h-0.5 bg-white transition-transform duration-250 ${
                open
                  ? 'top-1/2 -translate-y-1/2 rotate-45'
                  : 'top-[13px]'
              }`}
            />

            <span
              className={`absolute top-1/2 right-[10px] left-[10px] h-0.5 -translate-y-1/2 bg-white transition-opacity duration-200 ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />

            <span
              className={`absolute right-[10px] left-[10px] h-0.5 bg-white transition-transform duration-250 ${
                open
                  ? 'top-1/2 -translate-y-1/2 -rotate-45'
                  : 'bottom-[13px]'
              }`}
            />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-9 bg-night/95 px-6 pt-20 backdrop-blur-md ${
          open ? '' : 'hidden!'
        }`}
      >
        {NAV_LINKS.map(link => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="font-display text-3xl tracking-[3px] text-white uppercase no-underline hover:text-volt-light"
          >
            {link.label}
          </a>
        ))}

        <a
          href="#contacto"
          onClick={() => setOpen(false)}
          className={`${BTN_PRIMARY} mt-4 min-w-[220px]`}
        >
          Contáctanos
        </a>
      </div>
    </header>
  )
}
