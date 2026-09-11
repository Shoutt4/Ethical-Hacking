"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, RefreshCw, Command, TrendingDown, LayoutGrid, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const SQRT_5000 = Math.sqrt(5000);

const featureIcons = [Search, RefreshCw, Command, TrendingDown, LayoutGrid, Zap] as const;

const featuresData = [
  {
    id: 1,
    titulo: "Descubrimiento pasivo de Vulnerabilidades",
    descripcion: "P365 es la única plataforma que realiza un reconocimiento 100% pasivo de activos, puertos, tecnologías web, vulnerabilidades, certificados SSL/TLS, gráficas de DNS, sub dominios, emails y mucho más sin necesidad de escanear o conectarse a los objetivos analizados.",
    icono: Search,
  },
  {
    id: 2,
    titulo: "Desarrollo persistente y Actualizaciones Automáticas",
    descripcion: "Todo el código fuente está siempre bajo auditoría y revisiones de seguridad, las mejoras y actualizaciones de la plataforma jamás paran y el desarrollo de nuevas funcionalidades está basado en un road map de sugerencias hechas por un equipo de expertos y nuestros propios usuarios.",
  },
  {
    id: 3,
    titulo: "Facilidad de Uso",
    descripcion: "A diferencia de otras soluciones que tienen múltiples y complejas capas de configuración, en Pentest365 quitamos toda esa complejidad, con el propósito de brindar una experiencia intuitiva y amistosa para el usuario y que este pueda detectar y remediar las vulnerabilidades más rápido y con mayor eficacia.",
  },
  {
    id: 4,
    titulo: "Reduce el Riesgo, Costo y Tiempo",
    descripcion: "Nuestra tecnología está orientada a reducir el riesgo tecnológico, bajar el costo operativo y acortar los tiempos de reacción y remediación para optimizar el ROI de tu organización.",
  },
  {
    id: 5,
    titulo: "Gestión Centralizada",
    descripcion: "Reduce la necesidad de recursos humanos, mejorando la rentabilidad general en la protección de la seguridad y todo desde una consola centralizada que te permita expandir tus capacidades de auditoría sin incrementar tus recursos humanos.",
  },
  {
    id: 6,
    titulo: "Solución sin agentes",
    descripcion: "En cuestión de minutos puedes comenzar a escanear toda la Infraestructura de TI de tu organización, sin complicadas y largas instalaciones de agentes en todos los equipos. Tanto en la versión Cloud como Onpremise, la tecnología de P365 no requiere de agentes.",
  },
];

/* Cada tarjeta recibe su ID estable del array original. */
interface CardData {
  id: number;
  testimonial: string;
  by: string;
  icon: LucideIcon;
}

const testimonials: CardData[] = featuresData.map((f) => ({
  id: f.id,
  testimonial: f.descripcion,
  by: f.titulo,
  icon: f.icono ?? featureIcons[(f.id - 1) % featureIcons.length],
}));

interface TestimonialCardProps {
  position: number;
  testimonial: CardData;
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  position, 
  testimonial, 
  handleMove, 
  cardSize 
}) => {
  const isCenter = position === 0;
  const Icon = testimonial.icon || Search;

  // Calcular valores de animación
  const offsetX = (cardSize / 1.5) * position;
  const offsetY = isCenter ? -65 : position % 2 ? 15 : -15;
  const rotateZ = isCenter ? 0 : position % 2 ? 2.5 : -2.5;

  return (
    <motion.div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 flex flex-col p-5 md:p-6",
        isCenter 
          ? "z-10 bg-white text-slate-900 border-sky-200 shadow-xl shadow-slate-200" 
          : "z-0 bg-slate-50 text-slate-600 border-slate-200 hover:border-sky-200 hover:bg-white"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        marginLeft: -cardSize / 2,
        marginTop: -cardSize / 2,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transformOrigin: 'center center',
        boxShadow: isCenter ? "0px 8px 0px 4px #e2e8f0" : "0px 0px 0px 0px transparent",
      }}
      initial={false}
      animate={{
        x: offsetX,
        y: offsetY,
        rotateZ,
      }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 22,
        mass: 0.9,
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-slate-200"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2
        }}
      />
      <div
        className="mb-2 grid size-10 place-items-center rounded-xl border bg-white shrink-0"
        style={{
          boxShadow: "3px 3px 0px #fff",
          borderColor: isCenter ? "#bae6fd" : "#e2e8f0"
        }}
      >
        <Icon size={20} className={isCenter ? "text-sky-600" : "text-sky-500"} />
      </div>
      <h3 className="text-sm font-semibold leading-snug text-slate-900">
        {testimonial.by}
      </h3>
      <div className="mt-2 flex-1 min-h-0 overflow-y-auto pr-1 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-400">
        <p className="text-sm leading-relaxed text-slate-600">
          {testimonial.testimonial}
        </p>
      </div>
    </motion.div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(340);
  const [testimonialsList, setTestimonialsList] = useState<CardData[]>(testimonials);

  const handleMove = (steps: number) => {
    setTestimonialsList((prev) => {
      const newList = [...prev];
      if (steps > 0) {
        for (let i = steps; i > 0; i--) {
          const item = newList.shift();
          if (!item) return prev;
          newList.push(item);
        }
      } else {
        for (let i = steps; i < 0; i++) {
          const item = newList.pop();
          if (!item) return prev;
          newList.unshift(item);
        }
      }
      return newList;
    });
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 340 : 260);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  /* Auto-play: avanza una tarjeta cada 4.5s (el timer se reinicia tras cada cambio) */
  useEffect(() => {
    const timer = setInterval(() => handleMove(1), 4500);
    return () => clearInterval(timer);
  }, [handleMove]);

  return (
    <div
      className="relative w-full overflow-hidden bg-transparent"
      style={{ height: 500 }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-12 w-12 items-center justify-center text-xl transition-colors",
            "bg-white border-2 border-slate-200 text-slate-700 hover:bg-sky-500 hover:text-white hover:border-sky-500 hover:shadow-lg",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-12 w-12 items-center justify-center text-xl transition-colors",
            "bg-white border-2 border-slate-200 text-slate-700 hover:bg-sky-500 hover:text-white hover:border-sky-500 hover:shadow-lg",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};