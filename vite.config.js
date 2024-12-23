import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),  
    },  
  },
  build: {
    lib: {
      entry: path.resolve("src", 'lib/index.jsx'),
      name: 'evo-client-lib',
      fileName: (format) => `evo-client-lib.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React'
        }
      }
    }
  },
  server:{
    port:7100,
    proxy: {
      '/api': {
        target: 'http://localhost:3030',
        changeOrigin: true,
        cookieDomainRewrite: {
          '*': 'localhost',
        },
        cookiePathRewrite: {
          '*': '/',
        },
      },
      '/ws':{
        target: 'ws://localhost:3030',
        ws: true,
        rewriteWsOrigin: true,
      }
    }
  }
})
