import { motion } from 'framer-motion';
import hero from '../assets/hero.png';

export function Dashboard({mode='overview'}:{mode?:string}){const bars=mode==='ports'?[82,61,89,45,72]:[44,79,58,90,67];return <div className="dashboard" aria-label="Vista previa de dashboard de seguridad"><div className="dash-top"><span className="dot r"></span><span className="dot y"></span><span className="dot g"></span><em>pentest365 / security center</em><span className="live">● LIVE</span></div><div className="dash-body"><aside><b>p365</b><span>▦</span><span>◫</span><span>⌁</span><span>◌</span></aside><div className="dash-content"><div className="dash-title"><div><small>VISIBILIDAD DE SEGURIDAD</small><strong>{mode==='ports'?'Exploración de puertos':'Postura de riesgo'}</strong></div><button>Últimos 30 días⌄</button></div><div className="dash-cards"><div><small>ACTIVOS</small><b>2,096</b><span className="up">↑ 12.5%</span></div><div><small>RIESGO CRÍTICO</small><b>08</b><span className="red">requiere atención</span></div><div><small>COBERTURA</small><b>98.4%</b><span className="up">↑ 2.1%</span></div></div><div className="chart"><div className="chart-label"><b>Actividad de descubrimiento</b><span>actualizado ahora</span></div><div className="bars">{bars.map((h,i)=><motion.i key={i} initial={{height:0}} animate={{height:`${h}%`}} transition={{delay:i*.08}}/>)}</div></div></div></div></div>}

export function Hero(){
  return (
    <section id="inicio" className="hero-section relative isolate overflow-hidden !bg-transparent bg-transparent">
      <div className="hero-wrap relative z-10">
        <motion.div
          className="hero-copy relative"
          initial={{opacity:0,y:24}}
          animate={{opacity:1,y:0}}
          transition={{duration:.6}}
        >
          {/* capa base translúcida detrás del texto — asegura legibilidad sobre estrellas */}
          <div aria-hidden className="absolute -inset-6 -z-10 rounded-[20px] bg-black/30 backdrop-blur-[2px] md:-inset-8" />
          <p className="eyebrow !text-white/90"><span className="!bg-sky-300"></span> CIBERSEGURIDAD INTELIGENTE</p>
          <h1 className="!text-white">
            Visibilidad y seguridad <em className="!text-sky-300">continua</em> para tu organización.
          </h1>
          <p className="lead !max-w-[560px] !text-gray-200">
            Identifica activos, vulnerabilidades y riesgos de seguridad desde una plataforma centralizada diseñada para proteger tu infraestructura.
          </p>
          <div className="hero-buttons">
            <a
              href="#cotizacion"
              className="button !border-sky-400 !bg-sky-500 !text-white shadow-[0_0_22px_rgba(56,189,248,0.45),0_4px_18px_rgba(2,6,23,0.4)] hover:!bg-sky-400 hover:shadow-[0_0_28px_rgba(56,189,248,0.6)]"
            >
              Prueba gratis <b>→</b>
            </a>
            <a
              href="#funcionalidades"
              className="link-button !text-white/85 hover:!text-white !border-white/20 hover:!border-white/40"
            >
              Conoce la plataforma <span className="!text-sky-300">↓</span>
            </a>
          </div>
          <div className="trust !mt-8">
            <div className="avatars">
              <i className="!bg-sky-500 !border-[#020617]">A</i><i className="!border-[#020617]">L</i><i className="!border-[#020617]">M</i>
            </div>
            <p className="!text-gray-300"><b className="!text-white">+3,000 profesionales</b><br/>protegen su organización con Pentest365</p>
          </div>
        </motion.div>
        <motion.div className="hero-visual" initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} transition={{delay:.18,duration:.65}}>
          <div className="orb"></div>
          <img className="hero-stack" src={hero} alt="Capas de seguridad digital"/>
          <Dashboard/>
          <div className="security-chip !border-white/10 !bg-white !shadow-xl"><span className="!bg-emerald-500 !text-white">✓</span><div><small className="!text-gray-500">ESTADO DEL ENTORNO</small><b className="!text-slate-800">Protegido</b></div></div>
          <div className="risk-pill !bg-white !text-slate-700 !shadow-lg"><i className="!bg-emerald-500"></i> Riesgo reducido <b className="!text-emerald-600">−32%</b></div>
        </motion.div>
      </div>
    </section>
  )
}
