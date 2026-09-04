export type AccentKey = 'green' | 'blue' | 'teal' | 'red' | 'yellow' | 'grey'
import logoPentest from '../assets/products/pentest.png'
import logoSealpath from '../assets/products/sealpath.webp'
export const ACCENTS: Record<AccentKey, { hex: string; dim: string }> = {
  green: { hex: '#7FCC27', dim: '#4A7A17' },
  blue: { hex: '#5088F5', dim: '#2C4E8F' },
  teal: { hex: '#26A69A', dim: '#17615A' },
  red: { hex: '#EF5D61', dim: '#8F3134' },
  yellow: { hex: '#FFB020', dim: '#8F6512' },
  grey: { hex: '#9A9A9A', dim: '#4D4D4D' },
}

export interface Service {
  id: string
  num: string
  tab: string
  title: string
  desc: string
  meta: string[]
  accent: AccentKey
}

export interface Milestone {
  id: string
  year: string
  title: string
  text: string
}

export const MILESTONES: Milestone[] = [
  {
    id: 'm1',
    year: '2001',
    title: 'Nace EHC Group',
    text: 'Iniciamos gestionando proyectos integrales de seguridad de la información: análisis de sistemas, implementación de soluciones y procesos que integran tecnología, procesos y personas.',
  },
  {
    id: 'm2',
    year: '2016',
    title: 'Expansión regional',
    text: 'Nos consolidamos como holding internacional de alta seguridad tecnológica con presencia en Estados Unidos y siete países de Latinoamérica.',
  },
  {
    id: 'm3',
    year: 'ESPECIALIDADES',
    title: 'Pentesting & ATM Security',
    text: 'Penetración en aplicaciones e infraestructuras críticas, con un fuerte enfoque en seguridad bancaria y de cajeros automáticos (ATMs).',
  },
  {
    id: 'm4',
    year: 'HOY',
    title: 'ISO 27001 · Cyber SOC',
    text: 'Operamos bajo normativa ISO 27001 y protegemos infraestructuras de gobierno, con Cyber SOC, informática forense e inteligencia informática.',
  },
]

export const SERVICES: Service[] = [
  {
    id: 'sc-1',
    num: '01',
    tab: 'Pentesting',
    title: 'Pentesting externo e interno',
    desc: 'Estos servicios, también conocidos como Ethical Hacking, abarcan pruebas de intrusión tanto externas como internas, así como evaluaciones a redes wireless y sistemas críticos como SAP y SCADA. Adicionalmente, el equipo realiza pruebas de ingeniería social y pentesting altamente especializado en cajeros automáticos (ATMs) para identificar brechas antes de que sean explotadas.'
    ,
    meta: ['Pruebas de Intrusión Externas e Internas', 'Evaluación en Redes Wireless y Sistemas SCADA / SAP.', 'Pruebas de Ingeniería Social.', 'Pentesting en Cajeros ATM.'],
    accent: 'green',
  },
  {
    id: 'sc-2',
    num: '02',
    tab: 'Auditoría ATM',
    title: 'Auditoría y Certificación de ATMs',
    desc: 'Estos servicios, también conocidos como Ethical Hacking, abarcan pruebas de intrusión tanto externas como internas, así como evaluaciones a redes wireless y sistemas críticos como SAP y SCADA. Adicionalmente, el equipo realiza pruebas de ingeniería social y pentesting altamente especializado en cajeros automáticos (ATMs) para identificar brechas antes de que sean explotadas.',
    meta: ['Auditoría de Controles (VISA, MASTERCARD, PROSA, PCI-DSS, ISO 8583).', 'Evaluación de Protecciones, SO, Aplicativos y Binarios/Anti Malware.', 'Análisis de Comunicaciones', 'Más de 300 controles propios para ATMs.'],
    accent: 'blue',
  },
  {
    id: 'sc-3',
    num: '03',
    tab: 'Forense',
    title: 'Informática Forense',
    desc: 'Este servicio se centra en la emisión de peritajes y dictámenes informáticos, sean judiciales o de parte, abarcando contra peritajes, arbitrajes y mediaciones prejudiciales. Incluye la valoración de riesgos de TI para seguros y la recuperación de información eliminada, garantizando en todo momento que la evidencia digital se preserve bajo estándares estrictos para mantener su total validez legal y judicial.',
    meta: ['Peritajes y Dictámenes Informáticos', 'Arbitrajes y Mediaciones Prejudiciales.', 'Recuperación de información eliminada.',  'Valoración de riesgos y daños de TI.'],
    accent: 'teal',
  },
  {
    id: 'sc-4',
    num: '04',
    tab: 'Derecho Informático',
    title: 'Asesoramiento en Derecho Informático',
    desc: 'Enfocado en la intersección entre tecnología y leyes, este servicio ofrece investigación y patrocinio legal en delitos informáticos como estafas, fraudes, conspiración y vulneración de la intimidad. También brindan apoyo especializado en el análisis de contratos informáticos, derechos de autor en internet, comercio y firma electrónica, además de la resolución de conflictos en línea (ODR).',
    meta: ['Investigación en Delitos Informáticos (Estafas, fraudes, conspiración).', 'Análisis de contratos y Derechos de Autor en Internet.', 'Firma Electrónica y Comercio Electrónico.', 'Resolución de conflictos en línea (ODR).'],
    accent: 'red',
  },
  {
    id: 'sc-5',
    num: '05',
    tab: 'Auditorías Integrales',
    title: 'Auditorías Integrales de Seguridad',
    desc: 'Orientado a proteger la infraestructura tecnológica, este servicio audita servidores, data centers y redes de datos (LAN, WAN, Wireless, VoIP). La evaluación profunda se extiende a la seguridad perimetral, el código binario, y aplicaciones tanto web como móviles, garantizando además el cumplimiento de estándares internacionales críticos como PCI-DSS v3.0 e ISO 27001/27002.',
    meta: ['Auditoría a Servidores, Data Centers y Redes de datos (LAN, WAN, VoIP).', 'Evaluación de Aplicaciones Web, Móviles y Código Binario.', 'Revisión de Seguridad Perimetral.','Cumplimiento de normativas (PCI-DSS v3.0, ISO 27001/27002).' ],
    accent: 'yellow',
  },
  {
    id: 'sc-6',
    num: '06',
    tab: 'Ciberinteligencia',
    title: 'Inteligencia Informática',
    desc: 'Con servicios diseñados y ofrecidos exclusivamente a Gobiernos, esta división se especializa en CYBINT (Cyber Intelligence), COMINT (Communications Intelligence) y entrenamiento en HUMINT (Human Intelligence). Su labor incluye la formación de cuerpos de inteligencia y el diseño y desarrollo de Centros de Respuesta a Incidentes Cibernéticos y de monitoreo para la seguridad ciudadana.',
    meta: ['Servicios CYBINT, COMINT y Desarrollo de Centros de Respuesta a Incidentes Cibernéticos.', 'Centros de Monitoreo y Seguridad Ciudadana.'],
    accent: 'grey',
  },
]

