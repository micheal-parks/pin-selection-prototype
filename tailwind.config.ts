import { Config } from 'tailwindcss'
import { theme } from './node_modules/@viamrobotics/prime/dist/theme'

export default {
  content: ['./src/**/*.{html,js,ts,svelte}', './index.html'],
  theme: {
    ...theme,
  },
  plugins: [],
} satisfies Config
