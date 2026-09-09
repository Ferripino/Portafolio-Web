/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: { background: '#0a0e1a', surface: '#0d1117', cyan: '#00d4ff', blue: '#2563eb', purple: '#7c3aed', text: '#e2e8f0' },
      fontFamily: { sans: ['var(--font-inter)', 'sans-serif'], display: ['var(--font-poppins)', 'sans-serif'] },
      keyframes: { glow: { '0%, 100%': { boxShadow: '0 0 12px rgba(0,212,255,.12)' }, '50%': { boxShadow: '0 0 28px rgba(0,212,255,.28)' } }, typewriter: { from: { width: '0' }, to: { width: '100%' } } },
      animation: { glow: 'glow 3s ease-in-out infinite', typewriter: 'typewriter 2.8s steps(24) both' },
    },
  },
  plugins: [],
}
