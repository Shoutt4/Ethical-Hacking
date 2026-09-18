import { createElement } from "react";
import { motion } from "framer-motion";
import type { Capability } from "../../data/pentest365";
import { capabilityIcon } from "./icons";

export function WideCard({
  cap,
  delay = 0.15,
}: {
  cap: Capability;
  delay?: number;
}) {
  const icon = capabilityIcon(cap.title);
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-md sm:col-span-2 sm:p-7 lg:col-span-2"
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-sky-100 bg-sky-50 text-sky-600">
        {createElement(icon, { className: "size-5", strokeWidth: 1.8 })}
      </span>
      <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900">
        {cap.title}
      </h3>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
        {cap.copy}
      </p>
      <div className="tags mt-5">
        {cap.tags.map((t) => (
          <span key={t}>✓ {t}</span>
        ))}
      </div>
      <div className="mt-5 grid h-[150px] w-full shrink-0 place-items-center overflow-hidden rounded-lg border border-slate-200 bg-[#f7f9fc] p-3 sm:h-[170px]">
        <img
          src={cap.image ?? ""}
          alt={cap.alt ?? cap.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full rounded object-contain transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
    </motion.article>
  );
}