export interface Course {
  day: string
  month: string
  title: string
  modality: string
  hours: string
  code: string
}

export const COURSES: Course[] = [
  { day: '15', month: 'SEP', title: 'Certified Professional Pentester', modality: 'Presencial · Panamá', hours: '40 h', code: 'CPPT' },
  { day: '06', month: 'OCT', title: 'Web Applications Security Auditor', modality: 'Live Online', hours: '32 h', code: 'WASA' },
  { day: '20', month: 'NOV', title: 'Internal Auditor ISO 27001', modality: 'Presencial · CDMX', hours: '24 h', code: 'LA-IS' },
]

export const CERTS: string[] = [
  'Certified Professional Pentester',
  'Metasploit Professional Pentester',
  'Certified Computer Forensic Investigator',
  'Certified Computer Forensic Expert',
  'Web Applications Security Auditor',
  'Internal Auditor ISO 27001',
  'ATM Lead Security Auditor',
]

export type Grad = 'g1' | 'g2' | 'g3'

export interface Post {
  pill: string
  title: string
  date: string
  mins: number
  grad: Grad
}

export const POSTS: Post[] = [
  { pill: 'Red Team', title: 'Red Team vs Blue Team vs Purple Team: ¿qué necesita tu empresa?', date: '12 AGO 2026', mins: 8, grad: 'g1' },
  { pill: 'OSINT', title: 'Así es Shodan, el buscador preferido de los hackers', date: '28 JUL 2026', mins: 6, grad: 'g2' },
  { pill: 'Hardening', title: 'Guía práctica de hardening de Linux en producción', date: '15 JUL 2026', mins: 10, grad: 'g3' },
]

export const GRADIENTS: Record<Grad, string> = {
  g1: 'bg-[linear-gradient(135deg,#101C08,#000)]',
  g2: 'bg-[linear-gradient(135deg,#081420,#000)]',
  g3: 'bg-[linear-gradient(135deg,#190F08,#000)]',
}

export const STANDARDS: string[] = [
  'ISO 27001',
  'PCI DSS',
  'OWASP',
  'MITRE ATT&CK',
  'NIST CSF',
  'CVSS',
  'Kali Linux',
  'OSINT',
  'Red Team / Blue Team',
]

