import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // ensures proper routing on Vercel/Netlify
  build: {
    outDir: 'dist', // publish folder
  }
});
