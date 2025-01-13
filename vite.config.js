import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // This is where Vite will place the final build
    assetsDir: 'assets',  // Assets like JS and CSS will be placed in the assets folder within dist
  },
  base: './',  // Ensures that the paths for assets are relative
});
