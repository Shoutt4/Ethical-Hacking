"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, RefreshCw, Command, TrendingDown, LayoutGrid, Zap, BarChart3, Trophy, Network, Cpu } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const featureIcons = [BarChart3, Trophy, Network, TrendingDown, Cpu, Zap] as const;

const featuresData = [
  {
    id: 1,
    titulo: "Descubrimiento pasivo de Vulnerabilidades",
    descripcion: "P365 es la única plataforma que realiza un reconocimiento 100% pasivo de activos, puertos, tecnologías web, vulnerabilidades, certificados SSL/TLS, gráficas de DNS, sub dominios, emails y mucho más sin necesidad de escanear o conectarse a los objetivos analizados.",
    icono: BarChart3,
  },
  {
    id: 2,
    titulo: "Desarrollo persistente y Actualizaciones Automáticas",
    descripcion: "Todo el código fuente está siempre bajo auditoría y revisiones de seguridad, las mejoras y actualizaciones de la plataforma jamás paran y el desarrollo de nuevas funcionalidades está basado en un road map de sugerencias hechas por un equipo de expertos y nuestros propios usuarios.",
    icono: Trophy,
  },
  {
    id: 3,
    titulo: "Facilidad de Uso",
    descripcion: "A diferencia de otras soluciones que tienen múltiples y complejas capas de configuración, en Pentest365 quitamos toda esa complejidad, con el propósito de brindar una experiencia intuitiva y amistosa para el usuario y que este pueda detectar y remediar las vulnerabilidades más rápido y con mayor eficacia.",
    icono: Network,
  },
  {
    id: 4,
    titulo: "Reduce el Riesgo, Costo y Tiempo",
    descripcion: "Nuestra tecnología está orientada a reducir el riesgo tecnológico, bajar el costo operativo y acortar los tiempos de reacción y remediación para optimizar el ROI de tu organización.",
    icono: TrendingDown,
  },
  {
    id: 5,
    titulo: "Gestión Centralizada",
    descripcion: "Reduce la necesidad de recursos humanos, mejorando la rentabilidad general en la protección de la seguridad y todo desde una consola centralizada que te permita expandir tus capacidades de auditoría sin incrementar tus recursos humanos.",
    icono: Cpu,
  },
  {
    id: 6,
    titulo: "Solución sin agentes",
    descripcion: "En cuestión de minutos puedes comenzar a escanear toda la Infraestructura de TI de tu organización, sin complicadas y largas instalaciones de agentes en todos los equipos. Tanto en la versión Cloud como Onpremise, la tecnología de P365 no requiere de agentes.",
    icono: Zap,
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
  const cardWidth = cardSize;
  const cardHeight = cardSize * 1.25; // Aún más alto para asegurar 0 scroll
  
  const offsetX = (cardWidth / 1.5) * position;
  const offsetY = isCenter ? -65 : position % 2 ? 15 : -15;
  const rotateZ = isCenter ? 0 : position % 2 ? 2.5 : -2.5;

  return (
    <motion.div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer flex flex-col items-center text-center p-6 md:p-8 rounded-2xl transition-shadow",
        isCenter 
          ? "z-10 bg-white border border-sky-100 shadow-[0_16px_40px_rgb(14,165,233,0.12)]" 
          : "z-0 bg-slate-50 border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(14,165,233,0.08)] hover:bg-white"
      )}
      style={{
        width: cardWidth,
        height: cardHeight,
        marginLeft: -cardWidth / 2,
        marginTop: -cardHeight / 2,
        transformOrigin: 'center center',
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
      <div className={cn(
        "mb-4 flex h-14 w-14 items-center justify-center rounded-2xl shrink-0 transition-colors",
        isCenter ? "bg-sky-50 text-sky-600 ring-1 ring-sky-100" : "bg-slate-100 text-slate-400 ring-1 ring-slate-200"
      )}>
        <Icon size={28} strokeWidth={1.5} />
      </div>
      
      <h3 className="mb-2 text-base md:text-lg font-semibold text-slate-800 leading-snug">
        {testimonial.by}
      </h3>
      
      <div className="flex-1 min-h-0 overflow-hidden w-full flex items-center justify-center">
        <p className="text-[13px] md:text-[14px] leading-relaxed text-slate-500">
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
      setCardSize(matches ? 360 : 280);
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
      style={{ height: 580 }}
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
            "flex h-12 w-12 items-center justify-center rounded-full text-xl transition-colors shadow-sm",
            "bg-white border border-slate-200 text-slate-700 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft strokeWidth={1.5} />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full text-xl transition-colors shadow-sm",
            "bg-white border border-slate-200 text-slate-700 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
};