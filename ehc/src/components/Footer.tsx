import { HexCheck } from './Hex'

export default function Footer() {
  return (
    <footer className="relative mt-24 bg-[#080808]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 left-[-2%] h-12 w-[104%] -skew-y-2 border-t border-edge bg-[#080808]"
      />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-16 pb-10 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#top" aria-label="EHC Group — volver arriba" className="inline-flex items-center gap-2.5 no-underline">
              <HexCheck className="h-[70px] w-[220px]" />
              <span className="font-display text-[22px] tracking-[3px] text-white">
                
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-fog">
              Firma consultora en Seguridad de la Información. Pentesting, compliance ISO 27001 y respuesta a
              incidentes desde 2001.
            </p>
          </div>

          <nav aria-label="Servicios" className="text-sm">
            <p className="mb-3 font-code text-[11px] tracking-[3px] text-fog uppercase">Servicios</p>
           {/*ASDsdoas[pdoaspdoaspoaspdspok;lml,km] <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {SERVICES_FOOTER.map(item => (
                <li key={item}>
                  <a href="#servicios" className="no-underline transition-colors duration-150 hover:text-volt-light">
                    {item}
                  </a>
                </li>
              ))}
            </ul>/}
          </nav>

          <nav aria-label="Secciones" className="text-sm">
            <p className="mb-3 font-code text-[11px] tracking-[3px] text-fog uppercase">Secciones</p>
           {/* <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <a href={link.href} className="no-underline transition-colors duration-150 hover:text-volt-light">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contacto" className="no-underline transition-colors duration-150 hover:text-volt-light">
                  Contacto
                </a>
              </li>
            </ul>*/}
          </nav>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-edge pt-6 font-code text-xs text-fog">
          <p>© 2001–2026 EHC Group. Todos los derechos reservados.</p>
          <p title="Encontraste el flag">flag{'{'}Yeah! you find the EHC Flag{'}'}</p>
        </div>
      </div>
    </footer>
  )
}
