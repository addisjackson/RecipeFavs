import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/RecipeFavs",
  server: {
  host: true,
  strictPort: true,
  hmr: {
    protocol: "ws",
    host: "localhost",
    port: 5173
  },
  build: { 
    outDir: "dist", 
    sourcemap: false, 
    minify: "esbuild", 
    cssMinify: true, 
  }
}

})
