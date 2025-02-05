import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


import fixReactVirtualized from "esbuild-plugin-react-virtualized";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      plugins: [fixReactVirtualized],
    },
  },
});