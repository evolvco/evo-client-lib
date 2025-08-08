import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import path from 'path'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    dts()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@lib': path.resolve(__dirname, './lib')
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts']
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: path.resolve(__dirname, 'lib/main.ts'),
      name: 'evo-client-lib',
      fileName: (format) => `evo-client-lib.${format}.js`,
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      // Externalize React and ReactDOM
      external: ['react', 'react-dom', 'react-router-dom'],
      output: {
        // Global variables for externalized dependencies if needed
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-router-dom': 'ReactRouterDOM',
        },
      },
    },
  },
  server: {
    port: 7010,
    proxy: {
      '/v1/realtime/sessions': {
        target: "https://api.openai.com",
        changeOrigin: true
      }
    }
  },
  preview: {
    port: 7011,
    proxy: {
      '/v1/realtime/sessions': {
        target: "https://api.openai.com",
        changeOrigin: true
      }
    }
  }
})
