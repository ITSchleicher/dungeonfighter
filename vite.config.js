import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Adding polyfill for process
import process from 'process';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: './index.html',
    },
  },
  define: {
    'process.env': process.env,  // Polyfill process.env
  },
  base: './',  // Ensure relative paths
});