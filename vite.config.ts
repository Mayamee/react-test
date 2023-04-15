import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@bootstrap': path.resolve(__dirname, 'node_modules/bootstrap/scss/bootstrap'),
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5050,
  },
});
