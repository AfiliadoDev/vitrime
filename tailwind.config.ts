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
        // Cores otimizadas para conversão
        brand: {
          primary: '#8B5CF6',    // Roxo/Púrpura vibrante
          secondary: '#F7931E',  // Laranja energético
          accent: '#A855F7',     // Roxo claro
          hot: '#C026D3',        // Magenta
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