export interface NavLink {
  label: string
  href: string
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Inicio', href: '#top' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Soluciones', href: '#productos' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Capacitación', href: '#training' },
  { label: 'Cobertura global', href: '#canales' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contacto', href: '#contacto' },
]

export type ProductStatus = 'live' | 'maintenance'

export interface Product {
  id: string
  title: string
  subtitle: string
  features: string[]
  url: string
  urlLabel?: string
  logo: string
  logoAlt: string
  plate: 'light' | 'dark'
  status: ProductStatus
}

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: 'Pentest365',
    subtitle: 'Solución de Pentesting Persistente en la Nube',
    features: [
      'Monitoreo de Seguridad y Amenazas 24/7',
      'Identificación de tecnologías web y búsqueda de exploits',
      'Dashboard de resultados y alertas',
      'Descubrimiento de dispositivos IoT',
    ],
    url: 'https://pentest365.io/',
    logo: logoPentest,
    logoAlt: 'Logo Pentest365',
    plate: 'light',
    status: 'live',
  },
  {
    id: 'p2',
    title: 'Firmanza',
    subtitle: 'Tu firma de confianza',
    features: [
      'Firma electrónica de documentos',
      'Correo electrónico certificado',
      'Testigo Digital Online (Notario Web)',
      'Firma Electrónica de Transacciones',
      'Timbrado de Factura Electrónica',
      'Sellos HTTP Seguros',
    ],
    url: 'https://firmanza.com/',
    logo: 'https://firmanza.com/brand/og.png',
    logoAlt: 'Logo Firmanza',
    plate: 'light',
    status: 'live',
  },
  {
    id: 'p3',
    title: 'Blackfog',
    subtitle: 'Herramienta de seguridad y privacidad',
    features: [
      'Asegura tus equipos y datos remotos',
      'Protección 100% sin archivos',
      'Múltiples capas de defensa',
      'Protección contra ransomware, privacidad del dispositivo y criptojacking',
    ],
    url: 'https://www.blackfog.com/',
    logo: 'https://privacy.blackfog.com/wp-content/uploads/2025/03/BF-Primary-Logo-Inverse-e1742569299728.png',
    logoAlt: 'Logo BlackFog',
    plate: 'dark',
    status: 'live',
  },
  {
    id: 'p4',
    title: 'SealPath',
    subtitle: 'Herramienta de seguridad centrada en datos',
    features: [
      'Protege y controla datos corporativos donde viajen',
      'Controla quién accede, cuándo y con qué permisos',
      'Visualiza detalles de accesos al documento',
    ],
    url: 'https://sealpath.com/',
    logo: logoSealpath,
    logoAlt: 'Logo SealPath',
    plate: 'light',
    status: 'live',
  },
]

export interface Partner {
  id: string
  name: string
  country: string
  city: string
  email: string
  phone: string
  website?: string
  services: string[]
  mapX: number
  mapY: number
  lat: number
  lng: number
  geoId: string
}

export const PARTNERS: Partner[] = [
  { id: 'certy', name: 'Certy Group', country: 'República Dominicana', city: 'Santo Domingo', email: 'rfernandez@certygroup.com', phone: '+1 809-793-1124', website: 'www.certygroup.com', services: ['Pentesting', 'Compliance', 'Forense'], mapX: 295, mapY: 185, lat: 18.49, lng: -69.93, geoId: '214' },
  { id: 'integsa', name: 'Integsa', country: 'México', city: 'Monterrey', email: 'servicio@integsa.com.mx', phone: '+52 81 1100 1150', website: 'www.integsa.com.mx', services: ['Pentesting', 'App Sec', 'Consultoría'], mapX: 175, mapY: 175, lat: 25.69, lng: -100.32, geoId: '484' },
  { id: 'adsi', name: 'ADSI', country: 'Estados Unidos', city: 'Miami', email: 'info@adsintl.net', phone: '+1 954 889 1366', services: ['Pentesting', 'Red Team', 'Forense'], mapX: 225, mapY: 145, lat: 25.76, lng: -80.19, geoId: '840' },
  { id: 'infinyt', name: 'Infinyt', country: 'México', city: 'Ciudad de México', email: 'info@infinyt.mx', phone: '+52 (81) 2474-5555', website: 'infinyt.mx', services: ['App Sec', 'Wireless', 'Consultoría'], mapX: 165, mapY: 190, lat: 19.43, lng: -99.13, geoId: '484' },
  { id: 'bushido', name: 'Bushido Security', country: 'Colombia', city: 'Bogotá', email: 'info@bushidosec.com', phone: '(+57) 3182704207', website: 'bushidosec.com', services: ['Pentesting', 'Red Team', 'Social Eng.'], mapX: 250, mapY: 260, lat: 4.71, lng: -74.07, geoId: '170' },
  { id: 'redtiseg', name: 'REDTISEG', country: 'Bolivia', city: 'La Paz', email: 'contacto@redtiseg.com', phone: '+591 62674446', website: 'www.redtiseg.com', services: ['Compliance', 'Consultoría', 'Forense'], mapX: 255, mapY: 330, lat: -16.49, lng: -68.12, geoId: '068' },
]
