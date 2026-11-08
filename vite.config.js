import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Relative base (" ./ ") keeps every asset path working whether the site is
 * served from a domain root, a GitHub Pages project path (/repo-name/) or a
 * temporary preview URL.
 *
 * The dev server allows exactly one extra hostname, supplied through the
 * PREVIEW_HOST environment variable (never a blanket wildcard).
 */
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    allowedHosts: process.env.PREVIEW_HOST ? [process.env.PREVIEW_HOST] : [],
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: true,
  },
  build: {
    target: 'es2020',
    assetsInlineLimit: 2048,
  },
})
