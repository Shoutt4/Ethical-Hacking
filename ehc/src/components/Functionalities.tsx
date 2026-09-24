import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  Globe,
  Layers3,
  LockKeyhole,
  Network,
  Radar,
  Search,
  ShieldCheck,
} from "lucide-react";
import { ConstellationBg } from "./ConstellationBg";
import { MonitorSlideshow } from "./MonitorSlideshow";

/* ─── Assets ────────────────────────────────────────────────── */

import crawlingImage1 from "../assets/pentest365/features/crawling y monitoreo G/feature-1.png";
import crawlingImage2 from "../assets/pentest365/features/crawling y monitoreo G/feature-3.png";

import portsImage1 from "../assets/pentest365/features/escaneo de puertos G/Diseño sin título.png";
import portsImage2 from "../assets/pentest365/features/escaneo de puertos G/metadata-monitoring.png";

import vulnerabilityImage1 from "../assets/pentest365/features/analisis de vulnerabilidad G/vuln-analysis-1.png";
import vulnerabilityImage2 from "../assets/pentest365/features/analisis de vulnerabilidad G/vuln-analysis-2.png";
import vulnerabilityImage3 from "../assets/pentest365/features/analisis de vulnerabilidad G/vuln-analysis-3.png";

import assessmentImage1 from "../assets/pentest365/features/features extras/recon-vuln-assessment.png";
import assessmentImage2 from "../assets/pentest365/features/features extras/recon-monitoring.png";
import assessmentImage3 from "../assets/pentest365/features/features extras/recon-access-point-dns.png";
import assessmentImage4 from "../assets/pentest365/features/features extras/recon-dns.png";
import assessmentImage5 from "../assets/pentest365/features/features extras/recon-email.png";
import assessmentImage6 from "../assets/pentest365/features/features extras/recon-licence.png";
import assessmentImage7 from "../assets/pentest365/features/features extras/recon-metadata.png";

import webTechImage1 from "../assets/pentest365/features/analisis de tec web/web-tech-0.png";
import webTechImage2 from "../assets/pentest365/features/analisis de tec web/web-tech-1.png";
import webTechImage3 from "../assets/pentest365/features/analisis de tec web/web-tech-2.png";

import headersImage1 from "../assets/pentest365/features/cabeceras https/http-header-analysis.png";
import headersImage2 from "../assets/pentest365/features/cabeceras https/http-persistent-1.png";

import sslImage1 from "../assets/pentest365/features/seguridad de certificados ssl/ssl-tls-1.png";
import sslImage2 from "../assets/pentest365/features/seguridad de certificados ssl/ssl-tls-2.png";
import sslImage3 from "../assets/pentest365/features/seguridad de certificados ssl/ssl-tls-3.png";

import servicesImage1 from "../assets/pentest365/features/descubrimiento de servicios/service-discovery-1.png";
import servicesImage2 from "../assets/pentest365/features/descubrimiento de servicios/service-discovery-2.png";

/* ─── Data ──────────────────────────────────────────────────── */

