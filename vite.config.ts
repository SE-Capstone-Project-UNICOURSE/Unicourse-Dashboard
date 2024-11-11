import path from 'path';
import checker from 'vite-plugin-checker';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
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
        { find: '@app', replacement: path.resolve(__dirname, './src') },
        { find: '@components', replacement: path.resolve(__dirname, './src/components') },
        { find: '@features', replacement: path.resolve(__dirname, './src/features') },
        { find: '@hooks', replacement: path.resolve(__dirname, './src/hooks') },
        { find: '@utils', replacement: path.resolve(__dirname, './src/utils') },
        { find: '@routes', replacement: path.resolve(__dirname, './src/routes') },
        { find: '@theme', replacement: path.resolve(__dirname, './src/theme') }
      ],
    },
    server: {
      port: Number(env.VITE_PORT) || 3000, // Use the environment variable, defaulting to 3000
      host: true,
    },
    preview: {
      port: Number(env.VITE_PORT) || 3000, // Use the environment variable, defaulting to 3000
      host: true,
    },
  };
});
