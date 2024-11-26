import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // Opens the browser automatically
  },
  build: {
    outDir: 'dist', // Output directory for build files
  },
});
