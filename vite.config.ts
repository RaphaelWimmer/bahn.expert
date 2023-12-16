import react from '@vitejs/plugin-react-swc';
import vike from 'vike/plugin';
import type { UserConfig } from 'vite';

const isTest = process.env.NODE_ENV === 'test';

const config = {
  // vike somehow breaks vitest?
  plugins: [react(), !isTest && vike()],
  resolve: {
    alias: {
      // eslint-disable-next-line unicorn/prefer-module
      '#': `${__dirname}/src`,
    },
  },
  optimizeDeps: {
    include: ['react-dom/client'],
  },
} satisfies UserConfig;

export default config;