const primaryFeatures = [
  {
    number: "01",
    eyebrow: "Evaluación continua",
    title: "Evaluación de vulnerabilidades",
    description:
      "Obtén una visión clara de tu exposición digital. Pentest365 analiza tus activos y prioriza los riesgos para que puedas actuar con información concreta.",
    images: [
      assessmentImage1,
      assessmentImage2,
      assessmentImage3,
      assessmentImage4,
      assessmentImage5,
      assessmentImage6,
      assessmentImage7
    ],
    alt: "Panel de evaluación de vulnerabilidades de Pentest365",
    icon: ShieldCheck,
    tags: ["Evaluación", "Riesgo", "Activos"],
  },
  {
    number: "02",
    eyebrow: "Superficie de ataque",
    title: "Escaneo de puertos",
    description:
      "Identifica puertos abiertos, servicios expuestos y posibles puntos de entrada en tus hosts. Revisa los resultados desde una vista centralizada.",
    images: [portsImage1, portsImage2],
    alt: "Resultados del escaneo de puertos",
    icon: Network,
    tags: ["Puertos", "Hosts", "Servicios"],
  },
  {
    number: "03",
    eyebrow: "Protección web",
    title: "Crawling y monitoreo de portales web",
    description:
      "Recorre tus portales y observa sus cambios en el tiempo. Detecta modificaciones inesperadas y conserva una referencia de la integridad de tus páginas.",
    images: [crawlingImage1, crawlingImage2],
    alt: "Herramienta de crawling y monitoreo de portales web",
    icon: Search,
    tags: ["Crawling", "Monitoreo", "Integridad"],
  },
  {
    number: "04",
    eyebrow: "Seguimiento persistente",
    title: "Análisis de vulnerabilidades persistente",
    description:
      "Programa análisis periódicos y sigue la evolución de tus hallazgos. Consulta métricas de riesgo para enfocar el trabajo de remediación.",
    images: [vulnerabilityImage1, vulnerabilityImage2, vulnerabilityImage3],
    alt: "Panel de análisis persistente de vulnerabilidades",
    icon: Radar,
    tags: ["Continuo", "Hallazgos", "Métricas"],
  },
];

const secondaryFeatures = [
  {
    number: "05",
    title: "Análisis de tecnologías web",
    description:
      "Identifica tecnologías y componentes presentes en tus portales.",
    images: [webTechImage1, webTechImage2, webTechImage3],
    alt: "Análisis de tecnologías web",
    icon: Layers3,
  },
  {
    number: "06",
    title: "Análisis de cabeceras HTTP/HTTPS",
    description:
      "Revisa la configuración de cabeceras y descubre oportunidades de mejora.",
    images: [headersImage1, headersImage2],
    alt: "Análisis de cabeceras HTTP y HTTPS",
    icon: Globe,
  },
  {
    number: "07",
    title: "Seguridad de certificados SSL/TLS",
    description:
      "Inspecciona certificados, cifrado y configuración TLS de tus dominios.",
    images: [sslImage1, sslImage2, sslImage3],
    alt: "Análisis de seguridad de certificados SSL y TLS",
    icon: LockKeyhole,
  },
  {
    number: "08",
    title: "Descubrimiento de servicios",
    description:
      "Detecta y clasifica servicios disponibles en los activos analizados.",
    images: [servicesImage1, servicesImage2],
    alt: "Descubrimiento de servicios de red",
    icon: Network,
  },
];

/* ─── Image Slideshow ───────────────────────────────────────── */

function ImageSlideshow({
  images,
  alt,
  interval = 3800,
}: {
  images: string[];
  alt: string;
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (images.length <= 1 || isHovered || reducedMotion) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, isHovered, interval, reducedMotion]);

  if (!images || images.length === 0) return null;

  return (
    <div
      className="relative h-[360px] w-full overflow-hidden sm:h-[390px] lg:h-[420px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt={`${alt} (vista ${index + 1})`}
          initial={
            reducedMotion
              ? { opacity: 1 }
              : { opacity: 0, scale: 0.985 }
          }
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={
            reducedMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.985 }
          }
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          draggable={false}
          className="absolute inset-0 h-full w-full object-contain p-4 sm:p-5 lg:p-6"
        />
      </AnimatePresence>

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-cyan-500/20 bg-slate-950/85 px-3 py-1.5 shadow-lg backdrop-blur-md">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ver captura ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-5 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                  : "w-1.5 bg-slate-600 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Local Relative Connector ──────────────────────────────── */

