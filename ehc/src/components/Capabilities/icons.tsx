import {
  Radar,
  ShieldAlert,
  Network,
  Layers,
  ShieldCheck,
  Lock,
  RefreshCw,
  Search,
  FileText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function capabilityIcon(title: string): LucideIcon {
  switch (title) {
    case "Escaneo de puertos":
      return Radar;
    case "Evaluación de vulnerabilidades":
      return ShieldAlert;
    case "Descubrimiento de servicios":
      return Network;
    case "Tecnologías web":
      return Layers;
    case "Cabeceras HTTP/HTTPS":
      return ShieldCheck;
    case "Certificados SSL/TLS":
      return Lock;
    case "Análisis persistente":
      return RefreshCw;
    case "Crawling y monitoreo web":
      return Search;
    default:
      return FileText;
  }
}