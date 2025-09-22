import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   test: {
    globals: true,          // use global test functions like describe, it
    environment: 'jsdom',   // simulate browser environment
    setupFiles: './src/setupTests.js' // optional, if you want global setup
  }
})
