import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta de la marca — reemplazar con la del cliente
        brand: {
          50:  '#faf5f0',
          100: '#f0e6d8',
          200: '#dcc9ad',
          300: '#c5a882',
          400: '#b08c5f',
          500: '#9a7245', // primario
          600: '#7d5c38',
          700: '#61462c',
          800: '#453220',
          900: '#2a1e13',
        },
        neutral: {
          950: '#0d0d0d',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
