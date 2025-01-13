import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../dist', // Output directory
    assetsDir: 'assets', // Ensure assets are placed in the 'assets' folder
    rollupOptions: {
      input: './src/main.jsx', // Entry file
    },
  },
  base: './', // Ensures relative paths in index.html
});