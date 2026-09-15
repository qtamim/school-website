/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        desktop: '1440px',
        xs: '400px'
      },
      fontFamily: {
        sans: ['var(--font-NotoSansArabic)'],
      },
    },
  },
  plugins: [],
} satisfies Config