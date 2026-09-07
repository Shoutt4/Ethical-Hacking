import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import Reveal from './Reveal'

interface ContactProps {
  onSnack: (msg: string) => void
}

interface Fields {
  nombre: string
  email: string
  empresa: string
  pais: string
  mensaje: string
  privacidad: boolean
}

const INITIAL: Fields = {
  nombre: '',
  email: '',
  empresa: '',
  pais: '',
  mensaje: '',
  privacidad: false,
}

type FieldErrors = Partial<Record<'nombre' | 'email' | 'mensaje' | 'privacidad', string>>

const FIELD_BASE =
  'w-full border border-edge bg-night px-4 py-3 font-cond text-base text-white transition-colors duration-150 placeholder:text-fog/70 focus:border-volt focus:outline-none'

export default function Contact({ onSnack }: ContactProps) {
  const [fields, setFields] = useState<Fields>(INITIAL)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [loading, setLoading] = useState(false)

  const update = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = e.target instanceof HTMLInputElement ? e.target.checked : false
    setFields(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const next: FieldErrors = {}
    if (!fields.nombre.trim()) next.nombre = 'Ingresa tu nombre.'
    if (!/^\S+@\S+\.\S+$/.test(fields.email)) next.email = 'Email inválido.'
    if (!fields.mensaje.trim()) next.mensaje = 'Cuéntanos qué necesitas.'
    if (!fields.privacidad) next.privacidad = 'Debes aceptar la política de privacidad.'
    setErrors(next)

    if (Object.keys(next).length > 0) {
      onSnack('Revisa los campos marcados.')
      return
    }

    setLoading(true)
    window.setTimeout(() => {
      setLoading(false)
      setFields(INITIAL)
      onSnack('flag{Well done!} Mensaje enviado. Te contactamos en breve.')
    }, 900)
  }

  return (
    <section id="contacto" className="scroll-mt-24 border-t border-edge bg-coal py-24 md:py-32">
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-5 md:grid-cols-[1fr_1.2fr] md:gap-20 md:px-8">
        <Reveal>
          <p className="font-code text-xs tracking-[3px] text-volt-light">// CONTACTO</p>
          <h2 className="mt-3 font-display text-[clamp(30px,4.5vw,54px)] leading-[1.02] tracking-wide text-white uppercase">
            Hablemos de tu seguridad
          </h2>
          <p className="mt-4 max-w-md font-josef text-lg leading-relaxed font-light text-mist">
            Cuéntanos el contexto y te proponemos un alcance en menos de 24 horas hábiles.
          </p>
          <ul className="mt-8 flex list-none flex-col gap-2 p-0">
            <li className="font-code text-sm text-volt-light">contacto@ehcgroup.io</li>
            <li className="font-code text-sm text-fog">+52 · +507 · +511 · LATAM</li>
          </ul>
        </Reveal>

        <Reveal>
          <form noValidate onSubmit={submit} className="flex flex-col gap-4 border border-edge bg-night p-6 md:p-9">
            <label htmlFor="f-nombre" className="font-code text-xs tracking-wide text-fog uppercase">
              Nombre *
            </label>
            <input
              id="f-nombre"
              name="nombre"
              value={fields.nombre}
              onChange={update}
              aria-invalid={!!errors.nombre}
              placeholder="Ada Lovelace"
              className={`${FIELD_BASE} ${errors.nombre ? 'border-[#EF5D61]' : ''}`}
            />
            {errors.nombre && <p className="-mt-2 font-code text-xs text-[#EF5D61]">{errors.nombre}</p>}

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-x-4">
              <span className="flex flex-col gap-4">
                <label htmlFor="f-email" className="font-code text-xs tracking-wide text-fog uppercase">
                  Email *
                </label>
                <input
                  id="f-email"
                  name="email"
                  type="email"
                  value={fields.email}
                  onChange={update}
                  aria-invalid={!!errors.email}
                  placeholder="ada@empresa.com"
                  className={FIELD_BASE}
                />
              </span>
              <span className="flex flex-col gap-4">
                <label htmlFor="f-empresa" className="font-code text-xs tracking-wide text-fog uppercase">
                  Empresa
                </label>
                <input id="f-empresa" name="empresa" value={fields.empresa} onChange={update} placeholder="ACME Corp" className={FIELD_BASE} />
              </span>
            </div>
            {errors.email && <p className="-mt-2 font-code text-xs text-[#EF5D61]">{errors.email}</p>}

            <label htmlFor="f-pais" className="font-code text-xs tracking-wide text-fog uppercase">
              País
            </label>
            <select
              id="f-pais"
              name="pais"
              value={fields.pais}
              onChange={update}
              className={`${FIELD_BASE} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%228%22%3E%3Cpath%20d%3D%22M1%201l5%205%205-5%22%20fill%3D%22none%22%20stroke%3D%22%237FCC27%22%20stroke-width%3D%222%22/%3E%3C/svg%3E')] bg-[position:right_14px_center] bg-no-repeat pr-10`}
            >
              <option value="">Selecciona…</option>
              <option>México</option>
              <option>Panamá</option>
              <option>Perú</option>
              <option>Colombia</option>
              <option>Costa Rica</option>
              <option>Guatemala</option>
              <option>España</option>
              <option>Otro</option>
            </select>

            <label htmlFor="f-mensaje" className="font-code text-xs tracking-wide text-fog uppercase">
              Mensaje *
            </label>
            <textarea
              id="f-mensaje"
              name="mensaje"
              rows={5}
              value={fields.mensaje}
              onChange={update}
              aria-invalid={!!errors.mensaje}
              placeholder="Queremos evaluar la seguridad de nuestro e-commerce…"
              className={`${FIELD_BASE} resize-y ${errors.mensaje ? 'border-[#EF5D61]' : ''}`}
            />
            {errors.mensaje && <p className="-mt-2 font-code text-xs text-[#EF5D61]">{errors.mensaje}</p>}

            <label htmlFor="f-privacidad" className={`flex cursor-pointer items-center gap-3 ${errors.privacidad ? 'text-[#EF5D61]' : ''}`}>
              <input
                id="f-privacidad"
                name="privacidad"
                type="checkbox"
                checked={fields.privacidad}
                onChange={update}
                className="size-4 shrink-0 cursor-pointer appearance-none border border-edge-strong bg-night checked:border-volt checked:bg-volt checked:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2210%22%20height%3D%228%22%3E%3Cpath%20d%3D%22M1%204l3%203%205-6%22%20fill%3D%22none%22%20stroke%3D%22%230B0B0B%22%20stroke-width%3D%222%22/%3E%3C/svg%3E')] bg-center bg-no-repeat"
              />
              <span className="text-sm">Acepto la política de privacidad *</span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex cursor-pointer items-center justify-center gap-3 bg-volt px-7 py-[15px] text-[13px] font-bold tracking-[1.5px] text-ink uppercase transition-colors duration-150 hover:bg-volt-light active:translate-y-px disabled:cursor-wait disabled:opacity-60"
            >
              {loading && (
                <span
                  aria-hidden="true"
                  className="inline-block size-3.5 animate-[spin_0.8s_linear_infinite] border-2 border-ink/30 border-t-ink"
                />
              )}
              {loading ? 'Enviando…' : 'Enviar solicitud →'}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
