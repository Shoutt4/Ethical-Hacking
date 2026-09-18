import { motion } from "framer-motion";
import type { Capability } from "../../data/pentest365";

export function HeroText({
  cap,
  delay = 0.05,
}: {
  cap: Capability;
  delay?: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay }}
      className="group flex min-h-[300px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-md sm:p-7"
    >
      <h3 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
        {cap.title}
      </h3>
      <div>
        {cap.detail?.map((p, i) => (
          <p
            key={i}
            className={
              i === 0
                ? "mt-4 text-[15px] font-bold leading-relaxed text-slate-900"
                : "mt-3 text-sm leading-relaxed text-slate-600"
            }
          >
            {p}
          </p>
        ))}
      </div>
    </motion.article>
  );
}