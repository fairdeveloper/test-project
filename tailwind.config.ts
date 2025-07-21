import type { Config } from 'tailwindcss'
const config: Config = {
  content: [ './src/**/*.{js,ts,jsx,tsx,mdx}', ],
  theme: {
    extend: {
      colors: { /* ... renkler ... */ },
      fontFamily: { /* ... fontlar ... */ },
    },
  },
  plugins: [ require('@tailwindcss/typography'), ],
}
export default config