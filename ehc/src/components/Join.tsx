import { Hex } from './Hex'

export default function Join() {
  return (
    <section id="oportunidades" className="scroll-mt-24 border-t border-edge bg-coal py-24 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 text-center md:px-8">
        <Hex className="mx-auto mb-6 size-14 animate-[spin_1.4s_linear_infinite] text-volt" />
        <h2 className="font-display text-[clamp(30px,4.5vw,54px)] leading-[1.02] tracking-wide text-white uppercase">
          ¿Quieres atacar del lado del bien?
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-josef text-lg font-light text-mist">
          Buscamos pentesters, forensic analysts y consultores ISO en toda la región. Modalidad híbrida y retos reales
          todos los días.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <a
            href="#contacto"
            className="bg-volt px-7 py-[15px] text-[13px] font-bold tracking-[1.5px] text-ink uppercase no-underline transition-colors duration-150 hover:bg-volt-light active:translate-y-px"
          >
            Ver oportunidades
          </a>
          <span className="inline-flex items-center px-2 py-[15px] font-code text-xs tracking-wide text-fog">
            flag{'{'}Yeah! you find the EHC Flag{'}'}
          </span>
        </div>
      </div>
    </section>
  )
}
