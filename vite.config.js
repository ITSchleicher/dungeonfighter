import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Output directory for the build
    assetsDir: 'assets', // Directory for assets (JS/CSS files)
  },
  base: './', // Ensures relative paths in the output HTML
});