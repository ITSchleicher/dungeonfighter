import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import polyfillNode from 'rollup-plugin-polyfill-node';

export default defineConfig({
  plugins: [
    react(),
    polyfillNode(),
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: './index.html',
    },
  },
  base: './', // Ensure relative paths
});
