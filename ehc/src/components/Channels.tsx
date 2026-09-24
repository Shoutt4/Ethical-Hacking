import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Reveal } from './Reveal'
import { CHANNEL_PARTNERS } from '../data/channelPartners'
import pentestLogo from '../assets/pentest365/logos/pentest365-logo-nav.png'

const CHANNEL_COPY =
  'Nuestra misión es crear software de ciberseguridad que permita a otras organizaciones evaluar de forma inteligente y persistente su seguridad, riesgos y vulnerabilidades tecnológicas y, gracias a nuestro programa de canales, podemos llegar cada vez a más y más organizaciones. ¿Estas interesado en nuestro programa de canales? Escríbenos.'

const CHANNEL_DISTRIBUTION_COPY =
  'Se distribuye a través de un programa de canales asociados, nuestros socios se enumeran a continuación.'

const siteHref = (url: string) =>
  /^https?:\/\//i.test(url) ? url : `https://${url}`

const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, '')}`

const pad = (n: number) => String(n).padStart(2, '0')

export function Channels() {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [form, setForm] = useState({
    company: '',
    email: '',
    licence: '',
    message: '',
  })
  const [sent, setSent] = useState(false)

  const count = CHANNEL_PARTNERS.length
  const partner = CHANNEL_PARTNERS[index]

  const prev = () => setIndex((i) => (i - 1 + count) % count)
  const next = () => setIndex((i) => (i + 1) % count)

  const field =
    (key: keyof typeof form) =>
    (
      e: ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  const resetForm = () => {
    setForm({ company: '', email: '', licence: '', message: '' })
    setSent(false)
  }

  return (
    <section id="canales" className="section channels">
      <Reveal>
        <p className="eyebrow">
          <span aria-hidden="true"></span> PROGRAMA DE CANALES{' '}
          <span aria-hidden="true"></span>
        </p>
        <h2>
          Crece con nuestro <em>ecosistema de ciberseguridad</em>
        </h2>
        <p className="section-copy channel-copy">{CHANNEL_COPY}</p>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="channel-grid">
          <AnimatePresence mode="wait" initial={false}>
            {sent ? (
              <motion.div
                key="success"
                className="channel-form channel-success"
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.26, ease: 'easeOut' }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  height: '100%',
                  minHeight: '450px',
                  width: '100%',
                  padding: '2rem 1.5rem',
                  boxSizing: 'border-box'
                }}
              >

                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: '#e6f7ff',
                    color: '#00a3e0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem'
                  }}
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>

                <p
                  style={{
                    color: '#00a3e0',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem'
                  }}
                >
                  ENVIADO CORRECTAMENTE
                </p>

                <h3
                  style={{
                    fontSize: '1.875rem',
                    fontWeight: 700,
                    color: '#0f172a',
                    margin: '0 0 0.75rem 0',
                    lineHeight: 1.2
                  }}
                >
                  Gracias por contactarnos.
                </h3>
                <p
                  style={{
                    color: '#64748b',
                    fontSize: '0.95rem',
                    maxWidth: '340px',
                    margin: '0 0 2rem 0',
                    lineHeight: 1.5
                  }}
                >
                  Un especialista de Ethical Hacking Consultores responderá tu solicitud muy pronto.
                </p>
                <button
                  type="button"
                  className="channel-reset"
                  onClick={resetForm}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#00a3e0',
                    fontSize: '1rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    padding: 0,
                    textDecoration: 'none',
                    margin: '0 auto',
                    display: 'block',
                    textAlign: 'center'
                  }}
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className="channel-form"
                onSubmit={onSubmit}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.26, ease: 'easeOut' }}
              >
                <p className="channel-label">
                  <b>Contacto de canales</b>
                </p>

                <div className="channel-field">
                  <label htmlFor="channel-company">Empresa</label>
                  <input
                    id="channel-company"
                    name="name"
                    type="text"
                    placeholder="Empresa"
                    maxLength={250}
                    inputMode="text"
                    autoComplete="off"
                    value={form.company}
                    onChange={field('company')}
                  />
                </div>

                <div className="channel-field">
                  <label htmlFor="channel-email">E-mail</label>
                  <input
                    id="channel-email"
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    maxLength={250}
                    inputMode="email"
                    autoComplete="off"
                    value={form.email}
                    onChange={field('email')}
                  />
                </div>

                <div className="channel-field">
                  <label htmlFor="channel-licence">Licencia</label>
                  <select
                    id="channel-licence"
                    name="type_of_licence"
                    value={form.licence}
                    onChange={field('licence')}
                  >
                    <option value="" disabled>
                      Escoge una licencia
                    </option>
                    <option value="licencia-todo-en-uno">
                      MSSP
                    </option>
                    <option value="licencia-todo-en-uno">
                      Reseller
                    </option>
                  </select>
                </div>

                <div className="channel-field">
                  <label htmlFor="channel-message">Comentario</label>
                  <textarea
                    id="channel-message"
                    name="message"
                    placeholder="Comentario"
                    maxLength={250}
                    rows={5}
                    aria-label="Comentario"
                    value={form.message}
                    onChange={field('message')}
                  />
                </div>

                <div className="channel-actions">
                  <button
                    type="submit"
                    className="button"
                    aria-label="Enviar Solicitud de DEMO"
                  >
                    Enviar
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="channel-partner">
            <div className="channel-partner-top">
              <p className="channel-label">
                <b>Canales de distribución</b>
              </p>
              <span className="channel-count">
                {pad(index + 1)} / {pad(count)}
              </span>
            </div>

            <div className="channel-brand">
              <img src={pentestLogo} alt="Pentest365" draggable={false} />
              <p>{CHANNEL_DISTRIBUTION_COPY}</p>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={partner.id}
                className="channel-card"
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.26, ease: 'easeOut' }}
              >
                <div className="partner-stage">
                   
                  <img
                    src={partner.logo}
                    alt={`Logo de ${partner.name}`}
                    draggable={false}
                  />
                </div>

                <div className="partner-info">
                  <h3>{partner.name}</h3>
                  <p className="partner-country">{partner.country}</p>

                  <dl className="partner-contact">
                    {partner.phone ? (
                      <div>
                        <dt>Teléfono</dt>
                        <dd>
                          <a href={telHref(partner.phone)}>{partner.phone}</a>
                        </dd>
                      </div>
                    ) : null}
                    <div>
                      <dt>Sitio web</dt>
                      <dd>
                        <a
                          href={siteHref(partner.website)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {partner.website}
                          <span aria-hidden="true"> ↗</span>
                        </a>
                      </dd>
                    </div>
                    {partner.email ? (
                      <div>
                        <dt>Email</dt>
                        <dd>
                          <a href={`mailto:${partner.email}`}>
                            {partner.email}
                          </a>
                        </dd>
                      </div>
                    ) : null}
                  </dl>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="partner-nav">
              <button
                type="button"
                className="channel-arrow"
                onClick={prev}
                aria-label="Partner anterior"
              >
                <span aria-hidden="true">←</span>
              </button>
              <span className="partner-dots" aria-hidden="true">
                {CHANNEL_PARTNERS.map((p, i) => (
                  <i key={p.id} className={i === index ? 'on' : ''} />
                ))}
              </span>
              <button
                type="button"
                className="channel-arrow"
                onClick={next}
                aria-label="Partner siguiente"
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}