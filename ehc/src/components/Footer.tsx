import { HexCheck } from './Hex'
import { NAV_LINKS, SERVICES } from '../lib/data'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#top" aria-label="EHC Group — volver arriba" className="inline-flex items-center gap-2.5 no-underline">
              <HexCheck className="h-12 w-auto" />
            </a>
            <p>
              Consultoría en seguridad de la información. Pentesting, compliance ISO 27001 y respuesta a incidentes desde 2001.
            </p>
          </div>

          <nav aria-label="Servicios">
            <p>Servicios</p>
            <ul>
              {SERVICES.slice(0, 4).map((service) => (
                <li key={service.id}><a href="#servicios">{service.tab}</a></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Secciones">
            <p>Secciones</p>
            <ul>
              {NAV_LINKS.slice(1, 6).map((link) => (
                <li key={link.href}><a href={link.href}>{link.label}</a></li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="footer-bottom">
          <p>© 2001–2026 EHC Group. Todos los derechos reservados.</p>
          <a href="#contacto">contacto@ehcgroup.io</a>
        </div>
      </div>
    </footer>
  )
}
