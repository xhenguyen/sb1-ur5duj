import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        content: 'src/content.js',
        background: 'src/background.js',
      },
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
});