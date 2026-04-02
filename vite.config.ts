import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** Must match where you deploy (e.g. https://curiouses.com/petemotionstudy/). */
const BASE = '/petemotionstudy/'

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
