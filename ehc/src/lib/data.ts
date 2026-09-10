export type AccentKey = "green" | "blue" | "teal" | "red" | "yellow" | "grey" | "amber" | "cyan";
import logoPentest from "../assets/products/pentest.png";
import logoSealpath from "../assets/products/sealpath.webp";
export const ACCENTS: Record<AccentKey, { hex: string; dim: string }> = {
  green: { hex: "#7FCC27", dim: "#4A7A17" },
  blue: { hex: "#5088F5", dim: "#2C4E8F" },
  teal: { hex: "#26A69A", dim: "#17615A" },
  red: { hex: "#EF5D61", dim: "#8F3134" },
  yellow: { hex: "#FFB020", dim: "#8F6512" },
  grey: { hex: "#9A9A9A", dim: "#4D4D4D" },
  amber: { hex: "#F2A900", dim: "#8F6300" },
  cyan: { hex: "#1FA2D8", dim: "#125E80" },
};

export interface Service {
  id: string;
  num: string;
  tab: string;
  title: string;
  desc: string;
  meta: string[];
  accent: AccentKey;
  icon: string;
  alcance: string;
  objetivo: string;
}

export interface Milestone {
  id: string;
  year: string;
  title: string;
  text: string;
}

export const MILESTONES: Milestone[] = [
  {
    id: "m1",
    year: "2001",
    title: "Nace EHC Group",
    text: "Iniciamos gestionando proyectos integrales de seguridad de la información: análisis de sistemas, implementación de soluciones y procesos que integran tecnología, procesos y personas.",
  },
  {
    id: "m2",
    year: "2016",
    title: "Expansión regional",
    text: "Nos consolidamos como holding internacional de alta seguridad tecnológica con presencia en Estados Unidos y siete países de Latinoamérica.",
  },
  {
    id: "m3",
    year: "ESPECIALIDADES",
    title: "Pentesting & ATM Security",
    text: "Penetración en aplicaciones e infraestructuras críticas, con un fuerte enfoque en seguridad bancaria y de cajeros automáticos (ATMs).",
  },
  {
    id: "m4",
    year: "HOY",
    title: "ISO 27001 · Cyber SOC",
    text: "Operamos bajo normativa ISO 27001 y protegemos infraestructuras de gobierno, con Cyber SOC, informática forense e inteligencia informática.",
  },
];

