import { motion } from 'framer-motion';
import { Reveal } from './Reveal';

const items: [string, string][] = [
  ['3000+', 'Pentesters'],
  ['24/7', 'Monitoreo'],
  ['100%', 'Visibilidad pasiva'],
  ['24×365', 'Protección'],
];

export function Stats() {
  return (
    <section className="stats-section !bg-transparent !border-transparent bg-transparent !border-0">
      <Reveal>
        <div className="section-kicker !text-white/70">PROTECCIÓN CONTINUA. VISIBILIDAD TOTAL.</div>
      </Reveal>
      <div className="stats !bg-transparent">
        {items.map(([n, l], i) => (
          <Reveal key={l} delay={i * 0.07}>
            <motion.div className="stat !bg-white/[0.04] !border-white/10 backdrop-blur-[2px] hover:!bg-white/[0.07] hover:!border-white/20" whileHover={{ y: -4 }}>
              <b className="!text-white">{n}</b>
              <span className="!text-gray-200">{l}</span>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
