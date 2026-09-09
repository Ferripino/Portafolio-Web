import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({ subsets: ['latin'], weight: ['500', '600', '700', '800'], variable: '--font-poppins' })

export const metadata: Metadata = {
  metadataBase: new URL('https://portafolio-web-ferripinos-projects.vercel.app'),
  title: 'Fabián Pelegrín - Desarrollador Full Stack | Next.js & TypeScript',
  description: 'Desarrollador especializado en Next.js, React y TypeScript. Portafolio de proyectos con IA y tecnologías modernas.',
  keywords: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'desarrollador full stack', 'portfolio'],
  authors: [{ name: 'Fabián Pelegrín' }],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: '/',
    title: 'Fabián Pelegrín - Desarrollador Full Stack | Next.js & TypeScript',
    description: 'Desarrollador especializado en Next.js, React y TypeScript. Portafolio de proyectos con IA y tecnologías modernas.',
    images: [{ url: '/images/photo-ai-academy.png', width: 1200, height: 630, alt: 'Portfolio de Fabián Pelegrín' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fabián Pelegrín - Desarrollador Full Stack',
    description: 'Portafolio de proyectos con IA y tecnologías modernas.',
    images: ['/images/photo-ai-academy.png'],
  },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg' },
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Fabián Pelegrín',
  jobTitle: 'Desarrollador Full Stack',
  url: 'https://portafolio-web-ferripinos-projects.vercel.app',
  sameAs: ['https://github.com/Ferripino', 'https://wa.me/+5356253084', 'https://t.me/ElFerri09'],
  knowsAbout: ['Next.js', 'TypeScript', 'React', 'TailwindCSS'],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="bg-background">
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        {children}
      </body>
    </html>
  )
}

export const viewport = { themeColor: '#0a0e1a', colorScheme: 'dark' }