export const SERVICES: Service[] = [
  {
    id: "sc-1",
    num: "01",
    tab: "Pentesting",
    title: "Pentesting externo e interno",
    desc: "Ethical Hacking para identificar vulnerabilidades y vectores de ataque mediante intrusiones controladas en redes, sistemas y personas.",
    meta: ["Pruebas de Intrusión Externas e Internas","Evaluación Wireless, SAP y SCADA","Ingeniería Social","Pentesting especializado en ATMs"],
    icon: "a",
    accent: "green",
    alcance: "Evaluación de perímetro externo/interno, wireless, SAP/SCADA, ATMs y factor humano vía ingeniería social, bajo Ethical Hacking sin impacto productivo.",
    objetivo: "Identificar y priorizar vulnerabilidades con evidencia reproducible y roadmap de remediación para reducir exposición antes de un ataque real."
  },
  {
    id: "sc-2",
    num: "02",
    tab: "Auditoría ATM",
    title: "Auditoría y Certificación de ATMs",
    desc: "Auditoría y certificación de cajeros automáticos bajo estándares internacionales y más de 300 controles propios de EHC.",
    meta: ["Controles VISA, MASTERCARD, PROSA, PCI-DSS/PA-DSS/PTS e ISO 8583","Protecciones, perímetro, SO, aplicaciones y binarios","Espectro de frecuencia y comunicaciones","Más de 300 controles propios para ATMs"],
    icon: "b",
    accent: "blue",
    alcance: "Auditoría del ecosistema ATM: controles VISA, MASTERCARD, PROSA, PCI/PTS e ISO 8583, protecciones físicas/lógicas, SO, binarios, espectro y comunicaciones, con 300+ controles propios.",
    objetivo: "Certificar la seguridad del parque ATM y cerrar brechas de skimming, jackpotting y fraude con hallazgos priorizados por riesgo."
  },
  {
    id: "sc-3",
    num: "03",
    tab: "Forense",
    title: "Informática Forense",
    desc: "Peritajes y dictámenes informáticos con preservación de evidencia digital para asegurar validez legal y judicial.",
    meta: ["Peritajes, dictámenes y contra peritajes","Arbitrajes y mediaciones prejudiciales","Recuperación de información eliminada","Preservación de evidencia con valor judicial"],
    icon: "c",
    accent: "teal",
    alcance: "Peritajes, dictámenes y contra peritajes, arbitrajes y mediaciones prejudiciales, evaluación de daños de TI para seguros, recuperación de datos y cadena de custodia forense.",
    objetivo: "Aportar evidencia digital sólida y válida que sustente decisiones judiciales y de seguros con trazabilidad e integridad."
  },
  {
    id: "sc-4",
    num: "04",
    tab: "Derecho Informático",
    title: "Asesoramiento en Derecho Informático",
    desc: "Asesoramiento jurídico en la intersección de tecnología y ley, con foco en delitos informáticos y normativa digital.",
    meta: ["Investigación y patrocinio en delitos informáticos","Contratos informáticos y derechos de autor","Firma electrónica, comercio electrónico y sellos de confianza","ODR y vulneración de la privacidad"],
    icon: "d",
    accent: "red",
    alcance: "Investigación y patrocinio en delitos informáticos, contratos tecnológicos, derechos de autor, firma y comercio electrónico, privacidad, estafas/fraudes y ODR.",
    objetivo: "Traducir riesgo tecnológico a estrategia jurídica que prevenga responsabilidad y habilite operaciones digitales con validez legal."
  },
  {
    id: "sc-5",
    num: "05",
    tab: "Auditorías Integrales",
    title: "Auditorías Integrales de Seguridad",
    desc: "Evaluación integral de infraestructura, aplicaciones y código para verificar seguridad perimetral y cumplimiento normativo.",
    meta: ["Servidores, Data Centers y redes LAN/WAN/Wireless/VoIP","Aplicaciones Web, móviles y desarrollo seguro","Seguridad perimetral y código binario","Cumplimiento PCI-DSS v3.0 e ISO 27001/27002"],
    icon: "e",
    accent: "yellow",
    alcance: "Revisión de servidores, Data Centers, redes LAN/WAN/Wireless/VoIP, apps Web/móviles, perímetro y código binario, alineada a PCI-DSS v3.0 e ISO 27001/27002.",
    objetivo: "Obtener fotografía integral de seguridad y cumplimiento para priorizar cierres de brechas con plan por criticidad y esfuerzo."
  },
  {
    id: "sc-6",
    num: "06",
    tab: "Ciberinteligencia",
    title: "Inteligencia Informática",
    desc: "Servicios exclusivos para gobiernos en CYBINT, COMINT y HUMINT, con centros de respuesta y monitoreo.",
    meta: ["Cyber Intelligence (CYBINT) y COMINT","Formación HUMINT y cuerpos de inteligencia","Centros de Respuesta a Incidentes Cibernéticos","Centros de Monitoreo y Seguridad"],
    icon: "f",
    accent: "grey",
    alcance: "Formación en CYBINT, COMINT y HUMINT y despliegue de Centros de Respuesta a Incidentes y Centros de Monitoreo y Seguridad.",
    objetivo: "Dotar exclusivamente a gobiernos de capacidades que anticipen y contengan amenazas contra la seguridad ciudadana y del Estado."
  },
  {
    id: "sc-7",
    num: "07",
    tab: "Capacitación y certificaciones en seguridad",
    title: "Entrenamiento en Seguridad",
    desc: "Formación práctica con laboratorios virtualizados y plataforma e-learning para certificaciones especializadas.",
    meta: ["Cursos 100% prácticos con laboratorios virtualizados","Lecciones grabadas y plataforma e-learning","Capacitadores internacionales y soporte en 3 idiomas","Certificaciones en pentesting, forense e ISO 27001"],
    icon: "g",
    accent: "amber",
    alcance: "Cursos 100% prácticos con labs virtualizados, lecciones grabadas, plataforma e-learning y soporte en 3 idiomas con instructores internacionales.",
    objetivo: "Desarrollar competencias certificables y aplicables desde el primer día con entrenamiento continuo y validación por certificaciones."
  },
  {
    id: "sc-8",
    num: "08",
    tab: "Analítica y plataformas Big Data de seguridad",
    title: "Soluciones Big Data",
    desc: "Analítica y monitoreo con Big Data, SIEM y Splunk/Hadoop para detección de amenazas y fraudes.",
    meta: ["Asymmetric Big Data Security Analytics","ATM Risk Operation Center y Security Center Log Manager","SIEM integrado con Big Data y nube","Detección de fraudes y desarrollo Splunk/Hadoop"],
    icon: "h",
    accent: "cyan",
    alcance: "Asymmetric Big Data Security Analytics, ATM Risk y Log Manager, SIEM con Big Data en nube, monitoreo de amenazas y fraudes en telecom con Splunk/Hadoop.",
    objetivo: "Convertir logs y eventos masivos en inteligencia accionable para correlacionar, detectar anomalías y orquestar respuesta a escala."
  },
];

