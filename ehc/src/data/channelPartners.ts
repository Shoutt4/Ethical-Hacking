import adsi from '../assets/pentest365/partners/adsi.png'
import atesa from '../assets/pentest365/partners/atesa.png'
import bushido from '../assets/pentest365/partners/bushido-security.png'
import compas from '../assets/pentest365/partners/compas-solutions.png'
import dts from '../assets/pentest365/partners/dts.png'
import hk from '../assets/pentest365/partners/hk-mexico.png'
import infinyt from '../assets/pentest365/partners/infinyt.png'
import kurma from '../assets/pentest365/partners/kurma.png'
import nuvol from '../assets/pentest365/partners/nuvol-cybersecurity.png'
import redtiseg from '../assets/pentest365/partners/redtiseg.png'
import solusoft from '../assets/pentest365/partners/solusoft.png'

export type ChannelPartner = {
  id: string
  name: string
  country: string
  phone: string | null
  website: string
  email: string | null
  logo: string
}

export const CHANNEL_PARTNERS: ChannelPartner[] = [
  {
    id: 'bushido-security',
    name: 'Bushido Security',
    country: 'Colombia',
    phone: '+57 3182704207',
    website: 'www.bushidosec.com',
    email: 'info@bushidosec.com',
    logo: bushido,
  },
  {
    id: 'dts',
    name: 'DTS',
    country: 'Chile',
    phone: null,
    website: 'www.dtschile.com',
    email: 'contacto@dtschile.com',
    logo: dts,
  },
  {
    id: 'hk-mexico',
    name: 'HK Mexico',
    country: 'México',
    phone: '+81 4170 8245',
    website: 'www.hkmexico.com',
    email: 'contacto@hkmexico.com',
    logo: hk,
  },
  {
    id: 'solusoft',
    name: 'Solusoft',
    country: 'Panamá',
    phone: '+507 2329222',
    website: 'solusoft.com',
    email: 'ventas@solusoft.com',
    logo: solusoft,
  },
  {
    id: 'nuvol',
    name: 'Nuvol Cybersecurity',
    country: 'Panamá',
    phone: '+507 6203 0287',
    website: 'www.cybernuvol.com',
    email: 'info@nuvol.com.pa',
    logo: nuvol,
  },
  {
    id: 'compas-solutions',
    name: 'Compas Solutions',
    country: 'Bolivia',
    phone: '+591 2 2794149',
    website: 'www.compassolutions.us',
    email: 'ventas@compas.solutions',
    logo: compas,
  },
  {
    id: 'atesa',
    name: 'ATESA',
    country: 'Costa Rica',
    phone: '+506 8572 4657',
    website: 'www.atesacr.com',
    email: 'servicioalcliente@atesacr.com',
    logo: atesa,
  },
  {
    id: 'kurma',
    name: 'Kurma Technology Group',
    country: 'Panamá',
    phone: '+507 830 7974',
    website: 'kurma-technology.com',
    email: null,
    logo: kurma,
  },
  {
    id: 'adsi',
    name: 'ADSI',
    country: 'Bolivia, Venezuela y Panamá',
    phone: '+1 (954) 889-1366',
    website: 'www.adsintl.net',
    email: 'info@advancedservicesintl.com',
    logo: adsi,
  },
  {
    id: 'infinyt',
    name: 'Infinyt',
    country: 'México',
    phone: '+52 (81) 2474-5555',
    website: 'infinyt.mx',
    email: 'info@infinyt.mx',
    logo: infinyt,
  },
  {
    id: 'redtiseg',
    name: 'REDTISEG',
    country: 'Bolivia',
    phone: '+591 626 74446',
    website: 'redtiseg.com',
    email: 'contacto@redtiseg.com',
    logo: redtiseg,
  },
]