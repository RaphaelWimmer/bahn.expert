import { defineWorkspace } from 'vitest/config';
import viteConfig from './vite.config';

export default defineWorkspace([
  {
    test: {
      name: 'server',
      include: ['src/server/**/*.test.{ts,js}'],
      environment: 'node',
      setupFiles: ['src/server/__tests__/setup.ts'],
      globalSetup: 'src/server/__tests__/setupGlobal.ts',
      alias: viteConfig.resolve.alias,
      pool: 'forks',
    },
  },
]);
