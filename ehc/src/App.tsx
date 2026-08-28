import { useCallback, useEffect, useRef, useState } from 'react'
import FluidCursor from './components/FluidCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Services from './components/Services'
import About from './components/About'
import Training from './components/Training'
import Join from './components/Join'
import Blog from './components/Blog'
import Contact from './components/Contact'
import Footer from './components/Footer'

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
      {/*
        flag{Yeah! you find the EHC Flag}
        Prototipo de rediseño — EHC Group · React + TS + Tailwind
      */}
      <FluidCursor />
      <Navbar onSnack={showSnack} />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <About />
        <Training />
        <Join />
        <Blog />
        <Contact onSnack={showSnack} />
      </main>
      <Footer />

      <div aria-live="polite" className="pointer-events-none fixed right-5 bottom-5 left-5 z-[1000] flex justify-center sm:left-auto">
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
