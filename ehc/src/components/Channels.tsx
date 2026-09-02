import { useState, useRef } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { PARTNERS } from "../lib/data";
import PartnerGlobe, {
type PartnerGlobeHandle,
} from "./PartnerGlobe";
import Reveal from "./Reveal";

interface ChannelsProps {
onSnack: (message: string) => void;
}

export default function Channels({ onSnack }: ChannelsProps) {
const reduceMotion = useReducedMotion();

const [selectedId, setSelectedId] = useState(PARTNERS[0].id);
const [resetToken, setResetToken] = useState(0);

// Formulario general
const [formName, setFormName] = useState("");
const [formEmail, setFormEmail] = useState("");
const [formMsg, setFormMsg] = useState("");

const globeRef = useRef<PartnerGlobeHandle>(null);

const selected =
PARTNERS.find((partner) => partner.id === selectedId) ??
PARTNERS[0];

const selectPartner = (id: string) => {
setSelectedId(id);
};

// Formulario general, independiente del partner seleccionado
const submit = (event: FormEvent) => {
event.preventDefault();

if (!formName.trim() || !formEmail.trim() || !formMsg.trim()) {
  return onSnack(
    "Completa todos los campos del formulario para enviar tu solicitud.",
  );
}

onSnack(
  "Solicitud enviada correctamente. El equipo de EHCGroup se pondrá en contacto contigo pronto.",
);

setFormName("");
setFormEmail("");
setFormMsg("");

};

return (
<section id="canales" className="channels-section relative scroll-mt-24 overflow-hidden bg-night py-28 md:py-40" >
<div className="relative mx-auto w-full max-w-7xl px-5 md:px-8">
<Reveal>
<p className="section-eyebrow">/ 06 · Canales</p>

      <h2 className="section-title mt-4">
        Sé parte de nuestra red de{" "}
        <span className="text-volt">canales.</span>
      </h2>

      <p className="mt-6 text-lg leading-8 text-mist">
        Los servicios de EHCGroup son manejados por varios socios
        estratégicos alrededor de América y Europa mediante nuestro
        programa de canales.
      </p>

      <p className="mt-3 text-lg leading-8 text-mist">
        Si usted es un vendedor y desea ser parte integrante de nuestra
        red, puede ponerse en contacto con nosotros mediante el siguiente
        formulario.
      </p>
    </Reveal>

    <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-start lg:gap-16">
      {/* ==================== GLOBO Y SOCIOS ==================== */}
      <Reveal>
        <div className="globe-shell">
          <PartnerGlobe
            ref={globeRef}
            partners={PARTNERS}
            selectedId={selectedId}
            resetToken={resetToken}
            onSelect={(partner) => selectPartner(partner.id)}
          />

          <div className="absolute top-5 left-5 flex items-center gap-2 font-code text-[10px] tracking-[.14em] text-cyan-100/70 uppercase">
            <span className="size-1.5 animate-pulse rounded-full bg-rose-200" />
            Red de socios
          </div>

          <button
            type="button"
            onClick={() => {
              setResetToken((token) => token + 1);
              setSelectedId(PARTNERS[0].id);
            }}
            className="absolute top-4 right-4 z-20 border border-cyan-100/15 bg-night/70 px-3 py-2 font-code text-[10px] tracking-[.12em] text-cyan-100/70 uppercase backdrop-blur transition-colors hover:border-cyan-300 hover:text-cyan-200"
          >
            Restablecer vista
          </button>
        </div>

        {/* Lista de empresas */}
        <div className="map-actions mt-5">
          {PARTNERS.map((partner) => (
            <button
              key={partner.id}
              type="button"
              onClick={() => {
                selectPartner(partner.id);
                globeRef.current?.focusPartner(partner);
              }}
              aria-pressed={partner.id === selectedId}
              className="map-list-item"
            >
              <span>{partner.country}</span>
              <b>{partner.name}</b>
            </button>
          ))}
        </div>
      </Reveal>

      {/* ==================== INFORMACIÓN + FORMULARIO ==================== */}
      <Reveal delay={0.12}>
        <div className="channel-detail">
          
          {/* INFORMACIÓN DE LA EMPRESA SELECCIONADA */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={selected.id}
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 16,
                      filter: "blur(3px)",
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              exit={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: -10,
                      filter: "blur(2px)",
                    }
              }
              transition={{
                duration: reduceMotion ? 0 : 0.32,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col gap-6"
            >
              <div>
                <p className="font-code text-[10px] tracking-[.14em] text-cyan-200 uppercase">
                  Socio estratégico
                </p>

                <h3 className="mt-2 font-display text-3xl tracking-[-.06em] text-white">
                  {selected.name}
                </h3>

                <p className="mt-2 font-code text-xs tracking-[.12em] text-white/70">
                  {selected.country} · {selected.city}
                </p>
              </div>

              <div className="grid gap-3">
                <div className="contact-link-item">
                  <span className="contact-link-label">
                    Email
                  </span>

                  <span className="contact-link-value">
                    {selected.email}
                  </span>
                </div>

                <div className="contact-link-item">
                  <span className="contact-link-label">
                    Teléfono
                  </span>

                  <span className="contact-link-value">
                    {selected.phone}
                  </span>
                </div>

                {selected.website && (
                  <div className="contact-link-item">
                    <span className="contact-link-label">
                      Sitio web
                    </span>

                    <span className="contact-link-value">
                      {selected.website}
                    </span>
                  </div>
                )}

                <div className="contact-link-item">
                  <span className="contact-link-label">
                    Servicios
                  </span>

                  <span className="contact-link-value">
                    {selected.services.join(" · ")}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ==================== FORMULARIO GENERAL ==================== */}
          <div className="mt-10 border-t border-edge pt-8">
            <div className="mb-5">
              <p className="font-code text-[10px] tracking-[.14em] text-cyan-200 uppercase">
                Programa de canales
              </p>

              <h3 className="mt-2 font-display text-2xl tracking-[-.04em] text-white">
                ¿Quieres ser parte de nuestra red?
              </h3>

              <p className="mt-3 text-sm leading-6 text-mist">
                Déjanos tus datos y nuestro equipo se pondrá en contacto
                contigo para brindarte más información sobre nuestro
                programa de canales.
              </p>
            </div>

            <form
              onSubmit={submit}
              className="flex flex-col gap-3"
            >
              <input
                type="text"
                placeholder="Tu nombre"
                value={formName}
                onChange={(event) =>
                  setFormName(event.target.value)
                }
                className="detail-field"
                required
              />

              <input
                type="email"
                placeholder="Tu email"
                value={formEmail}
                onChange={(event) =>
                  setFormEmail(event.target.value)
                }
                className="detail-field"
                required
              />

              <textarea
                rows={4}
                placeholder="Cuéntanos cómo te gustaría formar parte de nuestra red"
                value={formMsg}
                onChange={(event) =>
                  setFormMsg(event.target.value)
                }
                className="detail-field resize-y"
                required
              />

              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center gap-2 bg-cyan-200 px-6 py-3 font-code text-[11px] font-bold tracking-[1.5px] text-ink uppercase transition-colors hover:bg-white active:translate-y-px"
              >
                Enviar solicitud →
              </button>
            </form>
          </div>
        </div>
      </Reveal>
    </div>
  </div>
</section>

);
}