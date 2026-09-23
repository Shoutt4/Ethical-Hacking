import { createElement } from "react";
import { motion } from "framer-motion";

import {
  functionalities,
  type Capability,
} from "../../data/pentest365";

import { capabilityIcon } from "./icons";
import { CardSlideshow } from "./CardSlideshow";
import { cn } from "../../lib/utils";

type BentoVariant = "featured" | "wide" | "standard";

type BentoCardProps = {
  cap: Capability;
  variant?: BentoVariant;
  delay?: number;
};

function BentoCard({
  cap,
  variant = "standard",
  delay = 0,
}: BentoCardProps) {
  const icon = capabilityIcon(cap.title);

  const images = cap.images?.filter(Boolean) ?? [];

  const isFeatured = variant === "featured";
  const isWide = variant === "wide";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "group relative min-w-0 overflow-hidden rounded-3xl",
        "border border-slate-200 bg-white",
        "shadow-[0_8px_30px_rgba(23,50,77,0.06)]",
        "transition-all duration-300",
        "hover:-translate-y-1",
        "hover:border-sky-200",
        "hover:shadow-[0_18px_45px_rgba(23,50,77,0.11)]",

        isFeatured && "lg:col-span-6",

        isWide && "lg:col-span-4",

        !isFeatured &&
          !isWide &&
          "lg:col-span-2",
      )}
    >
      <div
        className={cn(
          "flex h-full flex-col",

          isFeatured && "min-h-[540px]",

          !isFeatured && "min-h-[450px]",
        )}
      >
        {/* =====================================================
            CONTENIDO
        ====================================================== */}

        <div
          className={cn(
            "relative z-10 flex flex-col p-6 sm:p-7",

            isFeatured && "p-6 sm:p-7",

            isWide && "sm:p-8",
          )}
        >
          <span
            className={cn(
              "grid size-10 place-items-center rounded-xl",
              "bg-sky-50 text-sky-600",
              isFeatured && "size-11",
            )}
          >
            {createElement(icon, {
              className: "size-5",
              strokeWidth: 1.8,
            })}
          </span>

          <h3
            className={cn(
              "mt-4 font-extrabold tracking-[-0.035em] text-slate-900",
              isFeatured
                ? "text-3xl sm:text-4xl"
                : "text-xl sm:text-2xl",
            )}
          >
            {cap.title}
          </h3>

          <p
            className={cn(
              "mt-3 max-w-3xl text-slate-600",
              isFeatured
                ? "text-[15px] leading-7"
                : "text-[13px] leading-6",
            )}
          >
            {cap.copy}
          </p>

          
        </div>

        {/* =====================================================
            IMAGEN SIEMPRE DEBAJO DEL TEXTO
        ====================================================== */}

        {images.length > 0 && (
          <div
            className={cn(
              "mt-auto flex w-full items-center justify-center",
              "border-t border-slate-100 bg-[#f8fbfc]",

              isFeatured &&
  "min-h-[320px] px-6 pb-6 pt-5 sm:min-h-[350px] sm:px-8 sm:pb-7",

              isWide &&
                "min-h-[280px] px-5 pb-5 pt-5 sm:min-h-[310px]",

              !isFeatured &&
                !isWide &&
                "min-h-[240px] px-5 pb-5 pt-5",
            )}
          >
            <CardSlideshow
  images={images}
  alt={cap.alt}
  intervalMs={4000}
  className={cn(
    "w-full",

    /* Escaneo de Puertos */
   isFeatured &&
  "h-[300px] sm:h-[350px] lg:h-[390px]",

    /* Análisis Persistente */
    isWide &&
      "h-[320px] sm:h-[360px] lg:h-[390px]",

    /* Cards pequeñas */
    !isFeatured &&
      !isWide &&
      "h-[230px] sm:h-[250px]",
  )}
/>
          </div>
        )}
      </div>
    </motion.article>
  );
}

export function FeatureBento() {
  /*
   * ============================================================
   * SOLO LAS 6 FUNCIONALIDADES QUE YA ESTÁN EN EL DISEÑO
   * ============================================================
   */

  const ports = functionalities[0];

  const services = functionalities[2];

  const webTech = functionalities[3];

  const headers = functionalities[4];

  const tls = functionalities[5];
const crawling = functionalities[6];
  const persistent = functionalities[7];

  /*
   * ============================================================
   * CARDS VISIBLES
   * ============================================================
   */

  const visibleFeatures = [
  // 1. Escaneo de puertos — ancho completo
  {
    cap: ports,
    variant: "featured" as const,
  },

  // 2. Crawling — ancho completo
  {
    cap: crawling,
    variant: "featured" as const,
  },

  // 3. Análisis persistente — debajo de Crawling
  {
    cap: persistent,
    variant: "wide" as const,
  },

  // 4. Descubrimiento de servicios — al lado de Análisis
  {
    cap: services,
    variant: "standard" as const,
  },

  // 5. Análisis de tecnología
  {
    cap: webTech,
    variant: "standard" as const,
  },

  // 6. HTTP Headers
  {
    cap: headers,
    variant: "standard" as const,
  },

  // 7. SSL/TLS
  {
    cap: tls,
    variant: "standard" as const,
  },
];

  return (
    <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6">
      {visibleFeatures.map(({ cap, variant }, index) => (
        <BentoCard
          key={cap.title}
          cap={cap}
          variant={variant}
          delay={index * 0.06}
        />
      ))}
    </div>
  );
}