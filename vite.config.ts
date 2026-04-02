import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** Must match where you deploy (e.g. https://curiouses.com/project-emotion-study/). */
const BASE = '/project-emotion-study/'

// https://vite.dev/config/
export default defineConfig({
  base: BASE,
  plugins: [
    react(),
    {
      name: 'html-inject-base',
      transformIndexHtml(html) {
        return html.replaceAll('%BASE%', BASE)
      },
    },
  ],
})
