import { useCallback, useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
 
import Services from './components/Services'
import About from './components/About'
import Training from './components/Training'
import Products from './components/Products'
import Channels from './components/Channels'
import Blog from './components/Blog'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Partners from './components/Partners'

export default function App() {
  const [snack, setSnack] = useState<string | null>(null)
  const timerRef = useRef<number>(0)

  const showSnack = useCallback((msg: string) => {
    setSnack(msg)
    window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setSnack(null), 3200)
  }, [])

  useEffect(() => {
    let buffer = ''
    const onKey = (e: KeyboardEvent) => {
      if (e.key.length !== 1) return
      buffer = (buffer + e.key.toLowerCase()).slice(-4)
      if (buffer === 'flag') {
        showSnack('flag{Yeah! you find the EHC Flag}')
        buffer = ''
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.clearTimeout(timerRef.current)
    }
  }, [showSnack])

  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      {/*
        flag{Yeah! you find the EHC Flag}
        Prototipo de rediseño — EHC Group · React + TS + Tailwind
      */}
      <Navbar onSnack={showSnack} />
      <main id="contenido">
        <Hero />
        
        <Partners />
        <Services />
        <Products />
        <hr className="gradient-divider" />
        <About />
        <hr className="gradient-divider--wide" />
        <Training />
        <hr className="gradient-divider" />
        <Channels onSnack={showSnack} />
        <hr className="gradient-divider--wide" />
        <Blog />
        <Contact onSnack={showSnack} />
      </main>
      <Footer />

      <div aria-live="polite" className="pointer-events-none fixed right-5 bottom-5 left-5 z-[21] flex justify-center sm:left-auto">
        {snack && (
          <p className="max-w-full border border-volt bg-night px-5 py-3.5 font-code text-xs tracking-wide break-words text-white shadow-none sm:max-w-md">
            <span className="mr-2 text-volt">▮</span>
            {snack}
          </p>
        )}
      </div>
    </>
  )
}
