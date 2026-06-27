import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Port configurations when running Vite directly, 
    // although we will run it via server.js proxy.
    port: 5173,
    strictPort: true
  }
});