function LocalPrimaryConnector({
  direction,
}: {
  direction: "left-to-right" | "right-to-left";
}) {
  const isLTR = direction === "left-to-right";

  // Rutas distintas para LTR y RTL. Orígenes ajustados a y=4 y y=116 para evitar que los círculos se recorten con el viewBox.
  const pointsLTR = "220,4 350,65 520,35 620,116";
  const pointsRTL = "580,4 450,45 280,85 180,116";

  const currentPoints = isLTR ? pointsLTR : pointsRTL;

  const waypointsLTR = [
    { cx: 220, cy: 4, r: 2.5, fill: "#c7d2fe", opacity: 0.9 },
    { cx: 350, cy: 65, r: 2.5, fill: "#a5f3fc", opacity: 0.6, pulse: true },
    { cx: 520, cy: 35, r: 3, fill: "#38bdf8", opacity: 0.8 },
    { cx: 620, cy: 116, r: 2.5, fill: "#a5f3fc", opacity: 0.7 },
  ];

  const waypointsRTL = [
    { cx: 580, cy: 4, r: 2.5, fill: "#c7d2fe", opacity: 0.9 },
    { cx: 450, cy: 45, r: 3, fill: "#a5f3fc", opacity: 0.8, pulse: true },
    { cx: 280, cy: 85, r: 2.5, fill: "#38bdf8", opacity: 0.6 },
    { cx: 180, cy: 116, r: 2.5, fill: "#a5f3fc", opacity: 0.7 },
  ];

  const waypoints = isLTR ? waypointsLTR : waypointsRTL;

  return (
    <div className="relative my-2 flex h-24 w-full items-center justify-center sm:h-32">
      <svg
        aria-hidden="true"
        viewBox="0 0 800 120"
        preserveAspectRatio="none"
        className="h-full w-full max-w-4xl"
      >
        <defs>
          <linearGradient
            id={`connector-grad-${direction}`}
            x1={isLTR ? "0%" : "100%"}
            y1="0%"
            x2={isLTR ? "100%" : "0%"}
            y2="100%"
          >
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Glow de la línea */}
        <polyline
          points={currentPoints}
          fill="none"
          stroke={`url(#connector-grad-${direction})`}
          strokeWidth="4"
          strokeOpacity="0.15"
          strokeLinejoin="miter"
        />

        {/* Línea principal quebrada */}
        <polyline
          points={currentPoints}
          fill="none"
          stroke={`url(#connector-grad-${direction})`}
          strokeWidth="1.5"
          strokeDasharray="4 6"
          strokeLinejoin="bevel"
        />

        {/* Nodos / Estrellas intermedias */}
        {waypoints.map((wp, i) => (
          <circle
            key={i}
            cx={wp.cx}
            cy={wp.cy}
            r={wp.r}
            fill={wp.fill}
            opacity={wp.opacity}
            className={wp.pulse ? "animate-pulse" : ""}
          />
        ))}
      </svg>
    </div>
  );
}

/* ─── Primary Node ───────────────────────────────────────────── */

