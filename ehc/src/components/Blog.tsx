import { GRADIENTS, POSTS } from '../lib/data'
import Reveal from './Reveal'

export default function Blog() {
  return (
    <section id="blog" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="font-code text-xs tracking-[3px] text-volt-light">// EHC NEWS</p>
          <h2 className="mt-3 font-display text-[clamp(30px,4.5vw,54px)] leading-[1.02] tracking-wide text-white uppercase">
            Inteligencia pública
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {POSTS.map((post, i) => (
            <Reveal key={post.title} className={i > 0 ? 'reveal-delay-1' : ''}>
              <article className="blog-card group flex h-full cursor-pointer flex-col">
                <div
                  className={`scanlines relative h-[180px] overflow-hidden border-b border-edge ${GRADIENTS[post.grad]}`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute -right-4 -bottom-4 size-20 rotate-12 border border-volt/25 transition-transform duration-700 group-hover:rotate-45 group-hover:scale-110"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute top-3 right-3 size-2 rounded-full bg-volt/40 transition-all duration-500 group-hover:scale-150 group-hover:bg-volt/70"
                  />
                  <span className="absolute top-3 left-3 bg-night/80 backdrop-blur-sm px-2.5 py-1 font-code text-[10px] tracking-[2px] text-volt uppercase">
                    {post.pill}
                  </span>
                </div>
                <div className="flex grow flex-col p-6">
                  <h3 className="mb-4 font-display text-xl leading-snug tracking-wide text-white uppercase group-hover:text-volt-light transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="mt-auto font-code text-xs text-fog">
                    {post.date} · {post.mins} min read
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-9 text-center">
          <a
            href="#blog"
            className="inline-block border border-edge-strong px-7 py-[15px] text-[13px] font-bold tracking-[1.5px] text-white uppercase no-underline transition-all duration-300 hover:border-volt hover:text-volt-light hover:shadow-[0_0_20px_rgba(182,229,55,.1)]"
          >
            Ver todos los artículos →
          </a>
        </Reveal>
      </div>
    </section>
  )
}
