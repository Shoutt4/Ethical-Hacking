import { Reveal } from './Reveal'
import { LogoMarquee } from './LogoMarquee'
import type { MarqueeItem } from './LogoMarquee'
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

const partners: MarqueeItem[] = [
  { src: bushido, name: 'Bushido Security' },
  { src: dts, name: 'DTS' },
  { src: hk, name: 'HK Mexico' },
  { src: solusoft, name: 'Solusoft' },
  { src: nuvol, name: 'Nuvol Cybersecurity' },
  { src: compas, name: 'Compas Solutions' },
  { src: atesa, name: 'ATESA' },
  { src: kurma, name: 'Kurma Technology Group' },
  { src: adsi, name: 'ADSI' },
  { src: infinyt, name: 'Infinyt' },
  { src: redtiseg, name: 'REDTISEG' },
]

export function Partners() {
  return (
    <section id="partners" className="partners">
      <Reveal>
        <p className="eyebrow center"><span></span> ECOSISTEMA DE CONFIANZA <span></span></p>
        <h2>Partners estratégicos</h2>
        <p className="section-copy partners-copy">
          Una red de aliados estratégicos que amplía nuestras capacidades y alcance en ciberseguridad.
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <LogoMarquee
          items={partners}
          ariaLabel="Logos de partners estratégicos: Bushido Security, DTS, HK Mexico, Solusoft, Nuvol Cybersecurity, Compas Solutions, ATESA, Kurma Technology Group, ADSI, Infinyt y REDTISEG"
          direction="left"
          speed={38}
        />
      </Reveal>
    </section>
  )
}