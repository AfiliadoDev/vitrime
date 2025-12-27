import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0a0a0a',
          card: '#1a1a1a',
          border: '#2a2a2a',
        },
        // Cores otimizadas para conversão baseadas em psicologia das cores
        brand: {
          primary: '#FF6B35',    // Laranja vibrante (líder em conversão no Brasil)
          secondary: '#F7931E',  // Laranja energético
          accent: '#FF4545',     // Vermelho urgência (34% mais cliques)
          hot: '#FF2E63',        // Rosa-vermelho chamativo
        },
        conversion: {
          orange: '#FF8C42',     // Laranja suave
          'orange-dark': '#E8590C', // Laranja escuro
          red: '#FF4D4D',        // Vermelho ação
          'red-dark': '#D62828', // Vermelho intenso
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
export default config
