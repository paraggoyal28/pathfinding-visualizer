import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: 'https://paraggoyal28.github.io/pathfinding-visualizer/',
  plugins: [
    react(),
  ],
})
