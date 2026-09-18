import { motion } from "framer-motion";
import type { Capability } from "../../data/pentest365";

export function HeroCard({
  cap,
  delay = 0,
}: {
  cap: Capability;
  delay?: number;
}) {
  const [map, numbers, statistics] = cap.gallery ?? [];
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay }}
      className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-sky-200/70 bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-md sm:col-span-2 sm:p-8 lg:col-span-2 lg:p-9"
    >
      <div className="grid min-w-0 gap-4">
        {map ? (
          <figure className="grid h-[220px] place-items-center overflow-hidden rounded-xl border border-slate-200 bg-white p-3 sm:h-[260px] lg:h-[300px]">
              <img
                src={map.image}
                alt={map.alt}
                className="h-full w-full rounded-md object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                decoding="async"
              />
          </figure>
        ) : null}
        <div className="grid gap-4 sm:grid-cols-5">
          {numbers ? (
              <figure className="grid h-[200px] place-items-center overflow-hidden rounded-xl border border-slate-200 bg-white p-3 sm:col-span-2">
                <img
                  src={numbers.image}
                  alt={numbers.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full rounded-md object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </figure>
          ) : null}
          {statistics ? (
              <figure className="grid h-[200px] place-items-center overflow-hidden rounded-xl border border-slate-200 bg-white p-3 sm:col-span-3">
                <img
                  src={statistics.image}
                  alt={statistics.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full rounded-md object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </figure>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}