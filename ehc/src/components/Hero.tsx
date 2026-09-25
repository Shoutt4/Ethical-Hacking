import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { ConstellationBg } from "./ConstellationBg";
import hero from "../assets/hero.png";

export function Dashboard({ mode = "overview" }: { mode?: string }) {
  const bars = mode === "ports" ? [82, 61, 89, 45, 72] : [44, 79, 58, 90, 67];

  return (
    <div className="dashboard" aria-label="Vista previa de dashboard de seguridad">
      <div className="dash-top">
        <span className="dot r"></span>
        <span className="dot y"></span>
        <span className="dot g"></span>
        <em>pentest365 / security center</em>
        <span className="live">● LIVE</span>
      </div>
      <div className="dash-body">
        <aside>
          <b>p365</b>
          <span>▦</span>
          <span>◫</span>
          <span>⌁</span>
          <span>◌</span>
        </aside>
        <div className="dash-content">
          <div className="dash-title">
            <div>
              <small>VISIBILIDAD DE SEGURIDAD</small>
              <strong>{mode === "ports" ? "Exploración de puertos" : "Postura de riesgo"}</strong>
            </div>
            <button>Últimos 30 días⌄</button>
          </div>
          <div className="dash-cards">
            <div>
              <small>ACTIVOS</small>
              <b>2,096</b>
              <span className="up">↑ 12.5%</span>
            </div>
            <div>
              <small>RIESGO CRÍTICO</small>
              <b>08</b>
              <span className="red">requiere atención</span>
            </div>
            <div>
              <small>COBERTURA</small>
              <b>98.4%</b>
              <span className="up">↑ 2.1%</span>
            </div>
          </div>
          <div className="chart">
            <div className="chart-label">
              <b>Actividad de descubrimiento</b>
              <span>actualizado ahora</span>
            </div>
            <div className="bars">
              {bars.map((h, i) => (
                <motion.i
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: i * 0.08 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const reducedMotion = useReducedMotion();

  const views: ("video" | "image" | "dashboard")[] = ["video", "image", "dashboard"];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % views.length);
  };

  const currentView = views[currentIndex];

  return (
    <section
      id="inicio"
      aria-labelledby="hero-heading"
      className="hero-section relative isolate overflow-hidden !bg-[#030712] text-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-60">
        <ConstellationBg
          particleCount={85}
          linkDistance={125}
          mouseRadius={160}
          baseOpacity={0.45}
          color="56,189,248"
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(14,165,233,0.2),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/4 size-96 rounded-full bg-cyan-500/10 blur-[120px]"
      />

      <div className="hero-wrap relative z-10">

        <motion.div
          className="hero-copy relative"
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <div aria-hidden className="absolute -inset-6 -z-10 rounded-[20px] bg-black/30 backdrop-blur-[2px] md:-inset-8" />
          
          <p className="eyebrow !text-white/90">
            <span className="!bg-sky-300"></span> CIBERSEGURIDAD INTELIGENTE
          </p>
          
          <h1 id="hero-heading" className="!text-white">
            Visibilidad y seguridad <em className="!text-sky-300">continua</em> para tu organización.
          </h1>
          
          <p className="lead !max-w-[560px] !text-gray-200">
            Identifica activos, vulnerabilidades y riesgos de seguridad desde una plataforma centralizada diseñada para proteger tu infraestructura.
          </p>
          
          <div className="hero-buttons">
            <a
              href="#cotizacion"
              className="button !border-sky-400 !bg-sky-500 !text-white shadow-[0_0_22px_rgba(56,189,248,0.45),0_4px_18px_rgba(2,6,23,0.4)] hover:!bg-sky-400 hover:shadow-[0_0_28px_rgba(56,189,248,0.6)]"
            >
              Prueba gratis <b>→</b>
            </a>
            <a
              href="#funcionalidades"
              className="link-button !text-white/85 hover:!text-white !border-white/20 hover:!border-white/40"
            >
              Conoce la plataforma <span className="!text-sky-300">↓</span>
            </a>
          </div>
          
          <div className="trust !mt-8">
            <div className="avatars">
              <i className="!bg-sky-500 !border-[#020617]">A</i>
              <i className="!border-[#020617]">L</i>
              <i className="!border-[#020617]">M</i>
            </div>
            <p className="!text-gray-300">
              <b className="!text-white">+3,000 profesionales</b>
              <br />
              protegen su organización con Pentest365
            </p>
          </div>
        </motion.div>


        <motion.div
          className="hero-visual relative flex items-center justify-center"
          initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.18, duration: 0.65, ease: "easeOut" }}
        >
          <div className="orb"></div>

          <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 shadow-2xl backdrop-blur-sm min-h-[320px]">
            <AnimatePresence mode="wait">
              {currentView === "video" && (
                <motion.div
                  key="video"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35 }}
                  className="aspect-video w-full"
                >
                  <iframe
                    className="h-full w-full rounded-2xl border-0"
                    src="https://www.youtube.com/embed/pYEdJH1YXzY?autoplay=1&mute=1&rel=0"
                    title="Pentest365 Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </motion.div>
              )}

              {currentView === "image" && (
                <motion.div
                  key="image"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35 }}
                >
                  <img
                    className="hero-stack h-auto w-full rounded-2xl object-cover"
                    src={hero}
                    alt="Capas de seguridad digital y monitoreo Pentest365"
                  />
                </motion.div>
              )}

              {currentView === "dashboard" && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35 }}
                  className="p-2"
                >
                  <Dashboard />
                </motion.div>
              )}
            </AnimatePresence>

        
            <button
              onClick={handleNext}
              aria-label="Siguiente contenido"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-30 flex size-10 items-center justify-center rounded-full border border-white/20 bg-slate-950/70 text-white backdrop-blur-md transition-all hover:scale-110 hover:border-sky-400 hover:bg-sky-500 hover:shadow-[0_0_15px_rgba(56,189,248,0.5)] active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="size-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          <div className="security-chip !border-white/10 !bg-white !shadow-xl">
            <span className="!bg-emerald-500 !text-white">✓</span>
            <div>
              <small className="!text-gray-500">ESTADO DEL ENTORNO</small>
              <b className="!text-slate-800">Protegido</b>
            </div>
          </div>
          <div className="risk-pill !bg-white !text-slate-700 !shadow-lg">
            <i className="!bg-emerald-500"></i> Riesgo reducido <b className="!text-emerald-600">−32%</b>
          </div>
        </motion.div>
      </div>
    </section>
  );
}