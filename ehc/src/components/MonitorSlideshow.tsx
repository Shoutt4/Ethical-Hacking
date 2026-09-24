import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import pcFrame from "../assets/pentest365/features/features extras/caracteristicas-pc.png";

export function MonitorSlideshow({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || images.length < 2) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, 3800);

    return () => window.clearInterval(timer);
  }, [reducedMotion, images]);

  if (images.length === 0) return null;

  return (
    <div
      className="relative mx-auto w-full max-w-[760px]"
      style={{ aspectRatio: "1992 / 1943" }}
    >
      {/* Área de pantalla: la imagen queda debajo del marco transparente. */}
      <div
  className="absolute z-0 overflow-hidden"
  style={{
  left: "1%",
  top: "8%",
  width: "99%",
  height: "82%",
  clipPath: "polygon(0 0, 100% 18%, 100% 100%, 0 96%)",
}}
>
  <AnimatePresence mode="popLayout" initial={false}>
    <motion.img
      key={images[index]}
      src={images[index]}
      alt={`Captura de una funcionalidad de Pentest365, ${index + 1}`}
      initial={reducedMotion ? false : { opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={reducedMotion ? undefined : { opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      draggable={false}
      className="absolute inset-0 block h-full w-full max-w-none object-cover object-center"
    />
  </AnimatePresence>
</div>

      {/* Marco en primer plano; el centro transparente deja ver la captura. */}
      <img
        src={pcFrame}
        alt="Marco de monitor de Pentest365"
        draggable={false}
        className="pointer-events-none absolute inset-0 z-10 block h-full w-full select-none object-fill drop-shadow-2xl"
      />
    </div>
  );
}