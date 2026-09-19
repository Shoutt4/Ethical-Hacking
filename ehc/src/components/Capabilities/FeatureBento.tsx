import { motion } from "framer-motion";
import { functionalities, type Capability } from "../../data/pentest365";
import { capabilityIcon } from "./icons";
import { RotatingImage } from "./RotatingImage";
import { cn } from "../../lib/utils";

type BentoCardProps = {
  cap: Capability;
  area: string;
  variant?: "primary" | "wide" | "compact" | "report";
  delay: number;
};

function CapabilityCard({ cap, area, variant = "compact", delay }: BentoCardProps) {
  const Icon = capabilityIcon(cap.title);
  const [galleryMap, galleryNumbers, galleryStats] = cap.gallery ?? [];
  const slides: { src: string; alt: string }[] = [
    ...(cap.image ? [{ src: cap.image, alt: cap.alt ?? cap.title }] : []),
    ...(cap.gallery ?? []).map((g) => ({ src: g.image, alt: g.alt })),
  ];
  const isPrimary = variant === "primary";
  const isWide = variant === "wide";
  const isReport = variant === "report";

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "capability-panel group relative isolate flex min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white",
        "transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-[0_18px_38px_rgba(23,50,77,0.12)]",
        isPrimary && "min-h-[520px] flex-col bg-slate-950 text-white",
        isWide && "min-h-[390px] flex-col justify-between bg-[#eff8fb] sm:flex-row",
        isReport && "min-h-[280px] flex-col bg-[#26354d] text-white sm:flex-row-reverse",
        variant === "compact" && "min-h-[292px] flex-col justify-between",
      )}
      style={{ gridArea: area }}
    >
      {isPrimary && galleryMap && galleryNumbers && galleryStats ? (
        <>
          <div className="absolute inset-0 bg-[#081a2b] p-3 sm:p-5">
            <figure className="grid h-full grid-rows-[minmax(0,1fr)_auto] gap-3 overflow-hidden rounded-xl border border-sky-100/10 bg-white p-3">
              <img
                src={galleryMap.image}
                alt={galleryMap.alt}
                className="h-full min-h-0 w-full rounded-lg object-contain object-center transition-transform duration-500 group-hover:scale-[1.015]"
                decoding="async"
              />
              <div className="grid grid-cols-5 gap-3">
                <img
                  src={galleryNumbers.image}
                  alt={galleryNumbers.alt}
                  loading="lazy"
                  decoding="async"
                  className="col-span-2 h-[120px] w-full rounded-lg object-contain transition-transform duration-500 group-hover:scale-[1.015] lg:h-[140px]"
                />
                <img
                  src={galleryStats.image}
                  alt={galleryStats.alt}
                  loading="lazy"
                  decoding="async"
                  className="col-span-3 h-[120px] w-full rounded-lg object-contain transition-transform duration-500 group-hover:scale-[1.015] lg:h-[140px]"
                />
              </div>
            </figure>
          </div>
          <div className="absolute inset-x-0 top-0 h-36 bg-[linear-gradient(180deg,rgba(4,17,29,0.92),rgba(4,17,29,0))]" aria-hidden />
          <div className="relative z-10 flex items-center gap-3 p-5 sm:p-7">
            <span className="grid size-10 place-items-center rounded-xl bg-sky-400/15 text-sky-200">
              <Icon className="size-5" strokeWidth={1.8} />
            </span>
            <h3 className="text-xl font-extrabold tracking-[-0.035em] text-white sm:text-2xl">ESCANEO DE PUERTOS</h3>
          </div>
          <div className="relative z-10 mt-auto bg-[#0c263d]/95 p-5 text-slate-100 shadow-[0_16px_34px_rgba(3,14,25,0.28)] sm:absolute sm:bottom-6 sm:right-6 sm:w-[min(390px,46%)] sm:border sm:border-sky-100/15 sm:p-6">
            <p className="text-sm font-semibold leading-relaxed text-white">{cap.detail?.[0]}</p>
            <p className="mt-4 text-[13px] leading-relaxed text-sky-50/85">{cap.detail?.[1]}</p>
          </div>
        </>
      ) : (
        <>
          <div className={cn("relative z-10 flex flex-col p-6 sm:p-7", isWide && "sm:w-[46%] sm:pr-4", isReport && "sm:w-[42%]")}>
            <CardTitle cap={cap} icon={<Icon className="size-5" strokeWidth={1.8} />} dark={isReport} />
            <p className={cn("mt-3 text-[13px] leading-relaxed", isReport ? "text-slate-200" : "text-slate-600")}>
              {cap.copy}
            </p>
            {(isWide || isReport) && (
              <div className="mt-5 flex flex-wrap gap-2">
                {cap.tags.map((tag) => (
                  <span key={tag} className={cn("px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em]", isReport ? "border border-white/20 bg-white/10 text-sky-100" : "border border-sky-100 bg-white text-sky-700")}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          {slides.length > 0 && (
            <div className={cn("relative overflow-hidden", isWide && "m-5 mt-0 min-h-[220px] border border-sky-100 bg-white sm:my-5 sm:ml-0 sm:flex-1", isReport && "m-5 mt-0 min-h-[180px] border border-white/15 bg-white sm:my-5 sm:mr-0 sm:flex-1", variant === "compact" && "mx-6 mb-6 mt-0 min-h-[118px] border border-slate-100 bg-slate-50")}>
              <RotatingImage
                images={slides}
                intervalMs={Math.round(4200 + delay * 2000)}
                className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.025]"
              />
            </div>
          )}
        </>
      )}
    </motion.article>
  );
}

function CardTitle({ cap, icon, dark = false }: { cap: Capability; icon: React.ReactNode; dark?: boolean }) {
  return (
    <>
      <span className={cn("grid size-10 place-items-center rounded-xl", dark ? "bg-sky-400/15 text-sky-200" : "bg-sky-50 text-sky-600")}>{icon}</span>
      <h3 className={cn("mt-4 text-xl font-extrabold tracking-[-0.035em] sm:text-2xl", dark ? "text-white" : "text-slate-900")}>{cap.title}</h3>
    </>
  );
}

export function FeatureBento() {
  const [ports, , services, webTech, headers, tls, crawling, persistent] = functionalities;

  return (
    <div className="capability-canvas mt-10">
      <CapabilityCard cap={ports} area="ports" variant="primary" delay={0} />
      <CapabilityCard cap={webTech} area="web-tech" delay={0.05} />
      <CapabilityCard cap={headers} area="headers" delay={0.1} />
      <CapabilityCard cap={persistent} area="persistent" variant="wide" delay={0.08} />
      <CapabilityCard cap={services} area="services" delay={0.12} />
      <CapabilityCard cap={tls} area="tls" delay={0.2} />
      <CapabilityCard cap={crawling} area="crawling" delay={0.24} />
    </div>
  );
}
