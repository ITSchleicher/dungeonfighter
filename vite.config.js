import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // The directory where your build files will go
    assetsDir: 'assets', // Ensures assets are placed in an "assets" folder
    rollupOptions: {
      input: './index.html', // Ensure this matches your entry point
    },
  },
});