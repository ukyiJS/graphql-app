import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

const join = (...paths: string[]) => path.join(process.cwd(), ...paths);

export default defineConfig({
  mode: process.env.MODE,
  root: join('src', 'renderer'),
  base: '',
  publicDir: 'public',
  envDir: process.cwd(),
  resolve: {
    alias: {
      '@renderer': join('src', 'renderer'),
    },
  },
  server: {
    host: '127.0.0.1',
  },
  build: {
    outDir: join('dist'),
    emptyOutDir: false,
  },
  plugins: [react(), vanillaExtractPlugin()],
});
