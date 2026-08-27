export type AccentKey = 'green' | 'blue' | 'teal' | 'red' | 'yellow' | 'grey'

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

export const SERVICES: Service[] = [
  {
    id: 'sc-1',
    num: '01',
    tab: 'Pentesting',
    title: 'Pentesting externo e interno',
    desc: 'Simulamos ataques reales sobre tu infraestructura para descubrir y explotar vulnerabilidades antes que un adversario: perímetro, nube, red interna y Active Directory.',
    meta: ['Perímetro', 'Cloud', 'Active Directory', 'Red Team'],
    accent: 'green',
  },
  {
    id: 'sc-2',
    num: '02',
    tab: 'App Sec',
    title: 'Seguridad de apps web y móviles',
    desc: 'Auditoría manual y asistida de aplicaciones web, iOS, Android y APIs bajo OWASP WSTG y MASVS, con evidencia y PoCs accionables para tus equipos.',
    meta: ['Web', 'iOS', 'Android', 'APIs'],
    accent: 'blue',
  },
  {
    id: 'sc-3',
    num: '03',
    tab: 'Wireless',
    title: 'Redes inalámbricas',
    desc: 'Evaluamos el cifrado WPA2/WPA3, detectamos puntos de acceso rogue, probamos portales cautivos y validamos la segmentación de tus SSIDs corporativos.',
    meta: ['WPA3', 'Rogue AP', 'BYOD'],
    accent: 'teal',
  },
  {
    id: 'sc-4',
    num: '04',
    tab: 'Social Eng.',
    title: 'Ingeniería social',
    desc: 'Campañas controladas de phishing y vishing que miden la resistencia humana, detectan áreas críticas y entrenan a tu personal con métricas reales.',
    meta: ['Phishing', 'Vishing', 'Simulacros'],
    accent: 'red',
  },
  {
    id: 'sc-5',
    num: '05',
    tab: 'Compliance',
    title: 'Consultoría ISO 27001',
    desc: 'Acompañamiento completo del SGSI: gap analysis, gestión de riesgos, auditorías internas y soporte hasta la certificación. También PCI DSS.',
    meta: ['SGSI', 'Gestión de riesgos', 'PCI DSS'],
    accent: 'yellow',
  },
  {
    id: 'sc-6',
    num: '06',
    tab: 'Forense',
    title: 'Respuesta a incidentes y forense',
    desc: 'Contención, erradicación y análisis forense con cadena de custodia documentada; hardening posterior para evitar la reincidencia del vector.',
    meta: ['DFIR', 'Análisis malware', 'Peritaje'],
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
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Training', href: '#training' },
  { label: 'Oportunidades', href: '#oportunidades' },
  { label: 'EHC News', href: '#blog' },
]
