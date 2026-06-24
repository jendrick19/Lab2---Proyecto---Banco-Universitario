import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    // El API del banco solo acepta orígenes de su WHITE_LIST (CORS).
    // 8080 está permitido; strictPort evita que Vite caiga a otro puerto.
    host: true, // expone el server en la red local (acceso desde el móvil)
    port: 8080,
    strictPort: true,
  },
})
