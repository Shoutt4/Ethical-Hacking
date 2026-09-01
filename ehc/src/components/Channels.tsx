import { useState, useRef } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PARTNERS } from "../lib/data";
import PartnerGlobe, { type PartnerGlobeHandle } from "./PartnerGlobe";
import Reveal from "./Reveal";

interface ChannelsProps {
  onSnack: (message: string) => void;
}

export default function Channels({ onSnack }: ChannelsProps) {
  const reduceMotion = useReducedMotion();
  const [selectedId, setSelectedId] = useState(PARTNERS[0].id);
  const [resetToken, setResetToken] = useState(0);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMsg, setFormMsg] = useState("");
  const selected =
    PARTNERS.find((partner) => partner.id === selectedId) ?? PARTNERS[0];

  const selectPartner = (id: string) => {
    setSelectedId(id);
  };

  const globeRef = useRef<PartnerGlobeHandle>(null);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!formName.trim() || !formEmail.trim())
      return onSnack(
        `Completa nombre y email para contactar a ${selected.name}.`,
      );
    onSnack(
      `Solicitud enviada a ${selected.name} (${selected.country}). Te contactarán pronto.`,
    );
    setFormName("");
    setFormEmail("");
    setFormMsg("");
  };

  return (
    <section
      id="canales"
      className="channels-section relative scroll-mt-24 overflow-hidden bg-night py-28 md:py-40"
    >
       
      <div className="relative mx-auto w-full max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="section-eyebrow">/ 06 · Canales</p>
          <h2 className="section-title mt-7">
            Una red que responde <span className="text-volt">cerca.</span>
          </h2>
          <p className="mt-6 max-w-[54ch] text-lg leading-8 text-mist">
            Trabajamos junto a socios estratégicos en América para dar respuesta
            experta, local y oportuna.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:gap-16">
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
                <span className="size-1.5 animate-pulse rounded-full bg-rose-200" />{" "}
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
            <div className="map-actions mt-5">
              {PARTNERS.map((partner) => (
                <button
                  key={partner.id}
                  type="button"
                  onClick={() => {
                    selectPartner(partner.id)
                    globeRef.current?.focusPartner(partner)
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

          <Reveal delay={0.12}>
            <div className="channel-detail min-h-[32rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={selected.id}
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, y: 16, filter: "blur(3px)" }
                  }
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={
                    reduceMotion
                      ? undefined
                      : { opacity: 0, y: -10, filter: "blur(2px)" }
                  }
                  transition={{
                    duration: reduceMotion ? 0 : 0.32,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex flex-col gap-6"
                >
                  <div>
                    <h3 className="mt-1 font-display text-4xl tracking-[-.06em] text-white">
                      {selected.name}
                    </h3>
                    <p className="mt-1 font-code text-xs tracking-[.12em] text-fog uppercase">
                      {selected.country} · {selected.city}
                    </p>
                  </div>
                  <div className="grid gap-3">
                    <div className="contact-link-item">
                      <span className="contact-link-label">Email</span>
                      <span className="contact-link-value">
                        {selected.email}
                      </span>
                    </div>
                    <div className="contact-link-item">
                      <span className="contact-link-label">Tel</span>
                      <span className="contact-link-value">
                        {selected.phone}
                      </span>
                    </div>
                    {selected.website && (
                      <div className="contact-link-item">
                        <span className="contact-link-label">Web</span>
                        <span className="contact-link-value">
                          {selected.website}
                        </span>
                      </div>
                    )}
                    <div className="contact-link-item">
                      <span className="contact-link-label">Servicios</span>
                      <span className="contact-link-value">
                        {selected.services.join(" · ")}
                      </span>
                    </div>
                  </div>
                  <div className="border-t border-edge pt-4">
                    <p className="mb-3 font-code text-[10px] tracking-[.12em] text-fog uppercase">
                      Contactar a {selected.name}
                    </p>
                    <form onSubmit={submit} className="flex flex-col gap-3">
                      <input
                        id="partner-country"
                        readOnly
                        value={`${selected.country} · ${selected.name}`}
                        className="detail-field cursor-default text-cyan-100"
                      />
                      <input
                        type="text"
                        placeholder="Tu nombre"
                        value={formName}
                        onChange={(event) => setFormName(event.target.value)}
                        className="detail-field"
                        required
                      />
                      <input
                        type="email"
                        placeholder="Tu email"
                        value={formEmail}
                        onChange={(event) => setFormEmail(event.target.value)}
                        className="detail-field"
                        required
                      />
                      <textarea
                        rows={3}
                        placeholder="Mensaje"
                        value={formMsg}
                        onChange={(event) => setFormMsg(event.target.value)}
                        className="detail-field resize-y"
                      />
                      <button
                        type="submit"
                        className="mt-1 inline-flex items-center justify-center gap-2 bg-cyan-200 px-6 py-3 font-code text-[11px] font-bold tracking-[1.5px] text-ink uppercase transition-colors hover:bg-white active:translate-y-px"
                      >
                        Enviar solicitud →
                      </button>
                    </form>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
