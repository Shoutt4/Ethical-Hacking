import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Features } from './components/Features';
import { Functionalities } from './components/Functionalities';
import { ProductSpotlight } from './components/ProductSpotlight';
import { CyberSOC } from './components/CyberSOC';
import { Classification } from './components/Classification';
import { Partners } from './components/Partners';
import { Clients } from './components/Clients';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { Starfield } from './components/ui/starfield';

export default function App(){
  return (
    <main>
      <Navbar/>
      {/* WRAPPER PADRE — Starfield cubre Hero + Estadísticas */}
      <div
        className="relative isolate overflow-hidden bg-[#020617]"
        style={{
          maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
        }}
      >
        {/* fondo estrellado absoluto inferior */}
        <div aria-hidden className="absolute inset-0 z-0">
          <Starfield
            starCount={7500}
            starColor={{ r: 180, g: 210, b: 255 }}
            maxOpacity={0.9}
            rotationSpeed={0.00014}
            waveSpeed={0.0016}
            waveFrequency={18}
            starEscapeWidth={520}
            voidWidth={90}
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_-10%,rgba(56,189,248,0.18),transparent_58%)]" />
        </div>

        {/* Contenidos con fondo transparente para ver estrellas */}
        <div className="relative z-10">
          <Hero />
          <Stats />
        </div>
      </div>

      <Features/>
      <Functionalities/>
      <ProductSpotlight/>
      <CyberSOC/>
      <Classification/>
      <Partners/>
      <Clients/>
      <CTA/>
      <Footer/>
    </main>
  )
}
