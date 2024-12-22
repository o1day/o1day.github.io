import react from '@vitejs/plugin-react-swc';
import {defineConfig} from 'vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src/app'),
      '@core': path.resolve(__dirname, './src/core'),
      '@libs': path.resolve(__dirname, './src/libs'),
      '@ui': path.resolve(__dirname, './src/ui'),
    },
  },
});
