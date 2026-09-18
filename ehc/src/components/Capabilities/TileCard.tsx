import { createElement } from "react";
import { motion } from "framer-motion";
import type { Capability } from "../../data/pentest365";
import { capabilityIcon } from "./icons";
import { cn } from "../../lib/utils";

export function TileCard({
  cap,
  delay = 0.1,
  span = "",
}: {
  cap: Capability;
  delay?: number;
  span?: string;
}) {
  const icon = capabilityIcon(cap.title);
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay }}
      className={cn(
        "group flex min-h-[330px] flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-md",
        span,
      )}
    >
      <div className="grid h-[110px] w-full shrink-0 place-items-center overflow-hidden rounded-lg border border-slate-200 bg-[#f7f9fc] p-2">
        <img
          src={cap.image ?? ""}
          alt={cap.alt ?? cap.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full rounded object-contain transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className="mt-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-sky-100 bg-sky-50 text-sky-600">
          {createElement(icon, { className: "size-5", strokeWidth: 1.8 })}
        </span>
        <h3 className="mt-4 text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
          {cap.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-slate-600">
          {cap.copy}
        </p>
      </div>
    </motion.article>
  );
}