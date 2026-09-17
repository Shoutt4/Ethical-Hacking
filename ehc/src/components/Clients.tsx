import { Reveal } from './Reveal'
import { InteractiveClientExplorer } from './InteractiveClientExplorer'

export function Clients() {
  return (
    <section id="clientes" className="section clients">
      <Reveal>
        <p className="eyebrow"><span></span> CASOS DE ÉXITO <span></span></p>
        <h2>Conozca a nuestros clientes:<br /><em>desde el inicio hasta una marca global.</em></h2>
        <p className="section-copy clients-copy">
          Cada organización enfrenta retos únicos. Estos casos muestran cómo Pentest365 se adapta a la realidad de cada cliente para proteger lo que más importa.
        </p>
      </Reveal>

      <InteractiveClientExplorer />
    </section>
  )
}