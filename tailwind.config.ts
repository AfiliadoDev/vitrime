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
          primary: '#10b981',    // Verde esmeralda
          secondary: '#14b8a6',  // Verde-azulado (teal)
          accent: '#34d399',     // Verde claro
          hot: '#059669',        // Verde escuro
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
