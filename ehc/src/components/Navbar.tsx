import { useEffect, useState } from 'react'
import { NAV_LINKS } from '../lib/data'
import logo from '../assets/logo.png'

interface NavbarProps {
  onSnack: (msg: string) => void
}

export default function Navbar({ onSnack }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  // Detectar scroll
  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 16)
    }

    update()

    window.addEventListener('scroll', update, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', update)
    }
  }, [])

  // Detectar sección activa
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-45% 0px -48% 0px',
      }
    )

    NAV_LINKS.forEach(({ href }) => {
      const section = document.querySelector(href)

      if (section) {
        observer.observe(section)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <header
      className="island-nav"
      data-scrolled={scrolled}
    >
      <div className="flex h-15 items-center justify-between px-4 sm:px-5">

        {/* Logo */}
        <a
          href="#top"
          className="flex items-center gap-2"
          aria-label="EHC Group — Inicio"
        >
          <img
            src={logo}
            alt="EHC Group"
            className="ml-6 mt-1 h-9 w-auto"
          />
        </a>

        {/* Navegación Desktop */}
        <nav
          aria-label="Principal"
          className="hidden items-center gap-6 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={
                active === link.href.slice(1)
                  ? 'page'
                  : undefined
              }
              className="nav-link font-code text-[11px] tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Acciones */}
        <div className="flex items-center gap-3">

          {/* Idioma */}
          <button
            type="button"
            onClick={() =>
              onSnack('Contenido en español activo.')
            }
            className="hidden cursor-pointer border-0 bg-transparent font-code text-[11px] text-fog sm:block"
          >
            ES
          </button>

          {/* Botón contacto Desktop */}
          <a
            href="#contacto"
            className=" mr-6 cta-primary hidden md:inline-flex"
          >
            Contactanos
            <span className="cta-primary__arrow">↗</span>
          </a>

          {/* Botón menú móvil */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid size-9 cursor-pointer place-items-center rounded-full border border-edge bg-transparent text-lg text-white lg:hidden"
          >
            {open ? '×' : '☰'}
          </button>

        </div>
      </div>

      {/* Menú móvil */}
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Menú móvil"
          className="border-t border-edge px-6 py-7 lg:hidden"
        >
          <div className="flex flex-col gap-5">

            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="nav-link font-display text-2xl text-white"
              >
                {link.label}
              </a>
            ))}

            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="cta-primary mt-2 w-max"
            >
              Contáctanos
              <span className="cta-primary__arrow">↗</span>
            </a>

          </div>
        </nav>
      )}
    </header>
  )
}