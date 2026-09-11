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

type FieldErrors = Partial<
  Record<
    'nombre' | 'email' | 'mensaje' | 'privacidad',
    string
  >
>

const FIELD_BASE =
  'w-full border border-gray-300 bg-white px-4 py-3 font-cond text-base text-gray-900 transition-colors duration-150 placeholder:text-gray-400 focus:border-[#7FCC27] focus:outline-none'

export default function Contact({ onSnack }: ContactProps) {
  const [fields, setFields] = useState<Fields>(INITIAL)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [loading, setLoading] = useState(false)

  const update = (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target
    const checked =
      e.target instanceof HTMLInputElement ? e.target.checked : false

    setFields(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const next: FieldErrors = {}

    if (!fields.nombre.trim()) next.nombre = 'Ingresa tu nombre.'
    if (!fields.email.trim()) {
      next.email = 'Ingresa tu email.'
    } else if (!/^\S+@\S+\.\S+$/.test(fields.email)) {
      next.email = 'Email inválido.'
    }
    if (!fields.mensaje.trim()) next.mensaje = 'Cuéntanos qué necesitas.'
    if (!fields.privacidad) next.privacidad = 'Debes aceptar la política de privacidad.'

    setErrors(next)

    if (Object.keys(next).length > 0) {
      onSnack('Revisa los campos marcados.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('https://formspree.io/f/xrpgleao', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _subject: 'Nueva solicitud de contacto - EHC Group',
          nombre: fields.nombre.trim(),
          email: fields.email.trim(),
          empresa: fields.empresa.trim(),
          pais: fields.pais,
          mensaje: fields.mensaje.trim(),
        }),
      })

      if (response.ok) {
        setFields(INITIAL)
        setErrors({})
        onSnack('Mensaje enviado. Te contactamos en breve.')
        return
      }

      const data = await response.json().catch(() => null)
      console.error('Error de Formspree:', data)
      onSnack('No se pudo enviar el mensaje. Inténtalo nuevamente.')
    } catch (error) {
      console.error('Error enviando formulario:', error)
      onSnack('Ocurrió un error al enviar el mensaje.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="contacto"
      className="relative scroll-mt-24 border-t border-gray-200 py-24 md:py-32 overflow-hidden bg-white"
    >
      {/* MAPA DE FONDO Y PIN (ESTILO APPLE MAPS) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#f9f7f2]">
        
        <div className="absolute inset-0 bg-white/20 z-10"></div>
        
        <div className="absolute w-[200vw] h-[200vh] top-[50%] left-[50%] md:top-[80%] md:left-[30%] -translate-x-1/2 -translate-y-1/2 z-0">
          
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.6974127926177!2d-79.5199676!3d8.9822453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8faca8e48b816283%3A0xc66c1f1f2e1a3290!2sGlobal%20Bank%20Tower!5e0!3m2!1ses!2spa!4v1715000000000!5m2!1ses!2spa"
            className="absolute inset-0 w-full h-full border-0 filter saturate-[50%] sepia-[20%] hue-rotate-[-5deg] contrast-[1.05] brightness-[1.05] opacity-90"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa Torre Global Bank"
          ></iframe>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[85%] flex flex-col items-center animate-bounce z-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#FF3B30"
              className="w-14 h-14 drop-shadow-md"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <div className="w-5 h-1.5 bg-black/30 rounded-[100%] blur-[2px] mt-1"></div>
          </div>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative z-20 mx-auto grid w-full max-w-7xl gap-10 px-5 md:grid-cols-[1.6fr_1fr] md:gap-16 md:px-8">

        {/* COLUMNA IZQUIERDA: Textos Flotantes */}
        <Reveal>
          <div className="relative p-0 md:py-12 flex flex-col self-start z-10">
            
            <div className="absolute -inset-10 bg-white/70 blur-3xl -z-10 rounded-full pointer-events-none hidden md:block"></div>
            
            <div>
              <p className="font-code text-xs tracking-[3px] text-[#7FCC27] font-bold [text-shadow:0_0_10px_white]">
                // CONTACTO
              </p>

              <h2 className="mt-3 font-display text-[clamp(30px,4.5vw,54px)] leading-[1.02] tracking-wide text-black uppercase font-black [text-shadow:0_0_15px_white,0_0_5px_white]">
                Contacta con<br />nosotros
              </h2>

              
            </div>

            <div className="mt-10 pt-8 border-t border-gray-300">
              <ul className="flex list-none flex-col gap-5 p-0">
                <li className="font-code text-sm font-bold text-[#7FCC27] flex items-center gap-3 [text-shadow:0_0_8px_white]">
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  contacto@ehcgroup.io
                </li>
                
                <li className="font-code text-sm text-black font-bold flex items-start gap-3 [text-shadow:0_0_8px_white] hover:text-[#7FCC27] transition-colors">
                  <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <a 
                    href="https://maps.apple.com/?ll=8.982245,-79.519967&q=Global+Bank+Tower" 
                    target="_blank" 
                    rel="noreferrer"
                    className="cursor-pointer"
                  >
                    Calle 50, Torre Global Bank, Piso 16, Oficina 1606, Ciudad de Panamá
                  </a>
                </li>

                <li className="font-code text-sm text-black font-bold flex items-center gap-3 [text-shadow:0_0_8px_white]">
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  +507 3873850 · LATAM
                </li>
              </ul>
            </div>
          </div>
        </Reveal>

        {/* COLUMNA DERECHA: Formulario */}
        <Reveal>
          <form
            noValidate
            onSubmit={submit}
            className="flex flex-col gap-4 border border-gray-200 bg-white p-6 md:p-10 shadow-2xl rounded-sm h-full"
          >
            <label
              htmlFor="f-nombre"
              className="font-code text-xs tracking-wide text-gray-500 uppercase font-bold"
            >
              Nombre *
            </label>
            <input
              id="f-nombre"
              name="nombre"
              type="text"
              value={fields.nombre}
              onChange={update}
              aria-invalid={!!errors.nombre}
              placeholder="Ada Lovelace"
              className={`${FIELD_BASE} ${
                errors.nombre ? 'border-red-500' : ''
              }`}
            />
            {errors.nombre && (
              <p className="-mt-2 font-code text-xs text-red-500">
                {errors.nombre}
              </p>
            )}

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-x-4">
              <span className="flex flex-col gap-4">
                <label
                  htmlFor="f-email"
                  className="font-code text-xs tracking-wide text-gray-500 uppercase font-bold"
                >
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
                  className={`${FIELD_BASE} ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                />
              </span>

              <span className="flex flex-col gap-4">
                <label
                  htmlFor="f-empresa"
                  className="font-code text-xs tracking-wide text-gray-500 uppercase font-bold"
                >
                  Empresa
                </label>
                <input
                  id="f-empresa"
                  name="empresa"
                  type="text"
                  value={fields.empresa}
                  onChange={update}
                  placeholder="ACME Corp"
                  className={FIELD_BASE}
                />
              </span>
            </div>

            {errors.email && (
              <p className="-mt-2 font-code text-xs text-red-500">
                {errors.email}
              </p>
            )}

            <label
              htmlFor="f-pais"
              className="font-code text-xs tracking-wide text-gray-500 uppercase font-bold"
            >
              País
            </label>
            <select
              id="f-pais"
              name="pais"
              value={fields.pais}
              onChange={update}
              className={`${FIELD_BASE} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%228%22%3E%3Cpath%20d%3D%22M1%201l5%205%205-5%22%20fill%3D%22none%22%20stroke%3D%22%237FCC27%22%20stroke-width%3D%222%22/%3E%3C/svg%3E')] bg-[position:right_14px_center] bg-no-repeat pr-10 cursor-pointer`}
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

            <label
              htmlFor="f-mensaje"
              className="font-code text-xs tracking-wide text-gray-500 uppercase font-bold"
            >
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
              className={`${FIELD_BASE} resize-y ${
                errors.mensaje ? 'border-red-500' : ''
              }`}
            />
            {errors.mensaje && (
              <p className="-mt-2 font-code text-xs text-red-500">
                {errors.mensaje}
              </p>
            )}

            <label
              htmlFor="f-privacidad"
              className={`flex cursor-pointer items-center gap-3 mt-2 ${
                errors.privacidad ? 'text-red-500' : 'text-gray-700'
              }`}
            >
              <input
                id="f-privacidad"
                name="privacidad"
                type="checkbox"
                checked={fields.privacidad}
                onChange={update}
                className="size-4 shrink-0 cursor-pointer appearance-none border border-gray-400 bg-white checked:border-[#7FCC27] checked:bg-[#7FCC27] checked:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2210%22%20height%3D%228%22%3E%3Cpath%20d%3D%22M1%204l3%203%205-6%22%20fill%3D%22none%22%20stroke%3D%22%230B0B0B%22%20stroke-width%3D%222%22/%3E%3C/svg%3E')] bg-center bg-no-repeat transition-colors"
              />
              <span className="text-sm font-medium">
                Acepto la política de privacidad *
              </span>
            </label>
            {errors.privacidad && (
              <p className="-mt-2 font-code text-xs text-red-500">
                {errors.privacidad}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full inline-flex cursor-pointer items-center justify-center gap-3 bg-[#7FCC27] px-7 py-[15px] text-[13px] font-bold tracking-[1.5px] text-gray-900 uppercase transition-colors duration-150 hover:bg-[#8fe530] active:translate-y-px disabled:cursor-wait disabled:opacity-60"
            >
              {loading && (
                <span
                  aria-hidden="true"
                  className="inline-block size-3.5 animate-[spin_0.8s_linear_infinite] border-2 border-gray-900/30 border-t-gray-900"
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