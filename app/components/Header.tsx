'use client'

import { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

const links = [['Inicio', '#inicio'], ['Proyectos', '#proyectos'], ['Habilidades', '#habilidades'], ['Contacto', '#contacto']]

export function Header() {
  const [open, setOpen] = useState(false)
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/75 backdrop-blur-xl">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
      <a href="#inicio" className="font-display text-lg font-bold tracking-tight text-white" onClick={() => setOpen(false)}><span className="text-cyan">F</span>P<span className="text-cyan">.</span></a>
      <nav className={`${open ? 'flex' : 'hidden'} absolute left-0 right-0 top-full flex-col gap-2 border-b border-white/10 bg-background/95 p-5 md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0`} aria-label="Navegación principal">
        {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-cyan">{label}</a>)}
      </nav>
      <button className="rounded-lg p-2 text-slate-300 md:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open}>{open ? <FiX size={22} /> : <FiMenu size={22} />}</button>
    </div>
  </header>
}
