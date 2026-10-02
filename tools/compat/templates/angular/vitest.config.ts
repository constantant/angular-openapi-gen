import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  resolve: {
    alias: [
      { find: '@constantant/openapi-resource-mocks/testing', replacement: r('./src/mocks/testing.ts') },
      { find: '@constantant/openapi-resource-mocks', replacement: r('./src/mocks/index.ts') },
    ],
  },
  test: { globals: true, environment: 'jsdom', setupFiles: ['./setup.ts'], include: ['src/**/*.spec.ts'] },
});
