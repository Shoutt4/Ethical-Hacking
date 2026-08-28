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
          {POSTS.map(post => (
            <Reveal key={post.title}>
              <article className="group flex h-full cursor-pointer flex-col border border-edge bg-coal transition-colors duration-200 hover:border-volt">
                <div
                  className={`scanlines relative h-[150px] overflow-hidden border-b border-edge ${GRADIENTS[post.grad]}`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute -right-4 -bottom-4 size-20 rotate-12 border border-volt/25 transition-transform duration-500 group-hover:rotate-45"
                  />
                  <span className="absolute top-3 left-3 bg-night px-2.5 py-1 font-code text-[10px] tracking-[2px] text-volt uppercase">
                    {post.pill}
                  </span>
                </div>
                <div className="flex grow flex-col p-6">
                  <h3 className="mb-4 font-display text-xl leading-snug tracking-wide text-white uppercase group-hover:text-volt-light">
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
            className="inline-block border border-edge-strong px-7 py-[15px] text-[13px] font-bold tracking-[1.5px] text-white uppercase no-underline transition-colors duration-150 hover:border-volt hover:text-volt-light"
          >
            Ver todos los artículos →
          </a>
        </Reveal>
      </div>
    </section>
  )
}
