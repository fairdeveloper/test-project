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
        'background': '#131314',
        'surface': '#1e1e21',
        'primary-text': '#f1f1f1',
        'secondary-text': '#a1a1aa',
        'subtle-border': '#333336',
        'accent': {
          'start': '#8b5cf6',
          'end': '#3b82f6',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        logo: ['var(--font-jakarta)'],
      },
    },
  },
  // DEĞİŞİKLİK BURADA
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config