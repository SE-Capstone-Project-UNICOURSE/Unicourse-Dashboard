import path from 'path';
import checker from 'vite-plugin-checker';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// Load environment variables
const PORT = parseInt(process.env.VITE_PORT) || 3039;

export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
        dev: { logLevel: ['error'] },
      },
      overlay: {
        position: 'tl',
        initialIsOpen: false,
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), 'node_modules/$1'),
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), 'src/$1'),
      },
      // Additional aliases
      { find: '@components', replacement: path.resolve(__dirname, './src/components') },
      { find: '@features', replacement: path.resolve(__dirname, './src/features') },
      { find: '@hooks', replacement: path.resolve(__dirname, './src/hooks') },
      { find: '@utils', replacement: path.resolve(__dirname, './src/utils') },
      { find: '@routes', replacement: path.resolve(__dirname, './src/routes') },
      { find: '@theme', replacement: path.resolve(__dirname, './src/theme') },
    ],
  },
  server: { port: PORT, host: true },
  preview: { port: PORT, host: true },
});