export interface Course {
  day: string;
  month: string;
  title: string;
  modality: string;
  hours: string;
  code: string;
}

export const COURSES: Course[] = [
  {
    day: "15",
    month: "SEP",
    title: "Certified Professional Pentester",
    modality: "Presencial · Panamá",
    hours: "40 h",
    code: "CPPT",
  },
  {
    day: "06",
    month: "OCT",
    title: "Web Applications Security Auditor",
    modality: "Live Online",
    hours: "32 h",
    code: "WASA",
  },
  {
    day: "20",
    month: "NOV",
    title: "Internal Auditor ISO 27001",
    modality: "Presencial · CDMX",
    hours: "24 h",
    code: "LA-IS",
  },
];

export const CERTS: string[] = [
  "Certified Professional Pentester",
  "Metasploit Professional Pentester",
  "Certified Computer Forensic Investigator",
  "Certified Computer Forensic Expert",
  "Web Applications Security Auditor",
  "Internal Auditor ISO 27001",
  "ATM Lead Security Auditor",
];

export type Grad = "g1" | "g2" | "g3";

export interface Post {
  pill: string;
  title: string;
  date: string;
  mins: number;
  grad: Grad;
}

export const POSTS: Post[] = [
  {
    pill: "Red Team",
    title: "Red Team vs Blue Team vs Purple Team: ¿qué necesita tu empresa?",
    date: "12 AGO 2026",
    mins: 8,
    grad: "g1",
  },
  {
    pill: "OSINT",
    title: "Así es Shodan, el buscador preferido de los hackers",
    date: "28 JUL 2026",
    mins: 6,
    grad: "g2",
  },
  {
    pill: "Hardening",
    title: "Guía práctica de hardening de Linux en producción",
    date: "15 JUL 2026",
    mins: 10,
    grad: "g3",
  },
];

export const GRADIENTS: Record<Grad, string> = {
  g1: "bg-[linear-gradient(135deg,#101C08,#000)]",
  g2: "bg-[linear-gradient(135deg,#081420,#000)]",
  g3: "bg-[linear-gradient(135deg,#190F08,#000)]",
};

export const STANDARDS: string[] = [
  "ISO 27001",
  "PCI DSS",
  "OWASP",
  "MITRE ATT&CK",
  "NIST CSF",
  "CVSS",
  "Kali Linux",
  "OSINT",
  "Red Team / Blue Team",
];

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Inicio", href: "#top" },
  { label: "Servicios", href: "#servicios" },
  { label: "Soluciones", href: "#productos" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Capacitación", href: "#training" },
  { label: "Cobertura global", href: "#canales" },
  { label: "Blog", href: "#blog" },
  { label: "Contacto", href: "#contacto" },
];

