import type { Project } from '../types'

export const projects: Project[] = [
  { title: 'Photo AI Academy', description: 'Plataforma educativa con inteligencia artificial para fotografía', technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'IA'], href: 'https://photo-ai-academy.vercel.app/', image: '/images/photo-ai-academy.png', featured: true },
  { title: '2X3 Webs', description: 'Experiencias web y landing pages diseñadas para convertir visitas en clientes.', technologies: ['HTML', 'CSS', 'JavaScript'], href: '#', image: '/images/project-2x3.jpeg' },
  { title: 'QR Generator', description: 'Generador de códigos QR rápido, sencillo y adaptable a cualquier dispositivo.', technologies: ['React', 'JavaScript', 'Tailwind CSS'], href: '#', image: '/images/qr-generator.png' },
  { title: 'Latinomost', description: 'Plataforma digital con una experiencia clara, moderna y enfocada en la comunidad.', technologies: ['React', 'CSS', 'JavaScript'], href: '#', image: '/images/latinomost.png' },
]
