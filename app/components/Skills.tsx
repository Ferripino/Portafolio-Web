import { SiNextdotjs, SiTypescript, SiReact, SiTailwindcss } from 'react-icons/si'
import type { IconType } from 'react-icons'

const skills: { name: string; Icon: IconType; className: string; iconClass: string }[] = [
  { name: 'Next.js', Icon: SiNextdotjs, className: 'border-white/20 bg-black/30 hover:border-white/50', iconClass: 'text-white' },
  { name: 'TypeScript', Icon: SiTypescript, className: 'border-[#3178c6]/50 bg-[#3178c6]/10 hover:border-[#3178c6]', iconClass: 'text-[#5b9bd5]' },
  { name: 'React', Icon: SiReact, className: 'border-[#61dafb]/40 bg-[#61dafb]/10 hover:border-[#61dafb]', iconClass: 'text-[#61dafb]' },
  { name: 'Tailwind CSS', Icon: SiTailwindcss, className: 'border-cyan/40 bg-cyan/10 hover:border-cyan', iconClass: 'text-cyan' },
]

export function Skills() {
  return <section id="habilidades" className="border-t border-white/10 px-5 py-24 lg:px-8"><div className="mx-auto max-w-6xl"><p className="font-mono text-sm uppercase tracking-[.25em] text-cyan">Stack principal</p><h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-5xl">Herramientas para <span className="gradient-text">crear mejor.</span></h2><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{skills.map(({ name, Icon, className, iconClass }) => <div key={name} className={`glass neon-border rounded-2xl p-7 transition duration-300 hover:-translate-y-2 ${className}`}><Icon className={`mb-7 text-5xl ${iconClass}`} aria-hidden="true" /><h3 className="font-display text-lg font-semibold text-white">{name}</h3><p className="mt-2 text-sm text-slate-500">Desarrollo moderno</p></div>)}</div></div></section>
}