export type ProductStatus = "live" | "maintenance";

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  features: string[];
  url: string;
  urlLabel?: string;
  logo: string;
  logoAlt: string;
  plate: "light" | "dark";
  status: ProductStatus;
}

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    title: "Pentest365",
    subtitle: "Solución de Pentesting Persistente en la Nube",
    features: [
      "Monitoreo de Seguridad y Amenazas 24/7",
      "Identificación de tecnologías web y búsqueda de exploits",
      "Dashboard de resultados y alertas",
      "Descubrimiento de dispositivos IoT",
    ],
    url: "https://pentest365.io/",
    logo: logoPentest,
    logoAlt: "Logo Pentest365",
    plate: "light",
    status: "live",
  },
  {
    id: "p2",
    title: "Firmanza",
    subtitle: "Tu firma de confianza",
    features: [
      "Firma electrónica de documentos",
      "Correo electrónico certificado",
      "Testigo Digital Online (Notario Web)",
      "Firma Electrónica de Transacciones",
      "Timbrado de Factura Electrónica",
      "Sellos HTTP Seguros",
    ],
    url: "https://firmanza.com/",
    logo: "https://firmanza.com/brand/og.png",
    logoAlt: "Logo Firmanza",
    plate: "light",
    status: "live",
  },
  {
    id: "p3",
    title: "Blackfog",
    subtitle: "Herramienta de seguridad y privacidad",
    features: [
      "Asegura tus equipos y datos remotos",
      "Protección 100% sin archivos",
      "Múltiples capas de defensa",
      "Protección contra ransomware, privacidad del dispositivo y criptojacking",
    ],
    url: "https://www.blackfog.com/",
    logo: "https://privacy.blackfog.com/wp-content/uploads/2025/03/BF-Primary-Logo-Inverse-e1742569299728.png",
    logoAlt: "Logo BlackFog",
    plate: "dark",
    status: "live",
  },
  {
    id: "p4",
    title: "SealPath",
    subtitle: "Herramienta de seguridad centrada en datos",
    features: [
      "Protege y controla datos corporativos donde viajen",
      "Controla quién accede, cuándo y con qué permisos",
      "Visualiza detalles de accesos al documento",
    ],
    url: "https://sealpath.com/",
    logo: logoSealpath,
    logoAlt: "Logo SealPath",
    plate: "light",
    status: "live",
  },
];

export interface Partner {
  id: string;
  name: string;
  country: string;
  email: string;
  phone: string;
  website?: string;
  services: string[];
  mapX: number;
  mapY: number;
  lat: number;
  lng: number;
  geoId: string;
}

export const PARTNERS: Partner[] = [
  {
    id: "certy",
    name: "Certy Group",
    country: "República Dominicana",
    email: "rfernandez@certygroup.com",
    phone: "+1 809-793-1124",
    website: "www.certygroup.com",
    services: ["Pentesting", "Compliance", "Forense"],
    mapX: 295,
    mapY: 185,
    lat: 18.49,
    lng: -69.93,
    geoId: "214",
  },
  {
    id: "integsa",
    name: "Integsa",
    country: "México",
    email: "servicio@integsa.com.mx",
    phone: "+52 81 1100 1150",
    website: "www.integsa.com.mx",
    services: ["Pentesting", "App Sec", "Consultoría"],
    mapX: 175,
    mapY: 175,
    lat: 25.69,
    lng: -100.32,
    geoId: "484",
  },
  {
    id: "adsi",
    name: "ADSI",
    country: "Estados Unidos",
    email: "info@adsintl.net",
    phone: "+1 954 889 1366",
    services: ["Pentesting", "Red Team", "Forense"],
    mapX: 225,
    mapY: 145,
    lat: 25.76,
    lng: -80.19,
    geoId: "840",
  },
  {
    id: "infinyt",
    name: "Infinyt",
    country: "México",
    email: "info@infinyt.mx",
    phone: "+52 (81) 2474-5555",
    website: "infinyt.mx",
    services: ["App Sec", "Wireless", "Consultoría"],
    mapX: 165,
    mapY: 190,
    lat: 19.43,
    lng: -99.13,
    geoId: "484",
  },
  {
    id: "bushido",
    name: "Bushido Security",
    country: "Colombia",
    email: "info@bushidosec.com",
    phone: "(+57) 3182704207",
    website: "bushidosec.com",
    services: ["Pentesting", "Red Team", "Social Eng."],
    mapX: 250,
    mapY: 260,
    lat: 4.71,
    lng: -74.07,
    geoId: "170",
  },
  {
    id: "redtiseg",
    name: "REDTISEG",
    country: "Bolivia",
    email: "contacto@redtiseg.com",
    phone: "+591 62674446",
    website: "www.redtiseg.com",
    services: ["Compliance", "Consultoría", "Forense"],
    mapX: 255,
    mapY: 330,
    lat: -16.49,
    lng: -68.12,
    geoId: "068",
  },
];
