import { FiArrowDownRight, FiGithub } from 'react-icons/fi'

export function Hero() {
  return <section id="inicio" className="grid-bg relative flex min-h-[680px] items-center overflow-hidden px-5 pb-20 pt-32 lg:px-8">
    <div className="relative z-10 mx-auto w-full max-w-6xl">
      <p className="mb-5 font-mono text-sm uppercase tracking-[.28em] text-cyan">Hola, soy Fabián Pelegrín</p>
      <h1 className="max-w-4xl font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-7xl lg:text-8xl">Construyo productos <span className="gradient-text">digitales</span> con intención.</h1>
      <div className="mt-7 flex items-center gap-3 font-mono text-sm text-slate-400"><span className="h-px w-8 bg-cyan" /> <span className="overflow-hidden whitespace-nowrap border-r-2 border-cyan pr-2 animate-typewriter">Desarrollador Full Stack / Next.js</span></div>
      <p className="mt-7 max-w-xl text-base leading-7 text-slate-400">Creo interfaces rápidas, accesibles y memorables combinando ingeniería frontend, diseño de producto e inteligencia artificial.</p>
      <div className="mt-9 flex flex-wrap gap-4"><a href="#proyectos" className="inline-flex items-center gap-2 rounded-full bg-cyan px-6 py-3 text-sm font-semibold text-background transition hover:-translate-y-1 hover:bg-white">Ver proyectos <FiArrowDownRight /></a><a href="#contacto" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-1 hover:border-cyan hover:text-cyan">Hablemos <FiGithub /></a></div>
      <div className="mt-20 flex items-center gap-10 text-xs uppercase tracking-[.2em] text-slate-500"><span>Frontend</span><span>Producto</span><span>IA aplicada</span></div>
    </div>
    <div className="pointer-events-none absolute right-[8%] top-1/3 hidden h-56 w-56 rounded-full border border-cyan/20 shadow-[0_0_100px_rgba(0,212,255,.12)] lg:block" />
  </section>
}
