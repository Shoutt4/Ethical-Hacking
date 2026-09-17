import banesco from '../assets/pentest365/clients/banesco.png'
import ripley from '../assets/pentest365/clients/banco-ripley.png'
import davivienda from '../assets/pentest365/clients/davivienda.png'
import gfr from '../assets/pentest365/clients/gfr-media.png'
import gobierno from '../assets/pentest365/clients/gobierno-de-panama.png'
import mercantil from '../assets/pentest365/clients/mercantil-santa-cruz.png'
import multitek from '../assets/pentest365/clients/multitek.png'
import negocie from '../assets/pentest365/clients/negocie-coins.png'
import sucre from '../assets/pentest365/clients/sucre-arias-reyes.png'
import stGeorges from '../assets/pentest365/clients/st-georges-bank.png'
import telered from '../assets/pentest365/clients/telered.png'
import presidencia from '../assets/pentest365/clients/presidencia-panama.png'
import bisa from '../assets/pentest365/clients/bisa.png'

export type ClientCountry = 'Panamá' | 'Bolivia' | 'Chile' | 'Brasil' | 'Puerto Rico'

export interface ClientCase {
  id: string
  country: ClientCountry
  countryCode: string
  client: string
  industry: string
  logo: string
  link: string
  service?: string
  description?: string
}

export interface Country {
  code: string
  name: string
  flag: string
}

export const COUNTRIES: Country[] = [
  { code: 'BO', name: 'Bolivia', flag: '\u{1F1E7}\u{1F1F4}' },
  { code: 'CL', name: 'Chile', flag: '\u{1F1E8}\u{1F1F1}' },
  { code: 'PA', name: 'Panamá', flag: '\u{1F1F5}\u{1F1E6}' },
  { code: 'BR', name: 'Brasil', flag: '\u{1F1E7}\u{1F1F7}' },
  { code: 'PR', name: 'Puerto Rico', flag: '\u{1F1F5}\u{1F1F7}' },
]

export function getCountry(code: string): Country | undefined {
  return COUNTRIES.find((c) => c.code === code)
}

export const CLIENT_CASES: ClientCase[] = [
  {
    id: 'banesco',
    country: 'Panamá',
    countryCode: 'PA',
    client: 'Banesco',
    industry: 'Banca',
    logo: banesco,
    link: 'https://www.banesco.com/',
    service: 'Vulnerability Assessment',
    description:
      'Monitoreo continuo del perímetro bancario mediante evaluación recurrente de vulnerabilidades, acortando la ventana entre detección y respuesta en infraestructura crítica.',
  },
  {
    id: 'banco-ripley',
    country: 'Chile',
    countryCode: 'CL',
    client: 'Banco Ripley',
    industry: 'Banca',
    logo: ripley,
    link: 'https://www.bancoripley.cl/',
    service: 'Compliance Reporting',
    description:
      'Automatización de escaneos orientados a auditoría, con evidencias y reportes listos para cumplimiento normativo y seguimiento de la postura de seguridad.',
  },
  {
    id: 'davivienda',
    country: 'Panamá',
    countryCode: 'PA',
    client: 'Davivienda',
    industry: 'Banca',
    logo: davivienda,
    link: 'https://www.davivienda.com/wps/portal/personas/nuevo',
    service: 'Web Crawling + HTTP Header Analysis',
    description:
      'Crawling y análisis de cabeceras HTTP sobre portales transaccionales para identificar configuraciones inseguras antes de que puedan ser explotadas.',
  },
  {
    id: 'gfr-media',
    country: 'Puerto Rico',
    countryCode: 'PR',
    client: 'GFR Media',
    industry: 'Medios',
    logo: gfr,
    link: 'https://www.gfrmedia.com/',
    service: 'Service Discovery + Port Scanning',
    description:
      'Inventario del perímetro externo mediante descubrimiento de servicios y puertos abiertos, localizando activos no gestionados para cerrar vectores de ataque.',
  },
  {
    id: 'gobierno-de-panama',
    country: 'Panamá',
    countryCode: 'PA',
    client: 'Gobierno de Panamá',
    industry: 'Gobierno',
    logo: gobierno,
    link: 'https://www.presidencia.gob.pa/',
    service: 'SSL/TLS Certificate Management',
    description:
      'Gestión centralizada de certificados SSL/TLS con monitoreo de caducidad y alertas tempranas, evitando interrupciones de servicio por certificados vencidos.',
  },
  {
    id: 'multitek',
    country: 'Panamá',
    countryCode: 'PA',
    client: 'Multitek',
    industry: 'Tecnología',
    logo: multitek,
    link: 'https://multitek.com.pa/',
    service: 'Technology Fingerprinting',
    description:
      'Mapeo de tecnologías web, versiones y CVEs asociados en ambientes de desarrollo y producción, priorizando la corrección por criticidad real.',
  },
  {
    id: 'bisa',
    country: 'Bolivia',
    countryCode: 'BO',
    client: 'BISA',
    industry: 'Banca',
    logo: bisa,
    link: 'https://www.bisa.com/',
  },
  {
    id: 'mercantil-santa-cruz',
    country: 'Bolivia',
    countryCode: 'BO',
    client: 'Banco Mercantil Santa Cruz',
    industry: 'Banca',
    logo: mercantil,
    link: 'https://www.bmsc.com.bo/',
  },
  {
    id: 'sucre-arias-reyes',
    country: 'Bolivia',
    countryCode: 'BO',
    client: 'Sucre Arias Reyes',
    industry: 'Casa de bolsa',
    logo: sucre,
    link: 'https://sucre.net/',
  },
  {
    id: 'negocie-coins',
    country: 'Brasil',
    countryCode: 'BR',
    client: 'Negocie Coins',
    industry: 'Fintech',
    logo: negocie,
    link: 'https://twitter.com/negociecoins',
  },
  {
    id: 'presidencia',
    country: 'Panamá',
    countryCode: 'PA',
    client: 'Presidencia de la República de Panamá',
    industry: 'Gobierno',
    logo: presidencia,
    link: 'https://www.presidencia.gob.pa/',
  },
  {
    id: 'st-georges-bank',
    country: 'Panamá',
    countryCode: 'PA',
    client: 'St. Georges Bank',
    industry: 'Banca',
    logo: stGeorges,
    link: 'https://www.stgeorgesbank.com/',
  },
  {
    id: 'telered',
    country: 'Panamá',
    countryCode: 'PA',
    client: 'Telered',
    industry: 'Pagos electrónicos',
    logo: telered,
    link: 'https://www.telered.com.pa/',
  },
]