function PrimaryNode({
  feature,
  index,
}: {
  feature: (typeof primaryFeatures)[number];
  index: number;
}) {
  const Icon = feature.icon;

  const isImageLeft = index % 2 === 0;
  const reducedMotion = useReducedMotion();

  return (
    <article
  className={`relative grid items-center gap-10 md:gap-16 lg:grid-cols-2 ${
    index === 0
      ? "pt-0 pb-12 lg:pb-16"
      : "py-12 lg:py-16"
  }`}
>

      <motion.div
        initial={
          reducedMotion
            ? false
            : {
                opacity: 0,
                y: 28,
              }
        }
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.25,
        }}
        transition={{
          duration: 0.65,
          ease: "easeOut",
        }}
        className={`relative z-10 ${
          isImageLeft ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <div className="mb-6 flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
            <Icon size={20} strokeWidth={1.7} />
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/75">
            {feature.eyebrow}
          </span>
        </div>

        <h3 className="max-w-xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {feature.title}
        </h3>

        <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">
          {feature.description}
        </p>

        <ul className="mt-7 flex flex-wrap gap-2">
          {feature.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-cyan-100/10 bg-white/[0.04] px-3 py-1.5 text-xs text-cyan-100/80 shadow-[0_0_10px_rgba(34,211,238,0.05)]"
            >
              {tag}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* ─── IMAGE ───────────────────────────────────────────── */}

      <motion.div
  initial={
    reducedMotion
      ? false
      : {
          opacity: 0,
          scale: 0.97,
        }
  }
  whileInView={{
    opacity: 1,
    scale: 1,
  }}
  viewport={{
    once: true,
    amount: 0.2,
  }}
  transition={{
    duration: 0.7,
    delay: 0.08,
    ease: "easeOut",
  }}
  className={`relative z-10 ${
    isImageLeft ? "lg:order-1" : "lg:order-2"
  }`}
>
  {index === 0 ? (
    <MonitorSlideshow images={feature.images} />
  ) : (
    <>
      {/* Glow */}
      <div
        className="absolute -inset-8 rounded-[2rem] bg-cyan-400/[0.09] blur-3xl"
        aria-hidden
      />

      {/* CONTENEDOR FIJO */}
      <div
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 shadow-2xl"
      >
        {/* Barra superior */}
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="size-2 rounded-full bg-rose-300/70" />
          <span className="size-2 rounded-full bg-amber-200/70" />
          <span className="size-2 rounded-full bg-emerald-200/70" />

          <span className="ml-2 h-px flex-1 bg-white/10" />
        </div>

        {/* TODAS LAS IMÁGENES USAN EL MISMO ESPACIO */}
        <div className="w-full bg-slate-900/70">
          <ImageSlideshow
            images={feature.images}
            alt={feature.alt}
          />
        </div>
      </div>

      
    </>
  )}
</motion.div>
    </article>
  );
}

/* ─── Secondary Node ────────────────────────────────────────── */

function SecondaryNode({
  feature,
  index,
  className = "",
}: {
  feature: (typeof secondaryFeatures)[number];
  index: number;
  className?: string;
}) {
  const Icon = feature.icon;
  const reducedMotion = useReducedMotion();

  const isOddColumn = index % 2 === 1;

  return (
    <motion.article
      initial={
        reducedMotion
          ? false
          : {
              opacity: 0,
              y: 24,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
      }}
      className={`relative flex flex-col justify-between overflow-hidden rounded-2xl border border-cyan-500/15 bg-slate-950/80 p-4 shadow-[0_16px_48px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_20px_60px_rgba(34,211,238,0.12)] sm:p-5 ${
        isOddColumn ? "md:translate-y-12 lg:translate-y-16" : ""
      } ${className}`}
    >
      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-semibold tracking-[0.18em] text-cyan-200/70">
            NODO {feature.number}
          </span>

          <span className="grid size-9 place-items-center rounded-lg border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-200 shadow-[0_0_12px_rgba(34,211,238,0.15)]">
            <Icon size={17} strokeWidth={1.7} />
          </span>
        </div>

        {/* Imagen sin altura fija */}
        <div className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-slate-900/90">
          <ImageSlideshow
            images={feature.images}
            alt={feature.alt}
          />
        </div>
      </div>

      <div className="mt-5 flex flex-1 flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white sm:text-xl">
            {feature.title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-300/85">
            {feature.description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Secondary Constellation Polygon Network ──────────────── */

function SecondaryConstellationNet() {
  const perimeterPoints =
    "240,140 380,110 520,230 760,200 820,350 710,500 760,680 600,730 400,580 240,620 180,480 290,300 240,140";
  const crossPoints = "240,140 350,320 500,410 650,480 760,680";

  const waypoints = [
    // Main corners
    { cx: 240, cy: 140, r: 4, opacity: 0.9, color: "#a5f3fc" },
    { cx: 760, cy: 200, r: 3.5, opacity: 0.8, color: "#38bdf8" },
    { cx: 760, cy: 680, r: 4, opacity: 0.9, color: "#22d3ee" },
    { cx: 240, cy: 620, r: 3, opacity: 0.8, color: "#818cf8" },
    // Top edge
    { cx: 380, cy: 110, r: 2, opacity: 0.4, color: "#c7d2fe" },
    { cx: 520, cy: 230, r: 2.5, opacity: 0.6, color: "#38bdf8" },
    // Right edge
    { cx: 820, cy: 350, r: 1.5, opacity: 0.3, color: "#a5f3fc" },
    { cx: 710, cy: 500, r: 2.5, opacity: 0.5, color: "#22d3ee" },
    // Bottom edge
    { cx: 600, cy: 730, r: 2, opacity: 0.4, color: "#818cf8" },
    { cx: 400, cy: 580, r: 1.5, opacity: 0.6, color: "#c7d2fe" },
    // Left edge
    { cx: 180, cy: 480, r: 2.5, opacity: 0.5, color: "#38bdf8" },
    { cx: 290, cy: 300, r: 2, opacity: 0.3, color: "#a5f3fc" },
    // Cross
    { cx: 350, cy: 320, r: 1.5, opacity: 0.4, color: "#c7d2fe" },
    { cx: 500, cy: 410, r: 3, opacity: 0.9, color: "#22d3ee", pulse: true },
    { cx: 650, cy: 480, r: 2, opacity: 0.5, color: "#818cf8" },
  ];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1000 800"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
    >
      <defs>
        <linearGradient
          id="sec-constellation-grad"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.45" />
          <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#818cf8" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* Main Perimeter */}
      <polyline
        points={perimeterPoints}
        fill="none"
        stroke="url(#sec-constellation-grad)"
        strokeWidth="1.5"
        strokeDasharray="4 6"
        strokeLinejoin="bevel"
      />

      {/* Diagonal Cross */}
      <polyline
        points={crossPoints}
        fill="none"
        stroke="url(#sec-constellation-grad)"
        strokeWidth="1"
        strokeDasharray="3 5"
        strokeLinejoin="bevel"
        strokeOpacity="0.7"
      />

      {/* Nodes / Stars */}
      {waypoints.map((wp, i) => (
        <circle
          key={i}
          cx={wp.cx}
          cy={wp.cy}
          r={wp.r}
          fill={wp.color}
          opacity={wp.opacity}
          className={wp.pulse ? "animate-pulse" : ""}
        />
      ))}
    </svg>
  );
}


export function Functionalities() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="funcionalidades"
      aria-labelledby="funcionalidades-heading"
      className="relative isolate overflow-hidden bg-[#030712] text-white"
    >
      {/* Dynamic Canvas Background */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <ConstellationBg
          particleCount={180}
          linkDistance={160}
          mouseRadius={220}
          baseOpacity={0.7}
          color="56,189,248"
        />
      </div>

      {/* Ambient Radial Gradient */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(14,165,233,0.18),transparent_55%)]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}

        <header className="mx-auto max-w-3xl pt-24 pb-8 text-center sm:pt-32 sm:pb-10">
          <motion.p
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    y: 12,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200"
          >
            Plataforma de ciberseguridad
          </motion.p>

          <motion.h2
            id="funcionalidades-heading"
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    y: 16,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.08,
            }}
            className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Una vista completa de tu{" "}
            <span className="text-cyan-200">
              superficie digital
            </span>
          </motion.h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-300/80">
            Explora las herramientas que te ayudan a descubrir, evaluar y
            monitorear los activos de tu organización.
          </p>
        </header>

        {/* Primary Nodes 01-04 */}

        <div className="relative">
          {primaryFeatures.map((feature, index) => {
            const isLast =
              index === primaryFeatures.length - 1;

            const connectorDirection =
              index % 2 === 0
                ? "left-to-right"
                : "right-to-left";

            return (
              <div key={feature.number}>
                <PrimaryNode
                  feature={feature}
                  index={index}
                />

                {!isLast && (
                  <LocalPrimaryConnector
                    direction={connectorDirection}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Secondary Nodes 05-08 */}

        <div className="relative z-10 pb-36 pt-16 sm:pb-48">
          <div className="mb-14 flex items-end justify-between gap-6">
            <div>
               

              <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">
                Más señales para investigar
              </h3>
            </div>

             
          </div>

          <div className="relative">
            <SecondaryConstellationNet />

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
              {secondaryFeatures.map((feature, index) => (
                <SecondaryNode
                  key={feature.number}
                  feature={feature}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}